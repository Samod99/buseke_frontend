import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
    return (
        <div className="relative bg-cover bg-center h-[75vh]" style={{ backgroundImage: `url('https://img-mm.manoramaonline.com/content/dam/mm/mo/travel/travel-kerala/images/2021/10/12/Chalakudy-to-Malakkappara.jpg/photos/16x9/photo.jpg')` }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black-900 bg-opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    Welcome to Our Website
                </h1>
                <p className="text-xl md:text-2xl mb-6">
                    
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                    <Link to="/timetable" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg rounded shadow-md transition-all">
                        View Timetable
                    </Link>
                    <Link to="/reservation" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium text-lg rounded shadow-md transition-all">
                        Make a Booking
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
