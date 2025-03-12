import {createContext, useReducer} from "react";
import {v4 as uuidv4} from "uuid";

//상태를 전역적으로 관리하기 위한 context 생성
const UseContext = createContext({});

//초기화
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
                displayId: `Chat ${new Date().toLocaleString("ko-KR")}`,
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
