import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import {
  trackBookingSubmit,
  trackBookingError,
  trackBookingFormStart,
  trackBookingStepComplete,
  trackBookingStepError,
  trackBookingSubmitAttempt,
} from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, CalendarDays, Clock3, Flame, MapPinned, PhoneCall, Sparkles } from "lucide-react";

const packageOptions = [
  {
    value: "standard-private-session",
    label: "Standard - $300",
    description: "2 shishas, up to 3 hours.",
  },
  {
    value: "signature-private-session",
    label: "Signature - $475",
    description: "4 shishas, up to 4 hours.",
  },
  {
    value: "premium-private-session",
    label: "Premium - $650",
    description: "6 shishas, up to 4 hours.",
  },
  {
    value: "luxury-private-experience",
    label: "Luxury - $800",
    description: "8 shishas, up to 5 hours.",
  },
];

const cateringAddOns = [
  "Additional hookah ($100 each)",
  "Additional head + flavour change ($20)",
  "Additional catering time ($100/hour)",
  "Additional custom flavour ($30)",
  "Ice pipe ($10 each)",
];

const cateringInclusions = [
  "Premium shisha",
  "Quasar head with HMD (Heat Management Device)",
  "Coconut coals",
  "Flavour",
  "Mouthpieces",
  "Professional attendant",
  "Setup & teardown",
  "Coal management",
  "1 complimentary head + flavour change (per shisha)",
];

const flavourOptions = [
  "Double Apple",
  "Lemon Mint",
  "Grape Mint",
  "Peach",
  "Mango",
  "Orange Mint",
  "Blue Dragon",
  "Lady Killer",
  "Paan Raas",
  "Blue Mist",
  "Chauffeur Special (Blue Dragon + Lady Killer)",
  "Royal Paan Breeze (Paan + Mint)",
  "Summer Sunset (Mango + Peach + Lemon)",
  "Raspberry Mojito (Raspberry + Mint + Lime)",
  "Custom flavour on request ($30)",
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
  { title: "Package", detail: "Select your catering tier and any add-ons" },
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
    onSuccess: (_result, variables) => {
      trackBookingSubmit({
        event_label: variables.packageSelection || "unspecified",
        services: variables.services?.join(", "),
        guest_count: variables.guestCount,
        referral_source: variables.referralSource,
      });
      toast({
        title: "Booking Request Submitted",
        description: "We received your request and will follow up shortly to confirm availability.",
      });
      form.reset();
      setCurrentStep(1);
    },
    onError: (error) => {
      trackBookingError(error instanceof Error ? error.message : "Unknown error");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Fires booking_form_start once per mount, on the first real field
  // interaction, so a visitor who only scrolls past the form is not counted.
  const formStartTracked = useRef(false);

  const handleFormStart = () => {
    if (formStartTracked.current) {
      return;
    }
    formStartTracked.current = true;
    trackBookingFormStart("booking-form");
  };

  const onSubmit = (data: InsertBooking) => {
    trackBookingSubmitAttempt({
      event_label: data.packageSelection || "unspecified",
      step_number: totalSteps,
      services: data.services?.join(", "),
      guest_count: data.guestCount,
      referral_source: data.referralSource,
    });
    bookingMutation.mutate(data);
  };

  const stepFields: Record<number, (keyof InsertBooking)[]> = {
    1: ["firstName", "lastName", "location", "phone", "email"],
    2: ["packageSelection", "additionalServices"],
    3: ["eventDate", "eventTime", "endTime", "eventType", "guestCount"],
    4: ["preferredFlavours", "referralSource"],
    5: ["termsAccepted"],
  };

  const nextStep = async () => {
    const stepName = stepCopy[currentStep - 1]?.title ?? `step_${currentStep}`;
    const isStepValid = await form.trigger(stepFields[currentStep]);
    if (!isStepValid) {
      const missingFields = Object.keys(form.formState.errors).join(", ") || "unknown";
      trackBookingStepError(currentStep, stepName, missingFields);
      return;
    }

    trackBookingStepComplete(currentStep, stepName);

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
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.16),transparent_32rem)]" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <Sparkles className="h-4 w-4 text-primary" />
            Shisha Chauffeurs Booking Form
          </div>
          <div className="mx-auto mb-6 flex w-fit items-center justify-center rounded-3xl border border-white/10 bg-black/30 px-5 py-4 shadow-2xl shadow-black/20 sm:px-6">
            <img src="/brand/icon.png" alt="Shisha Chauffeurs" className="h-10 w-auto sm:h-12 md:h-16" />
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Book Your Catering Experience
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Reserve our luxury mobile shisha catering for your next private event.
            Whether you are hosting a private gathering, wedding, birthday, or celebration, we use this form to confirm
            your package, event details, preferred flavours, and any add-ons you want included.
          </p>
        </div>

        <Card className="surface-panel overflow-hidden border-white/10 bg-card/80">
          <CardContent className="p-5 sm:p-6 lg:p-12">
            <div className="mb-8 grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 sm:mb-10 sm:p-5 md:grid-cols-3">
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
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-muted-foreground">Progress: {Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted-foreground/20">
                <div className="gradient-gold h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <div className="-mx-1 mt-5 flex gap-3 overflow-x-auto px-1 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0">
                {stepCopy.map((step, index) => {
                  const stepNumber = index + 1;
                  const isActive = currentStep === stepNumber;
                  const isComplete = currentStep > stepNumber;

                  return (
                    <div
                      key={step.title}
                      className={`min-w-[12rem] rounded-2xl border px-4 py-3 text-left transition-all md:min-w-0 ${
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
              <form onSubmit={form.handleSubmit(onSubmit)} onFocusCapture={handleFormStart} className="space-y-8">
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
                    <h3 className="mb-6 font-serif text-2xl font-semibold">Package & Add-ons</h3>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <p className="text-sm font-semibold text-white">Every catering package includes</p>
                      <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                        {cateringInclusions.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <p className="mt-4 text-xs text-muted-foreground">
                        Free local delivery. Additional charges may apply based on event location.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="packageSelection"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shisha Package Selection *</FormLabel>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {packageOptions.map((option) => {
                              const isSelected = field.value === option.value;

                              return (
                                <label
                                  key={option.value}
                                  className={`group flex cursor-pointer flex-col rounded-2xl border p-4 text-left transition-all ${
                                    isSelected
                                      ? "border-primary/80 bg-primary/10 ring-2 ring-primary/30"
                                      : "border-white/10 bg-black/20 hover:border-white/20"
                                  }`}
                                  data-testid={`package-${option.value}`}
                                >
                                  <input
                                    type="radio"
                                    name="packageSelection"
                                    value={option.value}
                                    checked={isSelected}
                                    onChange={() => field.onChange(option.value)}
                                    className="sr-only"
                                  />
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <p className="font-semibold text-white">{option.label}</p>
                                      <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>
                                    </div>
                                    {isSelected ? (
                                      <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary-foreground">
                                        Selected
                                      </span>
                                    ) : null}
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalServices"
                      render={() => (
                        <FormItem>
                          <FormLabel>Add-ons</FormLabel>
                          <div className="space-y-3">
                            {cateringAddOns.map((option) => (
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

                <div className="flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className={`${currentStep === 1 ? "invisible" : ""} w-full sm:w-auto`}
                    data-testid="button-previous"
                  >
                    Previous
                  </Button>
                  <div className="hidden flex-1 sm:block" />
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="gradient-gold w-full font-semibold text-black transition-all duration-300 hover:shadow-lg sm:w-auto"
                      data-testid="button-next"
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={bookingMutation.isPending}
                      className="gradient-gold w-full font-semibold text-black transition-all duration-300 hover:shadow-lg sm:w-auto"
                      data-testid="button-submit"
                    >
                      {bookingMutation.isPending ? "Submitting..." : "Submit Booking Request"}
                    </Button>
                  )}
                </div>
              </form>
              <div className="mt-6 border-t border-border pt-6 text-center text-sm text-muted-foreground">
                Powered by <a href="https://socialdots.ca" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline" data-testid="link-powered-by-social-dots">Social Dots</a>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
