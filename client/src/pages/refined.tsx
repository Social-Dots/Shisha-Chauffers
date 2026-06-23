import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Instagram, Phone } from "lucide-react";

/**
 * "REFINED" — condensed landing concept for Shisha Chauffeurs, styled to match
 * the live site (Playfair Display + Inter, brand red on the site's dark gradient,
 * surface-panel cards). Keeps the editorial structure: oversized type, a flavour
 * marquee, one merged gallery, and a tabbed Pricing block. Reachable at /refined.
 */

// ─── content (reused verbatim from the live site) ──────────────────────────
const steps = [
  { n: "01", t: "Choose your experience", d: "Catering, rentals, or mocktails for your event." },
  { n: "02", t: "Share the details", d: "Date, guest count, address, and flavour preferences." },
  { n: "03", t: "We confirm", d: "Availability, pricing, deposit, and arrival timing." },
];

const packages = [
  { name: "Standard", price: "$250", note: "Up to 6 guests · 2 hours", popular: false,
    features: ["2-hour shisha service", "3 premium flavours", "Professional setup", "Clean-up included"] },
  { name: "Premium", price: "$450", note: "Up to 12 guests · 4 hours", popular: true,
    features: ["4-hour shisha service", "5 premium flavours", "Chauffeur service", "Custom flavour mixing", "Setup & clean-up"] },
  { name: "Luxury", price: "$600", note: "Up to 20 guests · 6 hours", popular: false,
    features: ["6-hour shisha service", "Unlimited flavours", "Dedicated team", "Full flavour bar", "Event coordination"] },
];

const rentals = [
  { q: "1 Shisha", p: "$60" }, { q: "2 Shishas", p: "$115" }, { q: "3 Shishas", p: "$165" },
  { q: "4 Shishas", p: "$210" }, { q: "5 Shishas", p: "$250" }, { q: "6 Shishas", p: "$300" },
];

const standardFlavours = ["Double Apple", "Lemon Mint", "Grape", "Blueberry", "Mango", "Lady Killer"];
const signatureFlavours = [
  { name: "Chauffeur Special", mix: "Blue Dragon + Lady Killer" },
  { name: "Blue Mist", mix: "Blueberry + Mint" },
  { name: "Royal Paan Breeze", mix: "Paan + Mint" },
  { name: "Summer Sunset", mix: "Mango + Peach + Lemon" },
  { name: "Raspberry Mojito", mix: "Raspberry + Mint + Lime" },
];

const gallery = [
  "/media/in-action/private-residence.jpg",
  "/media/in-action/venue-lineup.jpg",
  "/media/in-action/backyard-setup.jpg",
  "/media/in-action/studio-lineup.jpg",
  "/media/in-action/event-setup.jpg",
  "/media/about/about-shisha-chauffeurs.jpg",
];

const testimonials = [
  { quote: "The setup was stunning and the service completely hands-off. Our guests didn't stop talking about it all night.", who: "Sample Client", where: "Birthday · Mississauga" },
  { quote: "Punctual, professional, and the flavours were incredible. They handled everything from setup to clean-up.", who: "Sample Client", where: "Backyard event · Toronto" },
  { quote: "Easily the highlight of our evening. The presentation felt genuinely premium.", who: "Sample Client", where: "Corporate · GTA" },
];

// ─── small primitives ──────────────────────────────────────────────────────
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
      <span className="h-px w-6 bg-primary" />
      {children}
    </span>
  );
}

function Rise({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Refined() {
  const [tab, setTab] = useState<"packages" | "rentals">("packages");
  const tel = "tel:6478793637";

  return (
    <div className="refined min-h-screen bg-background text-foreground antialiased">
      {/* scoped styles ----------------------------------------------------- */}
      <style>{`
        .refined { font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif; }
        .refined .display { font-family: var(--font-serif), Georgia, serif; }
        .refined ::selection { background: hsl(var(--primary)); color: #0a0a0a; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .refined .marquee { animation: marquee 34s linear infinite; }
        .refined .grain::before {
          content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .5; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
        }
        @media (prefers-reduced-motion: reduce) { .refined .marquee { animation: none; } }
      `}</style>

      {/* nav --------------------------------------------------------------- */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/30 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="#top" className="flex items-center gap-3" aria-label="Shisha Chauffeurs home">
            <img src="/logo.svg" alt="Shisha Chauffeurs" className="h-11 w-auto" />
            <span className="display hidden text-base font-semibold tracking-wide sm:block">Shisha Chauffeurs</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#experience" className="transition-colors hover:text-white">Experience</a>
            <a href="#work" className="transition-colors hover:text-white">Work</a>
            <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
            <a href="#flavours" className="transition-colors hover:text-white">Flavours</a>
          </nav>
          <a href={tel} className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary">
            Book <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </header>

      {/* hero -------------------------------------------------------------- */}
      <section id="top" className="grain relative flex min-h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-primary/25 blur-[140px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28">
          <Rise><Kicker>Mobile shisha catering · Toronto & the GTA</Kicker></Rise>
          <Rise delay={0.08}>
            <h1 className="display mt-7 text-[14vw] font-bold leading-[0.9] tracking-[-0.01em] sm:text-[11vw] lg:text-[8.5rem]">
              Where flavour
              <br />
              meets <span className="italic font-medium text-primary">finesse.</span>
            </h1>
          </Rise>
          <Rise delay={0.16}>
            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                Premium shisha and mocktail service delivered to your private event — set up, served, and cleaned down while you stay with your guests.
              </p>
              <div className="flex shrink-0 items-center gap-4">
                <a href="#pricing" className="gradient-gold rounded-full px-7 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.03]">
                  View pricing
                </a>
                <a href="#work" className="rounded-full border border-white/15 px-7 py-4 text-sm font-semibold transition-colors hover:border-white/40">
                  See our work
                </a>
              </div>
            </div>
          </Rise>
        </div>

        {/* flavour marquee */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-y border-white/10 bg-black/40 py-4 backdrop-blur-sm">
          <div className="marquee flex w-max gap-10 whitespace-nowrap text-sm uppercase tracking-[0.25em] text-muted-foreground">
            {[...standardFlavours, ...signatureFlavours.map((f) => f.name), ...standardFlavours, ...signatureFlavours.map((f) => f.name)].map((f, i) => (
              <span key={i} className="flex items-center gap-10">
                {f} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* experience -------------------------------------------------------- */}
      <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
        <Rise><Kicker>How it works</Kicker></Rise>
        <Rise delay={0.05}>
          <h2 className="display mt-6 max-w-2xl text-4xl font-bold leading-[1.05] sm:text-6xl">
            Set up, serve, refresh, clean down.
          </h2>
        </Rise>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Rise key={s.n} delay={i * 0.1} className="bg-background">
              <div className="group h-full p-8 transition-colors hover:bg-white/[0.03]">
                <span className="display text-5xl font-bold text-primary">{s.n}</span>
                <h3 className="display mt-6 text-2xl font-semibold">{s.t}</h3>
                <p className="mt-3 text-muted-foreground">{s.d}</p>
              </div>
            </Rise>
          ))}
        </div>
      </section>

      {/* work / gallery (single, merged) ----------------------------------- */}
      <section id="work" className="py-28">
        <div className="mx-auto mb-12 flex max-w-6xl items-end justify-between px-6">
          <div>
            <Rise><Kicker>In action</Kicker></Rise>
            <Rise delay={0.05}>
              <h2 className="display mt-6 text-4xl font-bold sm:text-6xl">Selected setups</h2>
            </Rise>
          </div>
          <a href={tel} className="hidden text-sm text-muted-foreground transition-colors hover:text-primary sm:block">
            Book a setup like this →
          </a>
        </div>
        <div className="flex snap-x gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {gallery.map((src, i) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 sm:w-[26rem]"
            >
              <img src={src} alt="Shisha Chauffeurs setup" loading="lazy" decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="display absolute bottom-5 left-5 text-sm text-white/80">{String(i + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* pricing (tabs: packages | rentals) -------------------------------- */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-28">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Rise><Kicker>Pricing</Kicker></Rise>
            <Rise delay={0.05}>
              <h2 className="display mt-6 text-4xl font-bold sm:text-6xl">One menu, every occasion.</h2>
            </Rise>
          </div>
          <div className="inline-flex rounded-full border border-white/15 p-1 text-sm">
            {(["packages", "rentals"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-6 py-2 capitalize transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-white"}`}
                data-testid={`pricing-tab-${t}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14">
          {/* packages */}
          {tab === "packages" && (
            <div className="grid gap-6 md:grid-cols-3">
              {packages.map((p, i) => (
                <Rise key={p.name} delay={i * 0.08}>
                  <div className={`surface-panel flex h-full flex-col rounded-2xl p-8 ${p.popular ? "ring-2 ring-primary" : ""}`}>
                    {p.popular && <span className="mb-4 w-fit rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-foreground">Most booked</span>}
                    <h3 className="display text-3xl font-bold">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
                    <div className="display my-6 text-5xl font-bold">{p.price}</div>
                    <ul className="mb-8 space-y-3 text-sm text-gray-200">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}</li>
                      ))}
                    </ul>
                    <a href={tel} className={`mt-auto rounded-full py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.02] ${p.popular ? "gradient-gold text-black" : "border border-white/15 hover:border-white/40"}`}>
                      Book {p.name}
                    </a>
                  </div>
                </Rise>
              ))}
            </div>
          )}

          {/* rentals */}
          {tab === "rentals" && (
            <Rise>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {rentals.map((r) => (
                  <div key={r.q} className="flex items-baseline justify-between bg-background p-7 transition-colors hover:bg-white/[0.03]">
                    <span className="text-gray-200">{r.q}</span>
                    <span className="display text-3xl font-bold">{r.p}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">Every rental includes premium equipment, a standard flavour selection, clean-equipment guarantee, and optional pickup & delivery.</p>
            </Rise>
          )}
        </div>
      </section>

      {/* flavours ---------------------------------------------------------- */}
      <section id="flavours" className="border-y border-white/10 bg-white/[0.015] py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Rise><Kicker>The menu</Kicker></Rise>
          <div className="mt-10 grid gap-16 lg:grid-cols-2">
            <Rise>
              <h3 className="display mb-8 text-2xl font-semibold text-muted-foreground">Standard</h3>
              <ul className="divide-y divide-white/10">
                {standardFlavours.map((f) => (
                  <li key={f} className="display flex items-center justify-between py-4 text-2xl font-medium sm:text-3xl">
                    {f} <span className="text-white/20">—</span>
                  </li>
                ))}
              </ul>
            </Rise>
            <Rise delay={0.1}>
              <h3 className="display mb-8 text-2xl font-semibold text-primary">Signature blends</h3>
              <ul className="divide-y divide-white/10">
                {signatureFlavours.map((f) => (
                  <li key={f.name} className="py-4">
                    <div className="display text-2xl font-medium sm:text-3xl">{f.name}</div>
                    <div className="mt-1 text-sm uppercase tracking-widest text-muted-foreground">{f.mix}</div>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </div>
      </section>

      {/* testimonials ------------------------------------------------------ */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <Rise><Kicker>Guests</Kicker></Rise>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Rise key={i} delay={i * 0.1}>
              <figure className="flex h-full flex-col">
                <blockquote className="display text-2xl font-medium leading-snug text-gray-100">"{t.quote}"</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5 text-sm">
                  <span className="text-white">{t.who}</span>
                  <span className="block text-muted-foreground">{t.where}</span>
                </figcaption>
              </figure>
            </Rise>
          ))}
        </div>
        <p className="mt-10 text-xs uppercase tracking-widest text-white/30">Sample reviews — replace with real client feedback before launch.</p>
      </section>

      {/* closing CTA ------------------------------------------------------- */}
      <section className="grain relative overflow-hidden border-t border-white/10 py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <img src="/logo.svg" alt="Shisha Chauffeurs" className="mx-auto mb-8 h-16 w-auto" />
          <h2 className="display text-5xl font-bold leading-[1.02] sm:text-7xl">
            Let's make the night<br /><span className="italic font-medium text-primary">unforgettable.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">Outdoor locations and private residences across Toronto and the GTA. A deposit secures your date.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={tel} className="gradient-gold inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.03]">
              <Phone className="h-4 w-4" /> (647) 879-3637
            </a>
            <a href="https://www.instagram.com/shishachauffeurs/" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold transition-colors hover:border-white/40">
              <Instagram className="h-4 w-4" /> @shishachauffeurs
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-xs uppercase tracking-[0.25em] text-white/40">
        Shisha Chauffeurs · Toronto & the GTA
      </footer>
    </div>
  );
}
