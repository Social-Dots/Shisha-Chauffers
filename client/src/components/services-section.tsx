import { Martini, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesSection() {
  const services = [
    {
      icon: Martini,
      title: "Shisha Catering",
      description: "Professional shisha masters bring premium flavours and equipment directly to your event",
      gradient: "gradient-gold",
      features: [
        "Professional attendants prepare all shisha equipment and premium flavours.",
        "Continuous monitoring and service throughout your event.",
        "Complete breakdown and cleanup once the event concludes."
      ]
    },
    {
      icon: Home,
      title: "Shisha Rentals",
      description: "Rent shisha equipment for your private events and parties",
      gradient: "gradient-gold",
      features: [
        "Self-service rental. Equipment only, no attendants included.",
        "Basic equipment: shisha, basic head, basic flavour, and quick-light coals.",
        "Set-up instructions included, with a 24-hour rental period.",
        "Pickup and delivery available."
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Premium Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Elevate your events with our luxury mobile shisha catering, or rent shisha equipment for a self-service setup
          </p>
        </div>
        
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <Card key={index} className="bg-card hover-float" data-testid={`service-card-${index}`}>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl font-semibold mb-4 text-red">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                </div>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
