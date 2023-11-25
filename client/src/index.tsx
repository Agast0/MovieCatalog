import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from "./Router";
import {Toaster} from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Toaster toastOptions={{style: {backgroundColor: '#161b1c', color: 'white'}}} position={"top-left"} reverseOrder={true}/>
      <Router />
  </React.StrictMode>
);
