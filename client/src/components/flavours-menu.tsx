import { Card, CardContent } from "@/components/ui/card";

export default function FlavoursMenu() {
  const classicFlavours = [
    { name: "Double Apple", emoji: "🍏" },
    { name: "Lemon Mint", emoji: "🍋" },
    { name: "Grape Mint", emoji: "🍇" },
    { name: "Peach", emoji: "🍑" },
    { name: "Mango", emoji: "🥭" },
    { name: "Orange Mint", emoji: "🍊" },
    { name: "Blue Dragon", emoji: "🐉" },
    { name: "Lady Killer", emoji: "🍈" },
    { name: "Paan Raas", emoji: "🌿" },
    { name: "Blue Mist", emoji: "🫐" }
  ];

  const signatureFlavours = [
    { name: "Chauffeur Special", description: "(Blue Dragon + Lady Killer)", emoji: "🌟" },
    { name: "Royal Paan Breeze", description: "(Paan + Mint)", emoji: "🍃" },
    { name: "Summer Sunset", description: "(Mango + Peach + Lemon)", emoji: "🍑🥭" },
    { name: "Raspberry Mojito", description: "(Raspberry + Mint + Lime)", emoji: "🍓🌿" }
  ];

  return (
    <section id="flavours" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">FLAVOURS MENU</h2>
          <p className="text-xl text-muted-foreground">Discover our premium selection of shisha flavours</p>
        </div>

        {/* Classic Flavours */}
        <div className="mb-16">
          <h3 className="font-serif text-3xl font-semibold text-center mb-12 border-b border-primary pb-4">
            Classic Flavours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classicFlavours.map((flavour, index) => (
              <Card key={index} className="bg-card text-center hover-float gradient-purple" data-testid={`classic-flavour-${index}`}>
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{flavour.emoji}</div>
                  <h4 className="font-semibold text-lg mb-2">{flavour.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Signature Blends */}
        <div>
          <h3 className="font-serif text-3xl font-semibold text-center mb-12 border-b border-primary pb-4">
            Signature Blends
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureFlavours.map((flavour, index) => (
              <Card key={index} className="bg-card hover-float gradient-purple" data-testid={`signature-flavour-${index}`}>
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{flavour.emoji}</div>
                    <h4 className="font-serif text-xl font-semibold mb-3">{flavour.name}</h4>
                    <p className="text-sm text-gray-300">{flavour.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="bg-card hover-float gradient-purple" data-testid="custom-flavour-card">
              <CardContent className="p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎨</div>
                  <h4 className="font-serif text-xl font-semibold mb-3">Custom Flavour</h4>
                  <p className="text-sm text-gray-300">Custom flavour available upon request</p>
                  <p className="mt-2 text-sm text-primary font-semibold">Additional flavours at $30</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}