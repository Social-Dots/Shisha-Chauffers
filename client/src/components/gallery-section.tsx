import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GallerySection() {
  const galleryImages = [
    {
      src: "/media/in-action/venue-lineup.jpg",
      alt: "Multi-head shisha lineup set up for a private event",
      caption: "Event Lineup"
    },
    {
      src: "/media/in-action/lounge-smoke-poster.jpg",
      alt: "Hosted lounge shisha setup for a private celebration",
      caption: "Hosted Lounge Setup"
    },
    {
      src: "/media/in-action/private-residence.jpg",
      alt: "Shisha setup at a private residence",
      caption: "Private Residence"
    },
    {
      src: "/media/in-action/outdoor-setup-poster.jpg",
      alt: "Outdoor shisha service for a backyard party",
      caption: "Outdoor Setup"
    },
    {
      src: "/media/in-action/backyard-setup.jpg",
      alt: "Backyard shisha service with a polished setup",
      caption: "Backyard Service"
    },
    {
      src: "/media/in-action/closeup-setup-poster.jpg",
      alt: "Close-up of premium shisha equipment",
      caption: "Premium Equipment"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Event Gallery</h2>
          <p className="text-xl text-muted-foreground">See our luxury setups in action</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl" data-testid={`gallery-image-${index}`}>
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <Instagram className="text-3xl mb-2 mx-auto" />
                  <p className="font-semibold">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-x-4">
          <Button 
            asChild
            className="gradient-gold px-8 py-4 rounded-full text-black font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            data-testid="button-follow-instagram"
          >
            <a href="https://www.instagram.com/shishachauffeurs/" target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-5 w-5" />
              Follow Us @shishachauffeurs
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
