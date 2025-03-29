import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from '../context/UseStore.jsx';
import NavigationButtons from "../components/NavigationButtons.jsx";

const RegionSelection = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useStore();
    const [scriptsLoaded, setScriptsLoaded] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            if (window.simplemaps_countrymap && typeof window.simplemaps_countrymap.load === 'function') {
                console.log('✅ Map loaded via requestAnimationFrame');
                window.simplemaps_countrymap.load();
                if(state.inputValues.region_code) {
                    state.inputValues.region_code.forEach((region) => {
                        window.simplemaps_select.select(region);
                    })
                }else{
                    window.simplemaps_select.deselect_all();
                }
            }

        });
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        const loadMapScripts = async () => {
            try {
                await loadScript("/src/map/mapdata.js");
                await loadScript("/src/map/countrymap.js");
                window[simplemaps_countrymap];
                // window.simplemaps_countrymap.load();
                await loadScript("/src/map/select.js");

                window.simplemaps_select.map = window.simplemaps_countrymap;
                window.simplemaps_select.max = 1;

                console.log("✅ Map scripts loaded and ready");
            } catch (error) {
                console.error("❌ Failed to load map scripts", error);
            }
        };

            loadMapScripts();
    }, []);

    // 다음 버튼 클릭 시 선택된 지역 상태 업데이트
    const handleOnNext = () => {
        if (window.simplemaps_select) {
            const data = window.simplemaps_select.selected.map((region) => {
                return simplemaps_countrymap_mapdata?.data?.data[region] || "Unknown";
            });
            dispatch({
                type: "SET_OPTION",
                payload: { type: "region", value: data }
            });
            dispatch({
                type: "SET_OPTION",
                payload: { type: "region_code", value: window.simplemaps_select.selected }
            });
        }
    };

    useEffect(() => {
        if (state.inputValues?.region?.length > 0) {
            navigate(`/plan-details/${state.planType}`);
        }
    }, [state.inputValues?.region, navigate]);

    return (
        <motion.div
            className="next-screen"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h2 className='option-header'>어디로 가볼까요?</h2>
            <p style={{ color: "gray", textDecorationLine: "underline" }}>(※ 지역은 한 곳만 선택 가능합니다.)</p>
            <div id="map"></div>
            <NavigationButtons onBack={() => navigate('/dates-selection')} onNext={handleOnNext} />
        </motion.div>
    );
};

export default RegionSelection;
