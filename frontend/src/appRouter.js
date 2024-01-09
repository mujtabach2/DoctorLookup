import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormBar from "./components/formBar";


function AppRouter() {
  return (
    <BrowserRouter>

        <Routes>
            <Route path="/formbar" element={<FormBar/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
