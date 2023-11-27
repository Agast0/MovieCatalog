import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Index from "./Pages/AdminLogin";
import NavBar from "./Components/NavBar";
import Movies from "./Pages/Movies";
import AdminPanel from "./Pages/AdminPanel";
import NotFoundRedirect from "./Pages/NoutFoundRedirect";

const Router = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Movies />}/>
                <Route path="/admin-login" element={<Index />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/*" element={<NotFoundRedirect />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router