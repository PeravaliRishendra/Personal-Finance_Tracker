import React, { useState, useEffect } from 'react';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AutoLoanApplication = () => {
    const navigate = useNavigate();
    const [purpose, setPurpose] = useState('Purchase'); // Default to Purchase as per screenshot, or null

    const [formData, setFormData] = useState({
        vehicleType: '',
        condition: '', // New or Used
        hasMakeModel: '', // Yes or No
        purchasePrice: '',
        downPayment: '',
        loanTerm: '',
    });

    // Calculated field
    const requestedLoanAmount = Math.max(0, (parseFloat(formData.purchasePrice) || 0) - (parseFloat(formData.downPayment) || 0));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelection = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate EMI (Assumed Interest Rate for Demo: 5% for 60 months default if not specified properly, but using form term)
        // Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
        const P = requestedLoanAmount;
        const annualRate = 5.0; // 5% Interest Rate
        const r = annualRate / 12 / 100;
        const n = parseFloat(formData.loanTerm) || 60; // Default 60 months

        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        const loanData = {
            ...formData,
            purpose,
            principal: P,
            interestRate: annualRate,
            emi: emi.toFixed(2),
            totalAmount: (emi * n).toFixed(2),
            startDate: new Date().toISOString(),
            status: 'Active'
        };

        // Save to localStorage
        localStorage.setItem('auto_loan', JSON.stringify(loanData));

        alert(`Application for ${purpose} Submitted! Loan Amount: $${P.toFixed(2)}. Estimated EMI: $${emi.toFixed(2)}`);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-700">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">

                {/* Header */}
                <div className="flex items-center mb-8 border-b border-gray-200 pb-4">
                    <button onClick={() => navigate(-1)} className="mr-4 text-gray-500 hover:text-blue-700">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-semibold text-[#003462]">Vehicle Loan</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Select Purpose */}
                    <section>
                        <h2 className="text-[#003462] font-bold mb-3">
                            Select a purpose <span className="text-red-500">*</span>
                        </h2>
                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={() => setPurpose('Purchase')}
                                className={`py-3 px-6 rounded border transition-colors text-center font-medium ${purpose === 'Purchase'
                                    ? 'bg-[#e6f0fa] border-[#00529b] text-[#003462] ring-1 ring-[#00529b]'
                                    : 'bg-white border-gray-400 text-gray-600 hover:border-[#00529b]'
                                    }`}
                            >
                                Purchase
                            </button>
                            <button
                                type="button"
                                onClick={() => setPurpose('Refinance')}
                                className={`py-3 px-6 rounded border transition-colors text-center font-medium ${purpose === 'Refinance'
                                    ? 'bg-[#e6f0fa] border-[#00529b] text-[#003462] ring-1 ring-[#00529b]'
                                    : 'bg-white border-gray-400 text-gray-600 hover:border-[#00529b]'
                                    }`}
                            >
                                Refinance
                            </button>
                        </div>
                    </section>

                    {/* Loan Information */}
                    <section className="space-y-6">
                        <h2 className="text-[#003462] font-bold border-b border-gray-200 pb-2">
                            Provide loan information
                        </h2>

                        {/* Vehicle Type */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Vehicle Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none text-gray-700"
                            >
                                <option value="">--Please Select--</option>
                                <option value="Car">Car</option>
                                <option value="Truck">Truck</option>
                                <option value="SUV">SUV</option>
                                <option value="Motorcycle">Motorcycle</option>
                                <option value="RV">RV</option>
                            </select>
                        </div>

                        {/* Condition (New/Used) */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Is this a new or used vehicle? <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-4">
                                {['New', 'Used'].map((opt) => (
                                    <div
                                        key={opt}
                                        onClick={() => handleSelection('condition', opt)}
                                        className={`flex-1 p-3 border rounded cursor-pointer flex items-center gap-3 transition-colors ${formData.condition === opt
                                            ? 'border-[#00529b] bg-[#e6f0fa]'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 border rounded flex items-center justify-center ${formData.condition === opt ? 'bg-[#00529b] border-[#00529b]' : 'bg-gray-200 border-gray-300'}`}>
                                            {formData.condition === opt && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                        <span className="text-gray-700">{opt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Known Make/Model */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Do you know the Make and Model? <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-4">
                                {['Yes', 'No'].map((opt) => (
                                    <div
                                        key={opt}
                                        onClick={() => handleSelection('hasMakeModel', opt)}
                                        className={`flex-1 p-3 border rounded cursor-pointer flex items-center gap-3 transition-colors ${formData.hasMakeModel === opt
                                            ? 'border-[#00529b] bg-[#e6f0fa]'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 border rounded flex items-center justify-center ${formData.hasMakeModel === opt ? 'bg-[#00529b] border-[#00529b]' : 'bg-gray-200 border-gray-300'}`}>
                                            {formData.hasMakeModel === opt && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                        <span className="text-gray-700">{opt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Estimated Price */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Estimated Purchase Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="purchasePrice"
                                value={formData.purchasePrice}
                                onChange={handleChange}
                                className="w-full p-2 border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none text-gray-700"
                                required
                            />
                        </div>

                        {/* Down Payment */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Down Payment Amount <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="downPayment"
                                value={formData.downPayment}
                                onChange={handleChange}
                                className="w-full p-2 border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none text-gray-700"
                                required
                            />
                        </div>

                        {/* Requested Loan Amount (Read Only) */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Requested Loan Amount <span className="text-red-500">*</span>
                            </label>
                            <div className="w-full p-2 border border-blue-300 rounded bg-gray-50 text-gray-500">
                                ${requestedLoanAmount.toFixed(2)}
                            </div>
                        </div>

                        {/* Loan Term */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Loan Term (months) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="loanTerm"
                                value={formData.loanTerm}
                                onChange={handleChange}
                                className="w-full p-2 border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none text-gray-700"
                                required
                            />
                        </div>

                        {/* Trade In Link */}
                        <button type="button" className="flex items-center text-[#003462] font-bold hover:underline">
                            <PlusCircle className="w-4 h-4 mr-1" /> Add a trade-in
                        </button>

                    </section>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            className="bg-[#fec107] hover:bg-[#e0aa00] text-gray-900 font-bold py-3 px-10 rounded shadow-sm hover:shadow-md transition-all"
                        >
                            Submit Application
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AutoLoanApplication;
