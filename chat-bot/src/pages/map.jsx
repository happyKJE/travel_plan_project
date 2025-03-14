import {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationButtons from "../components/NavigationButtons.jsx";
import useStore from "../context/UseStore.jsx";

export default function Map()  {
    const navigation = useNavigate();
    const {state,dispatch} = useStore();

    useEffect(() => {
        // 스크립트를 동적으로 추가
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        async function loadMapScripts() {
            try {
                await loadScript("/src/pages/mapdata.js");
                await loadScript("/src/pages/countrymap.js");
                console.log("Scripts loaded successfully");
            } catch (error) {
                console.error("Failed to load scripts", error);
            }
        }

        loadMapScripts();
    }, []);

    return (
        <motion.div
            className="next-screen"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h2>지역을 선택해주세요</h2>
            <div id="map"></div>
        <NavigationButtons
            onBack={()=> {
                navigate('/people-count')
            }}
            onNext={()=>navigate(`/plan-details/${state.planType}`)}
        />
    </motion.div>
    )
}