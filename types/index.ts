 export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  bio: string;
  role: 'user' | 'owner' | 'admin';
}

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  imageUrl?: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: number;
  status: 'approved' | 'pending';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (username: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: { username?: string; bio?: string; avatarUrl?: string }) => Promise<void>;
  checkForOwner: (secretCode: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

// CMS Content Types
export interface AboutContent {
  id: string;
  title: string;
  subtitle: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  stats: {
    experience: string;
    projects: string;
    users: string;
    linesOfCode: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface SiteSettings {
  id: string;
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  email: string;
  socialLinks: SocialLink[];
}
