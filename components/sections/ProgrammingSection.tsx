import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import GlitchText from '@/components/effects/GlitchText';

const ProgrammingSection: React.FC = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: 'ELMINYAWE Developer Hub',
      description: 'A futuristic developer platform with AI chat, holographic effects, and stunning black & red theme. Features custom cursor with programming symbols.',
      tech: ['React', 'TypeScript', 'Tailwind', 'OpenRouter AI'],
      date: '2025',
      readTime: '5 min read',
      github: 'https://github.com'
    },
    {
      title: 'AI-Powered Code Assistant',
      description: 'Intelligent code completion and refactoring tool using advanced language models. Supports multiple programming languages.',
      tech: ['TypeScript', 'Node.js', 'OpenAI', 'VS Code API'],
      date: '2024',
      readTime: '7 min read',
      github: 'https://github.com'
    },
    {
      title: 'Real-time Collaboration Platform',
      description: 'Web-based collaborative coding environment with live updates, chat, and integrated version control.',
      tech: ['React', 'WebSockets', 'MongoDB', 'Redis'],
      date: '2024',
      readTime: '6 min read',
      github: 'https://github.com'
    }
  ];

  const blogPosts = [
    {
      title: 'Building Holographic UI Effects with CSS',
      description: 'Learn how to create stunning holographic effects using pure CSS and modern web technologies.',
      date: 'Jan 2025',
      readTime: '10 min read',
      tags: ['CSS', 'UI/UX', 'Web Design']
    },
    {
      title: 'Integrating OpenRouter AI in React Apps',
      description: 'A comprehensive guide to implementing multiple AI models in your React applications using OpenRouter.',
      date: 'Jan 2025',
      readTime: '12 min read',
      tags: ['React', 'AI', 'API Integration']
    },
    {
      title: 'Custom Cursors: Beyond the Default',
      description: 'Creating engaging custom cursors with animation and interactivity for modern web experiences.',
      date: 'Dec 2024',
      readTime: '8 min read',
      tags: ['JavaScript', 'UX', 'Animation']
    }
  ];

  return (
    <section id="programming" className="py-20 px-6 bg-muted/5 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neon-red glow-text">
            <GlitchText>{t('programming_title', 'Programming & Projects')}</GlitchText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('programming_subtitle', 'Featured projects and technical insights from the bleeding edge of development')}
          </p>
        </div>

        {/* Projects */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-foreground glow-text-subtle">Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={project.title} 
                className="hover:scale-105 transition-all duration-300 border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-neon-red glow-text-subtle">
                    {project.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {project.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {project.readTime}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-foreground glow-text-subtle">Latest Articles</h3>
          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <Card 
                key={post.title} 
                className="hover:scale-[1.02] transition-all duration-300 border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2 text-foreground hover:text-neon-red transition-colors cursor-pointer">
                        {post.title}
                      </h4>
                      <p className="text-muted-foreground mb-3">{post.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-sm text-muted-foreground gap-2">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                      </div>
                      <Button size="sm" variant="outline" className="mt-2">
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgrammingSection;
