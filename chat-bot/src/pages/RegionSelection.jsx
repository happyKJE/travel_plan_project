/**
 * @file RegionSelection.jsx
 * @description 지도 기능 추가
 * @author jaeyeol
 * @created 2025-03-13
 * @lastModifiedBy jaeyeol
 * @lastModifiedDate 2025-03-14
 */

import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from '../context/UseStore.jsx';
import NavigationButtons from "../components/NavigationButtons.jsx";

const RegionSelection = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  useEffect(() => {
    // 스크립트를 동적으로 추가
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          window.simplemaps_countrymap.load();
          window.simplemaps_select.deselect_all();
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

    async function loadMapScripts() {
      try {
        await loadScript("/src/map/mapdata.js");
        await loadScript("/src/map/countrymap.js");
        await loadScript("/src/map/select.js");

        window.simplemaps_select.map = window.simplemaps_countrymap;
        window.simplemaps_select.max = 3;

        console.log("Scripts loaded successfully");
      } catch (error) {
        console.error("Failed to load scripts", error);
      }
    }

    loadMapScripts();
  }, []);

  // 다음 버튼 클릭 시 선택된 지역 상태 업데이트
  const handleOnNext = () => {
    if (window.simplemaps_select) {
      const data = window.simplemaps_select.selected.map((region) => {
        return simplemaps_countrymap_mapdata.data.data[region] || "Unknown";
      });

      console.log(data);
      dispatch({
        type: "SET_OPTION",
        payload: { type: "region", value: data },
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
        <h2>어디로 가볼까요?</h2>
        <p>(최대 3개 지역 선택 가능)</p>
        <div id="map"></div>
        <NavigationButtons onBack={() => navigate('/dates-selection')} onNext={handleOnNext} />
      </motion.div>
  );
};

export default RegionSelection;
