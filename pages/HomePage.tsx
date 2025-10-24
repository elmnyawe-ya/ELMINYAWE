import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import GlitchText from '@/components/effects/GlitchText';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-red/10 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-red/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 p-8 max-w-5xl mx-auto animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-bold text-neon-red glow-text mb-6 tracking-widest">
            <GlitchText>ELMINYAWE</GlitchText>
          </h1>
          <p className="text-2xl md:text-3xl text-foreground mb-4 glow-text-subtle">
            {t('hero_subtitle', 'The Futurist Developer Hub')}
          </p>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            {t('hero_description', 'Exploring the boundaries of web development with cutting-edge technologies and innovative solutions')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="primary" asChild>
              <a href="#about">
                {t('explore_more', 'Explore More')}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">
                {t('get_in_touch', 'Get In Touch')}
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-neon-red/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-neon-red rounded-full mt-2 animate-glow-pulse" />
          </div>
        </div>
      </section>

      {/* Sections */}
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
