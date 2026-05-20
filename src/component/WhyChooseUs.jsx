"use client";

import React from 'react';
import { ShieldCheck, Clock, ShieldAlert, Award } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <ShieldCheck size={28} className="text-blue-600" />,
      title: "Fully Insured Vehicles",
      description: "Drive with complete peace of mind. Every single car in our premium fleet comes with comprehensive damage coverages and protection parameters."
    },
    {
      id: 2,
      icon: <Clock size={28} className="text-emerald-600" />,
      title: "24/7 Roadside Assistance",
      description: "No matter where your journey takes you, our dedicated dynamic customer support team is just a single phone call away, day or night."
    },
    {
      id: 3,
      icon: <ShieldAlert size={28} className="text-amber-600" />,
      title: "Zero Hidden Charges",
      description: "What you see is exactly what you pay. Transparent pricing logic model with absolute transparency regarding tax logs and platform booking fees."
    },
    {
      id: 4,
      icon: <Award size={28} className="text-indigo-600" />,
      title: "Certified Premium Fleet",
      description: "Every premium sport, sedan, or SUV undergoes rigorous safety inspections and professional vacuum cleaning before the pickup execution trigger."
    }
  ];

  return (
    <section className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8 border-y border-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-full">
            Unmatched Quality
          </span>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Why Drive With{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              DriveFleet
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base font-light">
            We redefine premium mobility with outstanding rental services, verified parameters, and smooth driver support systems.
          </p>
        </div>

        {/* Features Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-gray-950/50 border border-gray-800/60 p-6 rounded-2xl shadow-sm hover:border-blue-500/30 transition-all duration-300 group flex flex-col items-start"
            >
              {/* Icon Holder */}
              <div className="p-3.5 bg-gray-900 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-inner border border-gray-800/40">
                {feature.icon}
              </div>

              {/* Title & Description */}
              <h3 className="font-extrabold text-lg text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;