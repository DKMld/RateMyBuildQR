import React, {useEffect, useState} from 'react';
import '../assets/carQrPage.css';
import {useNavigate, useParams} from "react-router-dom";



const CarQrCode = () => {
    const navigate = useNavigate()
    const {username, slug} = useParams()

    const [carQrCode, setCarQrCode] = useState([])
    const [carBrand, setCarBrand] = useState('')
    const [carModel, setCarModel] = useState('')

    const API_URL = "https://api.ratemybuildqr.com"

    const checkUserIsAuth = (userToken) => {
        if(userToken){
            console.log('userIsAuth')
        }else {
            navigate('/login')
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token');

        checkUserIsAuth(token)

        const getCarQr = async() => {

            const response = await fetch(`${API_URL}/api/${username}/cars/${slug}`, {

                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                },

            })
            const data = await response.json()
            if (response.ok){
                console.log(data)
                setCarQrCode(data.qr_code)
                setCarBrand(data.car_brand)
                setCarModel(data.car_model)
            }
        }
    getCarQr().then(r => {})

    }, []);


    return (
        <div className='qrcode-template-div'>
            <div className='qrcode-above-text'>
                <h2>You can copy or print this template and place it on your car window .</h2>
            </div>
            <div className="qr-code-container">
                 <div className="qr-code-box">
                     <img
                         src={`${API_URL}/${carQrCode}`}
                         alt="QR Code"
                         className="qr-code-image"
                    />
                    <div className="qr-code-info">
                        <h2 className='website-logo-in-qr-box'>Rate My Buld QR</h2>
                        <h2 className="qr-code-title">Scan to rate this {carBrand.charAt(0).toUpperCase() + carBrand.slice(1)} {carModel}</h2>
                        <div className='unique-label-div'>
                            <p className="qr-code-subtitle">Unique Car QR Code</p>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    );
};


export default CarQrCode;