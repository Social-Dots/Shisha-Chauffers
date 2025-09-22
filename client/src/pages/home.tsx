import { Suspense, lazy } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";

// Lazy-load below-the-fold components for better performance
const ServicesSection = lazy(() => import("@/components/services-section"));
const PackagesSection = lazy(() => import("@/components/packages-section"));
const MembershipsSection = lazy(() => import("@/components/memberships-section"));
const ShishaRentalsSection = lazy(() => import("@/components/shisha-rentals-section"));
const FlavoursMenu = lazy(() => import("@/components/flavours-menu"));
const GallerySection = lazy(() => import("@/components/gallery-section"));
const ContactForm = lazy(() => import("@/components/contact-form"));
const Footer = lazy(() => import("@/components/footer"));

// Lightweight loading skeletons
const SectionSkeleton = () => (
  <section className="py-20 bg-muted/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-muted rounded w-96 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <PackagesSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <MembershipsSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ShishaRentalsSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <FlavoursMenu />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <GallerySection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ContactForm />
      </Suspense>
      
      <Suspense fallback={<div className="h-32 bg-muted/50"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
