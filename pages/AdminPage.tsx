import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import GlitchText from '../components/effects/GlitchText';
import AboutContentManager from '../components/admin/AboutContentManager';
import SkillsManager from '../components/admin/SkillsManager';
import ProjectsManager from '../components/admin/ProjectsManager';
import SocialLinksManager from '../components/admin/SocialLinksManager';
import SiteSettingsManager from '../components/admin/SiteSettingsManager';
import CodeSnippetsManager from '../components/admin/CodeSnippetsManager';

type AdminTab = 'about' | 'skills' | 'projects' | 'social' | 'settings' | 'codes';

const AdminPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>('about');

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
      addToast('Access denied. Admin privileges required.', 'error');
      navigate('/');
    }
  }, [user, navigate, addToast]);

  if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
    return null;
  }

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'about', label: 'About Content', icon: '📝' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'social', label: 'Social Links', icon: '🔗' },
    { id: 'settings', label: 'Site Settings', icon: '⚙️' },
    { id: 'codes', label: 'Code Snippets', icon: '💻' },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-neon-red glow-text mb-4">
            <GlitchText>Admin Panel</GlitchText>
          </h1>
          <p className="text-muted-foreground text-lg">
            Welcome back, {user.username}. Manage your website content here.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b-2 border-neon-red/30 pb-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 rounded-t-lg font-medium transition-all duration-300
                  ${activeTab === tab.id 
                    ? 'bg-neon-red text-white shadow-red-glow' 
                    : 'bg-card text-muted-foreground hover:bg-neon-red/10 hover:text-neon-red border border-neon-red/20'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'about' && <AboutContentManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'social' && <SocialLinksManager />}
          {activeTab === 'settings' && <SiteSettingsManager />}
          {activeTab === 'codes' && <CodeSnippetsManager />}
        </div>

        {/* Back to Site */}
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate('/')}>
            ← Back to Main Site
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
