import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
      isScrolled ? 'glass-effect bg-opacity-95' : 'glass-effect'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-bold text-xl">SHISHA CHAUFFEURS</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#home"
              onClick={() => scrollToSection('home')} 
              className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              data-testid="nav-home"
            >
              Home
            </a>
            <a 
              href="#services"
              onClick={() => scrollToSection('services')} 
              className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              data-testid="nav-services"
            >
              Services
            </a>
            <a 
              href="#packages"
              onClick={() => scrollToSection('packages')} 
              className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              data-testid="nav-packages"
            >
              Packages
            </a>
            <a 
              href="#memberships"
              onClick={() => scrollToSection('memberships')} 
              className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              data-testid="nav-memberships"
            >
              Memberships
            </a>
            <a 
              href="#shisha-rentals"
              onClick={() => scrollToSection('shisha-rentals')} 
              className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              data-testid="nav-pricing"
            >
              Pricing
            </a>
            <a 
              href="#flavours"
              onClick={() => scrollToSection('flavours')} 
              className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              data-testid="nav-flavours"
            >
              Flavours
            </a>
            <a 
              href="#contact"
              onClick={() => scrollToSection('contact')} 
              className="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              data-testid="nav-contact"
            >
              Contact
            </a>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-primary"
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-effect bg-opacity-95 p-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#home"
                onClick={() => scrollToSection('home')} 
                className="text-left hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                data-testid="mobile-nav-home"
              >
                Home
              </a>
              <a 
                href="#services"
                onClick={() => scrollToSection('services')} 
                className="text-left hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                data-testid="mobile-nav-services"
              >
                Services
              </a>
              <a 
                href="#packages"
                onClick={() => scrollToSection('packages')} 
                className="text-left hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                data-testid="mobile-nav-packages"
              >
                Packages
              </a>
              <a 
                href="#memberships"
                onClick={() => scrollToSection('memberships')} 
                className="text-left hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                data-testid="mobile-nav-memberships"
              >
                Memberships
              </a>
              <a 
                href="#shisha-rentals"
                onClick={() => scrollToSection('shisha-rentals')} 
                className="text-left hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                data-testid="mobile-nav-pricing"
              >
                Pricing
              </a>
              <a 
                href="#flavours"
                onClick={() => scrollToSection('flavours')} 
                className="text-left hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                data-testid="mobile-nav-flavours"
              >
                Flavours
              </a>
              <a 
                href="#contact"
                onClick={() => scrollToSection('contact')} 
                className="text-left hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                data-testid="mobile-nav-contact"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
