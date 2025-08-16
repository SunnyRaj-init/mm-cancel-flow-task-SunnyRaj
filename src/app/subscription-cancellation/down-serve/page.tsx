"use client";

import routes from "@/app/api/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DownserveOffer() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black/40 md:flex md:items-center md:justify-center">
      {/* Card */}
      <div className="mx-auto w-full md:max-w-5xl bg-white md:rounded-3xl md:shadow-xl md:border md:border-neutral-200 md:my-10">
        {/* Top bar */}
        <div className="relative flex items-center justify-center py-3 md:py-4 border-b border-neutral-200/70 rounded-t-3xl">
          {/* Back */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="absolute left-3 top-3 md:left-4 md:top-4 flex items-center gap-1 text-neutral-700 hover:text-neutral-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-sm md:text-base font-medium">Back</span>
          </button>

          {/* Center title + progress */}
          <div className="flex items-center gap-4">
            <h2 className="text-sm md:text-base font-medium text-neutral-800">
              Subscription Cancellation
            </h2>

            {/* neutral progress pills */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="h-1.5 w-10 rounded-full bg-neutral-700/70" />
              <span className="h-1.5 w-10 rounded-full bg-neutral-300" />
              <span className="h-1.5 w-10 rounded-full bg-neutral-300" />
            </div>

            <span className="text-xs text-neutral-500 hidden sm:inline">
              Step 1 of 3
            </span>
          </div>

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
            <h1 className="text-[26px] leading-8 md:text-4xl md:leading-tight font-semibold text-neutral-900">
              We built this to help you land the job, this makes it a little
              easier.
            </h1>

            <p className="text-sm md:text-base text-neutral-600 mt-3 md:mt-4">
              We’ve been there and we’re here to help you.
            </p>

            {/* Purple offer card */}
            <div className="mt-5 md:mt-6 rounded-2xl border border-violet-300/70 bg-violet-100/60 p-4 md:p-5">
              <p className="text-xl md:text-2xl font-semibold text-neutral-900">
                Here’s <u>50% off</u> until you find a job.
              </p>

              <div className="flex items-baseline gap-4 mt-3">
                <span className="text-violet-600 font-semibold text-xl">
                  $12.50
                </span>
                <span className="text-violet-600">/month</span>
                <span className="text-neutral-400 line-through ml-2">
                  $25/month
                </span>
              </div>

              <button
                type="button"
                className="mt-4 w-full inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-medium
                           bg-green-500 hover:bg-green-600 text-white transition-colors"
                           onClick={()=>{router.push(routes.offerAcceptedAlt)}}
              >
                Get 50% off
              </button>

              <p className="mt-3 text-xs text-neutral-500 italic text-center md:text-left">
                You wont be charged until your next billing date.
              </p>
            </div>

            {/* Footer button */}
            <div
              className="sticky bottom-0 z-20 -mx-4 px-4 py-4 mt-6 bg-white
                         before:content-[''] before:absolute before:left-0 before:right-0 before:-top-px before:h-px before:bg-neutral-200
                         md:static md:mx-0 md:px-0 md:py-8 md:border-t md:border-neutral-200"
              style={{
                paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
              }}
            >
              <button
                type="button"
                className="w-full inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-medium
                           bg-white-100 text-neutral-700 border border-neutral-300"
                           onClick={()=>{router.push(routes.offerDeclined)}}
              >
                No thanks
              </button>
            </div>
          </section>

          {/* Right column image (desktop only) */}
          <aside className="hidden md:block p-6 pt-8">
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
