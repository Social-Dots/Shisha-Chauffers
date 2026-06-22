import { CheckCircle2, ClipboardList, MapPin, Sparkles } from "lucide-react";

export default function EventFlowSection() {
  const steps = [
    {
      number: "01",
      title: "Choose your experience",
      description: "Choose shisha catering, rentals, mocktails, or membership.",
      icon: Sparkles,
    },
    {
      number: "02",
      title: "Share the event details",
      description: "Tell us the date, guest count, address, and flavour preferences.",
      icon: ClipboardList,
    },
    {
      number: "03",
      title: "Confirm the booking",
      description: "We confirm availability, pricing, deposit, and arrival timing.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div className="ambient-grid absolute inset-0 opacity-30" />
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-kicker mb-4">How it works</p>
            <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
              Set up, serve, refresh, clean down.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              A polished service flow for private events, designed so hosts can stay with their guests while we handle the shisha experience.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white">
              <MapPin className="h-5 w-5 text-primary" />
              Outdoor locations and private residences across the GTA.
            </div>
          </div>

          <div className="grid gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="surface-panel group relative overflow-hidden rounded-lg p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/15 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/15">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-sm font-bold text-primary">{step.number}</span>
                      <h3 className="font-serif text-2xl font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="leading-7 text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
