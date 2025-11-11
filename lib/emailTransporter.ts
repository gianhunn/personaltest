// Email transporter configuration
import nodemailer from 'nodemailer';

// Create and export Gmail transporter (singleton)
export const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // App-specific password, not regular password
  },
});

// Verify connection on startup (optional)
if (process.env.NODE_ENV === 'development') {
  gmailTransporter.verify((error, success) => {
    if (error) {
      console.error('Email transporter verification failed:', error);
    } else {
      console.log('Email transporter is ready to send emails');
    }
  });
}