import React, {useEffect, useState} from 'react';
import '../assets/login_register.css';
import '../assets/userCars.css'
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


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

    const API_URL = "http://127.0.0.1:8000"

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
                        setMessage(`Your garage has ${data.user_cars.length} car(s)! Add more to showcase your collection.`)
                    }else{
                        setMessage('Looks like your garage is empty! Upload your first car now. 🚗')
                    }

                } else {
                    setMessage('We’re experiencing an issue retrieving your cars. Please try again later.')
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
            const data = await response.json()

            if (response.ok) {
                toggleForm()
                window.location.reload()
                toast.success('Your car is now posted. Share your unique QR code to show it off!')

            } else {

                Object.entries(data).forEach(([field, messages]) => {
                    if (Array.isArray(messages)) {
                        messages.forEach((msg) => {
                            toast.error(`${field.replace("_", " ")}: ${msg}`);
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Error posting car:');
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
                                <input className="form-input" type="text" name="car_brand"
                                       onChange={(e) => setCarBrand(e.target.value)}/>
                            </label>
                        </div>

                        <div className='car-form-labels-div'>
                            <label className="form-label">
                                Car Model:
                                <input className="form-input" type="text" name="car_model"
                                       onChange={(e) => setCarModel(e.target.value)}/>
                            </label>
                        </div>
                        <div className='car-form-labels-div'>
                            <label className="form-label">
                                Car Year:
                                <input className="form-input" type="number" name="car_year"
                                       onChange={(e) => setCarYear(e.target.value)}/>
                            </label>
                        </div>
                        <div className='car-form-labels-div'>
                            <label className="form-label-textarea">
                                Car Description:
                                <textarea className="form-textarea" name="car_description"
                                          onChange={(e) => setCarDescription(e.target.value)}></textarea>
                            </label>
                        </div>
                        <div>
                            <div className='car-form-labels-div'>
                                <label className="form-label">
                                    Car Picture:
                                    <input className="form-input" type="file" name="car_picture"
                                           onChange={(e) => setCarPicture(e.target.files[0])}/>
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
                            <h1 >Your Cars</h1>
                        </div>

                        {userCars.length > 0 ? (
                            <ul className='cars-ul'>
                                {userCars.map((car) => (
                                    <div className="car-box">
                                        <a href={`/${username}/cars/${car.slug}`}>
                                            <img src={`${API_URL}/${car.car_picture}`}
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