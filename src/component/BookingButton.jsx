'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BookingButton = ({ car, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        
        const bookingData = {
            carId: car?._id, 
            driverNeeded: formData.get('driverNeeded'), 
            specialNote: formData.get('specialNote'), 
            status: 'Pending'
        };

        try {
           
            const res = await fetch(`http://localhost:5000/booking-cars/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            const data = await res.json();
            
            
            if (data.acknowledged || data.insertedId) {
                toast.success('🎉 Booking Confirmed Successfully!');
                setIsOpen(false);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Failed to connect to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                disabled={car?.availability === 'Unavailable'}
                className={`w-full py-4 text-center text-white font-bold rounded-xl transition-all shadow-md ${
                    car?.availability === 'Unavailable' 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5'
                }`}
            >
                {car?.availability === 'Unavailable' ? 'Not Available for Booking' : 'Book Now'}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 relative">
                        
                        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900">Booking Details</h3>
                            <button 
                                type="button"
                                onClick={() => setIsOpen(false)} 
                                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleBookingSubmit} className="space-y-5 mt-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Driver Needed
                                </label>
                                <select 
                                    name="driverNeeded" 
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Special Note
                                </label>
                                <textarea 
                                    name="specialNote" 
                                    rows={4}
                                    placeholder="Enter your special requirements here..." 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
                                />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <button 
                                    type="button" 
                                    onClick={() => setIsOpen(false)} 
                                    className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl disabled:bg-blue-400 shadow-md transition-colors"
                                >
                                    {loading ? 'Processing...' : 'Book Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingButton;