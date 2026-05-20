import Link from "next/link";
import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 overflow-hidden relative">
            
      
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000" />

            <div className="max-w-md w-full text-center space-y-8 p-6 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-100 relative z-10 transform animate-in fade-in slide-in-from-bottom-6 duration-700">
                
              
                <div className="relative group cursor-default">
                    <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 tracking-tight transition-all duration-500 group-hover:scale-105">
                        404
                    </h1>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-sm">
                        Page Not Found
                    </div>
                </div>

              
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Oops! Decentered Track? 🧭
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-sm mx-auto">
                        Amra jani na apni thik ki khujchilen, tobe lagche page-ti tar rasta harayeche ba akhon ar astitte nei.
                    </p>
                </div>

               
                <div className="flex items-center justify-center space-x-2 py-2">
                    <span className="h-1 w-8 rounded bg-gray-200" />
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                    <span className="h-1 w-8 rounded bg-gray-200" />
                </div>

                
                <div className="pt-2">
                    <Link 
                        href="/"
                        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 transform active:scale-[0.98] group"
                    >
                        
                        <svg 
                            className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NotFoundPage;