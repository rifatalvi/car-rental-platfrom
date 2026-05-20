"use client";

import React from 'react';
import Link from 'next/link';
import { Car, Mail, MapPin, Phone } from 'lucide-react';
import { CiFacebook } from "react-icons/ci";
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* 1. Brand Info Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white tracking-tight">
              <div className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center shadow-md shadow-blue-900/50">
                <Car size={20} strokeWidth={2.5} />
              </div>
              <span className="font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                DriveFleet
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Experience the ultimate comfort and freedom of traveling with DriveFleet. Rent premium cars at affordable rates with 24/7 customer support.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-blue-500 transition-colors"><CiFacebook size={18} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><BsTwitter size={18} /></a>
              <a href="#" className="hover:text-pink-500 transition-colors"><BsInstagram size={18} /></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><LiaLinkedin size={18} /></a>
            </div>
          </div>

          {/* 2. Quick Links Column */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase text-xs">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 hover:underline transition">Home</Link>
              </li>
              <li>
                <Link href="/explore-cars" className="hover:text-blue-400 hover:underline transition">Explore Cars</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 hover:underline transition">About Us</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-400 hover:underline transition">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Info Column */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase text-xs">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>123 Dhanmondi, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>support@drivefleet.com</span>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter Subscription Column */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider uppercase text-xs">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">
              Subscribe to get latest updates, special offers and car rental deals.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition placeholder-gray-500"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-md transition active:scale-98"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} DriveFleet Car Rental Platform. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-gray-400 transition">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gray-400 transition">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;