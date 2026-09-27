import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/reveal";

export default function PackagesSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const packages = [
    {
      name: "Standard",
      price: "$300",
      description: "2 shishas, up to 3 hours",
      x: "2",
      hours: "3",
      popular: false,
    },
    {
      name: "Signature",
      price: "$475",
      description: "4 shishas, up to 4 hours",
      x: "4",
      hours: "4",
      popular: false,
    },
    {
      name: "Premium",
      price: "$650",
      description: "6 shishas, up to 4 hours",
      x: "6",
      hours: "4",
      popular: true,
    },
    {
      name: "Luxury",
      price: "$800",
      description: "8 shishas, up to 5 hours",
      x: "8",
      hours: "5",
      popular: false,
    },
  ];

  const inclusions = [
    "Premium shisha",
    "Quasar head with HMD (Heat Management Device)",
    "Coconut coals",
    "Flavour",
    "Mouthpieces",
    "Professional attendant",
    "Setup & teardown",
    "Coal management",
    "1 complimentary head + flavour change (per shisha)",
  ];

  const addOns = [
    { label: "Additional hookah", price: "$100 each" },
    { label: "Additional head + flavour change", price: "$20" },
    { label: "Additional catering time", price: "$100/hour" },
    { label: "Ice pipe", price: "$10 each" },
  ];

  return (
    <section id="pricing" className="relative overflow-hidden bg-background py-20 sm:py-24">
      {/* Ambient luxury backdrop */}
      <div className="ambient-grid absolute inset-0 opacity-20" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <p className="section-kicker mb-4">Pricing</p>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Choose your experience</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every package includes luxury equipment, professional setup, and full clean-down by our team.
          </p>
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {packages.map((pkg, index) => (
            <Reveal
              key={index}
              index={index}
              className={`surface-panel group relative flex flex-col rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1.5 ${
                pkg.popular ? "ring-2 ring-primary" : ""
              }`}
              data-testid={`package-card-${index}`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-lg">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="font-serif text-2xl font-semibold text-white">{pkg.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{pkg.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="font-serif text-5xl font-bold text-white">{pkg.price}</span>
                <span className="text-sm text-muted-foreground">/ event</span>
              </div>

              <ul className="mb-8 space-y-3.5">
                <li className="flex items-start gap-3 text-sm text-gray-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                  <span>{pkg.x} shishas included</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                  <span>Up to {pkg.hours} hours</span>
                </li>
              </ul>

              <Button
                onClick={scrollToContact}
                className={`mt-auto min-h-12 w-full rounded-full text-base font-semibold transition-all duration-300 hover:shadow-lg ${
                  pkg.popular
                    ? "gradient-gold text-black"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
                data-testid={`package-cta-${index}`}
              >
                Book {pkg.name}
              </Button>
            </Reveal>
          ))}
        </div>

        {/* Inclusions that apply to every catering tier */}
        <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-white/10 bg-black/20 p-8">
          <h3 className="mb-6 text-center font-serif text-2xl font-semibold text-white">
            Every catering package includes
          </h3>
          <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {inclusions.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-gray-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Catering add-ons */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-black/20 p-8">
          <h3 className="mb-6 text-center font-serif text-2xl font-semibold text-white">Catering add-ons</h3>
          <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {addOns.map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-3 text-sm text-gray-200">
                <span>{item.label}</span>
                <span className="shrink-0 font-semibold text-white">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Free local delivery. Additional charges may apply based on event location.
          </p>
        </div>
      </div>
    </section>
  );
}