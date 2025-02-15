import React, {useEffect, useState} from 'react';
import '../assets/login_register.css';
import '../assets/userCars.css'
import {useNavigate} from "react-router-dom";



const PostCar: React.FC = () => {
    const [username, setUsername] = useState('')
    const [userToken, setUserToken] = useState('')

    const [message, setMessage] = useState('')
    const [showForm, setShowForm] = useState(false);
    const [showCars, setShowCars] = useState(true)
    const [userCars, setUserCars] = useState([])

    const [carBrand, setCarBrand] = useState('')
    const [carModel, setCarModel] = useState('')
    const [carYear, setCarYear] = useState('')
    const [carDescription, setCarDescription] = useState('')
    const [carPicture, setCarPicture] = useState(null)

    const navigate = useNavigate()

    const API_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.ratemybuildqr.com';

    const toggleForm = () => {
        setShowForm(!showForm);
        setShowCars(!showCars)
    };

    const checkUserIsAuth = (userToken) => {
        if (!userToken) {
            navigate('/login')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username')

        checkUserIsAuth(token)

        const getUserCars = async () => {


            if (token && username) {
                const response = await fetch(`${API_URL}/api/${username}/cars`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                });

                const data = await response.json();
                setUsername(username)
                setUserToken(token)

                if (response.ok) {
                    if (data.user_cars.length !== 0){
                        setUserCars(data.user_cars)
                        setMessage(`There are currently ${data.user_cars.length} cars in your profile. `)
                    }else{
                        setMessage('There is a problem retrieving your cars, we will be back soon.')
                    }

                } else {

                }
            }
        };

        getUserCars().then(r => {});

    }, []);



    const handleCarPosting = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('car_brand', carBrand);
        formData.append('car_model', carModel);
        formData.append('car_year', carYear);
        formData.append('car_description', carDescription);
        formData.append('car_picture', carPicture);


        try {
            const response = await fetch(`${API_URL}/api/${username}/cars`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${userToken}`,
                },
                body: formData,
            });

            if (response.ok) {

            } else {
                console.error('Failed to post car:', response.statusText);

            }
        } catch (error) {
            console.error('Error posting car:', error);
        }
};


    return (
        <div className="car-form-container">
            <h1 className="form-message">{message}</h1>

            <div className='add-car-div'>
                <button className="toggle-button" onClick={toggleForm}>
                    {showForm ? 'Cancel' : 'Add a New Car'}
                </button>
            </div>


            {showForm && (
                <div className='main-div-car-form'>
                    <form className="car-form">
                        <div className='car-form-labels-div'>
                            <label className="form-label">
                                Car Brand:
                                <input className="form-input" type="text" name="car_brand" onChange={(e) => setCarBrand(e.target.value)}/>
                            </label>
                        </div>

                        <div className='car-form-labels-div'>
                            <label className="form-label">
                                Car Model:
                                <input className="form-input" type="text" name="car_model" onChange={(e) => setCarModel(e.target.value)}/>
                            </label>
                        </div>
                        <div className='car-form-labels-div'>
                            <label className="form-label">
                                Car Year:
                                <input className="form-input" type="number" name="car_year" onChange={(e) => setCarYear(e.target.value)}/>
                            </label>
                        </div>
                        <div className='car-form-labels-div'>
                            <label className="form-label-textarea">
                                Car Description:
                                <textarea className="form-textarea" name="car_description" onChange={(e) => setCarDescription(e.target.value)}></textarea>
                            </label>
                        </div>
                        <div>
                            <div className='car-form-labels-div'>
                                <label className="form-label">
                                    Car Picture:
                                    <input className="form-input" type="file" name="car_picture" onChange={(e) => setCarPicture(e.target.files[0])}/>
                                </label>
                            </div>
                        </div>

                        <button className="submit-button" type="submit" onClick={handleCarPosting}>Post Car</button>
                    </form>
                </div>
            )}

            <div className='cars-div'>
                {showCars && (
                <>
                    <div className='your-cars-div'>
                        <h1>Your Cars</h1>
                    </div>

                    {userCars.length > 0 ? (
                        <ul className='cars-ul'>
                            {userCars.map((car) => (
                                <div className="car-box">
                                    <a href={`/${username}/cars/${car.slug}`}>
                                        <img src={`http://localhost:8000${car.car_picture}`}
                                                     alt={`${car.car_brand} ${car.car_model}`}
                                                     className="car-image"/>
                                    </a>

                                    <div className="car-info">
                                        <h1>{car.car_brand} {car.car_model}</h1>
                                        <p>Year: {car.car_year}</p>
                                        {/*<p>{car.car_description}</p>*/}
                                        <div className='car-info-rating-score-div'>
                                            <div className='car-info-rating-div'>
                                                <p>Rating Score</p>
                                                <p>{car.rating_score} / 5</p>
                                            </div>

                                        </div>

                                    </div>


                                </div>
                            ))}
                        </ul>

                    ) : (
                        <p>No cars available.</p>
                    )}
                </>
                )}
            </div>

        </div>
    );
};

export default PostCar;