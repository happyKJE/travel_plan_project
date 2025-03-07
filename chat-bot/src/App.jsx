import React from 'react'
import RouterComponent from "./RouterComponent.jsx";
import {BrowserRouter} from "react-router-dom";

const App = () => {
  return (
      <BrowserRouter>
        <div className='container'>
          <RouterComponent />
        </div>
      </BrowserRouter>
  )
}

export default App
