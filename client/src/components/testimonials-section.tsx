import { Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/reveal";

/**
 * SOCIAL PROOF: real Google reviews pulled from the Shisha Chauffeurs Google
 * Business Profile (share.google/UNJ4s92g3hc7JgV59). Reviewers are shown as
 * first-name + last-initial by their preference; full attribution and star
 * counts come straight from the GBP. Replace this array when the GBP publishes
 * new reviews.
 */
const testimonials = [
  {
    quote:
      "We hired this service for our house warming with 4 shishas for 4 hours. Rahman was very helpful and ensured all of our shishas were running smoothly. Great service. Highly recommended.",
    name: "Sid C.",
    detail: "Local Guide · House warming · 4 shishas · 4 hours",
    rating: 5,
    isNew: false,
  },
  {
    quote:
      "Ordered Shisha rental service from Shisha Chauffeurs for a birthday event. Honestly without a doubt, arrangement, flavours, coals and over all presentation was amazing. Also want to mention these guys are using the best quality Shisha's.",
    name: "Hamza K.",
    detail: "Birthday event · Shisha rental",
    rating: 5,
    isNew: false,
  },
  {
    quote:
      "Service was amazing I would most definitely recommend. Everything was seamless. I will be giving these guys a call again!",
    name: "Amitesh B.",
    detail: "Recent booking",
    rating: 5,
    isNew: true,
  },
  {
    quote:
      "Service and amazing and quality was top tier. HIGHLY RECOMMEND!",
    name: "Mohid R.",
    detail: "Recent booking",
    rating: 5,
    isNew: true,
  },
  {
    quote:
      "One of the best services you will see. Their Team was fast, professional and well experienced! Definitely would recommend!",
    name: "Hamza S.",
    detail: "Recent booking",
    rating: 5,
    isNew: false,
  },
];

const GOOGLE_REVIEW_URL = "https://share.google/UNJ4s92g3hc7JgV59";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-background py-20 sm:py-24">
      <div className="absolute right-1/2 top-0 h-72 w-72 translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <p className="section-kicker mb-4">What guests are saying</p>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Trusted across the GTA</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hosts book us again because the experience is effortless from the first message to the final clean-down.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((t, index) => (
            <Reveal
              key={index}
              index={index}
              className="surface-panel relative flex flex-col rounded-2xl p-7 sm:p-8"
              data-testid={`testimonial-${index}`}
            >
              <Quote className="mb-5 h-8 w-8 text-primary" />
              <div className="mb-4 flex items-center gap-3">
                <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                {t.isNew && (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    New
                  </span>
                )}
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

        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:mt-14">
          <p className="text-sm text-muted-foreground">
            Booked with us? Leave a quick review and help the next host decide.
          </p>
          <Button
            asChild
            className="gradient-gold min-h-12 rounded-full px-7 py-3 text-base font-semibold text-black transition-all duration-300 hover:shadow-lg"
            data-testid="button-leave-google-review"
          >
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Leave a review on Google"
            >
              <Star className="mr-2 h-4 w-4 fill-black text-black" />
              Leave us a review on Google
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}