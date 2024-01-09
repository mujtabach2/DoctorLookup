import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormBar from "./components/formBar";

import "bootstrap/dist/css/bootstrap.min.css"


const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/formbar" element={<FormBar />} />
        </Routes>
        </BrowserRouter>
    );
    }
export default AppRouter;