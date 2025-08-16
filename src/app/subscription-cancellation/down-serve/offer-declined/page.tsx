"use client";

import routes from "@/app/api/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

type Choice = "0" | "1-5" | "6-20" | "20+" | "1-2" | "3-5" | "5+" | null;

export default function OfferDeclined() {
  const router = useRouter();

  const [q1, setQ1] = useState<Choice>(null); // roles applied through MM
  const [q2, setQ2] = useState<Choice>(null); // companies emailed directly
  const [q3, setQ3] = useState<Choice>(null); // companies interviewed with
  const [showError, setShowError] = useState(false);

  const allChosen = Boolean(q1 && q2 && q3);

  const onContinue = () => {
    if (!allChosen) {
      setShowError(true);
      return;
    }
    router.push(routes.mainReason);
  };

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

          {/* Title + progress */}
          <div className="flex items-center gap-4">
            <h2 className="text-sm md:text-base font-medium text-neutral-800">
              Subscription Cancellation
            </h2>
            <div className="hidden sm:flex items-center gap-2">
              <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
              <span className="h-1.5 w-10 rounded-full bg-neutral-700/70" />
              <span className="h-1.5 w-10 rounded-full bg-neutral-300" />
            </div>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              Step 2 of 3
            </span>
          </div>

          {/* Close */}
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
        <div className="grid md:grid-cols-2 md:items-start gap-0 md:gap-8">
          {/* Left column */}
          <section className="px-4 md:px-6 md:pr-8 py-6 md:py-8">
            {/* Desktop / Mobile headings differ per frames */}
            <h1 className="hidden md:block text-[34px] leading-tight font-semibold text-neutral-900 mb-2">
              Help us understand how you we're using Migrate Mate.
            </h1>
            <h1 className="md:hidden text-[26px] leading-8 font-semibold text-neutral-900">
              What’s the main reason for cancelling?
            </h1>

            {/* Error helper (only when user pressed Continue with missing answers) */}
            {showError && (
              <p className="mt-3 md:mt-2 text-sm text-red-600 md:max-w-[38rem]">
                Mind letting us know why you’re cancelling?{" "}
                <br className="hidden md:block" />
                It helps us understand your experience and improve the
                platform.*
              </p>
            )}

            <Question
              label={
                <>
                  How many roles did you <u>apply</u> for through Migrate Mate?
                </>
              }
            >
              <OptionRow
                options={["0", "1-5", "6-20", "20+"]}
                value={q1}
                onChange={setQ1}
              />
            </Question>

            <Question
              label={
                <>
                  How many companies did you <u>email</u> directly?
                </>
              }
            >
              <OptionRow
                options={["0", "1-5", "6-20", "20+"]}
                value={q2}
                onChange={setQ2}
              />
            </Question>

            <Question
              label={
                <>
                  How many different companies did you <u>interview</u> with?
                </>
              }
            >
              <OptionRow
                options={["0", "1-2", "3-5", "5+"]}
                value={q3}
                onChange={setQ3}
              />
            </Question>
            {/* DESKTOP-ONLY divider after options */}
            <div className="hidden md:block h-px bg-neutral-200 my-4" />
            {/* Actions */}
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
              {/* Offer bar */}
              <button
                type="button"
                className="w-full inline-flex items-center justify-center h-12 rounded-xl
                           bg-green-500 hover:bg-green-600 text-white font-medium"
              >
                Get 50% off | $12.50{" "}
                <span className="ml-1 text-white/80 line-through">$25</span>
              </button>

              {/* Continue */}
              <button
                type="button"
                onClick={onContinue}
                className={[
                  "mt-3 w-full inline-flex items-center justify-center h-12 rounded-xl font-medium transition-colors",
                  allChosen
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-neutral-200 text-neutral-500 cursor-pointer",
                ].join(" ")}
              >
                Continue
              </button>
            </div>
          </section>

          {/* Right image (desktop only) */}
          <aside className="hidden md:block p-6 pt-8">
            <div className="relative w-full md:max-w-[420px] md:h-[560px] rounded-2xl overflow-hidden shadow-lg ml-auto">
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

/* ----------------- helpers ----------------- */

function Question({
  label,
  required,
  children,
}: {
  label: ReactNode; // <-- was string
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <p className="text-sm md:text-base text-neutral-700 mb-3">
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </p>
      {children}
    </div>
  );
}

function OptionRow({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: Choice;
  onChange: (v: Choice) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt as Choice)}
            className={[
              "h-10 rounded-lg border text-sm font-medium transition-colors",
              selected
                ? "bg-violet-500 text-white border-violet-500"
                : "bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200",
            ].join(" ")}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
