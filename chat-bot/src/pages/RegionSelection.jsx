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
import "../styles/RegionSelection.css"

const RegionSelection = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

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
      <h2>원하는 지역이 있으세요?</h2>
      <SouthKoreaMap />

        <NavigationButtons
            onBack={() => navigate('/dates-selection')}
            onNext={() => navigate(`/plan-details/${state.planType}`)}
        />
    </motion.div>
  );
};

export default RegionSelection;
