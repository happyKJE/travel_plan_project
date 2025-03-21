// 새로고침 감지 컴포넌트 따로 분리
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function ReloadHandler() {
    const navigate = useNavigate();
    const location = useLocation();
    const [checked, setChecked] = useState(false);  // 한번만 실행되게 관리

    useEffect(() => {
        if (checked) return;

        //
        const navigationType = performance.getEntriesByType('navigation')[0]?.type;
        if (navigationType === 'reload' && location.pathname !== '/') {
            navigate('/', { replace: true });
        }
        setChecked(true); // 한번 실행 후 체크
    }, [navigate, location, checked]);

    return null;
};
