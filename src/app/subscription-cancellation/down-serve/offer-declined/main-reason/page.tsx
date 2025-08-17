// app/main-reason/page.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import routes from "@/app/api/routes";
import Cookies from "js-cookie";
import apiRoutes from "@/app/api/apiRoutes";

type Reason =
  | "too-expensive"
  | "platform-not-helpful"
  | "not-enough-relevant-jobs"
  | "decided-not-to-move"
  | "other"
  | null;

// helper
const onlyNumericKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const k = e.key;
  // allow control keys
  if (
    [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ].includes(k)
  )
    return;
  // allow digits
  if (/^\d$/.test(k)) return;
  // allow one decimal point
  if (k === "." && !e.currentTarget.value.includes(".")) return;
  // block everything else (e/E/+/- etc.)
  e.preventDefault();
};

const sanitize = (s: string) => {
  // keep digits and at most one dot
  const cleaned = s.replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");
  return parts.length > 1
    ? `${parts[0]}.${parts.slice(1).join("").replace(/\./g, "")}`
    : parts[0];
};

export default function MainReason() {
  const router = useRouter();

  const [reason, setReason] = useState<Reason>(null);

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
      // ---- Prefill fields from the "cancellation" cookie (if present)
    const raw = Cookies.get("cancellation");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);

        // reason
        if (
          parsed.reason === "too-expensive" ||
          parsed.reason === "platform-not-helpful" ||
          parsed.reason === "not-enough-relevant-jobs" ||
          parsed.reason === "decided-not-to-move" ||
          parsed.reason === "other"
        ) {
          setReason(parsed.reason);
        }

        // reason_description, mapped to either price or textarea based on reason
        if (parsed.reason_description) {
          if (parsed.reason === "too-expensive") {
            setPrice(String(parsed.reason_description));
          } else {
            setDesc(String(parsed.reason_description));
          }
        }
      } catch {
        // ignore invalid cookie
      }
    }
    };

    init();
  }, []);
  // follow-ups
  const [price, setPrice] = useState(""); // too-expensive
  const [desc, setDesc] = useState(""); // textarea reasons
  const [showError, setShowError] = useState(false);

  const needsPrice = reason === "too-expensive";
  const needsTextarea =
    reason === "platform-not-helpful" ||
    reason === "not-enough-relevant-jobs" ||
    reason === "decided-not-to-move" ||
    reason === "other";

  // numeric validation for price
  const priceValid = useMemo(() => {
    if (!needsPrice) return true;
    if (price === "") return false;
    const n = Number(price);
    return Number.isFinite(n) && n >= 0;
  }, [needsPrice, price]);

  // textarea min length 25
  const textareaValid = useMemo(() => {
    if (!needsTextarea) return true;
    return desc.trim().length >= 25;
  }, [needsTextarea, desc]);

  const canContinue = Boolean(reason) && priceValid && textareaValid;

  const onContinue = async () => {
    if (!canContinue) {
      setShowError(true);
      return;
    }

    // description field = price (for too-expensive) or textarea (for others)
    const descriptionValue = reason === "too-expensive" ? price : desc.trim();

    // merge new fields into the "cancellation" cookie
    const raw = Cookies.get("cancellation");
    if(!raw){
      alert("unable to handle your request now")
      router.push(routes.home)
      return
    }
    const prev = raw ? JSON.parse(raw) : {};
    const updated = {
      ...prev,
      reason,
      reason_description: descriptionValue,
    };
    Cookies.set("cancellation", JSON.stringify(updated), {
      path: "/",
      expires: 1,
    });

    // hit the backend route
    const res = await fetch("/api/offer-declined/main-reason", {
      method: "POST",
      body: JSON.stringify({
        reason,
        description: descriptionValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { success } = await res.json();
    if (success) {
      router.push(routes.cancelCompleted);
    } else {
      alert("Something went wrong. Please try again later.");
      router.push(routes.home);
    }
  };

  const resetFollowups = () => {
    setPrice("");
    setDesc("");
    setShowError(false);
  };

  return (
    <main className="min-h-screen bg-black/40 md:py-10">
      <div className="mx-auto w-full md:max-w-5xl bg-white md:rounded-3xl md:shadow-xl md:border md:border-neutral-200">
        {/* Top bar */}
        <div className="relative flex items-center justify-center py-3 md:py-4 border-b border-neutral-200/70 rounded-t-3xl">
          <button
            type="button"
            onClick={() => router.push(routes.offerDeclined)}
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

          <div className="flex items-center gap-4">
            <h2 className="text-sm md:text-base font-medium text-neutral-800">
              Subscription Cancellation
            </h2>
            {v === "B" && (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
                  <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
                  <span className="h-1.5 w-10 rounded-full bg-neutral-700/70" />
                </div>
                <span className="text-xs text-neutral-500 hidden sm:inline">
                  Step 3 of 3
                </span>
              </>
            )}
            {v === "A" && (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="h-1.5 w-10 rounded-full bg-green-500/80" />
                  <span className="h-1.5 w-10 rounded-full bg-neutral-700/70" />
                </div>
                <span className="text-xs text-neutral-500 hidden sm:inline">
                  Step 2 of 2
                </span>
              </>
            )}
          </div>

          <button
            aria-label="Close"
            onClick={() => router.push(routes.home)}
            className="group absolute right-3 top-3 md:right-4 md:top-4 h-8 w-8 grid place-items-center text-neutral-500 hover:text-neutral-700"
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
        <div className="grid md:grid-cols-2 md:items-stretch gap-0 md:gap-8">
          {/* Left */}
          <section className="px-4 md:px-6 md:pr-8 py-6 md:py-8">
            <h1 className="text-[26px] leading-8 md:text-4xl md:leading-tight font-semibold text-neutral-900">
              What’s the main reason for cancelling?
            </h1>
            <p className="text-sm md:text-base text-neutral-600 mt-2">
              Please take a minute to let us know why:
            </p>

            {/* Reasons: list or single selected */}
            <div className="mt-4">
              {reason === null ? (
                <div className="space-y-3">
                  <RadioRow
                    label="Too expensive"
                    onChange={() => {
                      setReason("too-expensive");
                      resetFollowups();
                    }}
                  />
                  <RadioRow
                    label="Platform not helpful"
                    onChange={() => {
                      setReason("platform-not-helpful");
                      resetFollowups();
                    }}
                  />
                  <RadioRow
                    label="Not enough relevant jobs"
                    onChange={() => {
                      setReason("not-enough-relevant-jobs");
                      resetFollowups();
                    }}
                  />
                  <RadioRow
                    label="Decided not to move"
                    onChange={() => {
                      setReason("decided-not-to-move");
                      resetFollowups();
                    }}
                  />
                  <RadioRow
                    label="Other"
                    onChange={() => {
                      setReason("other");
                      resetFollowups();
                    }}
                  />
                </div>
              ) : (
                <SelectedRow
                  label={
                    reason === "too-expensive"
                      ? "Too expensive"
                      : reason === "platform-not-helpful"
                      ? "Platform not helpful"
                      : reason === "not-enough-relevant-jobs"
                      ? "Not enough relevant jobs"
                      : reason === "decided-not-to-move"
                      ? "Decided not to move"
                      : "Other"
                  }
                  onClear={() => setReason(null)}
                />
              )}
            </div>

            {/* Follow-ups */}
            <div className="mt-5 space-y-2">
              {reason === "too-expensive" && (
                <>
                  <label className="block text-sm md:text-base text-neutral-700">
                    What would be the maximum you would be willing to pay?*
                  </label>
                  {/* Error for price */}
                  {showError && !priceValid && (
                    <p className="text-sm text-red-600">Please enter amount</p>
                  )}
                  {/* Price field (Too expensive) */}
                  <input
                    type="text" // use text so browsers don't allow 'e' etc.
                    inputMode="decimal" // mobile numeric keypad
                    value={price}
                    onChange={(e) => setPrice(sanitize(e.target.value))}
                    onKeyDown={onlyNumericKeys}
                    onPaste={(e) => {
                      e.preventDefault();
                      const text = (
                        e.clipboardData || (window as any).clipboardData
                      ).getData("text");
                      setPrice(sanitize(text));
                    }}
                    placeholder="$"
                    className="w-full rounded-xl border border-neutral-300 p-3 text-[15px] text-neutral-800 outline-none focus:border-neutral-900 focus:ring-0"
                  />
                </>
              )}

              {reason === "platform-not-helpful" && (
                <>
                  <label className="block text-sm md:text-base text-neutral-700">
                    What can we change to make the platform more helpful?*
                  </label>
                  {showError && !textareaValid && (
                    <p className="text-sm text-red-600">
                      Please enter at least 25 characters so we can understand
                      your feedback*
                    </p>
                  )}
                  <TextareaWithCounter value={desc} onChange={setDesc} />
                </>
              )}

              {reason === "not-enough-relevant-jobs" && (
                <>
                  <label className="block text-sm md:text-base text-neutral-700">
                    In which way can we make the jobs more relevant?*
                  </label>
                  {showError && !textareaValid && (
                    <p className="text-sm text-red-600">
                      Please enter at least 25 characters so we can understand
                      your feedback*
                    </p>
                  )}
                  <TextareaWithCounter value={desc} onChange={setDesc} />
                </>
              )}

              {reason === "decided-not-to-move" && (
                <>
                  <label className="block text-sm md:text-base text-neutral-700">
                    What changed for you to decide to not move?*
                  </label>
                  {showError && !textareaValid && (
                    <p className="text-sm text-red-600">
                      Please enter at least 25 characters so we can understand
                      your feedback*
                    </p>
                  )}
                  <TextareaWithCounter value={desc} onChange={setDesc} />
                </>
              )}

              {reason === "other" && (
                <>
                  <label className="block text-sm md:text-base text-neutral-700">
                    What would have helped you the most?*
                  </label>
                  {showError && !textareaValid && (
                    <p className="text-sm text-red-600">
                      Please enter at least 25 characters so we can understand
                      your feedback*
                    </p>
                  )}
                  <TextareaWithCounter value={desc} onChange={setDesc} />
                </>
              )}
            </div>
            {/* DESKTOP-ONLY divider after options */}
            <div className="hidden md:block h-px bg-neutral-200 my-4" />
            {/* CTA area */}
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
              {v === "B" && (
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center h-12 rounded-xl
                           bg-green-500 hover:bg-green-600 text-white font-medium"
                  onClick={async () => {
                    const res = await fetch(apiRoutes.OfferAccepted, {
                      method: "POST",
                    });
                    const { success } = await res.json();
                    if (success) {
                      router.push(routes.offerAcceptedAlt);
                    } else {
                      alert(
                        "Could not apply discount. Please try again later."
                      );
                      router.push(routes.home);
                    }
                  }}
                >
                  Get 10$ off
                </button>
              )}
              {v === "A" && (
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center h-12 rounded-xl
             bg-black text-white font-medium"
                  onClick={async () => {
                    const res = await fetch(apiRoutes.keepSubscription, {
                      method: "POST",
                    });
                    const { success } = await res.json();

                    if (success) {
                      router.push(routes.home);
                    } else {
                      alert("Something went wrong. Please try again.");
                      router.push(routes.home);
                    }
                  }}
                >
                  Keep Subscription
                </button>
              )}

              <button
                type="button"
                onClick={onContinue}
                className={[
                  "mt-3 w-full inline-flex items-center justify-center h-12 rounded-xl font-medium transition-colors",
                  canContinue
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-neutral-200 text-neutral-500",
                ].join(" ")}
              >
                Complete cancellation
              </button>
            </div>
          </section>

          {/* Right image (desktop only) */}
          <aside className="hidden md:block p-6 pt-8">
            <div className="relative w-full md:max-w-[420px] h-full min-h-[220px] rounded-2xl overflow-hidden shadow-lg ml-auto">
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

/* ---------- UI bits ---------- */

function RadioRow({
  label,
  onChange,
}: {
  label: string;
  onChange: () => void;
}) {
  return (
    <label
      className="flex items-center gap-3 cursor-pointer select-none"
      onClick={onChange}
    >
      <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-400 bg-white" />
      <span className="text-neutral-800 text-sm md:text-base">{label}</span>
    </label>
  );
}

function SelectedRow({
  label,
  onClear,
}: {
  label: string;
  onClear?: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div role="radio" aria-checked="true" className="flex items-center gap-3">
        <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-black border border-black">
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

function TextareaWithCounter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const count = value.trim().length;
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full rounded-xl border border-neutral-300 p-3 pb-9 text-[15px] text-neutral-800 outline-none focus:border-neutral-900 focus:ring-0 resize-none"
      />
      <span className="pointer-events-none absolute right-3 bottom-2 text-xs text-neutral-500 bg-white/90 px-1 rounded">
        Min 25 characters ({count}/25)
      </span>
    </div>
  );
}
