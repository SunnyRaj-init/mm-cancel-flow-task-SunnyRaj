"use client";

import routes from "@/app/api/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function OfferAccepted() {
  const router = useRouter();
  useEffect(() => {
    const init = async () => {
      // check for cookies if not present just re route to home
      if (!Cookies.get("user_id")) {
        alert("Oops something has changed");
        router.push(routes.home);
        return;
      }

      // check for cookies if not present just re route to home
      const sub = Cookies.get("subscription");
      if (!sub) {
        alert("Oops something has changed");
        router.push(routes.home);
        return;
      }

      // check for cookies if not present just re route to home
      const variant = Cookies.get("downsell_variant");
      if (!variant) {
        alert("Oops something has changed");
        router.push(routes.home);
        return;
      }
    };

    init();
  }, []);
  return (
    <main className="bg-black/40 md:flex md:items-center md:justify-center">
      {/* Card */}
      <div className="w-full md:w-[80%] bg-white md:rounded-3xl md:shadow-xl md:border md:border-neutral-200 md:my-10">
        {/* Top bar */}
        <div className="relative flex items-center justify-center py-3 md:py-4 border-b border-neutral-200/70 rounded-t-3xl">
          <h2 className="text-sm md:text-base font-medium text-neutral-800">
            Subscription
          </h2>

          {/* Close (icon only darkens on hover) */}
          <button
            aria-label="Close"
            onClick={() => router.push(routes.home)}
            className="group absolute right-3 top-3 md:right-4 md:top-4 h-8 w-8 grid place-items-center
                       text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-0 md:gap-8">
          {/* Left column */}
          <section className="px-4 md:px-6 md:pr-8 py-6 md:py-8">
            <h1 className="text-[28px] leading-9 md:text-5xl md:leading-tight font-semibold text-neutral-900">
              Awesome — we’ve pulled together
              <br className="hidden md:block" />
              a few roles that
              <br className="hidden md:block" />
              seem like a great fit for you.
            </h1>

            <p className="text-sm md:text-base text-neutral-600 mt-3 md:mt-4">
              Take a look and see what sparks your interest.
            </p>

            {/* Job card */}
            <div className="mt-5 md:mt-6 rounded-2xl border border-neutral-200 bg-white p-4 md:p-5 shadow-sm">
              {/* Header row */}
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-3">
                  <Image
                    src="/randstandlogo.png"
                    alt="Randstad"
                    width={36}
                    height={36}
                    className="rounded-md object-contain bg-[#1e73ff]/5"
                    priority
                  />
                  <div>
                    <div className="text-[15px] md:text-base font-semibold text-neutral-900">
                      Automation Controls Engineer
                    </div>
                    <div className="text-xs md:text-sm text-neutral-600">
                      Randstad USA • Memphis, Tennessee
                    </div>
                  </div>
                </div>

                {/* chips */}
                <div className="flex flex-wrap gap-2">
                  {["Full Time", "Associate", "Bachelor’s", "On-Site"].map(
                    (t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100/70 px-2.5 py-1 text-[11px] md:text-xs text-neutral-700"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* New + salary */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-semibold text-green-600">
                  NEW JOB
                </span>
                <span className="text-neutral-900 font-semibold">
                  $150,000/yr – $170,000/yr
                </span>
              </div>

              {/* Visa badges row */}
              <div className="mt-4">
                <p className="text-xs text-neutral-500 mb-2">
                  Visas sponsored by company in the last year
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <VisaPill label="Green Card" count={205} color="green" />
                  <VisaPill label="AU E-3" count={3} />
                  <VisaPill label="TN" count={2} />
                  <VisaPill label="OPT" count={9} />
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-[13px] md:text-sm text-neutral-700 leading-relaxed">
                The Electrical Automation Controls Engineer will design,
                implement, and maintain industrial automation systems,
                specializing in PLC programming using Siemens TIA Portal. The
                ideal candidate should have a Bachelor’s degree in Electrical
                Engineering and at least 4 years of industrial automation
                experience. This role offers autonomy and is ideal for someone
                seeking growth in a supportive company. Key benefits include
                comprehensive healthcare and retirement plans.
              </p>

              {/* Contact + actions */}
              <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-[12px] md:text-xs text-neutral-600">
                  Company visa contact:{" "}
                  <a
                    href="mailto:barbara.tuck@randstadusa.com"
                    className="text-violet-600 underline"
                  >
                    barbara.tuck@randstadusa.com
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center h-10 rounded-xl
                               border border-violet-300 bg-white text-violet-700 px-4 text-sm font-medium
                               hover:bg-violet-50"
                    onClick={() => {
                      router.push(routes.home);
                    }}
                  >
                    Save Job
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center h-10 rounded-xl
                               bg-violet-500 hover:bg-violet-600 text-white px-4 text-sm font-medium"
                    onClick={() => {
                      router.push(routes.home);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-5 md:mt-6">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center h-12 rounded-xl
                           bg-violet-500 hover:bg-violet-600 text-white font-medium"
                onClick={() => {
                  router.push(routes.home);
                }}
              >
                Land your dream role
              </button>
            </div>
          </section>

          {/* Right image (desktop only) */}
          <aside className="hidden md:flex items-start p-6 pt-8">
            <div className="h-full w-full rounded-2xl overflow-hidden relative shadow-lg">
              <Image
                src="/empire-state-compressed.jpg"
                alt="Empire State Building"
                fill
                className="object-cover"
                priority
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ---------- tiny component ---------- */
function VisaPill({
  label,
  count,
  color,
}: {
  label: string;
  count?: number;
  color?: "green";
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] md:text-xs",
        color === "green"
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-neutral-200 bg-neutral-100/70 text-neutral-700",
      ].join(" ")}
    >
      {typeof count === "number" && (
        <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-black/10 text-[10px] px-1">
          {count}
        </span>
      )}
      {label}
    </span>
  );
}
