import { useState, useEffect } from "react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand-mark";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect shadow-2xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3 py-2">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center text-left"
              data-testid="nav-logo"
              aria-label="Shisha Chauffeurs — home"
            >
              <Logo markClassName="h-9 w-auto sm:h-11" priority />
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('packages')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-packages"
            >
              Packages
            </button>
            <button 
              onClick={() => scrollToSection('shisha-rentals')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-pricing"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('flavours')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-flavours"
            >
              Flavours
            </button>
            <button
              onClick={() => scrollToSection('in-action')}
              className="hover:text-primary transition-colors"
              data-testid="nav-in-action"
            >
              In Action
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-accent hover:text-accent-foreground"
              data-testid="nav-contact"
            >
              <CalendarCheck className="h-4 w-4" />
              Book
            </button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full border border-white/10 bg-black/30 p-2 text-foreground transition-colors hover:text-primary"
              data-testid="mobile-menu-toggle"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full border-t border-white/10 bg-black/95 px-4 pb-5 pt-4 backdrop-blur-xl md:hidden">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('home')} 
                className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:text-primary"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:text-primary"
                data-testid="mobile-nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('packages')} 
                className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:text-primary"
                data-testid="mobile-nav-packages"
              >
                Packages
              </button>
              <button 
                onClick={() => scrollToSection('shisha-rentals')} 
                className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:text-primary"
                data-testid="mobile-nav-pricing"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('flavours')} 
                className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:text-primary"
                data-testid="mobile-nav-flavours"
              >
                Flavours
              </button>
              <button
                onClick={() => scrollToSection('in-action')}
                className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:text-primary"
                data-testid="mobile-nav-in-action"
              >
                In Action
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="rounded-2xl bg-primary px-4 py-3 text-left font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                data-testid="mobile-nav-contact"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
