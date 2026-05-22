import React from "react";
import Link from "next/link";
import Image from "next/image";
import { feature } from "@/lib/Carsfetch";
import { Button, Card } from "@heroui/react";
import { ArrowRight, Users, Fuel } from "lucide-react";
import CarsCard from "./CarsCard";


const FeaturCars = async () => {
  
  
  const featuredCars = await feature() || [];
 console.log(featuredCars);
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-transparent">
      
     
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Premium Fleets
          </span>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">
            Featured Vehicles
          </h2>
          <p className="text-gray-500 text-sm font-medium max-w-md">
            Explore our top-rated luxury and operational fleet ready for your next immediate rental booking.
          </p>
        </div>

       
        <Link href="/explore-cars" className="hidden sm:inline-block">
          <Button
            variant="light"
            className="flex items-center gap-2 font-bold text-sm text-blue-600 hover:bg-blue-50 px-4 h-11 rounded-xl transition active:scale-95"
          >
            <span>View All Cars</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </Button>
        </Link>
      </div>

    
      {featuredCars.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 shadow-sm text-gray-400 font-medium text-sm">
          No featured cars available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarsCard car={car} key={car?._id} ></CarsCard>
          ))}
        </div>
      )}

     
      <div className="flex sm:hidden justify-center mt-8">
        <Link href="/explore-cars" className="w-full max-w-xs">
          <Button
            className="w-full bg-white border-2 border-gray-100 text-blue-600 font-bold text-sm h-12 rounded-xl flex items-center justify-center gap-2 shadow-sm"
          >
            <span>View All Fleet Cars</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </Button>
        </Link>
      </div>

    </section>
  );
};

export default FeaturCars;