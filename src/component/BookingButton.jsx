'use client';

import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Car, AlertCircle } from 'lucide-react';
import Image from 'next/image';


const BookingButton = ({ car, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const { data: tokenData } = await authClient.token()


            if (!user) {
                toast.error('Please login first to book a car!');
                setLoading(false);
                return;
            }

            const formData = new FormData(e.target);


            const bookingData = {


                name: user?.name,
                email: user?.email,
                userId: user?.id,



                carId: car?._id,
                carName: car?.carName,
                imageUrl: car?.imageUrl || "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
                dailyRentPrice: car?.dailyRentPrice,
                pickupLocation: car?.pickupLocation,


                driverNeeded: formData.get('driverNeeded'),
                specialNote: formData.get('specialNote') || "",
                status: 'Pending',
                bookingDate: new Date().toISOString()
            };


            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_MAIN_URL}/booking-cars/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',

                    authorization: `Bearer ${tokenData.token}`,

                },
                body: JSON.stringify(bookingData),
            });

            const data = await res.json();

            if (data.acknowledged || data.insertedId || res.ok) {
                toast.success('🎉 Booking Confirmed Successfully!');
                setIsOpen(false);
            } else {
                toast.error(data?.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {

            toast.error('Failed to connect to server.');
        } finally {
            setLoading(false);
        }
    };


    const isUnavailable = car?.availabilityStatus === 'Unavailable';

    return (
        <>

            <button
                onClick={() => setIsOpen(true)}
                disabled={isUnavailable}
                className={`w-full py-4 text-center text-white font-bold rounded-xl transition-all shadow-md ${isUnavailable
                        ? 'bg-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 active:translate-y-0'
                    }`}
            >
                {isUnavailable ? 'Not Available for Booking' : 'Book Now'}
            </button>


            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">


                        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5 text-blue-600" />
                                <h3 className="text-xl font-bold text-gray-900">Confirm Booking</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl font-semibold transition-colors"
                            >
                                &times;
                            </button>
                        </div>


                        <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                            <Image
                                width={300}
                                height={300}
                                src={car?.imageUrl || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                                alt={car?.carName}
                                className="w-16 h-12 object-cover rounded-lg border bg-white"
                            />
                            <div>
                                <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{car?.carName}</h4>
                                <p className="text-xs text-blue-600 font-semibold">${car?.dailyRentPrice} / day</p>
                            </div>
                        </div>


                        <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">


                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Driver Requirement
                                </label>
                                <select
                                    name="driverNeeded"
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-sm text-sm transition-all"
                                >
                                    <option value="No">No, I will drive myself</option>
                                    <option value="Yes">Yes, I need a driver</option>
                                </select>
                            </div>


                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Special Instructions / Notes
                                </label>
                                <textarea
                                    name="specialNote"
                                    rows={3}
                                    placeholder="Any preferences (e.g., child seat, early pickup time)..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none shadow-sm text-sm transition-all"
                                />
                            </div>


                            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl text-[11px] text-amber-800 border border-amber-100/50">
                                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <span>By confirming, your account session info (Name & Email) will be attached as the renter profile for this vehicle.</span>
                            </div>


                            <div className="flex gap-3 pt-3 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <span className="inline-block animate-pulse">Processing...</span>
                                    ) : (
                                        'Confirm Rent'
                                    )}
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