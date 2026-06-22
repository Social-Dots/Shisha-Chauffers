import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  instagram: text("instagram"),
  services: text("services").array().notNull(),
  eventDate: text("event_date").notNull(),
  eventTime: text("event_time").notNull(),
  endTime: text("end_time"),
  location: text("location").notNull(),
  guestCount: text("guest_count").notNull(),
  eventType: text("event_type"),
  packageSelection: text("package_selection"),
  preferredFlavours: text("preferred_flavours").array(),
  additionalServices: text("additional_services").array(),
  referralSource: text("referral_source"),
  flavourPreferences: text("flavour_preferences"),
  specialRequirements: text("special_requirements"),
  budget: text("budget"),
  status: text("status").notNull().default("pending"), // pending, confirmed, completed, cancelled
  termsAccepted: boolean("terms_accepted").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const members = pgTable("members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  instagram: text("instagram"),
  membershipType: text("membership_type").notNull(), // Gold or Platinum
  membershipStatus: text("membership_status").notNull().default("pending_payment"), // pending_payment, active, expired, cancelled
  paymentStatus: text("payment_status").notNull().default("pending"), // pending, paid, failed, refunded
  paymentAmount: text("payment_amount"), // Amount paid for membership
  paymentDate: timestamp("payment_date"),
  startDate: timestamp("start_date").defaultNow(),
  expiryDate: timestamp("expiry_date").notNull(),
  totalBookings: text("total_bookings").default("0"),
  discountEligible: boolean("discount_eligible").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
}).extend({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  eventDate: z.string().trim().min(1, "Event date is required"),
  eventTime: z.string().trim().min(1, "Event time is required"),
  endTime: z.string().trim().min(1, "End time is required"),
  location: z.string().trim().min(1, "Event location is required"),
  guestCount: z.string().trim().min(1, "Please select a guest count"),
  packageSelection: z.string().trim().optional(),
  preferredFlavours: z.array(z.string()).min(1, "Please select at least one flavour"),
  additionalServices: z.array(z.string()).default([]),
  referralSource: z.string().trim().min(1, "Please tell us how you heard about us"),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
}).superRefine((data, ctx) => {
  if (data.services.includes("shisha-catering") && !data.packageSelection) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a shisha package",
      path: ["packageSelection"],
    });
  }
});

export const insertMemberSchema = createInsertSchema(members).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  startDate: true,
  expiryDate: true,
  totalBookings: true,
  discountEligible: true,
  paymentStatus: true,
  paymentDate: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  membershipType: z.enum(["Gold", "Platinum"]),
  membershipStatus: z.enum(["pending_payment", "active", "expired", "cancelled"]).default("pending_payment").optional(),
  paymentAmount: z.string().optional(),
  instagram: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof members.$inferSelect;
