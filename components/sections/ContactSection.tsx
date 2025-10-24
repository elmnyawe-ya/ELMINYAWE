import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import GlitchText from '@/components/effects/GlitchText';
import { useToast } from '@/contexts/ToastContext';
import { sendContactEmail } from '@/services/email.service';

const ContactSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { addToast } = useToast();
  const isArabic = i18n.language === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await sendContactEmail(formData);
      addToast(t('message_sent', 'Message sent successfully!'), 'success');
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch (error) {
      addToast(t('message_failed', 'Failed to send message. Please try again.'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const socialLinks = [
    { 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ), 
      label: 'Discord', 
      href: 'https://discord.gg/kZ8S276hB6' 
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ), 
      label: 'Email', 
      href: 'mailto:elmnyawe65@gmail.com' 
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-muted/10 relative scan-lines">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neon-red glow-text">
            <GlitchText>{t('contact_title', 'Get In Touch')}</GlitchText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact_subtitle', 'Let\'s create something amazing together')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-2">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-neon-red glow-text-subtle">
                {t('send_message', 'Send Message')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('first_name', 'First Name')}
                    </label>
                    <Input 
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      placeholder={isArabic ? 'محمد' : 'John'}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('last_name', 'Last Name')}
                    </label>
                    <Input 
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      placeholder={isArabic ? 'أحمد' : 'Doe'}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('email', 'Email')}
                  </label>
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder={isArabic ? 'محمد@example.com' : 'john@example.com'}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('subject', 'Subject')}
                  </label>
                  <Input 
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder={isArabic ? 'مناقشة المشروع' : 'Project Discussion'}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('message', 'Message')}
                  </label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder={t('message_placeholder', 'Tell me about your project...')}
                    rows={6}
                    required
                  />
                </div>
                
                <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {isSubmitting ? t('sending', 'Sending...') : t('send_btn', 'Send Message')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Social Links */}
            <Card className="border-2">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-neon-red glow-text-subtle">
                  {t('find_me_online', 'Find Me Online')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg bg-background hover:bg-neon-red/10 transition-all border border-neon-red/20 hover:border-neon-red/50 group"
                    >
                      <div className="text-neon-red group-hover:scale-110 transition-transform">
                        {social.icon}
                      </div>
                      <span className="font-medium text-foreground">{social.label}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="bg-gradient-red text-white border-2 border-neon-red">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">
                  {t('ready_to_work', 'Ready to Work Together?')}
                </h3>
                <p className="mb-6 opacity-90">
                  {t('ready_to_work_text', 'Let\'s discuss your next project and bring your vision to life.')}
                </p>
                <Button 
                  variant="outline" 
                  className="bg-white text-neon-red border-white hover:bg-white/90 hover:text-neon-red"
                  asChild
                >
                  <a href="mailto:steg453@gmail.com" className="inline-flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {t('get_in_touch', 'Get In Touch')}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
