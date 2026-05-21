import BookingButton from '@/component/BookingButton'; 
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import { MapPin, Users, Calendar, Mail, CheckCircle2, Star, Tag } from 'lucide-react';

const CarDetailsPage = async ({ params }) => {
    const { id } = await params;
    const { token } = await auth.api.getToken({
        headers: await headers(),
    });
    
  
    const res = await fetch(`http://localhost:5000/cars/${id}`, {
        headers: {
            authorization: `Bearer ${token}` || ""
        },
        cache: 'no-store' 
    });
    const car = await res.json();

    if (!car) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">Car not found!</div>
                <p className="text-gray-500">The vehicle you are looking for is currently unavailable.</p>
            </div>
        );
    }

    
    const formattedDate = car?.createdAt 
        ? new Date(car.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'N/A';

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                
               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10">
                    
                  
                    <div className="flex flex-col space-y-4">
                        <div className="relative h-[320px] sm:h-[400px] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-inner group">
                            <Image
                                width={600}
                                height={450} 
                                src={car?.imageUrl || car?.carImage || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"} 
                                alt={car?.carName || "Car Image"}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                            
                            
                            <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-sm ${
                                car?.availabilityStatus === 'Available' 
                                    ? 'bg-green-500/90 text-white' 
                                    : 'bg-red-500/90 text-white'
                            }`}>
                                {car?.availabilityStatus || 'Available'}
                            </span>
                        </div>
                        
                       
                        <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 space-y-2 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span><strong className="text-gray-700">Owner:</strong> {car?.ownerEmail}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span><strong className="text-gray-700">Listed on:</strong> {formattedDate}</span>
                            </div>
                        </div>
                    </div>

                   
                    <div className="flex flex-col justify-between space-y-6">
                        <div>
                          
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold uppercase tracking-wider border border-blue-100">
                                    <Tag className="w-3 h-3" />
                                    {car?.carType || 'Sedan'}
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-semibold border border-amber-100">
                                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                    Booked {car?.bookingCount || 0} Customers
                                </span>
                            </div>

                            {/* কার নাম */}
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                                {car?.carName}
                            </h1>

                          
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50/40 border border-blue-100/60 rounded-2xl p-4 mb-5">
                                <div className="text-xs text-blue-600/80 font-bold uppercase tracking-wider mb-0.5">Daily Rent Rate</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-blue-600">${car?.dailyRentPrice}</span>
                                    <span className="text-sm font-medium text-gray-500">/ day</span>
                                </div>
                            </div>

                            
                            <div className="mb-6">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {car?.description || "No description provided for this vehicle."}
                                </p>
                            </div>

                           
                            <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 border border-gray-100">
                                        <Users className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wide">Capacity</span>
                                        <span className="text-sm font-bold text-gray-800">{car?.seatCapacity} Seats</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 border border-gray-100">
                                        <MapPin className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wide">Pickup Location</span>
                                        <span className="text-sm font-bold text-gray-800 truncate block max-w-[150px] sm:max-w-[200px]" title={car?.pickupLocation}>
                                            {car?.pickupLocation}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            
                            {car?.features && car.features.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Key Features</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {car.features.map((feature, index) => (
                                            <div 
                                                key={index} 
                                                className="flex items-center gap-2 text-xs font-medium text-gray-700 bg-gray-50/60 border border-gray-200/50 p-2.5 rounded-xl"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                                <span className="truncate">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <BookingButton car={car} id={id} />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default CarDetailsPage;