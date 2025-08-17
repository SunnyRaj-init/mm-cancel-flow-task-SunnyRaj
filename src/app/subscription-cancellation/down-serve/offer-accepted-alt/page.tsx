// app/subscription-accepted/page.tsx
"use client";

import routes from "@/app/api/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import apiRoutes from "@/app/api/apiRoutes";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function SubscriptionAccepted() {
  const router = useRouter();
  const [price, setPrice] = useState(Number);
  const [dueDate, setDueDate] = useState(String);
  const [daysLeft, setDaysLeft] = useState(Number);
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
      const res = await fetch(apiRoutes.home, { method: "GET" });
      const { subscription } = await res.json();

      if (subscription.monthly_price) {
        setPrice(parseInt(subscription.monthly_price) / 100);
      }

      if (subscription.next_due_date) {
        const iso = new Date(subscription.next_due_date).toISOString();
        setDueDate(iso);

        const days = Math.ceil(
          (new Date(iso).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        );
        setDaysLeft(days);
      }
    };

    init();
  }, []);

  return (
    <main className="min-h-screen bg-black/40 md:flex md:items-center md:justify-center">
      {/* Card */}
      <div className="mx-auto w-full md:max-w-5xl bg-white md:rounded-3xl md:shadow-xl md:border md:border-neutral-200">
        {/* Top bar */}
        <div className="relative flex items-center justify-center py-3 md:py-4 border-b border-neutral-200/70 rounded-t-3xl">
          {/* Title differs between mobile/desktop per frames */}
          <h2 className="text-sm md:text-base font-medium text-neutral-800">
            <span className="md:hidden">Subscription Continued</span>
            <span className="hidden md:inline">Subscription</span>
          </h2>

          {/* Close (icon only darkens on hover) */}
          <button
            aria-label="Close"
            onClick={() => {
              router.push(routes.home);
            }}
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
        <div className="grid md:grid-cols-2 md:items-start gap-0 md:gap-8">
          {/* Left column */}
          <section className="px-4 md:px-6 md:pr-8 py-6 md:py-8">
            {/* Mobile banner image */}
            <div className="relative h-40 rounded-2xl overflow-hidden shadow-md md:hidden mb-5">
              <Image
                src="/empire-state-compressed.jpg"
                alt="Empire State Building"
                fill
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-[26px] leading-8 md:text-4xl md:leading-tight font-semibold text-neutral-900">
              Great choice, mate!
            </h1>

            <p className="text-[17px] md:text-2xl text-neutral-800 mt-2 md:mt-3 font-semibold">
              You&apos;re still on the path to your dream role.&nbsp;
              <a href="#" className="text-violet-600 underline">
                Let’s make it happen together!
              </a>
            </p>

            <p className="text-sm md:text-base text-neutral-700 mt-4">
              You’ve got {daysLeft} days left on your current plan. Starting
              from{" "}
              {new Date(dueDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
              , your monthly payment will be ${price}.
            </p>

            <p className="text-xs md:text-sm text-neutral-500 italic mt-3">
              You can cancel anytime before then.
            </p>

            {/* Divider above CTA (desktop only to match frame) */}
            <div className="hidden md:block h-px bg-neutral-200 my-6" />

            {/* CTA — sticky on mobile, static on desktop */}
            <div
              className="
                sticky bottom-0 z-20 -mx-4 px-4 py-4 mt-6 bg-white
                before:content-[''] before:absolute before:left-0 before:right-0 before:-top-px before:h-px before:bg-neutral-200
                md:static md:mx-0 md:px-0 md:py-0 md:before:hidden
              "
              style={{
                paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
              }}
            >
              <button
                type="button"
                className="w-full inline-flex items-center justify-center h-12 rounded-xl
                           bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors"
                onClick={() => {
                  router.push(routes.home);
                }}
              >
                Land your dream role
              </button>
            </div>
          </section>

          {/* Right image (desktop only) */}
          <aside className="hidden md:block p-6 pt-8">
            <div className="relative w-full md:max-w-[420px] md:h-[260px] rounded-2xl overflow-hidden shadow-lg ml-auto">
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
