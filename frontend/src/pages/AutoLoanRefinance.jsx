import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AutoLoanRefinance = () => {
    const navigate = useNavigate();

    const handleApply = () => {
        navigate('/loans/auto-application');
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans bg-white">
            {/* Left Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center animate-in slide-in-from-left duration-700">
                <button
                    onClick={() => navigate('/loans')}
                    className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors self-start"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Loans
                </button>

                <h2 className="text-4xl md:text-5xl font-light text-gray-700 mb-2">
                    Auto Loan Refinancing
                </h2>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                    For a Better Car Loan
                </h1>

                <div className="space-y-6 text-gray-600 text-lg leading-relaxed max-w-xl">
                    <p>
                        Refinance your auto loan from another lender with SCCU and save! Our lower rates
                        can give you lower monthly payments, and potentially save you money over the
                        life of your auto loan.
                    </p>
                    <p>
                        SCCU refinancing is fast, easy, and convenient. Apply online
                        or over the phone and get approved in minutes!
                    </p>
                </div>

                <div className="mt-10">
                    <button
                        onClick={handleApply}
                        className="bg-[#fec107] hover:bg-[#e0aa00] text-gray-900 font-bold py-3 px-8 rounded shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 text-lg"
                    >
                        Apply Now
                    </button>
                </div>

                {/* Additional trust badge optional */}
                <div className="mt-12 flex items-center text-gray-500 text-sm gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>No hidden fees</span>
                    <span className="mx-2">•</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Quick approval</span>
                </div>
            </div>

            {/* Right Image Section */}
            <div className="w-full md:w-1/2 relative bg-gray-100 h-[50vh] md:h-auto overflow-hidden animate-in fade-in duration-1000">
                <img
                    src="/family_car_lake.png"
                    alt="Family sitting in car trunk by a lake"
                    className="w-full h-full object-cover"
                />

                {/* Optional accessibility icon overlay from screenshot */}
                <div className="absolute bottom-6 right-6 bg-[#00529b] p-2 rounded-full cursor-pointer hover:bg-blue-800 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AutoLoanRefinance;
