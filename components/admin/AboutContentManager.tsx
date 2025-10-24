import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { getAboutContent, updateAboutContent } from '../../services/database.service';
import type { AboutContent } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Card, CardContent } from '../ui/Card';

const AboutContentManager: React.FC = () => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<AboutContent>({
    id: 'main',
    title: 'About ELMINYAWE',
    subtitle: 'Futuristic Developer & Technology Enthusiast',
    text1: 'Welcome to ELMINYAWE - where innovation meets code.',
    text2: 'With expertise in modern web technologies...',
    text3: 'My work focuses on creating immersive digital experiences...',
    text4: 'From AI-powered applications to interactive 3D interfaces...',
    stats: {
      experience: '3+',
      projects: '∞',
      users: '10k+',
      linesOfCode: '∞'
    }
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await getAboutContent();
      if (data) {
        setContent(data);
      }
    } catch (error) {
      addToast('Failed to load about content', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAboutContent(content);
      addToast('About content updated successfully!', 'success');
    } catch (error) {
      addToast('Failed to update about content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-neon-red glow-text-subtle">Edit About Section</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              placeholder="Section title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <Input
              value={content.subtitle}
              onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
              placeholder="Section subtitle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Paragraph 1</label>
            <Textarea
              value={content.text1}
              onChange={(e) => setContent({ ...content, text1: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Paragraph 2</label>
            <Textarea
              value={content.text2}
              onChange={(e) => setContent({ ...content, text2: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Paragraph 3</label>
            <Textarea
              value={content.text3}
              onChange={(e) => setContent({ ...content, text3: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Paragraph 4</label>
            <Textarea
              value={content.text4}
              onChange={(e) => setContent({ ...content, text4: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Experience</label>
              <Input
                value={content.stats.experience}
                onChange={(e) => setContent({ 
                  ...content, 
                  stats: { ...content.stats, experience: e.target.value }
                })}
                placeholder="3+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Projects</label>
              <Input
                value={content.stats.projects}
                onChange={(e) => setContent({ 
                  ...content, 
                  stats: { ...content.stats, projects: e.target.value }
                })}
                placeholder="∞"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Users Served</label>
              <Input
                value={content.stats.users}
                onChange={(e) => setContent({ 
                  ...content, 
                  stats: { ...content.stats, users: e.target.value }
                })}
                placeholder="10k+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Lines of Code</label>
              <Input
                value={content.stats.linesOfCode}
                onChange={(e) => setContent({ 
                  ...content, 
                  stats: { ...content.stats, linesOfCode: e.target.value }
                })}
                placeholder="∞"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutContentManager;
