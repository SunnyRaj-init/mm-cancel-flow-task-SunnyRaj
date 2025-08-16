"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import routes from "@/api/routes";
type Lawyer = "yes" | "no" | null;
import { useMemo } from "react";

export default function Step3() {
  const router = useRouter();
  const [lawyer, setLawyer] = useState<Lawyer>(null);
  const [visa, setVisa] = useState("");

  const canContinue = useMemo(
    () => Boolean(lawyer && visa.trim().length > 0),
    [lawyer, visa]
  );

  return (
    <main className="min-h-screen bg-black/40 md:flex md:items-center md:justify-center">
      {/* Card */}
      <div className="mx-auto w-full md:max-w-5xl bg-white md:rounded-3xl md:shadow-xl md:border md:border-neutral-200 md:my-10">
        {/* Top bar */}
        <div className="flex items-center px-4 md:px-6 py-4 md:py-5 border-b border-neutral-200/70 rounded-t-3xl">
          {/* Back (inline SVG, no packages) */}
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

            {/* Progress: first two green, last gray */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
              <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
              <span className="h-1.5 w-10 rounded-full bg-neutral-700/70" />
            </div>

            <span className="text-xs text-neutral-500 hidden sm:inline">
              Step 3 of 3
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

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left column */}
          <section className="px-4 md:px-6 py-6 md:py-8 flex flex-col">
            <h1 className="text-[26px] leading-8 md:text-4xl md:leading-tight font-semibold text-neutral-800">
              <span className="block md:whitespace-nowrap">
                You landed a job!
              </span>
              <span className="block md:whitespace-nowrap">
                That’s what we live for.
              </span>
            </h1>
            <h1 className="text-[16px] leading-8 md:text-lg md:leading-tight font-semibold text-neutral-800 mt-2">
              <span className="block md:whitespace-nowrap">
                Even if it wasn't through Migrate Mate,
              </span>
              {/* Show on md+ */}
              <span className="hidden md:block md:whitespace-nowrap text-neutral-800">
                Let us help you get your visa sorted.
              </span>

              {/* Show on mobile only */}
              <span className="block md:hidden text-neutral-800">
                Let us help you get your <u>visa</u> sorted.
              </span>
            </h1>

            {/* Mobile-only divider under title */}
            <div className="h-px bg-neutral-200 mt-4 mb-6 md:hidden" />

            {/* Question */}
            <div className="space-y-4 mt-6">
              <p className="text-sm md:text-base text-neutral-700">
                Is your company providing an immigration lawyer to help with
                your visa?*
              </p>

              {/* Radios */}
              <div className="space-y-3">
                {lawyer === null ? (
                  <>
                    <RadioRow
                      label="Yes"
                      checked={false}
                      onChange={() => setLawyer("yes")}
                    />
                    <RadioRow
                      label="No"
                      checked={false}
                      onChange={() => setLawyer("no")}
                    />
                  </>
                ) : lawyer === "yes" ? (
                  // After choosing YES: only show YES, highlighted
                  <SelectedRow
                    label="Yes"
                    onClear={() => setLawyer(null)} // remove if you don't want to allow changing
                  />
                ) : (
                  // After choosing NO: only show NO, highlighted
                  <SelectedRow
                    label="No"
                    onClear={() => setLawyer(null)} // remove if you don't want to allow changing
                  />
                )}
              </div>
            </div>

            {/* Conditional content to match frames */}
            <div className="mt-5 md:mt-6 space-y-3">
              {lawyer === "no" && (
                <>
                  <p className="text-sm md:text-base text-neutral-700">
                    We can connect you with one of our trusted partners. Which
                    visa would you like to apply for?*
                  </p>
                  <InputVisa value={visa} setValue={setVisa} />
                </>
              )}

              {lawyer === "yes" && (
                <>
                  <p className="text-sm md:text-base text-neutral-700">
                    What visa will you be applying for?*
                  </p>
                  <InputVisa value={visa} setValue={setVisa} />
                </>
              )}
            </div>

            {/* Footer — sticky on mobile, non-sticky on md+ */}
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
                disabled={!canContinue}
                className={`w-full inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-medium transition
    ${
      canContinue
        ? "bg-neutral-900 text-white hover:bg-black"
        : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
    }`}
                onClick={() => {
                  if (!canContinue) return;
                  // router.push(routes.home) or submit action
                }}
              >
                Complete cancellation
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

/* --------- bits --------- */

function RadioRow({
  label,
  checked,
  onChange,
}: {
  label: "Yes" | "No";
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />

      {/* Outer: turns black when checked */}
      <span
        className="
          relative inline-flex h-5 w-5 shrink-0 items-center justify-center
          rounded-full border border-neutral-400 bg-white align-middle
          peer-checked:bg-black peer-checked:border-black
        "
      >
        {/* Inner: perfectly centered white dot */}
        <span
          className="
            pointer-events-none absolute left-1/2 top-1/2
            h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2
            rounded-full bg-white opacity-0 peer-checked:opacity-100
            transition-opacity
          "
        />
      </span>

      <span className="text-neutral-800 text-sm md:text-base">{label}</span>
    </label>
  );
}

function SelectedRow({
  label,
  onClear,
}: {
  label: "Yes" | "No";
  onClear?: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div role="radio" aria-checked="true" className="flex items-center gap-3">
        <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black border border-black align-middle">
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </span>
        <span className="text-neutral-900 text-sm md:text-base font-medium">
          {label}
        </span>
      </div>

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-neutral-500 hover:text-neutral-700"
        >
          Change
        </button>
      )}
    </div>
  );
}

function InputVisa({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter visa type…"
      className="w-full rounded-xl border border-neutral-300 p-3 text-[15px] text-neutral-800 outline-none focus:border-neutral-900 focus:ring-0"
    />
  );
}
