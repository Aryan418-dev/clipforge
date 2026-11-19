"use client";

import { useState, FormEvent } from "react";
import { CheckIcon } from "./Icons";

const PLATFORMS = [
  "YouTube",
  "Twitch",
  "TikTok",
  "Instagram",
  "Podcast / Spotify",
  "Multiple platforms",
  "Other",
];

const NICHES = [
  "Gaming / Gameplay",
  "Streaming / Live",
  "Podcast / Talk shows",
  "Education / Tutorials",
  "Lifestyle / Vlog",
  "Comedy / Entertainment",
  "Business / Finance",
  "Other",
];

const VOLUMES = [
  "1–5 videos / month",
  "6–15 videos / month",
  "16–40 videos / month",
  "40+ videos / month",
];

export default function WaitlistForm({ source = "landing" }: { source?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    platform: "",
    niche: "",
    monthly_volume: "",
    biggest_challenge: "",
    consent: false,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#28C840]/30 bg-[#28C840]/5 p-8 text-center animate-fade-in">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#28C840]/20 text-[#28C840]">
          <CheckIcon className="h-6 w-6" />
        </div>
        <h3 className="font-headline text-xl text-white mb-2">You are on the list</h3>
        <p className="text-on-surface text-sm leading-relaxed max-w-sm mx-auto">
          Thanks for joining. We will reach out as we open the Founding Creator Program and early access. Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm text-on-surface-variant mb-1.5">
            Name
          </label>
          <input
            id="name"
            required
            minLength={2}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-lg border border-outline bg-overlay-strong px-3.5 py-2.5 text-sm text-white placeholder:text-on-surface-muted focus:border-primary focus:outline-none transition-colors"
            placeholder="Alex Creator"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-on-surface-variant mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-lg border border-outline bg-overlay-strong px-3.5 py-2.5 text-sm text-white placeholder:text-on-surface-muted focus:border-primary focus:outline-none transition-colors"
            placeholder="you@channel.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="platform" className="block text-sm text-on-surface-variant mb-1.5">
            Primary platform
          </label>
          <select
            id="platform"
            required
            value={form.platform}
            onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))}
            className="w-full rounded-lg border border-outline bg-overlay-strong px-3.5 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors appearance-none"
          >
            <option value="" disabled>
              Select platform
            </option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="niche" className="block text-sm text-on-surface-variant mb-1.5">
            Creator niche
          </label>
          <select
            id="niche"
            required
            value={form.niche}
            onChange={(e) => setForm((f) => ({ ...f, niche: e.target.value }))}
            className="w-full rounded-lg border border-outline bg-overlay-strong px-3.5 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors appearance-none"
          >
            <option value="" disabled>
              Select niche
            </option>
            {NICHES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="volume" className="block text-sm text-on-surface-variant mb-1.5">
          Monthly video volume
        </label>
        <select
          id="volume"
          required
          value={form.monthly_volume}
          onChange={(e) => setForm((f) => ({ ...f, monthly_volume: e.target.value }))}
          className="w-full rounded-lg border border-outline bg-overlay-strong px-3.5 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors appearance-none"
        >
          <option value="" disabled>
            How many videos do you publish?
          </option>
          {VOLUMES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="challenge" className="block text-sm text-on-surface-variant mb-1.5">
          Biggest editing challenge
        </label>
        <textarea
          id="challenge"
          required
          minLength={5}
          rows={3}
          value={form.biggest_challenge}
          onChange={(e) => setForm((f) => ({ ...f, biggest_challenge: e.target.value }))}
          className="w-full rounded-lg border border-outline bg-overlay-strong px-3.5 py-2.5 text-sm text-white placeholder:text-on-surface-muted focus:border-primary focus:outline-none transition-colors resize-none"
          placeholder="e.g. Finding the best moments in 3-hour streams takes forever..."
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
          className="mt-1 h-4 w-4 rounded border-outline bg-overlay-strong text-primary focus:ring-primary accent-primary"
        />
        <span className="text-xs text-on-surface-muted leading-relaxed">
          I agree to receive product updates and early-access emails from ClipForge. We respect your privacy and will never sell your data. You can unsubscribe anytime.
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-error">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-on-primary hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === "loading" ? "Joining…" : "Get Early Access"}
      </button>
    </form>
  );
}
