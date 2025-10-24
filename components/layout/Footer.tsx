import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-black border-t border-neon-red/30 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-red/5 to-transparent" />
      
      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-neon-red glow-text-subtle mb-2">ELMINYAWE</h3>
            <p className="text-muted-foreground text-sm">
              {t('footer_tagline', 'The Futurist Developer Hub')}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-muted-foreground hover:text-neon-red transition text-sm">
                {t('nav_about', 'About')}
              </a>
              <a href="#skills" className="block text-muted-foreground hover:text-neon-red transition text-sm">
                {t('nav_skills', 'Skills')}
              </a>
              <a href="#projects" className="block text-muted-foreground hover:text-neon-red transition text-sm">
                {t('nav_projects', 'Projects')}
              </a>
              <a href="#contact" className="block text-muted-foreground hover:text-neon-red transition text-sm">
                {t('nav_contact', 'Contact')}
              </a>
            </div>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://discord.gg/kZ8S276hB6" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-red transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5 6.5c-1.6-1.2-3.5-1.8-5.5-2l-.3.6c1.6.4 3 .9 4.3 1.6-1.9-1-4.1-1.7-6.5-1.7s-4.6.6-6.5 1.7c1.3-.7 2.7-1.2 4.3-1.6l-.3-.6c-2 .2-3.9.8-5.5 2-1.3 2-2 4.2-2 6.5 0 0 1.6 2.8 5.8 3.2l1.2-1.6c-2.4-.7-3.3-2.2-3.3-2.2 2.2 1.7 4.3 2.3 6.6 2.3s4.4-.6 6.6-2.3c0 0-.9 1.5-3.3 2.2l1.2 1.6c4.2-.4 5.8-3.2 5.8-3.2 0-2.3-.7-4.5-2-6.5z"/>
                </svg>
              </a>
              <a href="mailto:elmnyawe65@gmail.com" className="text-muted-foreground hover:text-neon-red transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neon-red/20 pt-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} ELMINYAWE. {t('footer_text', 'All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
