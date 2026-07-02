import { ArrowRight, Camera, MapPin, PlayCircle, Sparkles } from "lucide-react";
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
    caption: "Hosted lounge setup for private celebrations.",
    src: "/media/in-action/lounge-smoke.mp4",
    poster: "/media/in-action/lounge-smoke-poster.jpg",
  },
  {
    type: "video" as const,
    title: "Outdoor shisha setup in the GTA",
    caption: "Outdoor shisha service for backyard parties.",
    src: "/media/in-action/outdoor-setup.mp4",
    poster: "/media/in-action/outdoor-setup-poster.jpg",
  },
  {
    type: "video" as const,
    title: "Luxury hookah setup detail",
    caption: "Premium hookah details for VIP lounges.",
    src: "/media/in-action/closeup-setup.mp4",
    poster: "/media/in-action/closeup-setup-poster.jpg",
  },
  {
    type: "image" as const,
    title: "Private residence shisha setup",
    caption: "Private residence setup for relaxed hosting.",
    src: "/media/in-action/private-residence.jpg",
  },
  {
    type: "image" as const,
    title: "VIP shisha setup for luxury events",
    caption: "VIP styling for luxury night events.",
    src: "/media/in-action/luxury/3cbef6e6-c14b-41ea-b537-89e3f152432d.jpg",
  },
  {
    type: "image" as const,
    title: "Event venue hookah lineup",
    caption: "Multi-head lineup for smooth guest flow.",
    src: "/media/in-action/venue-lineup.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury event hookah display",
    caption: "Bold display for upscale Toronto nights.",
    src: "/media/in-action/luxury/97dbe86e-25a3-48c0-8285-0d9ba03b59d0.jpg",
  },
  {
    type: "image" as const,
    title: "Premium shisha product presentation",
    caption: "Clean product styling for curated events.",
    src: "/media/in-action/studio-lineup.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury hookah service for VIP gatherings",
    caption: "Luxury hookah service for VIP gatherings.",
    src: "/media/in-action/luxury/3ddac740-b269-478d-8992-3decafd96e0c.jpg",
  },
  {
    type: "image" as const,
    title: "Backyard party shisha service",
    caption: "Backyard shisha service with polished setup.",
    src: "/media/in-action/backyard-setup.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury smoke session at a private event",
    caption: "Late-night atmosphere for premium sessions.",
    src: "/media/in-action/luxury/8dffd9a1-cfaa-45e6-b889-9ee3c43d7a8a.jpg",
  },
  {
    type: "image" as const,
    title: "Evening event shisha atmosphere",
    caption: "Evening setup for elevated private events.",
    src: "/media/in-action/event-setup.jpg",
  },
  {
    type: "image" as const,
    title: "Private event hookah rental display",
    caption: "Rental display with polished visual presence.",
    src: "/media/in-action/luxury/a58cfd78-9c3c-4033-a7a8-5aaa98500b0b.jpg",
  },
  {
    type: "image" as const,
    title: "Toronto luxury event hookah setup",
    caption: "Toronto night setup with premium styling.",
    src: "/media/in-action/luxury/20ba5264-c967-4c39-9470-45e388d395b5.jpg",
  },
  {
    type: "image" as const,
    title: "VIP shisha experience in action",
    caption: "VIP experience built around guest energy.",
    src: "/media/in-action/luxury/606e7a9e-b79f-4950-85ca-8a86fc8c2602.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury party hookah catering display",
    caption: "High-end display for premium private parties.",
    src: "/media/in-action/luxury/99c3ef50-ba26-4c35-b3c0-8edb96959891.jpg",
  },
  {
    type: "image" as const,
    title: "Premium hookah setup for nightlife events",
    caption: "Nightlife-ready setup for curated gatherings.",
    src: "/media/in-action/luxury/ebbb0b5e-d1a4-4221-b886-4c2ec11d95b3.jpg",
  },
  {
    type: "image" as const,
    title: "Shisha smoke moment at a VIP event",
    caption: "Live smoke moment during VIP service.",
    src: "/media/in-action/luxury/c529c38f-c935-43b7-af03-41fa38552a0c.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury mobile hookah experience",
    caption: "Mobile hookah experience with strong atmosphere.",
    src: "/media/in-action/luxury/741cd9e0-3ace-4ce4-a567-916005c42e8d.jpg",
  },
  {
    type: "image" as const,
    title: "GTA private event shisha lineup",
    caption: "Large-event lineup for GTA private bookings.",
    src: "/media/in-action/luxury/9dc006f8-8ccd-4ebe-983e-91b19dbd6fc9.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury shisha catering atmosphere",
    caption: "Smoke and lighting for luxury catering.",
    src: "/media/in-action/luxury/9fe0ef22-64f2-471b-aa60-eb48d741621d.jpg",
  },
  {
    type: "image" as const,
    title: "High-end shisha service presentation",
    caption: "High-end presentation for curated guest experiences.",
    src: "/media/in-action/luxury/dcc4a253-2be5-4903-aa33-6e737dff64c5.jpg",
  },
  {
    type: "image" as const,
    title: "Hookah rental for premium private parties",
    caption: "Premium rental setup for private parties.",
    src: "/media/in-action/luxury/7582af4d-cff7-4a57-ae3b-26bfdef6b44d.jpg",
  },
  {
    type: "image" as const,
    title: "Toronto hookah setup close-up",
    caption: "Close-up product detail with event atmosphere.",
    src: "/media/in-action/luxury/c0375fc7-91d3-46a2-9812-66285ecd378b.jpg",
  },
  {
    type: "image" as const,
    title: "Luxury event shisha styling",
    caption: "Luxury styling with nightlife-inspired energy.",
    src: "/media/in-action/luxury/68da4b82-fb3b-4729-903d-313d4c80abba.jpg",
  },
  {
    type: "image" as const,
    title: "Private party shisha smoke scene",
    caption: "Cinematic smoke scene for private parties.",
    src: "/media/in-action/luxury/d35d8a14-269b-4f80-a8e3-a5dd439b1855.jpg",
  },
  {
    type: "image" as const,
    title: "VIP event hookah detail shot",
    caption: "VIP detail shot with premium finish.",
    src: "/media/in-action/luxury/4547d91f-2f0e-4379-acd1-d7fab672b6c0.jpg",
  },
];

const coverageNotes = [
  "Toronto and GTA bookings",
  "Private residences and patios",
  "Weddings, birthdays, corporate events",
];

const actionStats = [
  { value: "27", label: "event moments" },
  { value: "3", label: "live clips" },
  { value: "GTA", label: "private service" },
];

export default function InActionSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="in-action" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(220,38,38,0.15),transparent_28rem)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-5 sm:mb-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)] lg:items-stretch">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              <Sparkles className="h-4 w-4 text-primary" />
              Latest event content
            </div>
            <h2 className="max-w-xl font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Shisha Chauffeurs in Action
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Real shisha setups, live clips, and private-event moments from bookings across Toronto and the GTA.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3">
              {actionStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="font-serif text-2xl font-semibold text-white sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {coverageNotes.map((note) => (
              <div key={note} className="group flex items-center gap-4 rounded-[1.35rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.025] p-4 text-sm text-white/80 transition-colors hover:border-primary/40 sm:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                  {note.includes("Toronto") ? <MapPin className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
                </span>
                <span className="font-medium">{note}</span>
              </div>
            ))}
            <Button
              onClick={scrollToContact}
              className="mt-1 min-h-12 justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground"
              data-testid="button-in-action-book-top"
            >
              Book A Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
                <article className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/35 shadow-2xl shadow-black/20 sm:mx-3 sm:rounded-[1.75rem]">
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
                        <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 sm:left-4 sm:top-4 sm:text-[11px] sm:tracking-[0.22em]">
                          <PlayCircle className="h-4 w-4 text-primary" />
                          Live Clip
                        </div>
                        <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white shadow-2xl shadow-black/40 backdrop-blur-sm sm:h-20 sm:w-20">
                          <PlayCircle className="h-8 w-8 fill-primary/25 text-primary sm:h-10 sm:w-10" />
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
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="text-sm leading-6 text-white/85">{item.caption}</p>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-3 top-[42%] hidden h-10 w-10 border-white/15 bg-black/60 text-white hover:bg-black/80 disabled:opacity-30 sm:flex md:left-4 md:h-11 md:w-11" />
          <CarouselNext className="right-3 top-[42%] hidden h-10 w-10 border-white/15 bg-black/60 text-white hover:bg-black/80 disabled:opacity-30 sm:flex md:right-4 md:h-11 md:w-11" />
        </Carousel>

        <div className="mt-6 grid gap-4 rounded-[1.5rem] border border-white/10 bg-black/30 p-5 sm:mt-8 sm:rounded-[2rem] sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary/90">Setup Spotlight</p>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-white sm:text-3xl">
              Premium setups for standout private events.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Polished service for birthdays, weddings, patios, and VIP gatherings.
            </p>
          </div>

          <Button
            onClick={scrollToContact}
            className="w-full justify-center rounded-full bg-primary px-6 py-5 text-base font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground md:w-auto md:py-6"
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
