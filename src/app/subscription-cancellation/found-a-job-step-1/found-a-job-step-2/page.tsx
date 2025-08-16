// app/found-a-job-step-2/page.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import routes from "@/api/routes";

export default function FoundAJobStep2Page() {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const minLen = 25;
  const atLeastMin = feedback.trim().length >= minLen;

  const counter = useMemo(() => {
    const n = feedback.trim().length;
    return `${Math.min(n, minLen)}/${minLen}`;
  }, [feedback]);

  return (
    <main className="min-h-screen bg-black/40 md:flex md:items-center md:justify-center">
      {/* Card */}
      <div className="mx-auto w-full md:max-w-5xl bg-white md:rounded-3xl md:shadow-xl md:border md:border-neutral-200 md:my-10">
        {/* Top bar */}
        <div className="flex items-center px-4 md:px-6 py-4 md:py-5 border-b border-neutral-200/70 rounded-t-3xl">
          {/* Back button (no extra packages) */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-1 text-neutral-700 hover:text-neutral-900"
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
          <div className="mx-auto flex items-center gap-4">
            <h2 className="text-sm md:text-base font-medium text-neutral-700">
              Subscription Cancellation
            </h2>

            {/* Progress: 4 pills, 2nd active (green) */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
              <span className="h-1.5 w-10 rounded-full bg-neutral-700/70" />
              <span className="h-1.5 w-10 rounded-full bg-neutral-300" />
            </div>

            <span className="text-xs text-neutral-500 hidden sm:inline">
              Step 2 of 3
            </span>
          </div>

          {/* Close (optional) */}
          <button
            type="button"
            aria-label="Close"
            className="md:inline-flex text-neutral-500 hover:text-neutral-700"
            onClick={() => router.push(routes.home)}
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left column: form */}
          <section className="px-4 md:px-6 py-6 md:py-8 flex flex-col">
            <h1 className="text-[26px] leading-8 md:text-4xl md:leading-tight font-semibold text-neutral-900">
              What’s one thing you wish we could’ve helped you with?
            </h1>

            {/* Mobile-only divider under title */}
            <div className="h-px bg-neutral-200 mt-4 mb-6 md:hidden" />

            <p className="text-sm md:text-base text-neutral-600 mb-4 md:mb-6">
              We’re always looking to improve, your thoughts can help us make
              Migrate Mate more useful for others.*
            </p>

            {/* Textarea + counter */}
            <div className="space-y-2 grow">
              {/* Textarea + in-field counter (visible on all sizes) */}
              <div className="relative">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                  className="w-full rounded-xl border border-black-300 focus:outline-none p-3 pb-9 text-[15px] text-neutral-800 resize-none"
                />
                {/* looks inside the textarea */}
                <span className="pointer-events-none absolute right-3 bottom-2 text-xs text-neutral-500 bg-white/90 px-1 rounded">
                  Min 25 characters ({counter})
                </span>
              </div>
            </div>

            {/* Footer / Continue
                - Sticky on mobile, non-sticky on md+
            */}
            <div
              className="
                sticky bottom-0 z-20 -mx-4 px-4 py-4 mt-6
                border-t border-neutral-200 bg-white
                md:static md:bottom-auto md:z-auto md:mx-0 md:px-0 md:py-8
              "
              style={{
                paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
              }}
            >
              <button
                type="button"
                disabled={!atLeastMin}
                className={`w-full inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-medium transition
                  ${
                    atLeastMin
                      ? "bg-neutral-900 text-white hover:bg-black"
                      : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                  }`}
                onClick={() => {router.push(routes.withMMStep3)}}
              >
                Continue
              </button>
            </div>
          </section>

          {/* Right column: image (desktop only) */}
          <aside className="hidden md:block p-6 pt-8">
            <div className="h-full w-full rounded-2xl overflow-hidden relative shadow-lg">
              <Image
                src="/empire-state-compressed.jpg"
                alt="City skyline"
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
