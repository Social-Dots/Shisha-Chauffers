import { ArrowRight, MapPin, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const mediaItems = [
  {
    type: "video" as const,
    title: "Mobile shisha catering for private events",
    caption: "A live private event setup showing the hosted service style we bring to birthdays, house parties, and luxury gatherings across Toronto and the GTA.",
    src: "/media/in-action/lounge-smoke.mp4",
    poster: "/media/in-action/lounge-smoke-poster.jpg",
  },
  {
    type: "video" as const,
    title: "Outdoor shisha setup in the GTA",
    caption: "An outdoor setup reveal designed for backyard parties, patios, and private residence bookings that need a clean premium footprint.",
    src: "/media/in-action/outdoor-setup.mp4",
    poster: "/media/in-action/outdoor-setup-poster.jpg",
  },
  {
    type: "video" as const,
    title: "Luxury hookah setup detail",
    caption: "A close-up of our premium hookah equipment styling for intimate bookings, VIP lounges, and branded content moments.",
    src: "/media/in-action/closeup-setup.mp4",
    poster: "/media/in-action/closeup-setup-poster.jpg",
  },
  {
    type: "image" as const,
    title: "Private residence shisha setup",
    caption: "A private residence shisha setup tailored for home entertaining, birthdays, and backyard events in Toronto.",
    src: "/media/in-action/private-residence.jpg",
  },
  {
    type: "image" as const,
    title: "VIP shisha setup for luxury events",
    caption: "A late-night VIP shisha setup created for luxury private events, car meets, and high-end social gatherings in the GTA.",
    src: "/media/in-action/luxury/3cbef6e6-c14b-41ea-b537-89e3f152432d.jpg",
  },
  {
    type: "image" as const,
    title: "Event venue hookah lineup",
    caption: "A multi-head hookah lineup prepared for guest flow, premium presentation, and smooth service at private events and celebrations.",
    src: "/media/in-action/venue-lineup.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury event hookah display",
    caption: "A bold luxury event hookah display styled for premium nightlife, car culture gatherings, and upscale Toronto events.",
    src: "/media/in-action/luxury/97dbe86e-25a3-48c0-8285-0d9ba03b59d0.jpg",
  },
  {
    type: "image" as const,
    title: "Premium shisha product presentation",
    caption: "Clean premium shisha product presentation suited to branded events, intimate setups, and curated guest experiences.",
    src: "/media/in-action/studio-lineup.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury hookah service for VIP gatherings",
    caption: "A luxury hookah service setup staged for VIP gatherings, private parties, and premium lifestyle events across the GTA.",
    src: "/media/in-action/luxury/3ddac740-b269-478d-8992-3decafd96e0c.jpg",
  },
  {
    type: "image" as const,
    title: "Backyard party shisha service",
    caption: "Outdoor shisha service tailored for backyard parties, tented celebrations, and private residence events in Toronto and surrounding cities.",
    src: "/media/in-action/backyard-setup.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury smoke session at a private event",
    caption: "A late-night smoke session shot that reinforces the premium atmosphere of our mobile shisha catering service.",
    src: "/media/in-action/luxury/8dffd9a1-cfaa-45e6-b889-9ee3c43d7a8a.jpg",
  },
  {
    type: "image" as const,
    title: "Evening event shisha atmosphere",
    caption: "An evening event setup showing the premium atmosphere we create for receptions, birthdays, and private celebrations.",
    src: "/media/in-action/event-setup.jpg",
  },
  {
    type: "image" as const,
    title: "Private event hookah rental display",
    caption: "A clean hookah rental display for private events that need a strong visual presentation without sacrificing service quality.",
    src: "/media/in-action/luxury/a58cfd78-9c3c-4033-a7a8-5aaa98500b0b.jpg",
  },
  {
    type: "image" as const,
    title: "Toronto luxury event hookah setup",
    caption: "A Toronto luxury event hookah setup captured at night with polished equipment and lifestyle-focused staging.",
    src: "/media/in-action/luxury/20ba5264-c967-4c39-9470-45e388d395b5.jpg",
  },
  {
    type: "image" as const,
    title: "VIP shisha experience in action",
    caption: "A VIP shisha experience moment showing how our setups become part of the event atmosphere and guest experience.",
    src: "/media/in-action/luxury/606e7a9e-b79f-4950-85ca-8a86fc8c2602.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury party hookah catering display",
    caption: "A high-end party hookah catering display that fits VIP private parties, premium launches, and lifestyle events.",
    src: "/media/in-action/luxury/99c3ef50-ba26-4c35-b3c0-8edb96959891.jpg",
  },
  {
    type: "image" as const,
    title: "Premium hookah setup for nightlife events",
    caption: "A premium hookah setup for nightlife-inspired events, curated gatherings, and late-evening hospitality service.",
    src: "/media/in-action/luxury/ebbb0b5e-d1a4-4221-b886-4c2ec11d95b3.jpg",
  },
  {
    type: "image" as const,
    title: "Shisha smoke moment at a VIP event",
    caption: "A live shisha smoke moment captured during a VIP event, highlighting the experience-driven side of our service.",
    src: "/media/in-action/luxury/c529c38f-c935-43b7-af03-41fa38552a0c.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury mobile hookah experience",
    caption: "A luxury mobile hookah experience framed with strong visual atmosphere for premium private bookings and special events.",
    src: "/media/in-action/luxury/741cd9e0-3ace-4ce4-a567-916005c42e8d.jpg",
  },
  {
    type: "image" as const,
    title: "GTA private event shisha lineup",
    caption: "A wide GTA private event shisha lineup showing multiple premium setups staged for a larger luxury crowd.",
    src: "/media/in-action/luxury/9dc006f8-8ccd-4ebe-983e-91b19dbd6fc9.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury shisha catering atmosphere",
    caption: "Smoke and lighting combine here to show the atmosphere we build for luxury shisha catering in Toronto and the GTA.",
    src: "/media/in-action/luxury/9fe0ef22-64f2-471b-aa60-eb48d741621d.jpg",
  },
  {
    type: "image" as const,
    title: "High-end shisha service presentation",
    caption: "A high-end shisha service presentation for premium parties, luxury lifestyle shoots, and curated guest experiences.",
    src: "/media/in-action/luxury/dcc4a253-2be5-4903-aa33-6e737dff64c5.jpg",
  },
  {
    type: "image" as const,
    title: "Hookah rental for premium private parties",
    caption: "A premium private party hookah rental setup with strong visual contrast and polished night-time staging.",
    src: "/media/in-action/luxury/7582af4d-cff7-4a57-ae3b-26bfdef6b44d.jpg",
  },
  {
    type: "image" as const,
    title: "Toronto hookah setup close-up",
    caption: "A Toronto hookah setup close-up that keeps the product front and centre while still showing the premium event backdrop.",
    src: "/media/in-action/luxury/c0375fc7-91d3-46a2-9812-66285ecd378b.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury event shisha styling",
    caption: "Luxury event shisha styling that blends premium cars, polished setups, and nightlife-inspired private event energy.",
    src: "/media/in-action/luxury/68da4b82-fb3b-4729-903d-313d4c80abba.jpg",
  },
  {
    type: "image" as const,
    title: "Private party shisha smoke scene",
    caption: "A cinematic private party shisha smoke scene that reinforces the mood and premium feel of the booking.",
    src: "/media/in-action/luxury/d35d8a14-269b-4f80-a8e3-a5dd439b1855.jpg",
  },
  {
    type: "image" as const,
    title: "VIP event hookah detail shot",
    caption: "A tighter VIP event hookah detail shot that keeps the focus on equipment quality and premium presentation.",
    src: "/media/in-action/luxury/4547d91f-2f0e-4379-acd1-d7fab672b6c0.jpg",
  },
];

const coverageNotes = [
  "Mobile shisha catering in Toronto and across the GTA",
  "Private residences, patios, weddings, birthdays, and corporate events",
  "Hookah rental and full-service shisha setups for premium gatherings",
];

export default function InActionSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="in-action" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(220,38,38,0.15),transparent_28rem)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              <Sparkles className="h-4 w-4 text-primary" />
              Curated from your latest event content
            </div>
            <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
              Shisha Chauffeurs in Action
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Browse real examples of our mobile shisha catering, hookah rental setups, and luxury private event service in Toronto, Mississauga, Brampton, and the Greater Toronto Area.
              This gallery is built to show how Shisha Chauffeurs serves birthdays, weddings, backyard parties, corporate events, and VIP gatherings.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {coverageNotes.map((note) => (
              <div key={note} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80">
                <MapPin className="mb-3 h-4 w-4 text-primary" />
                {note}
              </div>
            ))}
          </div>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto w-full max-w-6xl"
        >
          <CarouselContent className="-ml-0">
            {mediaItems.map((item) => (
              <CarouselItem
                key={item.src}
                className="pl-0 md:basis-1/2 xl:basis-1/3"
              >
                <article className="mx-3 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35 shadow-2xl shadow-black/20">
                  <div className="relative aspect-[4/5] bg-black">
                    {item.type === "video" ? (
                      <>
                        <video
                          className="h-full w-full object-cover"
                          src={item.src}
                          poster={item.poster}
                          muted
                          loop
                          playsInline
                          controls
                          preload="metadata"
                        />
                        <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/80">
                          <PlayCircle className="h-4 w-4 text-primary" />
                          Live Clip
                        </div>
                      </>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-sm text-white/85">{item.caption}</p>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2 top-[42%] h-11 w-11 border-white/15 bg-black/60 text-white hover:bg-black/80 disabled:opacity-30 md:left-4" />
          <CarouselNext className="right-2 top-[42%] h-11 w-11 border-white/15 bg-black/60 text-white hover:bg-black/80 disabled:opacity-30 md:right-4" />
        </Carousel>

        <div className="mt-8 grid gap-4 rounded-[2rem] border border-white/10 bg-black/30 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary/90">Setup Spotlight</p>
            <h3 className="mt-3 font-serif text-3xl font-semibold text-white">
              Toronto mobile shisha catering for private events and premium gatherings
            </h3>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              The updated carousel now supports SEO-focused captions built around the services people actually search for:
              shisha catering Toronto, hookah rental GTA, private event shisha service, and luxury mobile shisha setups for weddings, birthdays, and corporate events.
            </p>
          </div>

          <Button
            onClick={scrollToContact}
            className="w-full justify-center rounded-full bg-primary px-6 py-6 text-base font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground md:w-auto"
            data-testid="button-in-action-book"
          >
            Book A Setup Like This
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
