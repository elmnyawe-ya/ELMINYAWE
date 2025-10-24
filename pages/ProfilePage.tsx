import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as firebaseService from '../services/firebaseService';
import type { User, CodeSnippet } from '../types';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const [foundUser, userSnippets] = await Promise.all([
          firebaseService.getUser(userId),
          firebaseService.getSnippetsByAuthor(userId)
        ]);
        
        if (foundUser) {
          setUser(foundUser);
          setSnippets(userSnippets);
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-neon-cyan">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center py-12 text-red-500">User not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left p-8 bg-dark-bg/50 border border-neon-cyan/30 rounded-lg glow-border">
        <img src={user.avatarUrl} alt={user.username} className="w-32 h-32 rounded-full border-4 border-neon-cyan shadow-lg mb-4 md:mb-0 md:mr-8" />
        <div>
          <h1 className="text-4xl font-bold text-neon-cyan glow-text">{user.username}</h1>
          {user.role === 'owner' && <span className="text-xs bg-neon-cyan text-dark-bg font-bold px-2 py-1 rounded ml-2">OWNER</span>}
          <p className="text-gray-400 mt-2">{user.bio}</p>
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-neon-cyan glow-text mb-4">{t('user_snippets')}</h2>
        {snippets.length > 0 ? (
          <div className="space-y-4">
            {snippets.map(snippet => (
              <div key={snippet.id} className="p-4 bg-dark-bg/50 border border-neon-cyan/20 rounded-lg">
                <h3 className="text-xl font-semibold text-neon-cyan">{snippet.title}</h3>
                <p className="text-gray-400 text-sm">{snippet.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t('no_snippets_found')}</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;