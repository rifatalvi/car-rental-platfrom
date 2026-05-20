import { fetchSingleCars } from "@/lib/Carsfetch";
import Image from "next/image";
import React from 'react';

const CarsDetailPage = async ({ params }) => {
    
    const { id } = await params;
    const car = await fetchSingleCars(id);
    console.log(car);

    const {
        carName ,
        dailyRentPrice ,
        carType ,
        imageUrl,
        seatCapacity ,
        pickupLocation ,
        availabilityStatus ,
        description,
        features ,
        fuelType ,
        year
    } = car || {};

    return (
        <div className="min-h-screen bg-gray-50 py-10 transition-colors duration-500">
            <div className="container mx-auto px-4 max-w-6xl">
                
               
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden p-4 md:p-8 transition-all duration-500 ease-out transform animate-in fade-in slide-in-from-bottom-5 duration-700">
                    
                    
                    <div className="lg:col-span-7 space-y-4">
                      
                        <div className="relative h-[300px] md:h-[450px] w-full rounded-xl overflow-hidden bg-gray-100 shadow-inner group">
                            <Image
                                src={imageUrl} 
                                alt={carName} 
                                fill 
                                priority 
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 55vw, 650px"
                                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
                            />
                          
                            <span className={`absolute top-4 left-4 text-sm font-semibold px-3 py-1.5 rounded-full shadow-md z-10 animate-pulse ${
                                availabilityStatus === 'Available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}>
                                {availabilityStatus}
                            </span>
                        </div>
                    </div>

                    
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                        <div>
                            
                           
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md transition-all hover:bg-blue-100">
                                    {carType}
                                </span>
                                {year && (
                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md transition-all hover:bg-gray-200">
                                        Model: {year}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight transition-colors hover:text-blue-600 duration-300">
                                {carName}
                            </h1>

                          
                            <div className="flex items-center text-gray-600 mb-6 group cursor-pointer w-fit">
                                <svg className="w-5 h-5 mr-1.5 text-blue-500 transition-transform group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm font-medium transition-colors group-hover:text-gray-900">{pickupLocation}</span>
                            </div>

                           
                            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50">
                                <p className="text-sm text-gray-500 mb-1">Daily Rental Price</p>
                                <p className="text-3xl font-black text-blue-600 tracking-tight">
                                    ${dailyRentPrice} <span className="text-sm font-normal text-gray-500">/ per day</span>
                                </p>
                            </div>

                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Specifications</h3>
                            
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5">
                                    <p className="text-xs text-gray-400">Seat Capacity</p>
                                    <p className="text-sm font-bold text-gray-700 mt-0.5">👥 {seatCapacity} Person</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5">
                                    <p className="text-xs text-gray-400">Fuel Type</p>
                                    <p className="text-sm font-bold text-gray-700 mt-0.5">⛽ {fuelType}</p>
                                </div>
                            </div>

                            {description && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Description</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {description}
                                    </p>
                                </div>
                            )}

                            {features && features.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Key Features</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {features.map((feature, index) => (
                                            <span 
                                                key={index} 
                                                className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-transparent hover:scale-105 cursor-default"
                                            >
                                                ✨ {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                       
                        <div className="pt-4 border-t border-gray-100">
                            <button 
                                disabled={availabilityStatus === 'Unavailable'}
                                className={`w-full py-4 px-6 rounded-xl text-white font-semibold shadow-md text-center text-base transform transition-all duration-300 ${
                                    availabilityStatus === 'Unavailable' 
                                    ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98]'
                                }`}
                            >
                                {availabilityStatus === 'Unavailable' ? 'Not Available for Booking' : 'Book This Car Now'}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CarsDetailPage;