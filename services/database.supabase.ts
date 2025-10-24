import { supabase, isSupabaseConfigured } from './supabase.config';
import type {
  AboutContent,
  Skill,
  Project,
  SocialLink,
  SiteSettings,
  CodeSnippet,
  User
} from '../types';

// Table names
const TABLES = {
  ABOUT: 'about',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  SOCIAL_LINKS: 'social_links',
  SITE_SETTINGS: 'site_settings',
  CODE_SNIPPETS: 'code_snippets',
  USERS: 'users'
};

// Mock data fallback when Supabase is not configured
const mockData = {
  about: {
    id: 'main',
    title: 'About ELMINYAWE',
    subtitle: 'Futuristic Developer & Technology Enthusiast',
    text1: 'Welcome to ELMINYAWE - where innovation meets code. I\'m a passionate developer dedicated to creating cutting-edge web experiences.',
    text2: 'With expertise in modern web technologies, I bring ideas to life through clean, efficient, and visually stunning code.',
    text3: 'My work focuses on creating immersive digital experiences that push the boundaries of what\'s possible on the web.',
    text4: 'From AI-powered applications to interactive 3D interfaces, I\'m constantly exploring new frontiers in web development.',
    stats: {
      experience: '3+',
      projects: '∞',
      users: '10k+',
      linesOfCode: '∞'
    }
  },
  skills: [
    { id: '1', name: 'React', icon: '⚛️', level: 95, category: 'Frontend' },
    { id: '2', name: 'TypeScript', icon: '📘', level: 90, category: 'Frontend' },
    { id: '3', name: 'Tailwind CSS', icon: '🎨', level: 92, category: 'Frontend' },
    { id: '4', name: 'Node.js', icon: '🟢', level: 85, category: 'Backend' },
    { id: '5', name: 'Firebase', icon: '🔥', level: 88, category: 'Backend' },
    { id: '6', name: 'Three.js', icon: '🎮', level: 80, category: 'Graphics' }
  ],
  projects: [
    {
      id: '1',
      title: 'AI Chat Interface',
      description: 'Advanced AI-powered chat application with real-time responses',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      tags: ['React', 'AI', 'TypeScript'],
      demoUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: '2',
      title: 'Portfolio CMS',
      description: 'Full-featured content management system for developer portfolios',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      tags: ['React', 'Supabase', 'Admin Panel'],
      demoUrl: '#',
      githubUrl: '#',
      featured: true
    }
  ],
  socialLinks: [
    { id: '1', platform: 'Discord', url: 'https://discord.gg/kZ8S276hB6', icon: 'discord', label: 'Discord (.y31)' },
    { id: '2', platform: 'Email', url: 'mailto:elmnyawe65@gmail.com', icon: 'email', label: 'Email' }
  ],
  siteSettings: {
    id: 'main',
    siteName: 'ELMINYAWE',
    siteTitle: 'ELMINYAWE - The Futurist Developer Hub',
    siteDescription: 'A futuristic developer hub with AI chat, holographic effects, and cutting-edge web technologies',
    heroTitle: 'ELMINYAWE',
    heroSubtitle: 'The Futurist Developer Hub',
    heroDescription: 'Exploring the boundaries of web development with cutting-edge technologies and innovative solutions',
    email: 'elmnyawe65@gmail.com',
    socialLinks: []
  }
};

// About Content
export const getAboutContent = async (): Promise<AboutContent> => {
  if (!isSupabaseConfigured()) {
    return mockData.about;
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.ABOUT)
      .select('*')
      .eq('id', 'main')
      .single();

    if (error) throw error;
    return data || mockData.about;
  } catch (error) {
    console.error('Error fetching about content:', error);
    return mockData.about;
  }
};

export const updateAboutContent = async (content: Partial<AboutContent>): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would update:', content);
    return;
  }

  try {
    const { error } = await supabase
      .from(TABLES.ABOUT)
      .upsert({ id: 'main', ...content });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating about content:', error);
    throw error;
  }
};

// Skills
export const getSkills = async (): Promise<Skill[]> => {
  if (!isSupabaseConfigured()) {
    return mockData.skills;
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.SKILLS)
      .select('*')
      .order('category', { ascending: true });

    if (error) throw error;
    return data || mockData.skills;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return mockData.skills;
  }
};

export const addSkill = async (skill: Omit<Skill, 'id'>): Promise<string> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would add skill:', skill);
    return `mock-${Date.now()}`;
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.SKILLS)
      .insert([skill])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error adding skill:', error);
    throw error;
  }
};

export const updateSkill = async (id: string, skill: Partial<Skill>): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would update skill:', id, skill);
    return;
  }

  try {
    const { error } = await supabase
      .from(TABLES.SKILLS)
      .update(skill)
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating skill:', error);
    throw error;
  }
};

export const deleteSkill = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would delete skill:', id);
    return;
  }

  try {
    const { error } = await supabase
      .from(TABLES.SKILLS)
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting skill:', error);
    throw error;
  }
};

// Projects
export const getProjects = async (featuredOnly: boolean = false): Promise<Project[]> => {
  if (!isSupabaseConfigured()) {
    return featuredOnly ? mockData.projects.filter(p => p.featured) : mockData.projects;
  }

  try {
    let query = supabase.from(TABLES.PROJECTS).select('*');
    
    if (featuredOnly) {
      query = query.eq('featured', true);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || mockData.projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return mockData.projects;
  }
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<string> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would add project:', project);
    return `mock-${Date.now()}`;
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .insert([project])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would update project:', id, project);
    return;
  }

  try {
    const { error } = await supabase
      .from(TABLES.PROJECTS)
      .update(project)
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would delete project:', id);
    return;
  }

  try {
    const { error} = await supabase
      .from(TABLES.PROJECTS)
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Social Links
export const getSocialLinks = async (): Promise<SocialLink[]> => {
  if (!isSupabaseConfigured()) {
    return mockData.socialLinks;
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.SOCIAL_LINKS)
      .select('*');

    if (error) throw error;
    return data || mockData.socialLinks;
  } catch (error) {
    console.error('Error fetching social links:', error);
    return mockData.socialLinks;
  }
};

export const updateSocialLink = async (id: string, link: Partial<SocialLink>): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would update social link:', id, link);
    return;
  }

  try {
    const { error } = await supabase
      .from(TABLES.SOCIAL_LINKS)
      .update(link)
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating social link:', error);
    throw error;
  }
};

// Site Settings
export const getSiteSettings = async (): Promise<SiteSettings> => {
  if (!isSupabaseConfigured()) {
    return mockData.siteSettings;
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.SITE_SETTINGS)
      .select('*')
      .eq('id', 'main')
      .single();

    if (error) throw error;
    return data || mockData.siteSettings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return mockData.siteSettings;
  }
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would update settings:', settings);
    return;
  }

  try {
    const { error } = await supabase
      .from(TABLES.SITE_SETTINGS)
      .upsert({ id: 'main', ...settings });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating site settings:', error);
    throw error;
  }
};

// Code Snippets
export const getCodeSnippets = async (status?: 'approved' | 'pending'): Promise<CodeSnippet[]> => {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    let query = supabase.from(TABLES.CODE_SNIPPETS).select('*');
    
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query.order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching code snippets:', error);
    return [];
  }
};

export const addCodeSnippet = async (snippet: Omit<CodeSnippet, 'id'>): Promise<string> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would add snippet:', snippet);
    return `mock-${Date.now()}`;
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.CODE_SNIPPETS)
      .insert([{ ...snippet, createdAt: Date.now(), status: 'pending' }])
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error adding code snippet:', error);
    throw error;
  }
};

export const uploadCodeFile = async (file: File, userId: string): Promise<string> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would upload file:', file.name);
    return `mock-file-url-${Date.now()}`;
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('code-files')
      .upload(fileName, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('code-files')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const updateCodeSnippet = async (id: string, snippet: Partial<CodeSnippet>): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would update snippet:', id, snippet);
    return;
  }

  try {
    const { error } = await supabase
      .from(TABLES.CODE_SNIPPETS)
      .update(snippet)
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating code snippet:', error);
    throw error;
  }
};

export const deleteCodeSnippet = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, would delete snippet:', id);
    return;
  }

  try {
    const { error } = await supabase
      .from(TABLES.CODE_SNIPPETS)
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting code snippet:', error);
    throw error;
  }
};
