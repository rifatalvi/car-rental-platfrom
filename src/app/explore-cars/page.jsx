import CarsCard from '@/component/CarsCard';
import React from 'react';

const CAR_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Truck', 'Electric'];


const CarsPage = async ({ searchParams }) => {
    
    const params = await searchParams;
    const searchQuery = params?.search || '';
    const typeFilter = params?.type || '';

  
    const res = await fetch(
        `http://localhost:5000/cars?search=${searchQuery}&type=${typeFilter}`, 
        { cache: 'no-store' }
    );
    const data = await res.json();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Explore Available Cars
            </h1>

            
            <form method="GET" className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
                <input
                    type="text"
                    name="search"
                    defaultValue={searchQuery}
                    placeholder="Search by car name..."
                    className="w-full md:w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
                
                <select
                    name="type"
                    defaultValue={typeFilter}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
                >
                    <option value="">All Types</option>
                    {CAR_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Apply
                </button>
            </form>
            
           
            {data?.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-8">No cars found matching your criteria.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.map((car) => (
                        <CarsCard key={car?._id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CarsPage;