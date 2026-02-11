import React, { useState } from 'react';
import {
    GraduationCap,
    PiggyBank,
    Percent,
    Clock,
    CheckSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EducationLoan = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        country: '',
        amount: '',
        interest: 8.5, // Default interest rate
        tenure: 10,    // Default tenure in years
        agreed: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agreed) {
            alert("Please agree to the Terms and Conditions");
            return;
        }

        // Calculate EMI
        const principal = parseFloat(formData.amount);
        const rate = formData.interest / 12 / 100;
        const months = formData.tenure * 12;
        const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

        const loanData = {
            ...formData,
            principal,
            emi: emi.toFixed(2),
            startDate: new Date().toISOString(),
            status: 'Active'
        };

        // Save to localStorage for Dashboard simulation
        localStorage.setItem('education_loan', JSON.stringify(loanData));

        // Also add a 'Loan Disbursed' event log if we wanted, but sticking to localStorage for the specific feature request
        console.log("Application Submitted", loanData);
        alert(`Loan Approved! EMI: ₹${emi.toFixed(2)}/month`);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Side - Marketing Content */}
                <div className="space-y-8 animate-in slide-in-from-left duration-700">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#004e36] leading-tight">
                            Education Loans <br />
                            <span className="text-blue-900">For India and Abroad</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 text-red-600">
                                <Clock className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Repayment tenure</h3>
                            <p className="text-gray-600 font-medium">up to 15 years</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 text-red-600">
                                <PiggyBank className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Tax Benefits*</h3>
                            <p className="text-gray-600 font-medium">Under Section 80E</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 text-red-600">
                                <GraduationCap className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Up to 100%</h3>
                            <p className="text-gray-600 font-medium">Finance</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4 text-red-600">
                                <Percent className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Competitive</h3>
                            <p className="text-gray-600 font-medium">Interest Rates</p>
                        </div>
                    </div>

                    <div className="relative mt-8">
                        {/* Using the image we generated */}
                        <img
                            src="/student_graduate.png"
                            alt="Graduate Student"
                            className="w-full max-w-md mx-auto drop-shadow-2xl rounded-lg"
                        />
                    </div>
                </div>

                {/* Right Side - Application Form */}
                <div className="bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-red-600 animate-in slide-in-from-right duration-700">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                        Apply for an Education Loan
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                required
                                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 outline-none text-gray-700 transition-colors bg-transparent placeholder-gray-400"
                            />
                        </div>

                        {/* Mobile */}
                        <div>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter Mobile Number"
                                required
                                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 outline-none text-gray-700 transition-colors bg-transparent placeholder-gray-400"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Your Email"
                                required
                                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 outline-none text-gray-700 transition-colors bg-transparent placeholder-gray-400"
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 outline-none transition-colors bg-transparent ${formData.country ? 'text-gray-700' : 'text-gray-400'}`}
                            >
                                <option value="" disabled>Select Country</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                                <option value="Germany">Germany</option>
                            </select>
                        </div>

                        {/* Loan Amount */}
                        <div>
                            <label className="text-sm font-bold text-gray-700 ml-1">Loan Amount (₹)</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="e.g. 500000"
                                required
                                min="10000"
                                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 outline-none text-gray-700 transition-colors bg-transparent placeholder-gray-400 mt-1"
                            />
                        </div>

                        {/* Tenure (Hidden/Fixed for demo or add input if needed) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-bold text-gray-700 ml-1">Interest Rate (%)</label>
                                <input
                                    type="number"
                                    name="interest"
                                    value={formData.interest}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 outline-none text-gray-700 bg-transparent mt-1"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-gray-700 ml-1">Tenure (Years)</label>
                                <input
                                    type="number"
                                    name="tenure"
                                    value={formData.tenure}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-red-500 outline-none text-gray-700 bg-transparent mt-1"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Apply Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#e31e24] hover:bg-[#c4151b] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            Apply Now
                        </button>

                        {/* Terms */}
                        <div className="flex items-start gap-2">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    name="agreed"
                                    checked={formData.agreed}
                                    onChange={handleChange}
                                    id="terms"
                                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1"
                                />
                            </div>
                            <label htmlFor="terms" className="text-xs text-gray-500">
                                By clicking on this checkbox, I hereby agree to <a href="#" className="scale-100 text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> of Credila Financial Services Ltd (Credila). Read More...
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EducationLoan;
