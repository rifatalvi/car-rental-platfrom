import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import { Car, Calendar, Briefcase } from 'lucide-react';

const BookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

    const {token} = await auth.api.getToken({
        headers : await headers()
    })
    if (!session?.user || !token) {
        redirect("/login")
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_MAIN_URL}/booking-cars/${user?.id}`, {
        cache: 'no-store',
        headers:{
            authorization:`Bearer ${token}`
        }
    });
    const bookings = await res.json();

    
    const getStatusStyles = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-green-50 text-green-700 border-green-200/60';
            case 'Canceled':
            case 'Rejected':
                return 'bg-red-50 text-red-700 border-red-200/60';
            default:
                return 'bg-amber-50 text-amber-700 border-amber-200/60';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl min-h-screen transition-all duration-300">
            
          
            <div className="mb-8 md:mb-10 border-b border-gray-100 pb-5 animate-[fadeIn_0.5s_ease-out]">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your profile info and track your vehicle rental history.</p>
            </div>

            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

               
                <div className="lg:col-span-1 animate-[slideInLeft_0.5s_ease-out]">
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm sticky top-6">
                        <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4">
                           
                            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 relative rounded-full overflow-hidden border-4 border-blue-50 bg-gray-50 shadow-inner shrink-0 group">
                                <Image
                                    fill
                                    src={user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                                    alt={user?.name || "User Profile"}
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                    
                            <div className="space-y-1 min-w-0 flex-1 lg:w-full">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">
                                    {user?.name || "Guest User"}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 truncate">
                                    {user?.email || "No email available"}
                                </p>
                            </div>
                        </div>

                   
                        <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 lg:grid-cols-1 gap-3 text-sm">
                            <div className="bg-gray-50/80 border border-gray-100/50 p-3 rounded-xl flex justify-between items-center transition-all hover:bg-gray-50">
                                <span className="text-gray-400 text-xs font-semibold uppercase">Total Bookings</span>
                                <span className="font-black text-gray-800 text-base">{bookings?.length || 0}</span>
                            </div>
                            <div className="bg-gray-50/80 border border-gray-100/50 p-3 rounded-xl flex justify-between items-center transition-all hover:bg-gray-50">
                                <span className="text-gray-400 text-xs font-semibold uppercase">Status</span>
                                <span className="font-bold text-green-600 text-xs bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">Active</span>
                            </div>
                        </div>
                    </div>
                </div>

              
                <div className="lg:col-span-3 space-y-4 animate-[fadeIn_0.6s_ease-out]">
                    {(!bookings || bookings.length === 0) ? (
                        <div className="text-center py-16 md:py-24 bg-white border border-dashed border-gray-200 rounded-2xl shadow-sm transform transition-all hover:scale-[1.005]">
                            <Car className="w-12 h-12 text-gray-300 mx-auto mb-3 animate-bounce" />
                            <p className="text-gray-500 text-base md:text-lg font-medium">You {"haven't"} booked any cars yet!</p>
                        </div>
                    ) : (
                        <>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                                {bookings.map((booking, idx) => {
                                    const formattedDate = booking.bookingDate || booking.bookingAt
                                        ? new Date(booking.bookingDate || booking.bookingAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                        : 'N/A';

                                    return (
                                        <div 
                                            key={booking._id} 
                                            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-all duration-300 animate-[fadeIn_0.3s_ease-out]"
                                            style={{ animationDelay: `${idx * 50}ms` }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                                                    <Image
                                                        fill
                                                        src={booking?.imageUrl || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                                                        alt={booking?.carName || "Car"}
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="font-bold text-gray-900 text-sm truncate">{booking?.carName || 'Unknown Vehicle'}</h4>
                                                    <span className="text-[10px] text-gray-400 block font-mono">ID: {booking?._id?.slice(-6)}</span>
                                                </div>
                                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusStyles(booking.status)}`}>
                                                    {booking.status || 'Pending'}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-50 text-xs text-gray-600">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                    <span>{formattedDate}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 justify-end">
                                                    <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                                                    <span>Driver: <strong>{booking.driverNeeded === 'Yes' ? 'Yes' : 'No'}</strong></span>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 p-2.5 rounded-xl flex justify-between items-center text-xs">
                                                <span className="text-gray-400 font-medium">Price per Day:</span>
                                                <span className="font-bold text-gray-900">${booking?.dailyRentPrice || 0}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                          
                            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                                                <th className="px-6 py-4">Car Details</th>
                                                <th className="px-6 py-4">Booking Date</th>
                                                <th className="px-6 py-4">Driver Needed</th>
                                                <th className="px-6 py-4">Daily Price</th>
                                                <th className="px-6 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                                            {bookings.map((booking, idx) => {
                                                const formattedDate = booking.bookingDate || booking.bookingAt
                                                    ? new Date(booking.bookingDate || booking.bookingAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                                    : 'N/A';

                                                return (
                                                    <tr 
                                                        key={booking._id} 
                                                        className="hover:bg-gray-50/40 transition-all duration-200 animate-[fadeIn_0.3s_ease-out]"
                                                        style={{ animationDelay: `${idx * 40}ms` }}
                                                    >
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-gray-50 border border-gray-200 flex-shrink-0 shadow-sm">
                                                                    <Image
                                                                        fill
                                                                        src={booking?.imageUrl || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                                                                        alt={booking?.carName || "Car"}
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <span className="font-semibold text-gray-900 block transition-colors hover:text-blue-600">
                                                                        {booking?.carName || 'Unknown Vehicle'}
                                                                    </span>
                                                                    <span className="text-[11px] text-gray-400 font-mono block">
                                                                        ID: {booking._id?.slice(-6)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600 font-medium">
                                                            {formattedDate}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                                                                booking.driverNeeded === 'Yes' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                                                            }`}>
                                                                {booking.driverNeeded === 'Yes' ? 'Yes' : 'No'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 font-bold text-gray-900">
                                                            ${booking?.dailyRentPrice || 0}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(booking.status)}`}>
                                                                {booking.status || 'Pending'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </div>

            
            
        </div>
    );
};

export default BookingPage;