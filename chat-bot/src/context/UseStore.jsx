import { useContext } from "react";
import UseContext from "./UseContext.jsx";

// ✅ Provider 내부에서만 useChat()을 사용할 수 있도록 방어 코드 추가
const useStore = () => {
    const context = useContext(UseContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};

export default useStore;
