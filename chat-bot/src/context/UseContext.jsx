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

import {createContext, useReducer} from "react";
import {v4 as uuidv4} from "uuid";

//상태를 전역적으로 관리하기 위한 context 생성
const UseContext = createContext({});

//초기값
const initialState = {
    planType: null,
    inputValues: {},
    chats: [],
    activeChatId: null,
};

const chatReducer = (state, action) => {
    switch (action.type) {
        case "SELECT_PLAN":
            return {...state, planType: action.payload};
        case "SET_OPTION":
            return {
                ...state,
                inputValues: {
                    ...state.inputValues,
                    [action.payload.type]: action.payload.value,
                },
            };
        case "CREATE_CHAT": {
            const newChat = {
                id: uuidv4(),
                displayId: `${new Date().toLocaleString("ko-KR")}`,
                messages: [],
            };
            return {
                ...state,
                chats: [newChat, ...state.chats],
                activeChatId: newChat.id,
            };
        }
        case "ADD_MESSAGE": {
            const {chatId, message} = action.payload;
            return {
                ...state,
                chats: state.chats.map((chat) =>
                    chat.id === chatId
                        ? {...chat, messages: [...chat.messages, message]}
                        : chat
                ),
            };
        }
        case "DELETE_CHAT": {
            const updatedChats = state.chats.filter((chat) => chat.id !== action.payload);
            return {
                ...state,
                chats: updatedChats,
                activeChatId: updatedChats.length > 0 ? updatedChats[0].id : null,
            };
        }
        case "SET_ACTIVE_CHAT":
            return {...state, activeChatId: action.payload};
        default:
            return state;
    }
};

export const ChatProvider = ({children}) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);
    return <UseContext.Provider value={{state, dispatch}}>{children}</UseContext.Provider>;
};

export default UseContext;
