import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CarsCard = ({ car }) => {
    const {
        _id,
        carName,
        carModel, // ডাটাবেজে carModel নাম থাকলে সেটিও ব্যাকআপ হিসেবে রাখা হলো
        dailyRentPrice,
        dailyPrice,     // ডাটাবেজে dailyPrice থাকলে সেটিও ব্যাকআপ
        carType,
        imageUrl,
        seatCapacity,
        pickupLocation,
        availabilityStatus,
        isAvailable    
    } = car || {};

   
    const cleanImageUrl = imageUrl?.trim() || "https://images.unsplash.com/photo-1503376780353-7e6692767b70";

   
    let displayStatus = "Available";
    let isCarAvailable = true;

    if (availabilityStatus) {
        displayStatus = availabilityStatus;
        isCarAvailable = availabilityStatus === 'Available';
    } else if (typeof isAvailable === 'boolean') {
        displayStatus = isAvailable ? 'Available' : 'Unavailable';
        isCarAvailable = isAvailable;
    } else if (typeof isAvailable === 'string') {
        displayStatus = isAvailable;
        isCarAvailable = isAvailable.toLowerCase() === 'available' || isAvailable.toLowerCase() === 'true';
    }

    const rentPrice = dailyRentPrice || dailyPrice || 0;

    const displayName = carName || carModel || 'Premium Car Model';

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            {/* Image Section */}
            <div className="relative h-48 w-full bg-gray-100">
                <Image
                    width={300}
                    height={400}
                    src={imageUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    unoptimized 
                />
                <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
                    isCarAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {displayStatus}
                </span>
            </div>

            {/* Details Section */}
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
                    {carType || 'Sedan'}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {displayName}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="line-clamp-1">{pickupLocation?.trim() || 'Not Specified'}</span>
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
                            ${rentPrice}/<span className="text-xs font-normal text-gray-500">day</span>
                        </p>
                    </div>
                </div>

                <Link href={`/explore-cars/${_id}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-center mt-auto text-sm">
                    View Details
                </Link>
            </div>
        </div>
);
};

export default CarsCard;