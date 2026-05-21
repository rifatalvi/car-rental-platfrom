import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const BookingPage = async () => {
   const session = await auth.api.getSession({
    headers: await headers(),
  });
    const user = session?.user;


  const res = await fetch(`http://localhost:5000/userBooking/${user?.id}`);
  const bookings = await res.json();
  console.log(bookings);

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl min-h-screen">


            <div className="mb-10 border-b border-gray-100 pb-5">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage your profile info and track your vehicle rental history.</p>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">


                <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-6 text-center lg:text-left">
                        <div className="flex flex-col items-center lg:items-start gap-4">

                            <div className="w-24 h-24 relative rounded-full overflow-hidden border-4 border-blue-50 bg-gray-50 shadow-inner">
                                <Image
                                    width={300}
                                    height={300}
                                    src={user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                                    alt={user?.name || "User Profile"}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="space-y-1 w-full">
                                <h3 className="text-xl font-bold text-gray-900 truncate">
                                    {user?.name || "Guest User"}
                                </h3>
                                <p className="text-sm text-gray-500 truncate">
                                    {user?.email || "No email available"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 lg:grid-cols-1 gap-3 text-sm">
                            <div className="bg-gray-50 p-3 rounded-xl lg:flex lg:justify-between lg:items-center">
                                <span className="text-gray-400 block lg:inline text-xs font-semibold uppercase">Total Bookings</span>
                                <span className="font-bold text-gray-800 text-base">{bookings.length}</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl lg:flex lg:justify-between lg:items-center">
                                <span className="text-gray-400 block lg:inline text-xs font-semibold uppercase">Account Status</span>
                                <span className="font-semibold text-green-600 text-xs bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">Active</span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="lg:col-span-3">
                    {bookings.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-2xl shadow-sm">
                            <p className="text-gray-500 text-lg font-medium">You haven't booked any cars yet!</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                                            <th className="px-6 py-4">Car Details</th>
                                            <th className="px-6 py-4">Booking Date</th>
                                            <th className="px-6 py-4">Driver Needed</th>
                                            <th className="px-6 py-4">Total Price</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                                        {bookings.map((booking) => {
                                            const car = booking?.carDetails;

                                            const formattedDate = booking.bookingAt
                                                ? new Date(booking.bookingAt).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'short', day: 'numeric'
                                                })
                                                : 'N/A';

                                            return (
                                                <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">

                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                                                                <Image
                                                                    width={300}
                                                                    height={300}
                                                                    src={car?.carImage || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                                                                    alt={car?.carName || "Car"}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <span className="font-semibold text-gray-900 block">
                                                                    {car?.carName || 'Unknown Vehicle'}
                                                                </span>
                                                                <span className="text-xs text-gray-400 font-mono">
                                                                    ID: {booking.carId?.slice(-6)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>


                                                    <td className="px-6 py-4 text-gray-600 font-medium">
                                                        {formattedDate}
                                                    </td>


                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${booking.driverNeeded === 'Yes'
                                                                ? 'bg-blue-50 text-blue-600'
                                                                : 'bg-gray-100 text-gray-600'
                                                            }`}>
                                                            {booking.driverNeeded === 'Yes' ? 'Yes' : 'No'}
                                                        </span>
                                                    </td>


                                                    <td className="px-6 py-4 font-bold text-gray-900">
                                                        ${car?.dailyPrice || car?.price || 0}
                                                    </td>


                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${booking.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                                booking.status === 'Confirmed' ? 'bg-green-50 text-green-600 border border-green-100' :
                                                                    'bg-red-50 text-red-600 border border-red-100'
                                                            }`}>
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
                    )}
                </div>

            </div>
        </div>
    );
};

export default BookingPage;