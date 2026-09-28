import { Martini } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesSection() {
  const services = [
    {
      icon: Martini,
      title: "Shisha Catering",
      description:
        "Professional shisha masters bring premium flavours and equipment directly to your event",
      gradient: "gradient-gold",
      features: [
        "Luxury equipment package: shisha, quasar heads, HMD, coconut coals, and mouthpieces.",
        "Every package includes flavour, an attendant, setup, teardown, coal management, and 1 head + flavour change.",
        "Professional setup and clean-down included.",
        "Free local delivery across the GTA. Additional charges may apply based on event location.",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Premium Service</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mobile shisha catering delivered and serviced at your event. Setup, service, and clean-down handled by our team.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card hover-float" data-testid={`service-card-${index}`}>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl font-semibold mb-4 text-white">{service.title}</h3>
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
