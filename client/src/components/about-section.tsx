import { CheckCircle } from "lucide-react";

export default function AboutSection() {
  const features = [
    "Outdoor & Private Residence Services Only",
    "Professional Setup & Expert Service", 
    "Premium Quality Guaranteed",
    "Deposit Required to Secure Booking"
  ];

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="mb-5 font-serif text-3xl font-bold sm:text-4xl md:text-5xl">About Shisha Chauffeurs</h2>
            <p className="mb-5 text-lg text-primary sm:text-xl">Where flavor meets finesse</p>
            <p className="mb-5 text-base leading-7 text-muted-foreground sm:text-lg">
              We are a premium mobile shisha and mocktail catering service that brings luxury directly to your events. 
              Our team of professionals ensures every gathering becomes an unforgettable experience with the finest 
              flavours and impeccable service.
            </p>
            <p className="mb-8 text-base leading-7 text-muted-foreground sm:text-lg">
              Specializing in outdoor locations and private residences, we transform any space into a sophisticated 
              entertainment venue with our premium equipment and expertly crafted experiences.
            </p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start" data-testid={`feature-${index}`}>
                  <CheckCircle className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-base leading-7">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/media/about/about-shisha-chauffeurs.jpg"
              alt="Luxury mobile shisha service by Shisha Chauffeurs"
              className="w-full rounded-xl shadow-2xl"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
