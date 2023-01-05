import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import All from './components/ALL';
import QuestionAll from "./components/QuestionsAll";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path='/all' element={<All />} />
          <Route path="/questionnaire/:id" element={<QuestionAll />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
