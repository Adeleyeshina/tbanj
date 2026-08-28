'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {
    Building2,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    AlertCircle,
    ShieldCheck,
} from 'lucide-react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!email || !password) {
            setError('Please enter your email and password.')
            return
        }

        setLoading(true)
        // TODO: connect to backend authentication API (e.g. POST /api/auth/login).
        // On success: redirect to admin dashboard.
        // On failure: show the returned error message.
        setTimeout(() => setLoading(false), 500)
    }

    return (
        <div className="min-h-dvh flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white rounded-3xl border border-neutral-200/90 shadow-2xl p-8 sm:p-10 space-y-8">

                {/* Brand Header */}
                <div className="text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center mx-auto shadow-md">
                        <Building2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="font-heading font-extrabold text-2xl text-neutral-900">
                            Admin Sign In
                        </h1>
                        <p className="text-xs text-neutral-500">
                            Secure access to the Tbanj Apartment management dashboard
                        </p>
                    </div>
                </div>

                {/* Error message */}
                {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div>
                        <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="admin@tbanjapartment.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-brand-primary placeholder-neutral-400"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block font-bold text-neutral-700 uppercase tracking-wider">
                                Password
                            </label>
                            <button
                                type="button"
                                className="text-[11px] font-semibold text-brand-primary hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-brand-primary placeholder-neutral-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 font-semibold text-neutral-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="accent-brand-primary w-3.5 h-3.5 rounded border-neutral-300"
                            />
                            <span>Remember me</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="w-4 h-4" />
                                <span>Sign In to Dashboard</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="pt-1 text-center">
                    <Link href="/" className="text-xs text-neutral-500 hover:text-neutral-800 font-semibold inline-flex items-center gap-1">
                        <span>←</span>
                        <span>Return to Tbanj Apartment Website</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Login
