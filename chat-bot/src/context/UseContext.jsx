/**
 * @file UseContext.jsx
 * @description useReducer와 createContext 함수를 사용하여 전역 상태관리
 * @author jungeun
 * @created 2025-03-12
 * @lastModifiedBy jungeun
 * @lastModifiedDate 2025-03-12
 * @note
 *    useReducer : useState의 대체제.
 *    기본 문법 : const [state, dispatch] = useReducer(reducer, 초기값);
 *    state : 현재 상태 값
 *    dispatch : 상태를 업데이트하는 함수
 *    reducer : 상태를 변경하는 로직을 정의하는 함수
 *    초기값 : state의 초기 상태 값
 *    useState와 달리 여러개의 상태값을 한번에 관리.
 *
 *    createContext :컴포넌트 간 props 없이 상태 공유 가능.
 */

import { createContext, useReducer } from "react";

//상태를 전역적으로 관리하기 위한 context 생성
const UseContext = createContext({});

//초기값
const initialState = {
    planType: null,
    inputValues: {},
    chats: [],
    activeChatId: null,
    isLoggedIn: !!localStorage.getItem('token')
};

const chatReducer = (state, action) => {
    switch (action.type) {
        case "RESET_STATE":
            return {
                ...initialState,
                token: state.token,         // 기존 토큰 유지
                isLoggedIn: state.isLoggedIn // 로그인 상태도 유지
            };
        case "SELECT_PLAN":
            return { ...state, planType: action.payload };
        case "SET_OPTION":
            return {
                ...state,
                inputValues: {
                    ...state.inputValues,
                    [action.payload.type]: action.payload.value,
                },
            };
        // 로그인 처리
        case "LOGIN":
            localStorage.setItem('token', action.payload);  // 토큰 저장
            return { ...state, isLoggedIn: true };
        // 로그아웃 처리
        case "LOGOUT":
            localStorage.removeItem('token');
            return { ...state, isLoggedIn: false };
        default:
            return state;
    }
};

export const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);
    return <UseContext.Provider value={{ state, dispatch }}>{children}</UseContext.Provider>;
};

export default UseContext;
