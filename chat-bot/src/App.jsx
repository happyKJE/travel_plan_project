import React, { useState } from 'react'
import ChatBotStart from './Component/ChatBotStart'
import ChatBotApp from "./Component/ChatBotApp.jsx";
import RouterComponent from "./RouterComponent.jsx";
import {BrowserRouter} from "react-router-dom";

const App = () => {
  // const [ isChatting, setIsChatting ] = useState(false);

  return (
      <BrowserRouter>
        <div className='container'>
          <RouterComponent />
        </div>
      </BrowserRouter>
  )
}

export default App
