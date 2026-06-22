import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnhancedShishaSmoke } from "@/components/interactive-smoke";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20 sm:pt-24">
      {/* Hero background */}
      <div className="absolute inset-0">
        <img 
          src="https://lh3.googleusercontent.com/pw/AP1GczOrQSNMMXMkfvlqyH32IhDel9d5ORHwmV-nHIfYLSv1ya8e7Cc9RngQdbYVctm9a9Z1MhtN3K8OnQlMo76X1Mj19MaqwAk_kA6Xby8OpoG4crYB4LL1zhj97zA1CI2kIhKdCAFAglvDlofj5IIihanJ=w854-h683-s-no?authuser=0" 
          alt="Luxury shisha cafe ambiance" 
          className="w-full h-full object-cover"
          width="854"
          height="683"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <EnhancedShishaSmoke className="z-10 opacity-80" />
      </div>
      
      <div className="relative z-30 mx-auto max-w-4xl px-4 text-center">
        <h1 className="mb-5 font-serif text-4xl font-bold leading-[0.95] text-shadow sm:text-5xl md:mb-6 md:text-7xl">
          LUXURY MOBILE <br />
          <span className="text-primary font-extrabold tracking-wider">SHISHA CATERING</span>
        </h1>
        <p className="mb-2 text-lg text-muted-foreground sm:text-xl md:text-2xl">Where flavor meets finesse</p>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:text-xl">
          Premium shisha and mocktail services delivered to your doorstep for private events across Toronto and the GTA.
        </p>
        
        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button 
            onClick={() => scrollToSection('contact')} 
            className="gradient-gold min-h-12 rounded-full px-7 py-3 text-base font-semibold text-black transition-all duration-300 hover:shadow-lg sm:px-8 sm:py-4"
            data-testid="button-book-event"
          >
            Book Your Event
          </Button>
          <Button 
            onClick={() => scrollToSection('flavours')} 
            variant="outline"
            className="glass-effect min-h-12 rounded-full px-7 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:bg-opacity-10 sm:px-8 sm:py-4"
            data-testid="button-explore-flavours"
          >
            Explore Flavours
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 animate-bounce sm:block">
        <ChevronDown className="text-primary text-2xl" />
      </div>
    </section>
  );
}
