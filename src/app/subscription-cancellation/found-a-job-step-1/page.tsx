// app/found-a-job-step-1/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import routes from "@/app/api/routes";

type Option = string;
type QKey =
  | "foundWithMM"
  | "rolesApplied"
  | "companiesEmailed"
  | "companiesInterviewed";

export default function FoundAJobStep1Page() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<QKey, Option | null>>({
    foundWithMM: null,
    rolesApplied: null,
    companiesEmailed: null,
    companiesInterviewed: null,
  });

  const setAnswer = (k: QKey, v: Option) =>
    setAnswers((s) => ({ ...s, [k]: v }));

  const allAnswered = Object.values(answers).every(Boolean);

  return (
    <main className="min-h-dvh w-full bg-black/40 flex items-center justify-center p-3 md:p-6">
      {/* Card / Modal */}
      <div className="mx-auto w-full md:max-w-5xl bg-white md:rounded-3xl md:shadow-xl md:border md:border-neutral-200 md:my-10">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 md:px-6 py-4 md:py-5 border-b border-neutral-200/70 rounded-t-3xl">
          <button
            type="button"
            className="flex items-center gap-1 text-neutral-700 hover:text-neutral-900"
            onClick={() => window.history.back()}
          >
            {/* Inline chevron icon */}
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

          <div className="mx-auto flex items-center gap-4">
            <h2 className="text-sm md:text-base font-medium text-neutral-700">
              Subscription Cancellation
            </h2>

            <div className="hidden sm:flex items-center gap-2">
              <span className="h-1.5 w-10 rounded-full bg-neutral-700/70" />
              <span className="h-1.5 w-10 rounded-full bg-neutral-300" />
              <span className="h-1.5 w-10 rounded-full bg-neutral-300" />
            </div>

            <span className="text-xs text-neutral-500 hidden sm:inline">
              Step 1 of 3
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
          {/* Form column */}
          <section className="px-4 md:px-6 py-6 md:py-8">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 mb-2">
              Congrats on the new role! 🎉
            </h1>

            {/* Mobile-only divider */}
            <div className="h-px bg-neutral-200 mb-6 md:hidden" />
            <div className="space-y-6 md:space-y-7">
              <Field
                label="Did you find this job with MigrateMate?*"
                options={["Yes", "No"]}
                value={answers.foundWithMM}
                onChange={(v) => setAnswer("foundWithMM", v)}
                columns={2}
              />

              <Field
                label={
                  <>
                    How many roles did you <u>apply</u> for through Migrate
                    Mate?*
                  </>
                }
                options={["0", "1 – 5", "6 – 20", "20+"]}
                value={answers.rolesApplied}
                onChange={(v) => setAnswer("rolesApplied", v)}
              />

              <Field
                label={
                  <>
                    How many companies did you <u>email</u> directly?*
                  </>
                }
                options={["0", "1–5", "6–20", "20+"]}
                value={answers.companiesEmailed}
                onChange={(v) => setAnswer("companiesEmailed", v)}
              />

              <Field
                label={
                  <>
                    How many different companies did you <u>interview</u> with?*
                  </>
                }
                options={["0", "1–2", "3–5", "5+"]}
                value={answers.companiesInterviewed}
                onChange={(v) => setAnswer("companiesInterviewed", v)}
              />
            </div>

            {/* Footer / Continue */}
            <div className="sticky bottom-0 z-20 -mx-4 px-4 py-4 mt-6 md:mt-8 md:border-t border-neutral-200 bg-white pt-6 md:pt-8">
              <button
                type="button"
                disabled={!allAnswered}
                className={`w-full inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-medium transition
      ${
        allAnswered
          ? "bg-neutral-900 text-white hover:bg-black"
          : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
      }`}
                onClick={() => {
                  router.push(routes.foundJobStep2);
                }}
              >
                Continue
              </button>
            </div>
          </section>

          {/* Image column (hidden on mobile) */}
          <aside className="hidden md:block p-6 pt-8">
            <div className="h-full w-full aspect-[16/9] bg-black/5 rounded-2xl overflow-hidden relative shadow-lg">
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

/* ---------- Reusable field (segmented radio group) ---------- */

function Field({
  label,
  options,
  value,
  onChange,
  columns = 4,
}: {
  label: React.ReactNode;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
  columns?: 2 | 3 | 4;
}) {
  const gridCols =
    columns === 2
      ? "grid-cols-2"
      : columns === 3
      ? "grid-cols-3"
      : "grid-cols-4";

  return (
    <div className="space-y-2">
      <p className="text-sm md:text-base text-neutral-800">{label}</p>
      <div className={`grid ${gridCols} gap-3`}>
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={[
                "h-11 rounded-xl border text-sm font-medium transition",
                "focus:outline-none focus:ring-2 focus:ring-neutral-300",
                selected
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200",
              ].join(" ")}
              aria-pressed={selected}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
