import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import OwnerAccessModal from '../auth/OwnerAccessModal';
import GlitchText from '../effects/GlitchText';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOwnerModalOpen, setIsOwnerModalOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive ? 'text-neon-red glow-text-subtle' : 'text-muted-foreground hover:text-neon-red hover:glow-text-subtle'
    }`;

  return (
    <header className="bg-black/90 backdrop-blur-sm sticky top-0 z-50 border-b border-neon-red/30">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-neon-red glow-text-subtle">
              <GlitchText>ELMINYAWE</GlitchText>
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-neon-red hover:glow-text-subtle transition-all duration-300">
              {t('nav_home', 'Home')}
            </a>
            <a href="#about" className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-neon-red hover:glow-text-subtle transition-all duration-300">
              {t('nav_about', 'About')}
            </a>
            <a href="#contact" className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-neon-red hover:glow-text-subtle transition-all duration-300">
              {t('nav_contact', 'Contact')}
            </a>
            <NavLink to="/codes" className={navLinkClass}>{t('nav_codes', 'Codes')}</NavLink>
            <NavLink to="/chat" className={navLinkClass}>{t('nav_chat', 'Chat')}</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {user ? (
              <div className="relative group">
                <button onClick={() => navigate(`/profile/${user.id}`)} className="flex items-center space-x-2">
                  <img src={user.avatarUrl} alt={user.username} className="w-8 h-8 rounded-full border-2 border-neon-red/50 group-hover:border-neon-red transition shadow-red-glow" />
                  <span className="text-foreground group-hover:text-neon-red transition">{user.username}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-black border border-neon-red/30 rounded-md shadow-red-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <div className="py-1">
                    {(user.role === 'admin' || user.role === 'owner') && (
                      <NavLink to="/admin" className="block px-4 py-2 text-sm text-foreground hover:bg-neon-red/10 hover:text-neon-red">
                        ⚙️ {t('admin_panel', 'Admin Panel')}
                      </NavLink>
                    )}
                    <NavLink to="/settings" className="block px-4 py-2 text-sm text-foreground hover:bg-neon-red/10 hover:text-neon-red">{t('nav_settings', 'Settings')}</NavLink>
                    {user.role !== 'owner' && user.role !== 'admin' && (
                        <button onClick={() => setIsOwnerModalOpen(true)} className="w-full text-left block px-4 py-2 text-sm text-foreground hover:bg-neon-red/10 hover:text-neon-red">
                          {t('owner_access_title', 'Owner Access')}
                        </button>
                    )}
                    <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-foreground hover:bg-neon-red/10 hover:text-neon-red">{t('nav_logout', 'Logout')}</button>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink to="/auth" className="px-4 py-2 border-2 border-neon-red text-neon-red rounded-md hover:bg-neon-red/10 transition-all duration-300 glow-text-subtle text-sm">
                {t('nav_login', 'Login')}
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      {isOwnerModalOpen && <OwnerAccessModal onClose={() => setIsOwnerModalOpen(false)} />}
    </header>
  );
};

export default Header;
