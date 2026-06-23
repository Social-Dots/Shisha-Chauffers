import { Quote, Star } from "lucide-react";
import Reveal from "@/components/reveal";

/**
 * SOCIAL PROOF — replace the `testimonials` below with REAL client reviews
 * before going live. Do not ship fabricated testimonials. Pull these from
 * Instagram comments/DMs, Google reviews, or text feedback (with permission).
 */
const testimonials = [
  {
    quote:
      "The setup was stunning and the service was completely hands-off for us — our guests didn't stop talking about it all night.",
    name: "Sample Client",
    detail: "Birthday party · Mississauga",
  },
  {
    quote:
      "Punctual, professional, and the flavours were incredible. They handled everything from setup to clean-up.",
    name: "Sample Client",
    detail: "Backyard event · Toronto",
  },
  {
    quote:
      "Easily the highlight of our evening. The presentation felt genuinely premium and elevated the whole atmosphere.",
    name: "Sample Client",
    detail: "Corporate gathering · GTA",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-background py-20 sm:py-24">
      <div className="absolute right-1/2 top-0 h-72 w-72 translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <p className="section-kicker mb-4">What guests are saying</p>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Trusted across the GTA</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hosts book us again because the experience is effortless from the first message to the final clean-down.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {testimonials.map((t, index) => (
            <Reveal
              key={index}
              index={index}
              className="surface-panel relative flex flex-col rounded-2xl p-7 sm:p-8"
              data-testid={`testimonial-${index}`}
            >
              <Quote className="mb-5 h-8 w-8 text-gold/70" />
              <div className="mb-4 flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="flex-grow text-base leading-7 text-gray-100">
                "{t.quote}"
              </p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
