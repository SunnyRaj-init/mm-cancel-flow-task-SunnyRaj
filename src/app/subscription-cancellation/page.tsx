// app/subscription-cancellation/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import routes from "@/api/routes";
export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-dvh w-full bg-black/40 flex items-center justify-center p-3 md:p-6">
      {/* Modal */}
      <section
        aria-label="Subscription Cancellation"
        className="relative w-full max-w-[1000px] rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-center py-3 md:py-4 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 tracking-tight">
            Subscription Cancellation
          </h2>
          <button
            aria-label="Close"
            onClick={() => window.history.back()}
            className="group absolute right-3 top-3 md:right-4 md:top-4 h-8 w-8 grid place-items-center
               text-gray-500 hover:text-gray-700 transition-colors"
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

        {/* Body: mobile first (image on top), desktop (image on right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 px-4 pb-5 md:px-6 md:pb-8">
          {/* Text column */}
          <div className="order-2 md:order-1 md:pl-2 md:pr-1">
            <div className="px-1 md:px-2">
              <h1 className="md:mt-4 text-[28px] leading-[32px] md:text-[40px] md:leading-[44px] font-semibold tracking-tight text-gray-800 whitespace-nowrap">
                Hey mate,
              </h1>
              <h1 className="text-[28px] leading-[32px] md:text-[40px] md:leading-[44px] font-semibold tracking-tight text-gray-800 whitespace-nowrap">
                Quick one before you go.
              </h1>

              <p className="mt-4 italic font-semibold text-[22px] leading-[28px] md:text-[32px] md:leading-[36px] tracking-tight text-gray-800">
                Have you found a job yet?
              </p>

              <p className="mt-4 text-[13px] leading-5 md:text-[14px] md:leading-6 text-gray-600 max-w-[56ch]">
                Whatever your answer, we just want to help you take the next
                step. With visa support, or by hearing how we can do better.
              </p>

              {/* Divider before buttons */}
              <div className="my-5 border-t border-gray-200"></div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full h-12 md:h-[52px] rounded-xl border border-gray-200 bg-gray-100 text-gray-800 text-[15px] font-medium hover:bg-gray-200 transition-colors"
                  onClick={() => router.push(routes.foundJobStep1)}
                >
                  Yes, I’ve found a job
                </button>
                <button
                  type="button"
                  className="w-full h-12 md:h-[52px] rounded-xl border border-gray-200 bg-white text-gray-800 text-[15px] font-medium hover:bg-gray-50 transition-colors"
                >
                  Not yet – I’m still looking
                </button>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div className="order-1 md:order-2 md:pr-2 md:pl-1 border-b md:border-b-0 border-gray-200 mb-4 md:mb-0 flex items-center justify-center m-5 p-4">
            <div className="group relative w-full aspect-[16/9] md:h-full md:min-h-[360px] md:aspect-auto overflow-hidden rounded-xl md:rounded-2xl bg-black/5 ring-1 ring-black/5 inset-shadow-[inset_0_14px_30px_rgba(0,0,0,0.28),0_1px_0_rgba(255,255,255,0.8)] md:[transform:perspective(1200px)_rotateY(-0.6deg)] md:will-change-transform before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none before:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-40px_80px_rgba(0,0,0,0.25)] after:content-[''] after:absolute after:inset-1 after:rounded-[inherit] after:pointer-events-none after:bg-[radial-gradient(120%_80%_at_20%_0%,rgba(255,255,255,0.35),transparent_60%)] after:mix-blend-overlay after:opacity-60">
              <Image
                src="/empire-state-compressed.jpg"
                alt="New York skyline featuring the Empire State Building at dusk"
                fill
                priority
                className="object-cover rounded-lg"
                sizes="(max-width: 767px) 100vw, 460px"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
