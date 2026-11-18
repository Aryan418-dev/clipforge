import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";
import {
  SparklesIcon,
  ScissorsIcon,
  CaptionsIcon,
  FaceIcon,
  CropIcon,
  GlobeIcon,
  PlayIcon,
  CheckIcon,
  ArrowRightIcon,
  GamepadIcon,
  StarIcon,
} from "@/components/Icons";

const FEATURES = [
  {
    icon: ScissorsIcon,
    title: "Automatic highlight detection",
    description:
      "Planned AI that watches your long-form video and surfaces the moments most likely to perform as short-form clips.",
  },
  {
    icon: SparklesIcon,
    title: "Intelligent moment selection",
    description:
      "Context-aware ranking of reactions, punchlines, clutch plays and key insights so you spend less time scrubbing timelines.",
  },
  {
    icon: CaptionsIcon,
    title: "AI captions & styles",
    description:
      "Auto-generated captions with planned support for popular animated styles, emphasis and multi-language subtitles.",
  },
  {
    icon: FaceIcon,
    title: "Face tracking & framing",
    description:
      "Keep the speaker or player in frame when converting landscape recordings into vertical 9:16 output.",
  },
  {
    icon: CropIcon,
    title: "Vertical reframing",
    description:
      "Smart crop and pan that turns widescreen streams and podcasts into ready-to-post Shorts, Reels and TikToks.",
  },
  {
    icon: GlobeIcon,
    title: "Multilingual support",
    description:
      "Planned transcription and caption generation across major languages so global creators can ship faster.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Upload long-form",
    description:
      "Drop a podcast episode, stream VOD, gameplay recording or tutorial. We plan to support common formats and direct platform imports.",
  },
  {
    step: "02",
    title: "AI finds the moments",
    description:
      "Highlight detection and ranking surface candidate clips. You stay in control of the final selection.",
  },
  {
    step: "03",
    title: "Refine & export",
    description:
      "Adjust timing, captions and framing, then export vertical clips optimized for each platform.",
  },
];

export default function Home() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 border-b border-outline/50 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-headline text-lg font-semibold tracking-tight text-white">
            ClipForge
          </Link>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-on-surface-variant">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#founding" className="hover:text-white transition-colors">
              Founding Program
            </a>
            <a href="#gta" className="hover:text-white transition-colors">
              Gaming Creators
            </a>
          </nav>
          <a
            href="#waitlist"
            className="rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-white hover:brightness-110 transition-all"
          >
            Get Early Access
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 bg-radial-glow">
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-outline bg-overlay-strong px-3 py-1 text-xs text-on-surface-variant mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Coming soon · Pre-launch waitlist open
              </div>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal tracking-tight text-white leading-[1.05] text-balance">
                Turn Hours of Content Into Minutes of Editing
              </h1>
              <p className="mt-6 text-base sm:text-lg text-on-surface max-w-xl mx-auto leading-relaxed">
                ClipForge is an affordable AI video clipping platform in development. Automatically
                transform long-form videos, podcasts, streams and gameplay into engaging short-form
                clips for YouTube Shorts, Reels and TikTok.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#waitlist"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                >
                  Get Early Access
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-lg border border-outline px-6 py-3 text-sm text-on-surface-variant hover:text-white hover:border-on-surface-muted transition-colors"
                >
                  See planned features
                </a>
              </div>
              <p className="mt-6 text-xs text-on-surface-muted">
                No credit card · Founding Creator spots limited · Independent product
              </p>
            </div>

            <div
              className="mt-16 sm:mt-20 relative mx-auto max-w-4xl animate-slide-up"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="relative rounded-2xl border border-outline bg-zinc-950 p-2 sm:p-3 shadow-2xl shadow-black/50">
                <div className="rounded-xl overflow-hidden bg-zinc-900 aspect-[16/9] relative">
                  <div className="absolute inset-0 flex">
                    <div className="flex-1 flex flex-col">
                      <div className="h-10 border-b border-zinc-800 flex items-center px-3 gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500/80" />
                        <div className="h-2 w-2 rounded-full bg-amber-500/80" />
                        <div className="h-2 w-2 rounded-full bg-emerald-500/80" />
                        <span className="ml-3 text-[10px] text-zinc-500 font-mono">
                          clipforge — project.mp4
                        </span>
                      </div>
                      <div className="flex-1 flex">
                        <div className="w-1/3 border-r border-zinc-800 p-3 space-y-2">
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                            Clips
                          </div>
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`rounded-md border p-2 ${
                                i === 1
                                  ? "border-primary/50 bg-primary/10"
                                  : "border-zinc-800 bg-zinc-900"
                              }`}
                            >
                              <div className="h-8 rounded bg-zinc-800 mb-1.5" />
                              <div className="h-1.5 w-3/4 rounded bg-zinc-700" />
                            </div>
                          ))}
                        </div>
                        <div className="flex-1 p-3 flex flex-col">
                          <div className="flex-1 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(250,70,22,0.15),transparent_50%)]" />
                            <div className="relative flex flex-col items-center gap-3">
                              <div className="h-14 w-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                                <PlayIcon className="h-6 w-6 text-white ml-0.5" />
                              </div>
                              <span className="text-xs text-zinc-400">Preview · 0:42</span>
                            </div>
                          </div>
                          <div className="mt-3 h-10 rounded-md bg-zinc-800/80 flex items-center px-2 gap-1">
                            <div className="h-6 flex-1 rounded bg-primary/30 border border-primary/40" />
                            <div className="h-6 w-16 rounded bg-zinc-700" />
                            <div className="h-6 flex-1 rounded bg-zinc-700/50" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-on-surface-muted">
                Illustrative editor mockup — product under development
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-outline py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-center text-sm text-on-surface-muted max-w-2xl mx-auto">
              Built for creators who want an{" "}
              <span className="text-on-surface-variant">affordable alternative</span> to established
              AI clipping tools. We are validating demand before locking in pricing and capacity — no
              fabricated user counts or testimonials.
            </p>
          </div>
        </section>

        <section id="features" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="font-headline text-3xl sm:text-4xl text-white tracking-tight">
                Planned AI clipping capabilities
              </h2>
              <p className="mt-4 text-on-surface leading-relaxed">
                Everything below is on the roadmap. We are building the core pipeline first, then
                expanding based on feedback from early users and the Founding Creator Program.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-outline bg-overlay p-6 hover:border-on-surface-muted/30 transition-colors"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-headline text-lg text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-on-surface leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 border-t border-outline bg-radial-glow-blue">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-3xl sm:text-4xl text-white tracking-tight">
                From long-form to short-form in fewer steps
              </h2>
              <p className="mt-4 text-on-surface">
                The goal is simple: less time hunting for moments, more time publishing.
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map((s) => (
                <div key={s.step} className="relative">
                  <div className="font-headline text-5xl text-primary/20 mb-3">{s.step}</div>
                  <h3 className="font-headline text-xl text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-on-surface leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gta" className="py-20 sm:py-28 border-t border-outline">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl border border-outline overflow-hidden bg-gradient-to-br from-zinc-950 via-black to-zinc-950">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary mb-5 w-fit">
                    <GamepadIcon className="h-3.5 w-3.5" />
                    Gaming creators · GTA VI launch window
                  </div>
                  <h2 className="font-headline text-3xl sm:text-4xl text-white tracking-tight text-balance">
                    Turn gameplay & reactions into short-form gold
                  </h2>
                  <p className="mt-4 text-on-surface leading-relaxed">
                    When GTA VI drops, the flood of streams, first-playthroughs and reaction content
                    will be massive. ClipForge is being designed so gaming creators, streamers and
                    YouTubers can ship clips faster — without living in the timeline.
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {[
                      "Highlight detection tuned for action, fails and reactions",
                      "Vertical reframing for 16:9 VODs",
                      "Caption styles that fit gaming audiences",
                      "Affordable processing so high-volume creators stay sustainable",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-on-surface-variant"
                      >
                        <CheckIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-on-surface-muted">
                    ClipForge is an independent product and is not affiliated with, endorsed by, or
                    sponsored by Rockstar Games, Take-Two Interactive, or any related entity. GTA and
                    Grand Theft Auto are trademarks of their respective owners.
                  </p>
                </div>
                <div className="relative min-h-[280px] md:min-h-0 bg-zinc-900 flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(250,70,22,0.2),transparent_55%)]" />
                  <div className="relative text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                      <GamepadIcon className="h-8 w-8" />
                    </div>
                    <p className="font-headline text-2xl text-white">Built for the next wave</p>
                    <p className="mt-2 text-sm text-on-surface max-w-xs mx-auto">
                      Streamers and gaming YouTubers who want to turn long sessions into a steady
                      stream of Shorts & Reels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="founding" className="py-20 sm:py-28 border-t border-outline">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs text-warning mb-5">
                <StarIcon className="h-3.5 w-3.5" />
                Limited · First 100 selected creators
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-white tracking-tight">
                Founding Creator Program
              </h2>
              <p className="mt-4 text-on-surface leading-relaxed">
                We are looking for serious creators who will stress-test the product, share feedback,
                and help shape the roadmap. In return, selected founders get meaningful early
                benefits.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Up to 90 days free beta",
                  desc: "Access the product during the closed beta window at no cost while we refine the experience.",
                },
                {
                  title: "Limited processing credits",
                  desc: "A starter pool of processing minutes so you can ship real clips and evaluate quality.",
                },
                {
                  title: "Early feature access",
                  desc: "Try new capabilities before general availability and influence prioritization.",
                },
                {
                  title: "Founding member pricing",
                  desc: "Exclusive post-beta pricing for those who help us build. Details shared with selected founders.",
                },
              ].map((b) => (
                <div key={b.title} className="rounded-2xl border border-outline bg-overlay p-5">
                  <h3 className="font-headline text-base text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-on-surface leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-on-surface-muted max-w-xl mx-auto">
              Selection is based on application quality, content volume and fit — not a race. Apply
              via the form below. We will not invent scarcity beyond the stated first-100 program
              size.
            </p>
          </div>
        </section>

        <section className="py-16 border-t border-outline">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <h2 className="font-headline text-2xl sm:text-3xl text-white tracking-tight">
              Pricing that stays affordable
            </h2>
            <p className="mt-4 text-on-surface leading-relaxed">
              We are deliberately keeping pricing competitive with established tools. Final plans will
              be set after we validate infrastructure costs and usage patterns with early users.
              Expect clear tiers, no unlimited promises we cannot keep, and founding-member rates for
              those who join early.
            </p>
          </div>
        </section>

        <section id="waitlist" className="py-20 sm:py-28 border-t border-outline bg-radial-glow">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="font-headline text-3xl sm:text-4xl text-white tracking-tight">
                  Join the waitlist
                </h2>
                <p className="mt-4 text-on-surface leading-relaxed">
                  Register for early access and the Founding Creator Program. Tell us about your
                  content so we can prioritize the right creators and features.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Be notified when beta opens",
                    "Apply for the limited Founding Creator Program",
                    "Help shape the product with real feedback",
                    "Secure early-member pricing when plans launch",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-on-surface-variant"
                    >
                      <CheckIcon className="h-4 w-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-xs text-on-surface-muted leading-relaxed">
                  By submitting you consent to ClipForge contacting you about the product and program.
                  We store your data only for waitlist and product communication purposes.
                </p>
              </div>
              <div className="rounded-2xl border border-outline bg-zinc-950/80 p-6 sm:p-8">
                <WaitlistForm source="landing-hero" />
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-outline py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between gap-8">
              <div>
                <div className="font-headline text-lg text-white">ClipForge</div>
                <p className="mt-2 text-sm text-on-surface-muted max-w-xs">
                  AI-powered video clipping for creators. Coming soon. Independent and unaffiliated
                  with any game publisher.
                </p>
              </div>
              <div className="text-sm text-on-surface-muted space-y-2">
                <p>
                  <a href="#waitlist" className="hover:text-white transition-colors">
                    Waitlist
                  </a>
                </p>
                <p>
                  <a href="/admin" className="hover:text-white transition-colors">
                    Admin
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-outline text-xs text-on-surface-muted space-y-3">
              <p>
                <strong className="text-on-surface-variant">Privacy:</strong> We collect the
                information you submit on this form solely to manage the waitlist, Founding Creator
                Program selection, and product updates. We do not sell personal data.
              </p>
              <p>
                ClipForge is not affiliated with Rockstar Games, Take-Two Interactive, OpusClip, or any
                other third-party brand mentioned for comparison or context. All trademarks belong to
                their respective owners.
              </p>
              <p>
                © {new Date().getFullYear()} ClipForge. All rights reserved. Product under
                development.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
