import React, {useEffect, useState} from 'react';
import '../assets/carRateingPage.css';
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const CarRateingPage = () => {
    const {username, slug} = useParams()
    const [carInfo, setCarInfo] = useState([])
    const [userRating, setUserRating] = useState(0)
    const [userComment, setUserComment] = useState('')

    const navigate = useNavigate()

    const API_URL = "http://127.0.0.1:8000"

    useEffect(() => {
         const getCarQr = async() => {

            const response = await fetch(`${API_URL}/api/${username}/cars/${slug}/rate`, {

                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                },

            })

            const data = await response.json()
            if (response.ok){
                setCarInfo(data.car_info)
            }
        }

        getCarQr()

    }, []);


    const handleRatingSubmit = async() => {
        const response = await fetch(`${API_URL}/api/${username}/cars/${slug}/rate`, {

                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    "rating": userRating,
                    "comment": userComment
                })
            })
            if (response.ok){
                toast.success('Your rating has been submitted successfully! 🚗⭐ Thanks for your feedback!')
                navigate('/')
            }
            else{
                toast.error('Oops! Something went wrong while submitting your rating. Please try again later')

            }
        }


    return (
        <div className="rating-page-container">
            <div className="car-display-box">
                <img src={`${API_URL}/${carInfo.car_picture}`}  className="car-image"/>
            </div>
            <div className="car-info-box">
                <h2>{carInfo.car_brand} {carInfo.car_model}</h2>
                <p><strong>Year:</strong> {carInfo.car_year}</p>
                <p><strong>Description:</strong> {carInfo.car_description}</p>
            </div>
            <div className="rating-section">
                <h3>Rate {username.charAt(0).toUpperCase() + username.slice(1)}'s car</h3>
                <div className="star-rating">
                    {[...Array(5)].map((star, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`star ${index < userRating ? 'filled' : ''}`}
                            onClick={() => setUserRating(index + 1)}
                        >
                            ★
                        </button>

                    ))}
                </div>
                <div className='rating-textarea-div'>
                    <textarea
                        placeholder="Leave your comment here..."
                        className="comment-box"
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                    />
                </div>
                <div className='rateing-page-submit-button-div'>
                    <button className="submit-button" onClick={handleRatingSubmit}>Submit Rating</button>

                </div>
            </div>
        </div>

    );
};


export default CarRateingPage;