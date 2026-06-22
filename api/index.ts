import express from "express";
import { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSYb_o4gpTub7vjPMGgP3-FEmTX-CyOVA",
  authDomain: "shishacafe-bf03c.firebaseapp.com",
  projectId: "shishacafe-bf03c",
  storageBucket: "shishacafe-bf03c.appspot.com",
  appId: "1:692246947503:web:fcfa8f977611f35a5d965a",
  measurementId: "G-B5VRGDQKVQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const brandName = 'Shisha Chauffeurs';
const brandPrimary = '#dc2626';
const brandSurface = '#111111';
const brandPanel = 'rgba(255,255,255,0.08)';
const adminContactEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'shishachauffeurs@gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
const smtpSecure = smtpPort === 465;
const senderEmail = process.env.EMAIL_FROM || process.env.SMTP_USER || 'shishachauffeurs@gmail.com';
const senderName = process.env.EMAIL_FROM_NAME || brandName;
const formattedFrom = `"${senderName}" <${senderEmail}>`;

const expressApp = express();

// Basic middleware
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));

const smtpConfigured = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};
const transporter = smtpConfigured ? nodemailer.createTransport(emailConfig) : null;

if (transporter) {
  transporter.verify((error) => {
    if (error) {
      console.log('❌ Email configuration error:', error);
    } else {
      console.log('✅ Email server is ready to send messages');
      console.log('📧 Using email:', emailConfig.auth.user);
    }
  });
} else {
  console.warn('No email provider configured. Set SMTP_USER/SMTP_PASS.');
}

const formatServiceLabel = (service: string) =>
  service
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const renderServiceList = (services: string[]) =>
  services.map((service) => `<li>${formatServiceLabel(service)}</li>`).join('');

const renderServiceText = (services: string[]) =>
  services.map((service) => `- ${formatServiceLabel(service)}`).join('\n');

const renderOptionalField = (label: string, value?: string | null) =>
  value ? `<p><strong>${label}:</strong> ${value}</p>` : '';

const renderOptionalListField = (label: string, values?: string[] | null) =>
  values && values.length ? `<p><strong>${label}:</strong> ${values.join(', ')}</p>` : '';

const createBookingNotificationEmail = (booking: any) => ({
  subject: `New Booking Request | ${brandName} | ${booking.firstName} ${booking.lastName}`,
  html: `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 640px; margin: 0 auto; background: linear-gradient(180deg, ${brandSurface} 0%, #050505 100%); color: white; padding: 24px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://shishachauffeurs.com/logo.svg" alt="${brandName}" style="width: 180px; max-width: 100%; margin-bottom: 16px;" />
        <p style="margin: 0; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: ${brandPrimary}; font-weight: 700;">New Booking Request</p>
        <h1 style="font-size: 34px; line-height: 1.15; margin: 12px 0 8px 0;">${booking.firstName} ${booking.lastName}</h1>
        <p style="font-size: 16px; opacity: 0.78; margin: 0;">A new event enquiry was submitted through the ${brandName} booking form.</p>
      </div>
      <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
        <h2 style="color: ${brandPrimary}; margin-top: 0;">Client Details</h2>
        <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        ${renderOptionalField('Instagram', booking.instagram)}
      </div>
      <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 20px; border: 1px solid rgba(255,255,255,0.08);">
        <h2 style="color: ${brandPrimary}; margin-top: 0;">Event Details</h2>
        <p><strong>Date:</strong> ${booking.eventDate}</p>
        <p><strong>Start Time:</strong> ${booking.eventTime}</p>
        ${renderOptionalField('End Time', booking.endTime)}
        <p><strong>Location:</strong> ${booking.location}</p>
        <p><strong>Guest Count:</strong> ${booking.guestCount}</p>
        <p><strong>Event Type:</strong> ${booking.eventType || 'Not specified'}</p>
        ${renderOptionalField('Package Selection', booking.packageSelection)}
        ${renderOptionalField('Budget', booking.budget)}
        ${renderOptionalField('Referral Source', booking.referralSource)}
      </div>
      <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 20px; border: 1px solid rgba(255,255,255,0.08);">
        <h2 style="color: ${brandPrimary}; margin-top: 0;">Services Requested</h2>
        <ul style="margin: 0; padding-left: 20px;">
          ${renderServiceList(booking.services)}
        </ul>
      </div>
      ${booking.flavourPreferences ? `<div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 20px; border: 1px solid rgba(255,255,255,0.08);"><h2 style="color: ${brandPrimary}; margin-top: 0;">Custom Flavour Notes</h2><p>${booking.flavourPreferences}</p></div>` : ''}
      ${booking.preferredFlavours?.length ? `<div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 20px; border: 1px solid rgba(255,255,255,0.08);"><h2 style="color: ${brandPrimary}; margin-top: 0;">Preferred Flavours</h2><p>${booking.preferredFlavours.join(', ')}</p></div>` : ''}
      ${booking.additionalServices?.length ? `<div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 20px; border: 1px solid rgba(255,255,255,0.08);"><h2 style="color: ${brandPrimary}; margin-top: 0;">Additional Services</h2><p>${booking.additionalServices.join(', ')}</p></div>` : ''}
      ${booking.specialRequirements ? `<div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 20px; border: 1px solid rgba(255,255,255,0.08);"><h2 style="color: ${brandPrimary}; margin-top: 0;">Special Requirements</h2><p>${booking.specialRequirements}</p></div>` : ''}
    </div>
  `,
  text: `New Booking Request - ${brandName}\n\nName: ${booking.firstName} ${booking.lastName}\nEmail: ${booking.email}\nPhone: ${booking.phone}\n${booking.instagram ? `Instagram: ${booking.instagram}\n` : ''}Date: ${booking.eventDate}\nStart Time: ${booking.eventTime}\n${booking.endTime ? `End Time: ${booking.endTime}\n` : ''}Location: ${booking.location}\nGuest Count: ${booking.guestCount}\nEvent Type: ${booking.eventType || 'Not specified'}\n${booking.packageSelection ? `Package Selection: ${booking.packageSelection}\n` : ''}${booking.budget ? `Budget: ${booking.budget}\n` : ''}${booking.referralSource ? `Referral Source: ${booking.referralSource}\n` : ''}Services:\n${renderServiceText(booking.services)}\n${booking.preferredFlavours?.length ? `Preferred Flavours: ${booking.preferredFlavours.join(', ')}\n` : ''}${booking.flavourPreferences ? `Custom Flavour Notes: ${booking.flavourPreferences}\n` : ''}${booking.additionalServices?.length ? `Additional Services: ${booking.additionalServices.join(', ')}\n` : ''}${booking.specialRequirements ? `Special Requirements: ${booking.specialRequirements}\n` : ''}Booking ID: ${booking.id}`,
});

const createCustomerConfirmationEmail = (booking: any) => ({
  subject: `Booking Request Received | ${brandName}`,
  html: `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 640px; margin: 0 auto; background: linear-gradient(180deg, ${brandSurface} 0%, #050505 100%); color: white; padding: 24px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://shishachauffeurs.com/logo.svg" alt="${brandName}" style="width: 180px; max-width: 100%; margin-bottom: 16px;" />
        <p style="margin: 0; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: ${brandPrimary}; font-weight: 700;">Booking Request Received</p>
        <h1 style="font-size: 34px; line-height: 1.15; margin: 12px 0 8px 0;">Thanks, ${booking.firstName}</h1>
        <p style="font-size: 16px; opacity: 0.78; margin: 0;">Your request is in and the ${brandName} team will be in touch soon.</p>
      </div>
      <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
        <h2 style="color: ${brandPrimary}; margin-top: 0;">What Happens Next</h2>
        <p>We’ll review your event details, confirm availability, and follow up with pricing, deposit information, and final logistics.</p>
        <p>If you need to update anything, reply directly or email <a href="mailto:${adminContactEmail}" style="color: ${brandPrimary};">${adminContactEmail}</a>.</p>
      </div>
      <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 20px; border: 1px solid rgba(255,255,255,0.08);">
        <h2 style="color: ${brandPrimary}; margin-top: 0;">Your Booking Details</h2>
        <p><strong>Date:</strong> ${booking.eventDate}</p>
        <p><strong>Start Time:</strong> ${booking.eventTime}</p>
        ${renderOptionalField('End Time', booking.endTime)}
        <p><strong>Location:</strong> ${booking.location}</p>
        <p><strong>Guest Count:</strong> ${booking.guestCount}</p>
        <p><strong>Services:</strong> ${booking.services.map(formatServiceLabel).join(', ')}</p>
        ${renderOptionalField('Package Selection', booking.packageSelection)}
        ${renderOptionalListField('Preferred Flavours', booking.preferredFlavours)}
      </div>
    </div>
  `,
  text: `Booking Request Received - ${brandName}\n\nHello ${booking.firstName}, we've received your booking request and will contact you shortly.\n\nDate: ${booking.eventDate}\nStart Time: ${booking.eventTime}\n${booking.endTime ? `End Time: ${booking.endTime}\n` : ''}Location: ${booking.location}\nGuest Count: ${booking.guestCount}\nServices: ${booking.services.map(formatServiceLabel).join(', ')}\n${booking.packageSelection ? `Package Selection: ${booking.packageSelection}\n` : ''}${booking.preferredFlavours?.length ? `Preferred Flavours: ${booking.preferredFlavours.join(', ')}\n` : ''}\nReply to ${adminContactEmail} if you need to make changes.`,
});

// Email sending functions
const sendBookingNotification = async (booking: any, adminEmail: string) => {
  try {
    const emailContent = createBookingNotificationEmail(booking);

    if (!transporter) {
      throw new Error('No email provider configured');
    }

    const result = await transporter.sendMail({
      from: formattedFrom,
      sender: senderEmail,
      to: adminEmail,
      replyTo: booking.email,
      envelope: {
        from: senderEmail,
        to: [adminEmail],
      },
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    });
    console.log('✅ Booking notification sent successfully:', {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      response: result.response,
    });
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending booking notification:', error);
    return { success: false, error };
  }
};

const sendCustomerConfirmation = async (booking: any) => {
  try {
    const emailContent = createCustomerConfirmationEmail(booking);

    if (!transporter) {
      throw new Error('No email provider configured');
    }

    const result = await transporter.sendMail({
      from: formattedFrom,
      sender: senderEmail,
      to: booking.email,
      replyTo: adminContactEmail,
      envelope: {
        from: senderEmail,
        to: [booking.email],
      },
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    });
    console.log('✅ Customer confirmation sent successfully:', {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      response: result.response,
    });
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending customer confirmation:', error);
    return { success: false, error };
  }
};

// Schema for validation
const insertBookingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  instagram: z.string().optional(),
  services: z.array(z.string()).min(1, "At least one service must be selected"),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().min(1, "Event time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().min(1, "Event location is required"),
  guestCount: z.string().min(1, "Please select a guest count"),
  eventType: z.string().optional(),
  packageSelection: z.string().optional(),
  preferredFlavours: z.array(z.string()).min(1, "Please select at least one flavour"),
  additionalServices: z.array(z.string()).optional(),
  referralSource: z.string().min(1, "Please tell us how you heard about us"),
  flavourPreferences: z.string().optional(),
  specialRequirements: z.string().optional(),
  budget: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, "Terms must be accepted"),
}).superRefine((data, ctx) => {
  if (data.services.includes("shisha-catering") && !data.packageSelection) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a shisha package",
      path: ["packageSelection"],
    });
  }
});

// Try to find and serve static files
const possibleStaticPaths = [
  path.resolve(process.cwd(), 'dist', 'public'),
  path.resolve(__dirname, '..', 'dist', 'public'),
  path.resolve('dist', 'public'),
  path.resolve(process.cwd(), 'assets'), // If copied to root
  path.resolve(process.cwd()), // If files are in root
];

let staticPath: string | null = null;
for (const testPath of possibleStaticPaths) {
  if (fs.existsSync(testPath)) {
    staticPath = testPath;
    expressApp.use('/assets', express.static(path.join(testPath, 'assets')));
    console.log('Serving static files from:', testPath);
    break;
  }
}


// Health check route
expressApp.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes with email functionality
expressApp.post('/api/bookings', async (req, res) => {
  try {
    console.log('Booking request received:', req.body);
    
    // Validate the request
    const booking = insertBookingSchema.parse(req.body);
    const createdAt = Timestamp.now();
    const docRef = await addDoc(collection(db, "bookings"), {
      ...booking,
      createdAt,
      status: "pending"
    });
    const bookingWithMeta = {
      ...booking,
      id: docRef.id,
      createdAt: createdAt.toDate().toISOString(),
      status: "pending"
    };

    console.log('New booking created:', {
      id: bookingWithMeta.id,
      name: `${booking.firstName} ${booking.lastName}`,
      email: booking.email,
      eventDate: booking.eventDate,
      services: booking.services
    });

    if (!transporter) {
      console.warn('No email provider configured. Set SMTP_USER/SMTP_PASS.');
      return res.json({
        success: true,
        booking: bookingWithMeta,
        email: {
          adminNotificationSent: false,
          customerConfirmationSent: false,
          warning: "Booking saved, but email is not configured",
        },
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || "shishachauffeurs@gmail.com";
    const adminNotification = await sendBookingNotification(bookingWithMeta, adminEmail);
    const customerConfirmation = await sendCustomerConfirmation(bookingWithMeta);
    console.log('Admin notification status:', adminNotification.success ? 'Sent' : 'Failed');

    res.status(adminNotification.success ? 200 : 202).json({
      success: true,
      booking: bookingWithMeta,
      email: {
        adminNotificationSent: adminNotification.success,
        customerConfirmationSent: customerConfirmation.success,
        warning: adminNotification.success ? undefined : "Booking saved, but admin email failed to send.",
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
    } else {
      console.error("Booking creation error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

expressApp.get('/api/bookings', async (req, res) => {
  try {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date()
    }));
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Catch all route - serve React app or create a working Shisha Chauffeurs app
expressApp.get('*', (req, res) => {
  // Try to find index.html in any of the possible locations
  const possibleIndexPaths = [
    path.resolve(process.cwd(), 'dist', 'public', 'index.html'),
    path.resolve(__dirname, '..', 'dist', 'public', 'index.html'),
    path.resolve('dist', 'public', 'index.html'),
    path.resolve(process.cwd(), 'index.html'), // If copied to root
  ];

  let indexPath: string | null = null;
  for (const testPath of possibleIndexPaths) {
    if (fs.existsSync(testPath)) {
      indexPath = testPath;
      break;
    }
  }
  
  if (indexPath) {
    console.log('Serving React app from:', indexPath);
    res.sendFile(indexPath);
  } else {
    // Simple fallback - just indicate we're trying to build your React app
    console.log('Your original React app not found, build may still be processing');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Shisha Chauffeurs - Loading...</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          .container { text-align: center; }
          .spinner { 
            border: 4px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top: 4px solid white;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        <script>
          setTimeout(() => location.reload(), 10000);
        </script>
      </head>
      <body>
        <div class="container">
          <h1>🌟 Shisha Chauffeurs</h1>
          <div class="spinner"></div>
          <p>Building your original React app...</p>
          <p>This will refresh automatically in 10 seconds</p>
          <p><small>If this persists, the build process needs to be fixed</small></p>
        </div>
      </body>
      </html>
    `);
  }
});

// Export for Vercel
export default expressApp;
