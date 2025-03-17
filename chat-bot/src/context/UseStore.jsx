/**
 * @file useStore.jsx
 * @description useContext 커스텀 훅
 * @author jungeun
 * @created 2025-03-12
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-12
 */

import { useContext } from "react";
import UseContext from "./UseContext.jsx";

const useStore = () => {
    const context = useContext(UseContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};

export default useStore;
