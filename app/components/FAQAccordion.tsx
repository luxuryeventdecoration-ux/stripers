"use client";

import React, { useState } from "react";

interface FAQItem {
    q: string;
    a: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        q: "How does the $200 bonus work?",
        a: "When you sign up for Stripe through our partnership link, you're automatically entered into our bonus pool. Selected startups receive a $200 credit applied directly to their Stripe processing fees.",
    },
    {
        q: "Who is eligible for the bonus?",
        a: "Any new Stripe account created through our referral link is eligible. This includes startups, small businesses, freelancers, and e-commerce stores regardless of industry or location.",
    },
    {
        q: "How are bonus recipients selected?",
        a: "We use a transparent random selection process. Every new sign-up within the qualifying period has an equal chance. Winners are notified via email within 5 business days of selection.",
    },
    {
        q: "How long does the sign-up process take?",
        a: "The initial sign-up takes under 5 minutes. Business verification typically completes within 1-2 business days, after which your account is fully active and eligible for the bonus.",
    },
    {
        q: "Is there any cost to participate?",
        a: "Absolutely not. Signing up through our partnership link is completely free. You only pay Stripe's standard processing fees when you start accepting payments — no hidden charges.",
    },
    {
        q: "Can I use the bonus with an existing Stripe account?",
        a: "The bonus is available exclusively for new Stripe accounts created through our referral link. Existing accounts are not eligible, but you can create a new account for a different business.",
    },
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="mx-auto max-w-2xl">
            {FAQ_DATA.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                    <div
                        key={i}
                        className="border-b border-slate-200/80"
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            className="group flex w-full items-center justify-between py-5 text-left"
                            aria-expanded={isOpen}
                        >
                            <span className="text-base font-semibold text-slate-800 transition-colors group-hover:text-indigo-600">
                                {item.q}
                            </span>
                            <span
                                className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-indigo-50"
                                style={{
                                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                                }}
                            >
                                <svg
                                    className="h-4 w-4 text-slate-500 transition-colors group-hover:text-indigo-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                            </span>
                        </button>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateRows: isOpen ? "1fr" : "0fr",
                                transition: "grid-template-rows 0.35s cubic-bezier(.16,1,.3,1)",
                            }}
                        >
                            <div className="overflow-hidden">
                                <p className="pb-5 pr-12 text-sm leading-relaxed text-slate-500">
                                    {item.a}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
