import { Card, CardContent } from '@/components/ui/Card';
import GlitchText from '@/components/effects/GlitchText';
import { useTranslation } from 'react-i18next';

const skills = [
  { name: 'discord.js', level: 85 },
  { name: 'discord.py', level: 80 },
  { name: 'Lua', level: 75 },
  { name: 'Python', level: 88 },
];

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neon-red glow-text">
            <GlitchText>{t('about_title', 'About ELMINYAWE')}</GlitchText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about_subtitle', 'Futuristic Developer & Technology Enthusiast')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                {t('about_text1', 'Welcome to ELMINYAWE - where innovation meets code. I\'m a passionate developer dedicated to creating cutting-edge web experiences.')}
              </p>
              <p className="text-lg">
                {t('about_text2', 'With expertise in modern web technologies, I bring ideas to life through clean, efficient, and visually stunning code.')}
              </p>
              <p className="text-lg">
                {t('about_text3', 'My work focuses on creating immersive digital experiences that push the boundaries of what\'s possible on the web.')}
              </p>
              <p className="text-lg">
                {t('about_text4', 'From AI-powered applications to interactive 3D interfaces, I\'m constantly exploring new frontiers in web development.')}
              </p>
            </div>
          </div>

          {/* Moved Skills Showcase */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            {skills.map((skill) => (
              <Card key={skill.name} className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-lg font-semibold text-foreground mb-2">{skill.name}</div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div className="h-2 rounded-full bg-gradient-red" style={{ width: `${skill.level}%` }} />
                  </div>
                  <div className="text-sm text-neon-red mt-2">{skill.level}%</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
