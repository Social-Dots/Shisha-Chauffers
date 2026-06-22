import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, CalendarDays, Clock3, Flame, MapPinned, PhoneCall, Sparkles } from "lucide-react";

const serviceOptions = [
  {
    value: "shisha-rental",
    label: "Shisha Rental",
    description:
      "All-inclusive rental service for house parties, backyard hangouts, and special celebrations without lounge travel.",
  },
  {
    value: "shisha-catering",
    label: "Shisha Catering",
    description:
      "Fully catered on-site experience with professional attendants, setup, coal rotation, flavour guidance, and clean-down.",
  },
  {
    value: "mocktail-services",
    label: "Mocktail Services",
    description:
      "Handcrafted mocktail service for events that want a full hospitality layer alongside shisha.",
  },
];

const packageOptions = [
  {
    value: "standard-private-session",
    label: "Standard Private Session (2-6 People) $250",
    description: "2 hookahs, standard or premium flavours, plus setup, maintenance, and cleaning by attendants.",
  },
  {
    value: "premium-private-session",
    label: "Premium Private Session (4-12 People) $450",
    description: "4 hookahs, standard or premium flavours, plus setup, maintenance, and cleaning by attendants.",
  },
  {
    value: "luxury-private-experience",
    label: "Luxury Private Experience (8-24 People) $600",
    description: "8 hookahs, standard or premium flavours, plus setup, maintenance, and cleaning by attendants.",
  },
];

const flavourOptions = [
  "Double Apple",
  "Lemon Mint",
  "Grape",
  "Blueberry",
  "Peach",
  "Mango",
  "Lady Killer",
  "Chauffeur Special (Blue Dragon + Lady Killer)",
  "Blue Mist",
  "Royal Paan Breeze (Paan + Mint)",
  "Summer Sunset (Mango + Peach + Lemon)",
  "Raspberry Mojito (Raspberry + Mint + Lime)",
];

const additionalServiceOptions = [
  "Additional Hookah ($55)",
  "Additional Head + flavour ($20 Each)",
  "Fruit Head + Flavour (Apple, Orange, Grapefruit) ($25 Each)",
];

const referralOptions = [
  "Instagram",
  "TikTok",
  "Google Search",
  "Referred By a Friend",
  "Other",
];

const stepCopy = [
  { title: "Contact", detail: "Who is booking and where the event is happening" },
  { title: "Service", detail: "Select your service, package, and add-ons" },
  { title: "Event", detail: "Date, timing, event type, and guest count" },
  { title: "Flavours", detail: "Choose flavour profiles and final notes" },
  { title: "Confirm", detail: "Review the important booking conditions" },
];

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const { toast } = useToast();
  const today = new Date().toISOString().split("T")[0];

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      instagram: "",
      services: [],
      packageSelection: "",
      additionalServices: [],
      eventDate: "",
      eventTime: "",
      endTime: "",
      location: "",
      guestCount: "",
      eventType: "",
      preferredFlavours: [],
      flavourPreferences: "",
      specialRequirements: "",
      referralSource: "",
      budget: "",
      termsAccepted: false,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit booking");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Submitted",
        description: "We received your request and will follow up shortly to confirm availability.",
      });
      form.reset();
      setCurrentStep(1);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBooking) => {
    bookingMutation.mutate(data);
  };

  const stepFields: Record<number, (keyof InsertBooking)[]> = {
    1: ["firstName", "lastName", "location", "phone", "email"],
    2: ["services", "packageSelection"],
    3: ["eventDate", "eventTime", "endTime", "eventType", "guestCount"],
    4: ["preferredFlavours", "referralSource"],
    5: ["termsAccepted"],
  };

  const nextStep = async () => {
    const isStepValid = await form.trigger(stepFields[currentStep]);
    if (!isStepValid) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.16),transparent_32rem)]" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <Sparkles className="h-4 w-4 text-primary" />
            Shisha Chauffeurs Booking Form
          </div>
          <div className="mx-auto mb-6 flex w-fit items-center justify-center rounded-3xl border border-white/10 bg-black/30 px-6 py-4 shadow-2xl shadow-black/20">
            <img src="/logo.svg" alt="Shisha Chauffeurs" className="h-12 w-auto md:h-16" />
          </div>
          <h2 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">
            Shisha Catering, Rental & Mocktail Services
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Reserve our luxury mobile shisha and mocktail catering services or rent shishas for your next event.
            Whether you are hosting a private gathering, wedding, birthday, or celebration, we use this form to confirm
            your service request, event details, preferred flavours, and any add-ons you want included.
          </p>
        </div>

        <Card className="surface-panel overflow-hidden border-white/10 bg-card/80">
          <CardContent className="p-8 lg:p-12">
            <div className="mb-10 grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-5 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-white">Outdoor and private residence only</p>
                  <p className="text-sm text-muted-foreground">Bookings are limited to outdoor locations or private residences.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinned className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-white">Luxury attended service</p>
                  <p className="text-sm text-muted-foreground">Setup, teardown, coal rotation, flavour support, and polished guest service.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Flame className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-white">Deposit required</p>
                  <p className="text-sm text-muted-foreground">A deposit is required to secure your booking after confirmation.</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-muted-foreground">Progress: {Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted-foreground/20">
                <div className="gradient-gold h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-5">
                {stepCopy.map((step, index) => {
                  const stepNumber = index + 1;
                  const isActive = currentStep === stepNumber;
                  const isComplete = currentStep > stepNumber;

                  return (
                    <div
                      key={step.title}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                        isActive
                          ? "border-primary/60 bg-primary/10"
                          : isComplete
                            ? "border-white/10 bg-white/5"
                            : "border-white/5 bg-black/10"
                      }`}
                    >
                      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {String(stepNumber).padStart(2, "0")}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{step.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="mb-6 font-serif text-2xl font-semibold">Contact & Location</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-first-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-last-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="647 555 1234" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Instagram Handle (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="@shishachauffeurs" {...field} value={field.value ?? ""} data-testid="input-instagram" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>What is the location of the event? *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Full address, venue name, or neighbourhood. Outdoor locations and private residences only."
                                {...field}
                                data-testid="textarea-location"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="mb-6 font-serif text-2xl font-semibold">Service Request</h3>

                    <FormField
                      control={form.control}
                      name="services"
                      render={() => (
                        <FormItem>
                          <FormLabel>What service do you want? *</FormLabel>
                          <div className="space-y-4">
                            {serviceOptions.map((option) => (
                              <FormField
                                key={option.value}
                                control={form.control}
                                name="services"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border border-white/10 bg-black/20 p-4">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.value)}
                                        onCheckedChange={(checked) =>
                                          checked
                                            ? field.onChange([...(field.value ?? []), option.value])
                                            : field.onChange((field.value ?? []).filter((value) => value !== option.value))
                                        }
                                        data-testid={`checkbox-service-${option.value}`}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="font-semibold text-white">{option.label}</FormLabel>
                                      <p className="text-sm text-muted-foreground">{option.description}</p>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <p className="text-sm font-semibold text-white">What our attendants provide</p>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li>Full setup and teardown so you can stay focused on your guests.</li>
                        <li>Live flavour mixing and recommendations based on the event vibe.</li>
                        <li>Continuous coal rotation, fruit head preparation, and clean hygienic service.</li>
                      </ul>
                    </div>

                    <FormField
                      control={form.control}
                      name="packageSelection"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shisha Package Selection</FormLabel>
                          <div className="space-y-4">
                            {packageOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => field.onChange(option.value)}
                                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                                  field.value === option.value
                                    ? "border-primary/60 bg-primary/10"
                                    : "border-white/10 bg-black/20 hover:border-white/20"
                                }`}
                                data-testid={`package-${option.value}`}
                              >
                                <p className="font-semibold text-white">{option.label}</p>
                                <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>
                              </button>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-muted-foreground">
                      <p className="font-semibold text-white">Shisha rental prices</p>
                      <p className="mt-2">1 shisha $60, 2 shishas $115, 3 shishas $165, 4 shishas $210, 5 shishas $250, 6 shishas $300.</p>
                    </div>

                    <FormField
                      control={form.control}
                      name="additionalServices"
                      render={() => (
                        <FormItem>
                          <FormLabel>Additional Services</FormLabel>
                          <div className="space-y-3">
                            {additionalServiceOptions.map((option) => (
                              <FormField
                                key={option}
                                control={form.control}
                                name="additionalServices"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={(field.value ?? []).includes(option)}
                                        onCheckedChange={(checked) =>
                                          checked
                                            ? field.onChange([...(field.value ?? []), option])
                                            : field.onChange((field.value ?? []).filter((value) => value !== option))
                                        }
                                        data-testid={`checkbox-addon-${option}`}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-white">{option}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="mb-6 font-serif text-2xl font-semibold">Event Details</h3>
                    <div className="grid gap-6 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="eventDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Event *</FormLabel>
                            <FormControl>
                              <Input type="date" min={today} {...field} data-testid="input-event-date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="eventTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time *</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} data-testid="input-event-time" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time *</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} data-testid="input-end-time" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="eventType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type of Event *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                              <FormControl>
                                <SelectTrigger data-testid="select-event-type">
                                  <SelectValue placeholder="Select event type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Birthday Party">Birthday Party</SelectItem>
                                <SelectItem value="Wedding Event">Wedding Event</SelectItem>
                                <SelectItem value="Private Gathering">Private Gathering</SelectItem>
                                <SelectItem value="Corporate Event">Corporate Event</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guestCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Guests Expected *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                              <FormControl>
                                <SelectTrigger data-testid="select-guest-count">
                                  <SelectValue placeholder="Select guest count" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="2 - 6">2 - 6</SelectItem>
                                <SelectItem value="6 - 12">6 - 12</SelectItem>
                                <SelectItem value="12 - 20">12 - 20</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="mb-6 font-serif text-2xl font-semibold">Flavours, Questions & Source</h3>

                    <FormField
                      control={form.control}
                      name="preferredFlavours"
                      render={() => (
                        <FormItem>
                          <FormLabel>Preferred Shisha Flavours *</FormLabel>
                          <div className="grid gap-3 md:grid-cols-2">
                            {flavourOptions.map((option) => (
                              <FormField
                                key={option}
                                control={form.control}
                                name="preferredFlavours"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border border-white/10 bg-black/20 p-4">
                                    <FormControl>
                                      <Checkbox
                                        checked={(field.value ?? []).includes(option)}
                                        onCheckedChange={(checked) =>
                                          checked
                                            ? field.onChange([...(field.value ?? []), option])
                                            : field.onChange((field.value ?? []).filter((value) => value !== option))
                                        }
                                        data-testid={`checkbox-flavour-${option}`}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-white">{option}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="flavourPreferences"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom flavour notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us if you want any specific pairing, mixing direction, or fruit head preference."
                              {...field}
                              value={field.value ?? ""}
                              data-testid="textarea-flavour-preferences"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specialRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Questions, or Other Information</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share any event notes, access details, setup constraints, or other information."
                              {...field}
                              value={field.value ?? ""}
                              data-testid="textarea-special-requirements"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="referralSource"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How did you hear about us? *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                            <FormControl>
                              <SelectTrigger data-testid="select-referral-source">
                                <SelectValue placeholder="Select a source" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {referralOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="mb-6 font-serif text-2xl font-semibold">Important Notes</h3>
                    <div className="rounded-lg bg-muted p-6">
                      <h4 className="mb-4 flex items-center gap-2 font-semibold text-white">
                        <Clock3 className="h-4 w-4 text-primary" />
                        Before you submit
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          Bookings are only available for outdoor locations or private residences.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          A deposit is required to secure your booking after availability is confirmed.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          Once submitted, our team will review your request and reach out to finalize your booking.
                        </li>
                      </ul>
                    </div>

                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} data-testid="checkbox-terms" />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              I understand the booking conditions and agree that a deposit is required to secure the reservation. *
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormMessage />

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-muted-foreground">
                      <p className="font-semibold text-white">Need to reach us directly?</p>
                      <p className="mt-2 flex items-center gap-2">
                        <PhoneCall className="h-4 w-4 text-primary" />
                        For inquiries, contact us at shishachauffeurs@gmail.com or message Shisha Chauffeurs on Instagram or TikTok.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between border-t border-border pt-8">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className={currentStep === 1 ? "invisible" : ""}
                    data-testid="button-previous"
                  >
                    Previous
                  </Button>
                  <div className="flex-1" />
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="gradient-gold font-semibold text-black transition-all duration-300 hover:shadow-lg"
                      data-testid="button-next"
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={bookingMutation.isPending}
                      className="gradient-gold font-semibold text-black transition-all duration-300 hover:shadow-lg"
                      data-testid="button-submit"
                    >
                      {bookingMutation.isPending ? "Submitting..." : "Submit Booking Request"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
