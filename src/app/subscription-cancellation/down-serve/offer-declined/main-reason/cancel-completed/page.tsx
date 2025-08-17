"use client";

import routes from "@/app/api/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect,useState } from "react";

export default function CancelCompleted() {
  const router = useRouter();

  const [v, setV] = useState("");
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
      if (["A", "B"].includes(variant)) {
        setV(variant);
      }
    };

    init();
  }, []);
  return (
    <main className="min-h-screen bg-black/40 md:py-10">
      {/* Card */}
      <div className="mx-auto w-full md:max-w-5xl bg-white md:rounded-3xl md:shadow-xl md:border md:border-neutral-200">
        {/* Top bar */}
        <div className="relative flex items-center justify-center py-3 md:py-4 border-b border-neutral-200/70 rounded-t-3xl">
          {/* Back */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="absolute left-3 top-3 md:left-4 md:top-4 flex items-center gap-1 text-neutral-700 hover:text-neutral-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth={2}
              strokeLinecap="round" strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-sm md:text-base font-medium">Back</span>
          </button>

          <div className="flex items-center gap-4">
            <h2 className="text-sm md:text-base font-medium text-neutral-800">
              Subscription Cancelled
            </h2>
            {v === "B" && (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
                  <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
                  <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-neutral-500 hidden sm:inline">
                  Completed
                </span>
              </>
            )}
            {v === "A" && (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
                  <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-neutral-500 hidden sm:inline">
                  Completed
                </span>
              </>
            )}
          </div>

          {/* Close */}
          <button
            aria-label="Close"
            onClick={() => router.push(routes.home)}
            className="group absolute right-3 top-3 md:right-4 md:top-4 h-8 w-8 grid place-items-center
                       text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 md:items-stretch gap-0 md:gap-8">
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
              Sorry to see you go, mate.
            </h1>

            <p className="mt-2 md:mt-3 text-[18px] md:text-3xl font-semibold text-neutral-900">
              Thanks for being with us, and you’re always welcome back.
            </p>

            <p className="mt-4 text-sm md:text-base text-neutral-700">
              Your subscription is set to end on XX date. You’ll still have full access
              until then. No further charges after that.
            </p>

            <p className="mt-3 text-xs md:text-sm text-neutral-500">
              Changed your mind? You can reactivate anytime before your end date.
            </p>

            {/* Divider (desktop like frame) */}
            <div className="hidden md:block h-px bg-neutral-200 my-6" />

            {/* CTA — sticky on mobile, static on desktop */}
            <div
              className="
                sticky bottom-0 z-20 -mx-4 px-4 py-4 mt-6 bg-white
                before:content-[''] before:absolute before:left-0 before:right-0 before:-top-px before:h-px before:bg-neutral-200
                md:static md:mx-0 md:px-0 md:py-0 md:before:hidden
              "
              style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
            >
              <button
                type="button"
                onClick={() => router.push(routes.home)}
                className="w-full inline-flex items-center justify-center h-12 rounded-xl
                           bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors"
              >
                Back to Jobs
              </button>
            </div>
          </section>

          {/* Right image (desktop only) */}
          <aside className="hidden md:block p-6 pt-8">
            <div className="relative w-full md:max-w-[420px] h-full min-h-[240px] rounded-2xl overflow-hidden shadow-lg ml-auto">
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
