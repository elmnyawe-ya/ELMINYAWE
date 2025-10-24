import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/Card';
import GlitchText from '@/components/effects/GlitchText';

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('programming_languages', 'Programming Languages'),
      skills: [
        { name: 'JavaScript', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'CSS', level: 92 },
        { name: 'HTML', level: 98 }
      ]
    },
    {
      title: t('frameworks_tools', 'Frameworks & Tools'),
      skills: [
        { name: 'React', level: 88 },
        { name: 'Node.js', level: 85 },
        { name: 'Vite', level: 90 },
        { name: 'Git', level: 85 }
      ]
    },
    {
      title: t('specialties', 'Specialties'),
      skills: [
        { name: '3D Graphics', level: 80 },
        { name: 'AI Integration', level: 85 },
        { name: 'UI/UX', level: 90 },
        { name: 'Performance', level: 88 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-muted/10 relative scan-lines">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neon-red glow-text">
            <GlitchText>{t('skills_title', 'Technical Skills')}</GlitchText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('skills_subtitle', 'Mastering the tools that build the future')}
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <Card 
              key={category.title} 
              className="hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-center text-neon-red glow-text-subtle">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-neon-red font-semibold glow-text-subtle">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-2 rounded-full bg-gradient-red transition-all duration-1000 ease-out relative"
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute inset-0 bg-holographic animate-holographic-shift" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
