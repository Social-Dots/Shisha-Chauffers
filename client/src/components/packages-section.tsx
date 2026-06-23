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
      price: "$250",
      description: "Perfect for small gatherings and intimate events",
      features: [
        "2-hour shisha service",
        "Choice of 3 premium flavours",
        "Professional setup included",
        "Serves up to 6 guests",
        "Basic equipment package",
        "Clean-up service included",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "$450",
      description: "Enhanced experience for special occasions",
      features: [
        "4-hour shisha service",
        "Choice of 5 premium flavours",
        "Professional chauffeur service",
        "Serves up to 12 guests",
        "Premium equipment package",
        "Premium flavour service included",
        "Setup & clean-up service",
        "Custom flavour mixing",
      ],
      popular: true,
    },
    {
      name: "Luxury",
      price: "$600",
      description: "Ultimate premium experience for VIP events",
      features: [
        "6-hour shisha service",
        "Unlimited premium flavours",
        "Dedicated chauffeur team",
        "Serves up to 20 guests",
        "Luxury equipment package",
        "Full flavour bar service",
        "Professional setup & styling",
        "Custom flavour creation",
        "Event coordination",
        "Photography assistance",
      ],
      popular: false,
    },
  ];

  return (
    <section id="packages" className="relative overflow-hidden bg-background py-20 sm:py-24">
      {/* Ambient luxury backdrop */}
      <div className="ambient-grid absolute inset-0 opacity-20" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <p className="section-kicker mb-4">Catering Packages</p>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Choose your experience</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every package includes full shisha service with setup, maintenance, and cleaning by our attendants.
          </p>
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-3 lg:gap-8">
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
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    <span>{feature}</span>
                  </li>
                ))}
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
      </div>
    </section>
  );
}
