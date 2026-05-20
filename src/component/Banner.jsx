"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from "lucide-react";

// Swiper core components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Swiper pure CSS styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Drive The Luxury Without Limits",
      description: "Experience the ultimate freedom of premium mobility. Rent high-end sports cars or elegant electric vehicles with instantaneous scheduling.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
      tag: "Premium Collection"
    },
    {
      id: 2,
      title: "Your Journey Deserves The Best",
      description: "From rugged luxury SUVs to sleek corporate sedans, find the perfect match for your next destination with DriveFleet.",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200",
      tag: "Unlimited Miles"
    },
    {
      id: 3,
      title: "Future of Mobility is Here",
      description: "Explore our latest fleet of high-performance electric vehicles. Sustainable, fast, and incredibly comfortable.",
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200",
      tag: "Electric Fleet"
    }
  ];

  return (
    <section className="relative w-full h-[550px] lg:h-[700px] overflow-hidden bg-gray-900">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={'fade'}
        speed={800}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full custom-banner-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              
              {/* Pure Tailwind Background Image Setup with Dark Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Modern gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/50 to-transparent"></div>
              </div>

              {/* Pure Tailwind Content Grid */}
              <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-2xl space-y-6">
                  
                  {/* Custom Tailwind Chip/Tag */}
                  <div className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
                    <Sparkles size={14} className="animate-pulse" />
                    <span>{slide.tag}</span>
                  </div>
                  
                  {/* Heading with highlighted words */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                    {slide.title.split(' ').map((word, i) => (
                      <span key={i} className={i >= 2 && i <= 3 ? "text-blue-500" : ""}>
                        {word}{' '}
                      </span>
                    ))}
                  </h1>

                  {/* Description */}
                  <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  {/* Explore Button using Next.js Link + Tailwind styling */}
                  <div className="pt-2">
                    <Link 
                      href="/explore-cars"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform active:scale-95 group"
                    >
                      <span>Explore Cars</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Elegant bottom fade section */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default Banner;