import React from "react";
import {Routes, Route} from 'react-router-dom';

import './App.css';

import Register from "./components/register";
import Login from "./components/login.tsx"
import NavBar from "./components/navBar.tsx";
import HomePage from "./components/homePage.tsx";
import Logout from "./components/logout.tsx";
import UserCars from "./components/userCars.tsx";
import CarQrCode from "./components/carQrPage.tsx";
import CarRatingPage from "./components/carRatingPage.tsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AuthProvider} from "./context/AuthContext";




function App() {


    return(
        <container>
            <AuthProvider>

                <ToastContainer position="bottom-center" autoClose={3000} />
                <NavBar/>

                <div className='AppDiv'>
                   <Routes>
                       <Route path="/register" element={<Register/>}/>
                       <Route path="/login" element={<Login/>}/>
                       <Route path="/logout" element={<Logout/>}/>
                       <Route path="" element={<HomePage/>}/>

                       <Route path="/:username/cars" element={<UserCars/>}/>
                       <Route path="/:username/cars/:slug" element={<CarQrCode/>}/>
                       <Route path="/:username/cars/:slug/rate" element={<CarRatingPage/>}/>
                   </Routes>
                </div>

            </AuthProvider>
        </container>
    )
}

export default App;
