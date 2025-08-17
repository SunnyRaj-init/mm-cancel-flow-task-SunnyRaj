"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import routes from "@/app/api/routes";
export default function SubscriptionCancelled() {
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

          {/* Close (no circular hover bg; icon darkens only) */}
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
            {/* Mobile image */}
            <div className="relative h-40 rounded-2xl overflow-hidden shadow-md md:hidden mb-5">
              <Image
                src="/empire-state-compressed.jpg"
                alt="Empire State Building"
                fill
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-[26px] leading-8 md:text-4xl md:leading-tight font-semibold text-neutral-900 mb-4">
              All done, your cancellation’s been processed.
            </h1>

            <p className="text-sm md:text-lg text-neutral-700">
              We’re stoked to hear you’ve landed a job and sorted your visa. Big
              congrats from the team. 🙌
            </p>

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
                className="w-full inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-medium
                           bg-violet-500 hover:bg-violet-600 text-white transition-colors"
                onClick={async () => {
                  const res = await fetch(
                    "/api/subscription-cancellation/complete",
                    {
                      method: "POST",
                    }
                  );
                  const { success } = await res.json();
                  if (success) {
                    router.push(routes.home);
                    return;
                  } else {
                    alert(
                      "Unable to process your request. Please try again later."
                    );
                    router.push(routes.home);
                    return;
                  }
                }}
              >
                Finish
              </button>
            </div>
          </section>

          {/* Right column image (desktop only) */}
          <aside className="hidden md:block p-6 pt-8">
            <div className="relative w-full h-[260px] rounded-2xl overflow-hidden shadow-lg">
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
