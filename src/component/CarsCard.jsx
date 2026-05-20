import Image from 'next/image';
import React from 'react';

const CarsCard = ({ car }) => {
    // ড্যাটা ডি-স্ট্রাকচারিং (ডাটাবেজের ফিল্ডের সাথে মিলিয়ে নিবেন)
    const { 
        _id,
        carName, 
        dailyRentPrice, 
        carType, 
        imageUrl, 
        seatCapacity, 
        pickupLocation, 
        availabilityStatus 
    } = car || {};

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
          
            <div className="relative h-48 w-full bg-gray-100">
                <Image
                    src={imageUrl || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"} 
                    alt={carName} 
                    className="w-full h-full object-cover"
                    width={300}
                    height={400}
                />
                <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
                    availabilityStatus === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {availabilityStatus || 'Available'}
                </span>
            </div>

          
            <div className="p-5 flex flex-col flex-grow">
                
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
                    {carType || 'Sedan'}
                </span>

                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {carName || 'Premium Car Model'}
                </h3>

                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="line-clamp-1">{pickupLocation || 'Not Specified'}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-b border-gray-100 py-3 mb-5 mt-auto">
                    <div>
                        <p className="text-xs text-gray-400">Capacity</p>
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                            👥 {seatCapacity || 4} Seats
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Daily Rent</p>
                        <p className="text-base font-bold text-blue-600">
                            ${dailyRentPrice || 0}/<span className="text-xs font-normal text-gray-500">day</span>
                        </p>
                    </div>
                </div>

               
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-center mt-auto text-sm">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default CarsCard;