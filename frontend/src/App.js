import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Upload from './components/Upload';

function App() {

  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path='/upload' element={<Upload/>}/>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
