'use client';
import { useState, useEffect } from 'react';

// SVG Icons as components
const UserIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const LockClosedIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const EyeIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeSlashIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
);

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Replaced Next.js useRouter and useSearchParams with a useEffect hook
    const [redirectUrl, setRedirectUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setRedirectUrl(params.get('redirect') || '');
        }
    }, []);

    const validateForm = () => {
        if (!username.trim()) {
            setError('ব্যবহারকারীর নাম প্রয়োজন।');
            return false;
        }
        if (!password.trim()) {
            setError('পাসওয়ার্ড প্রয়োজন।');
            return false;
        }
        if (password.length < 6) {
            setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Use window.location.href for redirection
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    window.location.href = '/form-view';
                }
            } else {
                const data = await response.json();
                setError(data.error || 'লগইন ব্যর্থ হয়েছে।');
            }
        } catch (err) {
            setError('একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-lime-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-20 left-20 w-32 h-32 bg-green-200 rounded-full opacity-30"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-teal-200 rounded-full opacity-30"></div>
            </div>

            {/* Login card */}
            <div className="relative w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-white/20">
                    {/* Logo/Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            সাইন ইন
                        </h1>
                        <p className="text-gray-600 mt-2">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username field */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700 block">
                                ব্যবহারকারীর নাম
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-[#333333]" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="text-[#333] w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                    placeholder="আপনার ব্যবহারকারীর নাম"
                                    disabled={isLoading}
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                                পাসওয়ার্ড
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-[#333] w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                    placeholder="আপনার পাসওয়ার্ড"
                                    disabled={isLoading}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm" role="alert">
                                {error}
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                                    <span>লগইন হচ্ছে...</span>
                                </div>
                            ) : (
                                'লগইন করুন'
                            )}
                        </button>

                        {/* Additional links */}
                        <div className="text-center space-y-2 pt-4">
                            <a href="#" className="text-sm text-emerald-600 hover:text-emerald-800 transition-colors">
                                পাসওয়ার্ড ভুলে গেছেন?
                            </a>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-600">
                    <p>অ্যাকাউন্ট নেই? <a href="#" className="font-medium transition-colors" style={{ color: '#198754' }} onMouseEnter={(e) => e.target.style.color = '#146c43'} onMouseLeave={(e) => e.target.style.color = '#198754'}>নিবন্ধন করুন</a></p>
                </div>
            </div>
        </div>
    );
}
