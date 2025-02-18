import React, {use, useEffect, useState} from 'react';
import '../assets/homePage.css';


const HomePage: React.FC = () => {

    return(
        <div>
            <header style={{textAlign: 'center', padding: '50px'}}>
                <h1 style={{color: '#5865F2;'}}>RateMyBuild</h1>
                <p>Rate, Share, and Discover Custom Car Builds</p>
                <button style={{color: 'white'}}>Scan QR Code -- Coming Soon</button>
                <button style={{color: 'white'}}>View Top Builds -- Coming Soon</button>
            </header>

            <section className='features-section'>
                <div className='feature-section-div'>
                    <h3 style={{color: '#36393F'}}>Scan QR Codes</h3>
                    <p style={{color: '#36393F'}}>Use QR codes to find and rate awesome car builds.</p>
                </div>
                <div className='feature-section-div'>
                    <h3 style={{color: '#36393F'}}>Showcase Your Build</h3>
                    <p style={{color: '#36393F'}}>Register your car, generate a QR code, and share it.</p>
                </div>
                <div className='feature-section-div'>
                    <h3 style={{color: '#36393F'}}>Top Rated Builds</h3>
                    <p style={{color: '#36393F'}}>Check out the most popular cars voted by users.</p>
                </div>
            </section>
        </div>
    )
}

export default HomePage;