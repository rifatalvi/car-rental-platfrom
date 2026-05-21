"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Car, Menu, X, ChevronDown } from "lucide-react";
import { authClient, useSession } from '@/lib/auth-client';
import Image from 'next/image';
import toast from 'react-hot-toast';

const NavbarPage = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { data: session ,isPending} = useSession();
  console.log(session);

  const users = session?.user;

  const handleLogout = async () => {
    await authClient.signOut(),
    toast.success("Logged out successfully");
    window.location.reload()
    router.push('/login');
  };


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
          
       
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        
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

        
          <div className="hidden md:flex items-center">
            {users ? (
              <div 
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button className="flex items-center gap-1.5 focus:outline-none p-1 rounded-full hover:bg-gray-50 transition">
                  <Image 
                    className="h-9 w-9 rounded-full object-cover border-2 border-blue-500" 
                    src={session?.user?.photoUrl || "https://static.vecteezy.com/system/resources/previews/046/409/821/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg"} 
                    width={40}
                    height={40}
                    alt="Profile" 
                  />
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 w-52 bg-white rounded-2xl shadow-xl py-2 border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{session?.user?.name}</p>
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
              <div className="flex items-center gap-3">
                <Link 
                  href="/login" 
                  className="text-gray-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-gray-50 transition"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-blue-600 text-white font-semibold shadow-md px-5 py-2 rounded-xl text-sm hover:bg-blue-700 transition active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center">
            {users && (
              <Image 
                className="h-8 w-8 rounded-full object-cover border-2 border-blue-500" 
                src={session?.user?.photoUrl || "https://static.vecteezy.com/system/resources/previews/046/409/821/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg"} 
                width={32}
                height={32}
                alt="Profile" 
              />
            )}
          </div>

        </div>
      </div>

      
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
            
            <div className="pt-4 border-t border-gray-100 mt-4">
              {users ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 px-4 py-2.5 mb-2 bg-gray-50 rounded-xl">
                    <Image width={40} height={40} className="h-10 w-10 rounded-full object-cover border border-gray-200" src={session?.user?.photoUrl || "/placeholder-avatar.png"} alt="Profile" />
                    <span className="font-bold text-gray-800 text-sm truncate">{session?.user?.name}</span>
                  </div>
                  <Link 
                    href="/add-car"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-4 rounded-xl text-base font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Add Car
                  </Link>
                  <Link 
                    href="/my-bookings"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-4 rounded-xl text-base font-medium text-gray-600 hover:bg-gray-50"
                  >
                    My Bookings
                  </Link>
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
                <div className="flex flex-col gap-2.5 px-2">
                  <Link 
                    href="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center border-2 border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-base hover:bg-gray-50 transition"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center bg-blue-600 text-white font-semibold py-2.5 rounded-xl shadow-md text-base hover:bg-blue-700 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarPage;