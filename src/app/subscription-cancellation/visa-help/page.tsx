"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import routes from "@/app/api/routes";

export default function HelpWithVisa() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black/40 md:flex md:items-center md:justify-center">
      {/* Card */}
      <div className="mx-auto w-full md:max-w-5xl bg-white md:rounded-3xl md:shadow-xl md:border md:border-neutral-200 md:my-10">
        {/* Top bar */}
        <div className="relative flex items-center justify-center py-3 md:py-4 border-b border-neutral-200/70 rounded-t-3xl">
          <div className="flex items-center gap-4">
            <h2 className="text-sm md:text-base font-medium text-neutral-800">
              Subscription Cancelled
            </h2>

            {/* Progress (all green) + Completed */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
              <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
              <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              Completed
            </span>
          </div>

          {/* Close (icon darkens on hover; no circular bg) */}
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
          <section className="px-4 md:px-6 md:pr-8 py-6 md:py-8 flex flex-col">
            <h1 className="text-[26px] leading-8 md:text-4xl md:leading-tight font-semibold text-neutral-900 mb-5">
              Your cancellation’s all sorted, mate, no more charges.
            </h1>

            {/* Message card (email style) */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-100/70 p-4 md:p-5">
              {/* Mobile: stacks; md+: avatar column + content column */}
              <div className="grid gap-3 md:gap-4 md:grid-cols-[56px,1fr]">
                {/* Avatar (fixed column on md+) */}
                <div className="md:row-span-4">
                  <Image
                    src="/mihailo-profile.jpeg"
                    alt="Mihailo Bozic"
                    width={56}
                    height={56}
                    className="rounded-full object-cover w-12 h-12 md:w-14 md:h-14"
                  />
                </div>

                {/* Sender (in content column on md+) */}
                <div className="min-w-0 md:col-start-2">
                  <div className="text-[15px] font-medium text-neutral-800 leading-tight">
                    Mihailo Bozic
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    &lt;mihailo@migratemate.co&gt;
                  </div>
                </div>

                {/* Body — same column as sender on md+ */}
                <p className="text-[15px] md:text-base text-neutral-800 font-medium md:col-start-2">
                  I’ll be reaching out soon to help with the visa side of
                  things.
                </p>
                <p className="text-sm md:text-[15px] text-neutral-700 md:col-start-2">
                  We’ve got your back, whether it’s questions, paperwork, or
                  just figuring out your options.
                </p>
                <p className="text-sm md:text-[15px] text-neutral-700 md:col-start-2">
                  Keep an eye on your inbox, I’ll be in touch{" "}
                  <a href="#" className="underline">
                    shortly
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Footer — sticky on mobile, static on md+ */}
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
                onClick={() => router.push("/")}
                className="w-full inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-medium
                           bg-violet-500 hover:bg-violet-600 text-white transition-colors"
              >
                Finish
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
