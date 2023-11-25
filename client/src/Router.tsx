import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Movies from "./Pages/Movies/Movies";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import NotFoundRedirect from "./Pages/NoutFoundRedirect/NotFoundRedirect";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import NavBar from "./Components/NavBar";

const Router = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Movies />}/>
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/*" element={<NotFoundRedirect />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router