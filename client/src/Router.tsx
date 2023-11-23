import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Movies from "./Pages/Movies";
import AdminPanel from "./Pages/AdminPanel";
import NotFoundRedirect from "./Pages/NotFoundRedirect";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Movies />}/>
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/*" element={<NotFoundRedirect />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router