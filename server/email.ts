import nodemailer from 'nodemailer';

const smtpConfigured = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
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

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.SMTP_USER, // Your email
    pass: process.env.SMTP_PASS, // Your app password
  },
};

// Create transporter
const transporter = smtpConfigured ? nodemailer.createTransport(emailConfig) : null;

// Verify connection configuration
if (transporter) {
  transporter.verify((error) => {
    if (error) {
      console.log('❌ Email configuration error:', error);
      console.log('📧 Email config:', {
        host: emailConfig.host,
        port: emailConfig.port,
        secure: emailConfig.secure,
        auth: {
          user: emailConfig.auth.user,
          pass: emailConfig.auth.pass ? '***' : 'undefined'
        }
      });
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

// Email templates
export const createBookingNotificationEmail = (booking: any) => {
  return {
    subject: `New Booking Request | ${brandName} | ${booking.firstName} ${booking.lastName}`,
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 640px; margin: 0 auto; background: linear-gradient(180deg, ${brandSurface} 0%, #050505 100%); color: white; padding: 24px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
        <div style="text-align: center; margin-bottom: 28px;">
          <img src="https://shishachauffeurs.com/logo.svg" alt="${brandName}" style="width: 180px; max-width: 100%; margin-bottom: 16px;" />
          <p style="margin: 0; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: ${brandPrimary}; font-weight: 700;">New Booking Request</p>
          <h1 style="font-size: 34px; line-height: 1.15; margin: 12px 0 8px 0;">${booking.firstName} ${booking.lastName}</h1>
          <p style="font-size: 16px; opacity: 0.78; margin: 0;">A new event enquiry was submitted through the ${brandName} booking form.</p>
        </div>

        <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 18px; border: 1px solid rgba(255,255,255,0.08);">
          <h2 style="color: ${brandPrimary}; margin: 0 0 14px 0; font-size: 18px;">Client Details</h2>
          <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          ${renderOptionalField('Instagram', booking.instagram)}
        </div>

        <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 18px; border: 1px solid rgba(255,255,255,0.08);">
          <h2 style="color: ${brandPrimary}; margin: 0 0 14px 0; font-size: 18px;">Event Details</h2>
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

        <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 18px; border: 1px solid rgba(255,255,255,0.08);">
          <h2 style="color: ${brandPrimary}; margin: 0 0 14px 0; font-size: 18px;">Services Requested</h2>
          <ul style="margin: 0; padding-left: 20px;">
            ${renderServiceList(booking.services)}
          </ul>
        </div>

        ${booking.flavourPreferences ? `
          <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 18px; border: 1px solid rgba(255,255,255,0.08);">
            <h2 style="color: ${brandPrimary}; margin: 0 0 14px 0; font-size: 18px;">Custom Flavour Notes</h2>
            <p>${booking.flavourPreferences}</p>
          </div>
        ` : ''}

        ${booking.preferredFlavours?.length ? `
          <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 18px; border: 1px solid rgba(255,255,255,0.08);">
            <h2 style="color: ${brandPrimary}; margin: 0 0 14px 0; font-size: 18px;">Preferred Flavours</h2>
            <p>${booking.preferredFlavours.join(', ')}</p>
          </div>
        ` : ''}

        ${booking.additionalServices?.length ? `
          <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 18px; border: 1px solid rgba(255,255,255,0.08);">
            <h2 style="color: ${brandPrimary}; margin: 0 0 14px 0; font-size: 18px;">Additional Services</h2>
            <p>${booking.additionalServices.join(', ')}</p>
          </div>
        ` : ''}

        ${booking.specialRequirements ? `
          <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 18px; border: 1px solid rgba(255,255,255,0.08);">
            <h2 style="color: ${brandPrimary}; margin: 0 0 14px 0; font-size: 18px;">Special Requirements</h2>
            <p>${booking.specialRequirements}</p>
          </div>
        ` : ''}

        <div style="text-align: center; margin-top: 26px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.12);">
          <p style="opacity: 0.86; margin: 0;"><strong>Booking ID:</strong> ${booking.id}</p>
          <p style="opacity: 0.7; margin: 6px 0 0 0;">Received: ${new Date(booking.createdAt).toLocaleString()}</p>
        </div>
      </div>
    `,
    text: `
New Booking Request - ${brandName}

Client Details:
- Name: ${booking.firstName} ${booking.lastName}
- Email: ${booking.email}
- Phone: ${booking.phone}
${booking.instagram ? `- Instagram: ${booking.instagram}` : ''}

Event Details:
- Date: ${booking.eventDate}
- Start Time: ${booking.eventTime}
${booking.endTime ? `- End Time: ${booking.endTime}` : ''}
- Location: ${booking.location}
- Guest Count: ${booking.guestCount}
- Event Type: ${booking.eventType || 'Not specified'}
${booking.packageSelection ? `- Package Selection: ${booking.packageSelection}` : ''}
${booking.budget ? `- Budget: ${booking.budget}` : ''}
${booking.referralSource ? `- Referral Source: ${booking.referralSource}` : ''}

Services Requested:
${renderServiceText(booking.services)}

${booking.preferredFlavours?.length ? `Preferred Flavours: ${booking.preferredFlavours.join(', ')}` : ''}
${booking.flavourPreferences ? `Custom Flavour Notes: ${booking.flavourPreferences}` : ''}
${booking.additionalServices?.length ? `Additional Services: ${booking.additionalServices.join(', ')}` : ''}
${booking.specialRequirements ? `Special Requirements: ${booking.specialRequirements}` : ''}

Booking ID: ${booking.id}
Received: ${new Date(booking.createdAt).toLocaleString()}
    `
  };
};

export const createCustomerConfirmationEmail = (booking: any) => {
  return {
    subject: `Booking Request Received | ${brandName}`,
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 640px; margin: 0 auto; background: linear-gradient(180deg, ${brandSurface} 0%, #050505 100%); color: white; padding: 24px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
        <div style="text-align: center; margin-bottom: 28px;">
          <img src="https://shishachauffeurs.com/logo.svg" alt="${brandName}" style="width: 180px; max-width: 100%; margin-bottom: 16px;" />
          <p style="margin: 0; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: ${brandPrimary}; font-weight: 700;">Booking Request Received</p>
          <h1 style="font-size: 34px; line-height: 1.15; margin: 12px 0 8px 0;">Thanks, ${booking.firstName}</h1>
          <p style="font-size: 16px; opacity: 0.78; margin: 0;">Your booking request is in. The ${brandName} team will review it and follow up shortly.</p>
        </div>

        <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
          <h2 style="color: ${brandPrimary}; margin: 0 0 14px 0; font-size: 18px;">What Happens Next</h2>
          <p style="margin: 0 0 10px 0;">We’ll review your event details, confirm availability, and follow up with pricing, deposit info, and final logistics.</p>
          <p style="margin: 0;">If you need to update anything, reply directly to this email or contact us at <a href="mailto:${adminContactEmail}" style="color: ${brandPrimary};">${adminContactEmail}</a>.</p>
        </div>

        <div style="background: ${brandPanel}; padding: 22px; border-radius: 16px; margin-top: 18px; border: 1px solid rgba(255,255,255,0.08);">
          <h2 style="color: ${brandPrimary}; margin: 0 0 14px 0; font-size: 18px;">Your Booking Details</h2>
          <p><strong>Date:</strong> ${booking.eventDate}</p>
          <p><strong>Start Time:</strong> ${booking.eventTime}</p>
          ${renderOptionalField('End Time', booking.endTime)}
          <p><strong>Location:</strong> ${booking.location}</p>
          <p><strong>Guest Count:</strong> ${booking.guestCount}</p>
          <p><strong>Services:</strong> ${booking.services.map(formatServiceLabel).join(', ')}</p>
          ${renderOptionalField('Package Selection', booking.packageSelection)}
          ${renderOptionalListField('Preferred Flavours', booking.preferredFlavours)}
        </div>

        <div style="text-align: center; margin-top: 26px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.12);">
          <p style="opacity: 0.84; margin: 0;">We’ll be in touch soon.</p>
          <p style="opacity: 0.7; font-size: 14px; margin: 6px 0 0 0;">Booking Reference: ${booking.id}</p>
        </div>
      </div>
    `,
    text: `
Booking Request Received - ${brandName}

Hello ${booking.firstName}!

We've received your booking request and will contact you shortly to confirm the details.

Your Booking Details:
- Date: ${booking.eventDate}
- Start Time: ${booking.eventTime}
${booking.endTime ? `- End Time: ${booking.endTime}` : ''}
- Location: ${booking.location}
- Guest Count: ${booking.guestCount}
- Services: ${booking.services.map(formatServiceLabel).join(', ')}
${booking.packageSelection ? `- Package Selection: ${booking.packageSelection}` : ''}
${booking.preferredFlavours?.length ? `- Preferred Flavours: ${booking.preferredFlavours.join(', ')}` : ''}

We'll be in touch soon!
Booking Reference: ${booking.id}
    `
  };
};

// Send notification email to admin
export const sendBookingNotification = async (booking: any, adminEmail: string) => {
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
    console.error('📧 Mail options:', {
      provider: 'smtp',
      from: formattedFrom,
      to: adminEmail,
      subject: `New Booking Request | ${brandName}`
    });
    return { success: false, error };
  }
};

// Send confirmation email to customer
export const sendCustomerConfirmation = async (booking: any) => {
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
    console.error('📧 Mail options:', {
      from: formattedFrom,
      to: booking.email,
      subject: `Booking Request Received | ${brandName}`
    });
    return { success: false, error };
  }
};

// Membership email templates
export const createMembershipWelcomeEmail = (member: any) => {
  const membershipPrice = member.membershipType === 'Gold' ? '$120' : '$200';
  const benefits = member.membershipType === 'Gold' 
    ? ['10% discount on all packages', 'Priority booking', 'Free flavor upgrades', 'Complimentary setup service']
    : ['20% discount on all packages', 'VIP priority booking', 'Unlimited premium flavors', 'Free mocktail service', 'Personal chauffeur assigned'];

  return {
    subject: `🎉 Welcome to ${member.membershipType} Membership - Shisha Cafe`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 2.5em; margin: 0;">🎉 Welcome to ${member.membershipType} Membership!</h1>
          <p style="font-size: 1.2em; opacity: 0.9;">Shisha Cafe Premium Experience</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 10px; backdrop-filter: blur(10px);">
          <h2 style="color: #FFD700; margin-top: 0;">Membership Details</h2>
          <p><strong>Member:</strong> ${member.firstName} ${member.lastName}</p>
          <p><strong>Membership Type:</strong> ${member.membershipType} (${membershipPrice}/month)</p>
          <p><strong>Status:</strong> ${member.paymentStatus === 'paid' ? 'Active' : 'Pending Payment'}</p>
          <p><strong>Valid Until:</strong> ${new Date(member.expiryDate).toLocaleDateString()}</p>
          
          <h3 style="color: #FFD700; margin-top: 25px;">Your Exclusive Benefits:</h3>
          <ul style="padding-left: 20px;">
            ${benefits.map(benefit => `<li style="margin: 8px 0;">${benefit}</li>`).join('')}
          </ul>
          
          ${member.paymentStatus === 'pending' ? `
            <div style="background: rgba(255,165,0,0.2); padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #FFA500;">
              <p style="margin: 0;"><strong>⏳ Payment Pending:</strong> Please complete your payment to activate your membership benefits.</p>
            </div>
          ` : `
            <div style="background: rgba(0,255,0,0.2); padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #00FF00;">
              <p style="margin: 0;"><strong>✅ Membership Active:</strong> Start enjoying your exclusive benefits immediately!</p>
            </div>
          `}
        </div>
        
        <div style="text-align: center; margin-top: 25px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
          <p>Questions? Contact us at <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #FFD700;">${process.env.ADMIN_EMAIL}</a></p>
          <p style="font-size: 0.9em; opacity: 0.8;">Thank you for choosing Shisha Cafe!</p>
        </div>
      </div>
    `,
    text: `
Welcome to ${member.membershipType} Membership - Shisha Cafe

Hello ${member.firstName}!

Your ${member.membershipType} membership is now ${member.paymentStatus === 'paid' ? 'active' : 'pending payment confirmation'}.

Membership Details:
- Type: ${member.membershipType} (${membershipPrice}/month)
- Status: ${member.paymentStatus === 'paid' ? 'Active' : 'Pending Payment'}
- Valid Until: ${new Date(member.expiryDate).toLocaleDateString()}

Your Benefits:
${benefits.map(benefit => `- ${benefit}`).join('\n')}

${member.paymentStatus === 'pending' ? 'Please complete your payment to activate your membership benefits.' : 'Start enjoying your exclusive benefits immediately!'}

Questions? Contact us at ${process.env.ADMIN_EMAIL}
    `
  };
};

export const createMembershipAdminNotification = (member: any) => {
  const membershipPrice = member.membershipType === 'Gold' ? '$120' : '$200';
  
  return {
    subject: `💎 New ${member.membershipType} Member - ${member.firstName} ${member.lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 2.5em; margin: 0;">💎 New Membership Alert!</h1>
          <p style="font-size: 1.2em; opacity: 0.9;">Shisha Cafe Admin Dashboard</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 10px; backdrop-filter: blur(10px);">
          <h2 style="color: #FFD700; margin-top: 0;">New Member Information</h2>
          <p><strong>Name:</strong> ${member.firstName} ${member.lastName}</p>
          <p><strong>Email:</strong> ${member.email}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          ${member.instagram ? `<p><strong>Instagram:</strong> @${member.instagram}</p>` : ''}
          
          <h3 style="color: #FFD700; margin-top: 25px;">Membership Details</h3>
          <p><strong>Type:</strong> ${member.membershipType} Membership</p>
          <p><strong>Price:</strong> ${membershipPrice}/month</p>
          <p><strong>Payment Status:</strong> ${member.paymentStatus}</p>
          <p><strong>Member Status:</strong> ${member.membershipStatus}</p>
          <p><strong>Valid Until:</strong> ${new Date(member.expiryDate).toLocaleDateString()}</p>
          <p><strong>Member ID:</strong> ${member.id}</p>
          
          ${member.paymentStatus === 'pending' ? `
            <div style="background: rgba(255,165,0,0.2); padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #FFA500;">
              <p style="margin: 0;"><strong>⚠️ Action Required:</strong> Payment confirmation needed to activate membership.</p>
            </div>
          ` : `
            <div style="background: rgba(0,255,0,0.2); padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #00FF00;">
              <p style="margin: 0;"><strong>✅ Payment Confirmed:</strong> Member has full access to benefits.</p>
            </div>
          `}
        </div>
      </div>
    `,
    text: `
New ${member.membershipType} Member - Shisha Cafe Admin

New Member Information:
- Name: ${member.firstName} ${member.lastName}
- Email: ${member.email}
- Phone: ${member.phone}
${member.instagram ? `- Instagram: @${member.instagram}` : ''}

Membership Details:
- Type: ${member.membershipType} Membership
- Price: ${membershipPrice}/month
- Payment Status: ${member.paymentStatus}
- Member Status: ${member.membershipStatus}
- Valid Until: ${new Date(member.expiryDate).toLocaleDateString()}
- Member ID: ${member.id}

${member.paymentStatus === 'pending' ? 'Action Required: Payment confirmation needed to activate membership.' : 'Payment Confirmed: Member has full access to benefits.'}
    `
  };
};

export const sendMembershipWelcome = async (member: any) => {
  try {
    const emailContent = createMembershipWelcomeEmail(member);

    if (!transporter) {
      throw new Error('No email provider configured');
    }

    const result = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: member.email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    });
    console.log('✅ Membership welcome sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending membership welcome:', error);
    console.error('📧 Mail options:', {
      from: process.env.SMTP_USER,
      to: member.email,
      subject: 'Welcome to Shisha Cafe Membership'
    });
    return { success: false, error };
  }
};

export const sendMembershipAdminNotification = async (member: any, adminEmail: string) => {
  try {
    const emailContent = createMembershipAdminNotification(member);

    if (!transporter) {
      throw new Error('No email provider configured');
    }

    const result = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: adminEmail,
      replyTo: member.email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    });
    console.log('✅ Membership admin notification sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending membership admin notification:', error);
    console.error('📧 Mail options:', {
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject: 'New Membership Registration'
    });
    return { success: false, error };
  }
};

export default transporter;
