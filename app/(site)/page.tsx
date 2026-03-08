export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ── Hero section with Stripe gradient ── */}
      <section className="stripe-gradient relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pt-20">
        {/* Subtle radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,91,255,0.15),transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Financial infrastructure for the{" "}
            <span className="bg-linear-to-r from-violet-300 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
              internet
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Millions of companies of all sizes use Stripe to accept payments,
            grow their revenue, and accelerate new business opportunities.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/checkout"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30"
            >
              Start now
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
            >
              Contact sales
            </a>
          </div>
        </div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent" />
      </section>

      {/* ── Content below hero to show scroll behavior ── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-12 sm:grid-cols-3">
          {[
            {
              title: "Payments",
              desc: "A fully integrated suite of payments products to manage online and in-person payment processing.",
            },
            {
              title: "Billing",
              desc: "Smart invoicing and subscription management to help you capture more revenue.",
            },
            {
              title: "Connect",
              desc: "Everything platforms need to onboard, verify, and pay sellers and service providers.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {item.desc}
              </p>
              <a
                href="#"
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
              >
                Learn more
                <svg
                  className="h-3.5 w-3.5"
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
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
