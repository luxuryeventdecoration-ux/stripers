import ScrollReveal from "../components/ScrollReveal";
import FAQAccordion from "../components/FAQAccordion";

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

/* ── Benefits data ── */
const BENEFITS = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "5-Minute Setup",
    desc: "Go from sign-up to accepting payments in minutes. No technical expertise required — our guided onboarding handles everything.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "$200 Random Bonus",
    desc: "Every new sign-up enters our bonus pool. Selected startups receive $200 in Stripe processing credits — completely free.",
    highlight: true,
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Bank-Grade Security",
    desc: "PCI DSS Level 1 certified with end-to-end encryption. Your customers' payment data is protected by the same infrastructure powering Fortune 500s.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "24/7 Expert Support",
    desc: "Dedicated support team available around the clock. Get help with integration, troubleshooting, or account questions whenever you need it.",
  },
];

/* ── Steps data ── */
const STEPS = [
  {
    num: "01",
    title: "Sign Up Through Our Link",
    desc: "Create your Stripe account using our exclusive partnership referral link. The process takes under 5 minutes.",
  },
  {
    num: "02",
    title: "Verify Your Business",
    desc: "Complete Stripe's standard business verification. Typically approved within 1-2 business days.",
  },
  {
    num: "03",
    title: "Get Selected for Bonus",
    desc: "Once verified, you're automatically entered into our $200 bonus pool. Winners are selected randomly and notified via email.",
  },
];

/* ── Testimonials data ── */
const TESTIMONIALS = [
  {
    quote: "Signed up in minutes and received the $200 bonus within a week. The whole process was seamless — exactly what a startup needs.",
    name: "Priya Sharma",
    role: "Founder, PayStack India",
    initials: "PS",
    color: "bg-violet-100 text-violet-600",
  },
  {
    quote: "We switched to Stripe through this partnership and haven't looked back. The bonus was a fantastic surprise on top of an already great product.",
    name: "Alex Chen",
    role: "CTO, NovaPay",
    initials: "AC",
    color: "bg-sky-100 text-sky-600",
  },
  {
    quote: "As a freelancer, every dollar counts. The $200 credit covered my first month of processing fees entirely. Highly recommend.",
    name: "Maria González",
    role: "Independent Consultant",
    initials: "MG",
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
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

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Official Stripe Partner — Limited Bonus Available
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Unlock{" "}
            <span className="relative inline-block">
              $200 Bonus
              <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-white/30" />
            </span>{" "}
            <br />
            with Stripe
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            Join 1,000+ startups using Stripe through our partnership. Sign up
            today and get a chance to win $200 in processing credits — no
            strings attached.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/checkout"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0a2540] shadow-lg shadow-black/10 transition-all duration-200 hover:shadow-xl hover:shadow-black/15"
            >
              Claim Your $200 Bonus
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/12"
            >
              Learn How It Works
            </a>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — PARTNERSHIP INFO
      ═══════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text side */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Official Partnership
              </p>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Empowering startups through Stripe&apos;s global infrastructure
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-500">
                We&apos;ve partnered with Stripe to give startups and small
                businesses the best possible start. Through this exclusive
                program, new users get access to Stripe&apos;s world-class
                payment infrastructure — plus a chance to receive $200 in
                processing credits.
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
              >
                Read about our partnership
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Stats side */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "1,000+", label: "Startups Onboarded" },
                { value: "$200", label: "Bonus Per Selection" },
                { value: "135+", label: "Countries Supported" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-400">
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
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Why Sign Up
            </p>
            <h2 className="mx-auto max-w-lg text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to start accepting payments
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 100}>
                <div
                  className={`group relative rounded-2xl p-8 transition-all duration-300 ${b.highlight
                    ? "bg-[#0a2540] text-white"
                    : "bg-white ring-1 ring-slate-200/60 hover:ring-slate-300/80"
                    }`}
                >
                  <div
                    className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${b.highlight
                      ? "bg-white/10 text-white"
                      : "bg-indigo-50 text-indigo-600"
                      }`}
                  >
                    {b.icon}
                  </div>
                  <h3
                    className={`text-lg font-bold ${b.highlight ? "text-white" : "text-slate-900"
                      }`}
                  >
                    {b.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${b.highlight ? "text-white/65" : "text-slate-500"
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
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-indigo-600">
            How It Works
          </p>
          <h2 className="mx-auto max-w-md text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Three simple steps to get started
          </h2>
        </ScrollReveal>

        <div className="relative mt-16">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-4 hidden h-[calc(100%-2rem)] w-px bg-slate-200 sm:block lg:left-1/2 lg:-translate-x-px" />

          <div className="space-y-12 lg:space-y-16">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 120}>
                <div
                  className={`relative grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:direction-rtl" : ""
                    }`}
                >
                  {/* Number circle */}
                  <div className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white bg-indigo-600 text-sm font-bold text-white shadow-[0_0_0_4px_rgba(99,91,255,0.15),0_4px_12px_rgba(99,91,255,0.25)] lg:left-1/2 lg:-translate-x-1/2">
                    {step.num}
                  </div>

                  {/* Content — offset to the right of the line */}
                  <div
                    className={`pl-16 sm:pl-20 lg:pl-0 ${i % 2 === 0
                      ? "lg:col-start-1 lg:pr-20 lg:text-right"
                      : "lg:col-start-2 lg:pl-20"
                      }`}
                    style={{ direction: "ltr" }}
                  >
                    <h3 className="text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
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
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Testimonials
            </p>
            <h2 className="mx-auto max-w-lg text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Trusted by startups worldwide
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-7 ring-1 ring-slate-200/60">
                  {/* Stars */}
                  <div>
                    <div className="mb-4 flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  {/* Author */}
                  <div className="mt-6 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${t.color}`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-400">{t.role}</p>
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
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-indigo-600">
            FAQ
          </p>
          <h2 className="mx-auto mb-12 max-w-md text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Common questions, answered
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <FAQAccordion />
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 7 — CTA BANNER
      ═══════════════════════════════════════════════════ */}
      <section className="cta-gradient px-6 py-24 text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Ready to claim your $200 bonus?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/60">
            Limited spots available. Sign up through our partnership link today
            and enter the random selection pool.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/checkout"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0a2540] shadow-lg shadow-black/10 transition-all duration-200 hover:shadow-xl"
            >
              Claim Your Bonus Now
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/12"
            >
              Contact Sales
            </a>
          </div>
          <p className="mt-6 text-xs text-white/40">
            No credit card required · Free to sign up · Cancel anytime
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
