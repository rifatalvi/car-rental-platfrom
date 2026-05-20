"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Car, Menu, X, ChevronDown } from "lucide-react";

const NavbarPage = () => {
  // Mobile menu drawer open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Desktop profile dropdown hover state
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Authentication Context (Apnar dynamic state ekhane connect hobe)
  const user = {
    displayName: 'Rifat Alvi',
    photoURL: 'https://i.ibb.co.com/placeholder-avatar.png',
  };
  // Jodi user login na thake tobe: const user = null;

  const handleLogout = () => {
    console.log("Logged out successfully");
    router.push('/login');
  };

  // Main navigation links array
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Explore Cars', path: '/explore-cars' },
    { label: 'Add Car', path: '/add-car' },
    { label: 'My Bookings', path: '/my-bookings' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1. Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* 2. Logo Branding */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-blue-600 tracking-tight">
              <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md flex items-center justify-center">
                <Car size={20} strokeWidth={2.5} />
              </div>
              <span className="font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DriveFleet
              </span>
            </Link>
          </div>

          {/* 3. Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? "text-blue-600 bg-blue-50 font-semibold" 
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* 4. Authentication Right Panel (Conditional Logic) */}
          <div className="flex items-center">
            {user ? (
              /* If User is Logged In: Dropdown on Hover */
              <div 
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button className="flex items-center gap-1.5 focus:outline-none p-1 rounded-full hover:bg-gray-50 transition">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    className="h-9 w-9 rounded-full object-cover border-2 border-blue-500" 
                    src={user?.photoURL} 
                    alt="Profile" 
                  />
                  <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
                </button>

                {/* Hover Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 w-52 bg-white rounded-2xl shadow-xl py-2 border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{user?.displayName}</p>
                    </div>
                    <Link href="/add-car" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
                      Add Car
                    </Link>
                    <Link href="/my-bookings" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
                      My Bookings
                    </Link>
                    <Link href="/my-added-cars" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
                      My Added Cars
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-semibold border-t border-gray-50 mt-1 pt-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* If User is NOT Logged In: Show Login Button */
              <Link 
                href="/login" 
                className="bg-blue-600 text-white font-semibold shadow-md px-5 py-2 rounded-xl text-sm hover:bg-blue-700 transition active:scale-95"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* 5. Mobile Responsive Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg absolute w-full left-0 z-40 transition-all">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 rounded-xl text-base font-medium ${
                    isActive 
                      ? "bg-blue-50 text-blue-600 font-semibold" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Mobile Conditional Auth Block */}
            <div className="pt-4 border-t border-gray-100 mt-4">
              {user ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 px-4 py-2.5 mb-2 bg-gray-50 rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="h-10 w-10 rounded-full object-cover border border-gray-200" src={user?.photoURL} alt="Profile" />
                    <span className="font-bold text-gray-800 text-sm truncate">{user?.displayName}</span>
                  </div>
                  <Link 
                    href="/my-added-cars" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-4 rounded-xl text-base font-medium text-gray-600 hover:bg-gray-50"
                  >
                    My Added Cars
                  </Link>
                  <button 
                    onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                    className="w-full text-left block py-3 px-4 rounded-xl text-base font-bold text-red-600 hover:bg-red-50 mt-1"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md text-base"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarPage;