
import BookingButton from '@/component/BookingButton'; 
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';

const CarDetailsPage = async ({ params }) => {
    const { id } = await params;
    const {token} = await auth.api.getToken({
        headers : await headers(),
    });
    

    const res = await fetch(`http://localhost:5000/cars/${id}`,{
        headers:{
            authorization : `Bearer ${token}` || ""
        }
    });
    const car = await res.json();

    if (!car) {
        return <div className="text-center py-20 text-xl font-semibold text-gray-600">Car not found!</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row gap-8 p-6 md:p-8">
                
               
                <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden bg-gray-50">
                    <Image

                    width={300}
                    height={300} 
                        src={car?.carImage || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"} 
                        alt={car?.carName}
                        className="w-full h-full object-cover"
                    />
                </div>

            
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold uppercase tracking-wider">
                            {car?.carType || 'Premium'}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
                            {car?.carName}
                        </h1>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {car?.description || "Experience the ultimate comfort and performance with this vehicle. Perfect for family trips, business travels, or weekend getaways."}
                        </p>

                    
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="block text-xs text-gray-400 uppercase font-medium">Daily Price</span>
                                <span className="text-xl font-bold text-blue-600">${car?.dailyRentPrice}/day</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="block text-xs text-gray-400 uppercase font-medium">Availability</span>
                                <span className={`text-md font-semibold ${car?.availabilityStatus === 'Available' ? 'text-green-600' : 'text-red-500'}`}>
                                    {car?.availabilityStatus || 'Available'}
                                </span>
                            </div>
                        </div>
                    </div>

                    
                    <BookingButton car={car} id={id} />
                </div>
            </div>
        </div>
    );
};

export default CarDetailsPage;