import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { MapPin, Users, DollarSign, Tag, Info } from "lucide-react";
import UpdateCarModal from "@/component/UpdateCarModal";
import DeleteCarButton from "@/component/DeleteCarButton";

const MyAddedCars = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const id = session?.user?.id;
         
          const {token} = await auth.api.getToken({
        headers : await headers()
    })   
            
            
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_MAIN_URL}/my-added-cars/${id}`, {
        cache: 'no-store',
          authorization: `Bearer ${token}` || ""
    });
    const addedCars = await res.json();

    const isValidUrl = (url) => {
        if (!url || typeof url !== "string") return false;
        const trimmed = url.trim();
        return trimmed.startsWith("http://") || trimmed.startsWith("https://");
    };

    const defaultFallbackImage = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";

    return (
        <div className="max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        
            <div className="mb-10 border-b border-gray-100 pb-5">
                <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                    My Managed Vehicles
                </h1>
                <p className="text-gray-500 mt-1">
                    Review operations, adjust commercial pricing, or terminate active fleet listings.
                </p>
            </div>

            {addedCars.length === 0 ? (
                <div className="text-center py-24 bg-white border-2 border-dashed border-gray-200 rounded-3xl max-w-xl mx-auto">
                    <Info className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-lg font-medium">You {"haven't"} added any vehicles to the fleet yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {addedCars.map((car) => {
                        
                        const cleanImgUrl = car.imageUrl?.trim();
                        const finalImageSrc = isValidUrl(cleanImgUrl) ? cleanImgUrl : defaultFallbackImage;

                        return (
                            <div 
                                key={car._id} 
                                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div className="relative h-48 w-full bg-gray-50 overflow-hidden">
                                    <Image
                                        fill
                                        src={finalImageSrc || ""}
                                        alt={car.carModel || "car image"}
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        unoptimized
                                    />
                                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                                        car.isAvailable 
                                            ? 'bg-green-500/90 text-white' 
                                            : 'bg-red-500/90 text-white'
                                    }`}>
                                        {car.isAvailable ? 'Available' : 'Unavailable'}
                                    </span>
                                </div>

                                <div className="p-5 flex-1 space-y-4">
                                    <div>
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-md text-xs font-bold uppercase tracking-wide mb-2">
                                            <Tag className="w-3 h-3" /> {car.carType || 'Sedan'}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{car.carModel}</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-gray-600 border-t border-gray-50">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span className="truncate" title={car.pickupLocation}>{car.pickupLocation}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 justify-end">
                                            <Users className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span>{car.seatCapacity} Seats</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 pt-1">
                                        {car.description || "No specific configuration roadmap provided for this asset container."}
                                    </p>
                                </div>

                                <div className="px-5 pb-5 pt-3 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between gap-4">
                                    <div className="flex items-baseline text-gray-900">
                                        <span className="text-xl font-black text-blue-600">${car.dailyPrice}</span>
                                        <span className="text-xs font-medium text-gray-400">/day</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <UpdateCarModal car={car} />
                                        <DeleteCarButton carId={car._id} carModel={car.carModel} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyAddedCars;