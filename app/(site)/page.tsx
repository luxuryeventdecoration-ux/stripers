"use client";

import ScrollReveal from "../components/ScrollReveal";
import FAQAccordion from "../components/FAQAccordion";
import { useEffect, useState } from "react";

/* ── SVG icon helpers ── */
const ArrowRight = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
    />
  </svg>
);

const Star = () => (
  <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const VerifiedBadge = () => (
    <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

/* ── Benefits data ── */
const BENEFITS = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Instant Setup",
    desc: "Start accepting payments globally in minutes. Our guided, frictionless onboarding bypasses the usual technical hurdles.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "$200 Partner Grant",
    desc: "As an official partner, approved startups receive $200 in Stripe processing credits to offset early-stage transaction fees.",
    highlight: true,
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Bank-Grade Security",
    desc: "Achieve instant PCI DSS Level 1 compliance. Your customers' payment data is secured by industry-leading encryption.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Dedicated Support",
    desc: "Skip the generic queue. Get priority access to expert integration support and account management.",
  },
];

/* ── Steps data ── */
const STEPS = [
  {
    num: "01",
    title: "Apply via Partner Link",
    desc: "Register your business using our exclusive application link. The initial setup is secure and takes less than 5 minutes.",
  },
  {
    num: "02",
    title: "Verify Your Business",
    desc: "Complete the standard compliance review. Most startups clear verification seamlessly within 1-2 business days.",
  },
  {
    num: "03",
    title: "Receive Your Processing Credit",
    desc: "Once verified and activated, approved accounts are automatically credited with $200 in fee offset grants directly in your dashboard.",
  },
];

/* ── Testimonials data ── */
const TESTIMONIALS = [
  {
    quote: "The onboarding was trivial, but the real value is the $200 partner credit. It completely covered our initial launch processing fees. Highly recommended for any new founder.",
    name: "Priya Sharma",
    role: "Founder, SaaS Connect",
    initials: "PS",
    color: "bg-violet-100 text-violet-600",
  },
  {
    quote: "Applying through the partner link rather than going direct was a no-brainer. The grant was credited to our account exactly as promised once we processed our first payments.",
    name: "Alex Chen",
    role: "CTO, NovaPay Solutions",
    initials: "AC",
    color: "bg-sky-100 text-sky-600",
  },
  {
    quote: "Trusting third-party offers is hard, but this is legit. The seamless integration combined with the waived fees allowed us to reinvest that capital straight into ads.",
    name: "Maria González",
    role: "E-commerce Owner",
    initials: "MG",
    color: "bg-emerald-100 text-emerald-600",
  },
];

// Reusable Notification component to build trust
const NotificationPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show notification shortly after page load to catch ad traffic attention
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 flex max-w-sm items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 font-sans text-sm shadow-2xl shadow-indigo-500/10 backdrop-blur-xl transition-all duration-700 ease-out sm:bottom-8 sm:left-8 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-white">Partner Grant Applied</p>
        <p className="text-white/70 text-xs">A new startup just claimed their $200 credit.</p>
      </div>
      <button 
        onClick={() => setVisible(false)}
        className="ml-auto text-white/50 hover:text-white"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// Live Activity Feed Component for Social Proof (Payment Received Style)
const LiveActivityFeed = () => {
  const ACTIVITIES = [
    { user: "TechNova Inc.", action: "$200 Partner Grant", time: "Just now", icon: "st", status: "Processed" },
    { user: "Priya S.", action: "First Payment", time: "2 min ago", amount: "$149.00", icon: "pmt", status: "Success" },
    { user: "Nexus SaaS", action: "$200 Partner Grant", time: "5 min ago", icon: "st", status: "Processed" },
    { user: "Marcus T.", action: "First Payment", time: "12 min ago", amount: "$89.50", icon: "pmt", status: "Success" },
    { user: "Growth Labs", action: "$200 Partner Grant", time: "18 min ago", icon: "st", status: "Processed" },
    { user: "Elevate E-com", action: "First Payment", time: "22 min ago", amount: "$299.00", icon: "pmt", status: "Success" },
  ];

  const [visibleActivities, setVisibleActivities] = useState([{ ...ACTIVITIES[0], id: 0 }, { ...ACTIVITIES[1], id: 1 }, { ...ACTIVITIES[2], id: 2 }]);
  const [index, setIndex] = useState(3);

  useEffect(() => {
    // Simulate live feed updates every 3-6 seconds
    const interval = setInterval(() => {
      setVisibleActivities(prev => {
        const nextActivity = { ...ACTIVITIES[index % ACTIVITIES.length], id: Date.now() };
        return [nextActivity, ...prev.slice(0, 2)];
      });
      setIndex(prev => prev + 1);
    }, Math.floor(Math.random() * 3000) + 3000);

    return () => clearInterval(interval);
  }, [index]);

  const getActivityIcon = (type: string) => {
    if (type === "st") {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#635BFF] text-white shadow-sm ring-2 ring-white">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.984 0C5.366 0 0 5.366 0 11.984s5.366 11.984 11.984 11.984 11.984-5.366 11.984-11.984S18.602 0 11.984 0zm5.132 17.653c-1.503.743-3.217 1.134-5.111 1.134-4.832 0-7.85-2.28-7.85-6.53 0-4.008 2.673-6.685 7.152-6.685 1.767 0 3.32.41 4.398.995v3.132c-1.127-.723-2.5-1.109-3.951-1.109-2.235 0-3.526 1.07-3.526 2.651 0 1.579 1.126 2.38 3.541 2.964 3.016.712 4.673 1.95 4.673 4.35 0 2.228-1.503 3.65-4.14 4.364v3.136h-4.02v-3.24c-1.638-.346-3.151-1.01-4.475-1.996L5.3 17.56c1.233.91 2.72 1.554 4.305 1.831v-3.09c1.9-.386 3.025-1.074 3.025-2.614 0-1.428-.79-2.071-3.111-2.655-2.905-.728-5.101-1.89-5.101-4.725 0-2.871 2.254-4.887 5.86-5.466V0h4.02v3.084c1.802.482 3.447 1.346 4.8 2.505l-1.921 2.768z" /></svg>
        </div>
      )
    }
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm ring-2 ring-white">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
    )
  }

  const ActivityCard = ({ activity, delayClass = "" }: { activity: any, delayClass?: string }) => (
    <div className={`flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-100 px-4 py-2 shadow-sm transition-all duration-500 hover:shadow-md ${delayClass} shrink-0 min-w-[260px]`}>
      {getActivityIcon(activity.icon)}
      <div className="flex-1">
        <div className="flex justify-between items-center text-xs">
           <span className="font-bold text-slate-800 tracking-wide">{activity.user}</span>
           <span className="text-slate-400 font-medium">{activity.time}</span>
        </div>
        <div className="flex justify-between items-center mt-0.5">
           <span className="text-slate-500 text-xs font-medium">{activity.action}</span>
           <span className="text-emerald-600 font-bold text-sm tracking-tight">{activity.amount || "+$200.00"}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full bg-white border-y border-slate-200 overflow-hidden py-4 shadow-[inset_0_4px_6px_rgba(0,0,0,0.02)]">
      <div className="mx-auto max-w-7xl px-6 flex flex-col xl:flex-row items-start xl:items-center gap-6">
        
        {/* Title side */}
        <div className="flex xl:flex-col items-center xl:items-start gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0a2540]">Live Network</span>
          </div>
          <p className="text-xs text-slate-500 hidden xl:block font-medium">Recent platform activity</p>
        </div>
        
        {/* Feed side */}
        <div className="flex-1 flex w-full overflow-hidden mask-right">
           <div className="flex gap-4">
             {visibleActivities.map((activity, i) => (
                <div key={activity.id} className={i === 0 ? "animate-fade-in-right" : "opacity-90 transition-all duration-500"}>
                  <ActivityCard activity={activity} />
                </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};


export default function Home() {
  // Calculate current month for dynamic urgency
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="min-h-screen">
      <NotificationPopup />
      
      {/* ═══════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════ */}
      <section className="stripe-gradient relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 pt-24 pb-32">
        {/* Floating decorative shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="float-slow absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-white/3" />
          <div className="float-slower absolute right-[15%] top-[30%] h-48 w-48 rounded-full bg-indigo-400/6" />
          <div className="float-slowest absolute left-[60%] bottom-[20%] h-36 w-36 rounded-full bg-white/4" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-rose-100 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Only 42 Partner Grants Remaining for {currentMonth}
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Process Your First <br className="hidden sm:block" />
            <span className="relative inline-block mt-2">
               Transactions Free
              <span className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full bg-emerald-400/80" />
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-indigo-100 sm:text-xl font-medium">
            Join 1,000+ verified startups scaling globally. Apply for a Stripe account through our official partner link and receive a <strong>$200 processing credit</strong> grant upon activation.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/checkout"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#0a2540] shadow-xl shadow-black/20 ring-4 ring-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-slate-50"
            >
              Apply for $200 Partner Grant
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10"
            >
              See Requirements
            </a>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm font-medium text-white/60">
             <span className="flex items-center gap-1.5"><VerifiedBadge /> No Credit Card Required</span>
             <span className="hidden sm:flex items-center gap-1.5"><VerifiedBadge /> Official Stripe Partner</span>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 1.5 — LIVE ACTIVITY FEED
      ═══════════════════════════════════════════════════ */}
      <LiveActivityFeed />

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — PARTNERSHIP INFO
      ═══════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text side */}
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
                <VerifiedBadge /> Verified Partner Program
              </p>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Level the playing field with enterprise-grade infrastructure.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 font-medium">
                We've partnered directly with Stripe to remove the friction for early-stage companies. 
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-500">
                Through this exclusive program, eligible businesses bypass initial processing fees. You gain immediate access to the same robust payment infrastructure powering Amazon and Shopify—plus a guaranteed $200 credit grant to cover early transaction costs.
              </p>
              <div className="mt-8 flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                     <svg className="h-6 w-6 text-slate-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8l4-7v4h3l-4 7z"/></svg>
                  </div>
                  <div>
                      <p className="font-bold text-slate-900">Accelerated Growth</p>
                      <p className="text-sm text-slate-500">Reinvest saved fees into your customer acquisition.</p>
                  </div>
              </div>
            </div>

            {/* Stats side */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
              {[
                { value: "1,000+", label: "Startups Funded" },
                { value: "$200", label: "Guaranteed Grant" },
                { value: "0%", label: "Setup Fees" },
                { value: "24h", label: "Average Approval" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md">
                  <p className="text-3xl font-extrabold tracking-tight text-indigo-600 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — BENEFITS
      ═══════════════════════════════════════════════════ */}
      <section className="bg-[#f8fafc] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-indigo-600">
              Your Unfair Advantage
            </p>
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to scale, without the upfront friction.
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 100}>
                <div
                  className={`group relative rounded-3xl p-8 transition-all duration-300 ${b.highlight
                    ? "bg-[#0a2540] text-white shadow-xl shadow-indigo-900/10"
                    : "bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/50"
                    }`}
                >
                  <div
                    className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${b.highlight
                      ? "bg-linear-to-br from-indigo-500 to-indigo-600 text-white shadow-inner"
                      : "bg-indigo-50 text-indigo-600"
                      }`}
                  >
                    {b.icon}
                  </div>
                  <h3
                    className={`text-xl font-bold ${b.highlight ? "text-white" : "text-slate-900"
                      }`}
                  >
                    {b.title}
                  </h3>
                  <p
                    className={`mt-3 text-base leading-relaxed ${b.highlight ? "text-indigo-100/90" : "text-slate-500"
                      }`}
                  >
                    {b.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4 — HOW IT WORKS
      ═══════════════════════════════════════════════════ */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-20">
        <ScrollReveal>
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-indigo-600">
            Eligibility & Process
          </p>
          <h2 className="mx-auto max-w-xl text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Claim your processing grant in three straightforward steps.
          </h2>
        </ScrollReveal>

        <div className="relative mt-20">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-[2px] bg-indigo-100 sm:block lg:left-1/2 lg:-translate-x-px" />

          <div className="space-y-16 lg:space-y-20">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 120}>
                <div
                  className={`relative grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:direction-rtl" : ""
                    }`}
                >
                  {/* Number circle */}
                  <div className="absolute left-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-base font-bold text-white shadow-xl shadow-indigo-600/20 lg:left-1/2 lg:-translate-x-1/2">
                    {step.num}
                  </div>

                  {/* Content — offset to the right of the line */}
                  <div
                    className={`pl-20 lg:pl-0 ${i % 2 === 0
                      ? "lg:col-start-1 lg:pr-24 lg:text-right"
                      : "lg:col-start-2 lg:pl-24"
                      }`}
                    style={{ direction: "ltr" }}
                  >
                    <h3 className="text-2xl font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-600 font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5 — TESTIMONIALS
      ═══════════════════════════════════════════════════ */}
      <section className="bg-[#f8fafc] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-indigo-600">
              Verified Partners
            </p>
            <h2 className="mx-auto max-w-xl text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Join founders who scaled faster with our offset grants.
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div className="flex h-full flex-col justify-between rounded-3xl bg-white p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
                  {/* Stars */}
                  <div>
                    <div className="mb-5 flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} />
                      ))}
                    </div>
                    <p className="text-base font-medium leading-relaxed text-slate-700">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  {/* Author */}
                  <div className="mt-8 flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold shadow-sm ${t.color}`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        {t.name}
                        <VerifiedBadge />
                      </p>
                      <p className="text-xs font-medium text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6 — FAQ
      ═══════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-indigo-600">
            Support & Clarity
          </p>
          <h2 className="mx-auto mb-16 max-w-xl text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="mx-auto max-w-3xl">
             <FAQAccordion />
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 7 — CTA BANNER
      ═══════════════════════════════════════════════════ */}
      <section className="px-6 py-8 sm:py-16">
          <div className="mx-auto max-w-5xl rounded-[2.5rem] cta-gradient p-10 sm:p-20 text-center shadow-2xl overflow-hidden relative">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
            
            <div className="relative z-10">
                <ScrollReveal>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/20 px-4 py-1.5 text-xs font-bold tracking-wide text-white backdrop-blur-md border border-white/10 uppercase">
                    Offer expires at the end of {currentMonth}
                </div>
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                    Secure your $200 processing credit today.
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg text-indigo-100 font-medium">
                    Strictly limited allocations available. Submit your application through our secure partner portal to guarantee your grant.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                    href="/checkout"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#0a2540] shadow-xl shadow-indigo-900/20 transition-all duration-300 hover:scale-105 hover:bg-slate-50"
                    >
                    Apply for Partner Grant
                    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                </div>
                <p className="mt-8 flex items-center justify-center gap-4 text-xs font-medium text-white/50">
                    <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg> 256-bit Secure</span>
                    <span>·</span>
                    <span>Cancel Anytime</span>
                </p>
                </ScrollReveal>
            </div>
          </div>
      </section>
    </div>
  );
}
