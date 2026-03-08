"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import NavItem from "./NavItem";
import DropdownContent, { sections } from "./DropdownContent";

const NAV_ITEMS = [
    { label: "Products", hasDropdown: true },
    { label: "Solutions", hasDropdown: true },
    { label: "Developers", hasDropdown: true },
    { label: "Company", hasDropdown: true },
    { label: "Pricing", hasDropdown: false, href: "#pricing" },
];

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

    /* Compute dropdown position relative to its trigger */
    const handleEnter = useCallback(
        (label: string) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setActiveSection(label);

            /* position the dropdown centered under the trigger */
            if (navRef.current) {
                const trigger = navRef.current.querySelector(
                    `[data-nav="${label}"]`
                ) as HTMLElement | null;
                if (trigger) {
                    const navRect = navRef.current.getBoundingClientRect();
                    const triggerRect = trigger.getBoundingClientRect();
                    const width = sections[label]?.width ?? 480;
                    const centerX =
                        triggerRect.left + triggerRect.width / 2 - navRect.left;
                    const left = Math.max(16, centerX - width / 2);
                    setDropdownStyle({
                        left: `${left}px`,
                        width: `${width}px`,
                    });
                }
            }
        },
        []
    );

    const handleLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setActiveSection(null);
        }, 200);
    }, []);

    const handleDropdownEnter = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    /* Close mobile menu on Escape */
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileOpen(false);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    if (pathname === "/checkout") return null;

    return (
        <nav className="fixed left-0 right-0 top-0 z-50">
            {/* ── Desktop Nav ── */}
            <div
                ref={navRef}
                className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
                onMouseLeave={handleLeave}
            >
                {/* Logo */}
                <a href="/" className="flex items-center">
                    <Image src="/stripe-white.svg" alt="Stripe" width={60} height={25} className="h-8 w-auto" />
                </a>

                {/* Center nav links (desktop) */}
                <div className="hidden items-center md:flex">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} data-nav={item.label}>
                            <NavItem
                                label={item.label}
                                hasDropdown={item.hasDropdown}
                                isActive={activeSection === item.label}
                                onMouseEnter={
                                    item.hasDropdown ? () => handleEnter(item.label) : undefined
                                }
                                href={item.href}
                            />
                        </div>
                    ))}
                </div>

                {/* Sign in button (desktop) */}
                <div className="hidden md:block">
                    <a
                        href="#"
                        className="inline-flex items-center gap-1 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30"
                    >
                        Sign in
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </a>
                </div>

                {/* Hamburger (mobile) */}
                <button
                    className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm md:hidden"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <div className="flex w-5 flex-col items-center gap-[5px]">
                        <span
                            className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""
                                }`}
                        />
                        <span
                            className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                                }`}
                        />
                    </div>
                </button>

                {/* ── Desktop Dropdown ── */}
                {activeSection && sections[activeSection] && (
                    <div
                        className="absolute top-[calc(100%+4px)] z-40 rounded-xl bg-white p-5 shadow-2xl shadow-indigo-900/10 ring-1 ring-black/5"
                        style={{
                            ...dropdownStyle,
                            animation: "dropdownFadeIn 0.22s ease-out",
                            transition: "left 0.3s cubic-bezier(.4,0,.2,1), width 0.3s cubic-bezier(.4,0,.2,1)",
                        }}
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleLeave}
                    >
                        {/* Notch arrow */}
                        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-tl bg-white ring-1 ring-black/5" />
                        <div className="relative z-10">
                            <DropdownContent activeSection={activeSection} />
                        </div>
                    </div>
                )}
            </div>

            {/* ── Mobile Drawer ── */}
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
                onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 z-40 w-[85vw] max-w-sm transform bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-20">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="border-b border-slate-100">
                            <button
                                onClick={() =>
                                    item.hasDropdown &&
                                    setMobileDropdown((v) =>
                                        v === item.label ? null : item.label
                                    )
                                }
                                className="flex w-full items-center justify-between py-4 text-base font-semibold text-slate-800"
                            >
                                {item.label}
                                {item.hasDropdown && (
                                    <svg
                                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${mobileDropdown === item.label ? "rotate-180" : ""
                                            }`}
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
                                )}
                            </button>
                            {/* Accordion content */}
                            {item.hasDropdown && mobileDropdown === item.label && (
                                <div className="animate-[dropdownFadeIn_0.2s_ease-out] pb-3">
                                    <DropdownContent activeSection={item.label} />
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="mt-6">
                        <a
                            href="#"
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                        >
                            Sign in
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
