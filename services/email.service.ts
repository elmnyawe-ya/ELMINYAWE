import emailjs from '@emailjs/browser';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const contactTemplateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !contactTemplateId || !publicKey) {
      console.error('EmailJS configuration missing. Please set up environment variables.');
      console.log('Contact form data:', formData);
      return true;
    }

    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'elmnyawe65@gmail.com',
    };

    await emailjs.send(serviceId, contactTemplateId, templateParams, publicKey);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendOtpEmail = async (email: string, code: string): Promise<boolean> => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const verifyTemplateId = import.meta.env.VITE_EMAILJS_VERIFY_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !verifyTemplateId || !publicKey) {
      console.error('EmailJS configuration missing. Please set up environment variables.');
      console.log('OTP code:', code, 'Email:', email);
      return true;
    }

    const templateParams = {
      from_name: 'ELMINYAWE-Verification',
      from_email: 'no-reply@elminyawe.dev',
      subject: 'Your One-Time Password',
      message: `Your verification code is: ${code}`,
      to_email: email,
      otp_code: code,
    };

    await emailjs.send(serviceId, verifyTemplateId, templateParams, publicKey);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email: string, link: string): Promise<boolean> => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const resetTemplateId = import.meta.env.VITE_EMAILJS_RESET_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !resetTemplateId || !publicKey) {
      console.error('EmailJS configuration missing. Please set up environment variables.');
      console.log('Password reset link:', link, 'Email:', email);
      return true;
    }

    const templateParams = {
      from_name: 'ELMINYAWE',
      from_email: 'no-reply@elminyawe.dev',
      subject: 'Reset your password',
      message: `Click this link to reset your password: ${link}`,
      to_email: email,
      link,
    };

    await emailjs.send(serviceId, resetTemplateId, templateParams, publicKey);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};
