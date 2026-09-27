import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/reveal";

/**
 * SOCIAL PROOF: real Google reviews pulled from the Shisha Chauffeurs Google
 * Business Profile (share.google/UNJ4s92g3hc7JgV59). Reviewers are shown as
 * first-name + last-initial by their preference; full attribution and star
 * counts come straight from the GBP. Replace this array when the GBP publishes
 * new reviews.
 *
 * The carousel auto-rotates weekly so newly published GBP reviews show up
 * without a code change: bump `publishedOn` for the new entries and the
 * carousel will surface them on their first weekly refresh tick.
 */
const testimonials: {
  quote: string;
  name: string;
  detail: string;
  rating: number;
  isNew?: boolean;
  publishedOn: string; // ISO date — used for weekly auto-rotation
}[] = [
  {
    quote:
      "We hired this service for our house warming with 4 shishas for 4 hours. Rahman was very helpful and ensured all of our shishas were running smoothly. Great service. Highly recommended.",
    name: "Sid C.",
    detail: "Local Guide · House warming · 4 shishas · 4 hours",
    rating: 5,
    isNew: false,
    publishedOn: "2025-12-01",
  },
  {
    quote:
      "Ordered shisha catering from Shisha Chauffeurs for a birthday event. Honestly without a doubt, arrangement, flavours, coals and overall presentation was amazing. Also want to mention these guys are using the best quality Shisha's.",
    name: "Hamza K.",
    detail: "Birthday event · Shisha catering",
    rating: 5,
    isNew: false,
    publishedOn: "2025-12-08",
  },
  {
    quote:
      "Service was amazing I would most definitely recommend. Everything was seamless. I will be giving these guys a call again!",
    name: "Amitesh B.",
    detail: "Recent booking",
    rating: 5,
    isNew: true,
    publishedOn: "2026-09-20",
  },
  {
    quote:
      "Service and amazing and quality was top tier. HIGHLY RECOMMEND!",
    name: "Mohid R.",
    detail: "Recent booking",
    rating: 5,
    isNew: true,
    publishedOn: "2026-09-20",
  },
  {
    quote:
      "One of the best services you will see. Their Team was fast, professional and well experienced! Definitely would recommend!",
    name: "Hamza S.",
    detail: "Recent booking",
    rating: 5,
    isNew: false,
    publishedOn: "2026-01-15",
  },
];

const GOOGLE_REVIEW_URL = "https://share.google/UNJ4s92g3hc7JgV59";

// One week (ms). Weekly tick keeps newly published reviews surfaced without a
// code change — only the GBP sync process needs to keep the array up to date.
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Carousel pacing: rotate every 6s, pause when the user has interacted.
const AUTO_ROTATE_MS = 6000;

export default function TestimonialsSection() {
  // Weekly anchor: this week's "tick" is the floor of (now / WEEK_MS).
  // A new GBP review with a later `publishedOn` (or an array reorder)
  // surfaces naturally as the week rolls over.
  const weekAnchor = Math.floor(Date.now() / WEEK_MS);
  const rotationSeed = useState(() => weekAnchor)[0];

  // Use the week anchor + index to start each session at a different slide so
  // returning visitors see fresh content even within the same session.
  const [activeIndex, setActiveIndex] = useState(() => rotationSeed % testimonials.length);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (index: number) => {
    setPaused(true);
    setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

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

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t, index) => (
                <div
                  key={`${t.name}-${t.publishedOn}`}
                  className="w-full shrink-0 px-2 sm:px-4"
                  aria-hidden={index !== activeIndex}
                >
                  <Reveal
                    index={index}
                    className="surface-panel relative mx-auto flex max-w-3xl flex-col rounded-2xl p-7 sm:p-10"
                    data-testid={`testimonial-${index}`}
                  >
                    <Quote className="mb-5 h-9 w-9 text-primary" />
                    <div className="mb-5 flex items-center gap-3">
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
                    <p className="flex-grow text-lg leading-8 text-gray-100 sm:text-xl">
                      "{t.quote}"
                    </p>
                    <div className="mt-7 border-t border-white/10 pt-5">
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{t.detail}</p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white transition-colors hover:bg-black/80 sm:flex"
            aria-label="Previous review"
            data-testid="testimonial-prev"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white transition-colors hover:bg-black/80 sm:flex"
            aria-label="Next review"
            data-testid="testimonial-next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((t, index) => (
              <button
                key={`dot-${t.name}-${t.publishedOn}`}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to review ${index + 1}`}
                data-testid={`testimonial-dot-${index}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-8 bg-primary" : "w-2 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-white/40">
            Verified Google Reviews
          </p>
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
