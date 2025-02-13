import './App.css';
import Register from "./components/register";
import Login from "./components/login.tsx"
import {Routes, Route} from 'react-router-dom';
import NavBar from "./components/navBar.tsx";
import HomePage from "./components/homePage.tsx";
import React from "react";
import Logout from "./components/logout.tsx";
import UserCars from "./components/userCars.tsx";
import CarQrCode from "./components/carQrPage.tsx";
import CarRateingPage from "./components/carRatingPage.tsx";




function App() {


    return(
        <container><NavBar/>
         <div className='AppDiv'>
             <Routes>
                 <Route path="/register" element={<Register/>}/>
                 <Route path="/login" element={<Login/>}/>
                 <Route path="/logout" element={<Logout/>}/>
                 <Route path="" element={<HomePage/>}/>

                 <Route path="/:username/cars" element={<UserCars/>}/>
                 <Route path="/:username/cars/:slug" element={<CarQrCode/>}/>
                 <Route path="/:username/cars/:slug/rate" element={<CarRateingPage/>}/>
             </Routes>
         </div>
        </container>

    )


}

export default App;
