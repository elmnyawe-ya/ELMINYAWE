import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [isLoading, setIsLoading] = useState(false);
  
  if (!user) {
    return <div className="text-center py-12 text-red-500">You must be logged in to view this page.</div>;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // The updateProfile in AuthContext now handles calling the service
      await updateProfile({ username, bio, avatarUrl });
      addToast(t('profile_updated'), 'success');
      navigate(`/profile/${user.id}`);
    } catch (error) {
      addToast(error instanceof Error ? error.message : String(error), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-neon-cyan glow-text mb-8 text-center">{t('settings_title')}</h1>
      <div className="p-8 bg-dark-bg/50 border border-neon-cyan/30 rounded-lg shadow-lg glow-border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <img src={avatarUrl} alt="Avatar Preview" className="w-24 h-24 rounded-full border-4 border-neon-cyan/50" />
            <Input
              id="avatarUrl"
              label={t('avatar_url')}
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="flex-grow"
            />
          </div>
          <Input
            id="username"
            label={t('username')}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-neon-cyan mb-1">{t('bio')}</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-gray-900/50 border border-neon-cyan/30 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t('saving') : t('save_changes')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;