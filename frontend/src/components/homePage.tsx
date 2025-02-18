import React, {use, useEffect, useState} from 'react';
import '../assets/homePage.css';


const HomePage: React.FC = () => {

    return(
        <div>
            <header style={{textAlign: 'center', padding: '50px'}}>
                <h1>RateMyBuild</h1>
                <p>Rate, Share, and Discover Custom Car Builds</p>
                <button>Scan QR Code -- Coming Soon</button>
                <button>View Top Builds -- Coming Soon</button>
            </header>

            <section className='features-section'>
                <div className='feature-section-div'>
                    <h3>Scan QR Codes</h3>
                    <p>Use QR codes to find and rate awesome car builds.</p>
                </div>
                <div className='feature-section-div'>
                    <h3>Showcase Your Build</h3>
                    <p>Register your car, generate a QR code, and share it.</p>
                </div>
                <div className='feature-section-div'>
                    <h3>Top Rated Builds</h3>
                    <p>Check out the most popular cars voted by users.</p>
                </div>
            </section>
        </div>
    )
}

export default HomePage;