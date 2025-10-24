# 🚀 ELMINYAWE - The Futurist Developer Hub

[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue)](https://github.com/YOUR_USERNAME/ELMINYAWE-Web)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff)](https://vitejs.dev/)

> **A futuristic developer portfolio with 3D effects, multilingual support, admin CMS, and real-time database. Deploy to GitHub Pages in 8 minutes.**

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Quick Deploy (3 Steps)](#-quick-deploy-3-steps)
- [Local Development](#-local-development)
- [Environment Setup](#-environment-setup)
- [Database Setup](#-database-setup)
- [Admin Access](#-admin-access)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)

---

## 🌟 Overview

ELMINYAWE is a production-ready developer portfolio featuring:

- **🎨 Futuristic Design** - Cyberpunk UI with neon effects
- **🎮 3D Graphics** - Three.js (Starfield, Holographic Grid, Floating Symbols)
- **🌍 Multilingual** - English & Arabic with RTL
- **⚙️ Admin CMS** - Full content management
- **💾 Database** - Supabase PostgreSQL
- **💻 Code Platform** - Share snippets with syntax highlighting
- **🔐 Authentication** - User system with roles
- **🚀 Auto-Deploy** - GitHub Actions

**Live Demo:** `https://YOUR_USERNAME.github.io/ELMINYAWE-Web/`

---

## ✨ Features

### User Experience
- Futuristic dark theme with neon glows
- Interactive 3D animations (Three.js)
- Fully responsive mobile-first design
- Smooth transitions and effects

### Core Functionality
- **Authentication**: Email/password login, registration, password reset
- **User Profiles**: Avatars, bios, role-based permissions
- **Code Snippets**: Share code with syntax highlighting, search/filter
- **Contact Form**: EmailJS integration

### Admin Panel (`/#/admin`)
- **Content Manager**: Edit About, Skills, Projects, Social Links
- **Site Settings**: Configure hero section, SEO
- **Code Moderation**: Approve/reject submissions
- **User Management**: Promote admins (owner only)

### Security
- Environment variables for secrets
- Supabase Row Level Security
- Protected routes
- No hardcoded credentials

---

## 🚀 Quick Deploy (3 Steps)

### Step 1: Create Repository (2 min)
1. Go to [github.com](https://github.com) → New repository
2. Name: `ELMINYAWE-Web` (must match exactly!)
3. Visibility: **Public**
4. Create repository

### Step 2: Upload Files (3 min)
Upload ALL files from this folder:
- **Web UI**: Click "uploading an existing file" → drag all files
- **Git CLI**: 
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/ELMINYAWE-Web.git
  git push -u origin main
  ```

### Step 3: Configure (3 min)

**Add Secrets** (Settings → Secrets → Actions):

| Secret Name | Value (from `.env.example`) |
|-------------|----------------------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS public key |
| `VITE_EMAILJS_VERIFY_TEMPLATE_ID` | OTP template ID |
| `VITE_EMAILJS_RESET_TEMPLATE_ID` | Reset template ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Default template ID |
| `VITE_ADMIN_SECRET_KEY` | Custom admin password |
| `VITE_OWNER_SECRET_KEY` | Custom owner password |

**Enable GitHub Pages**:
1. Settings → Pages
2. Source: **"GitHub Actions"**
3. Save

✅ **Done!** Site deploys automatically (~3 min)

**Your site:** `https://YOUR_USERNAME.github.io/ELMINYAWE-Web/`

---

## 📦 Local Development

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/ELMINYAWE-Web.git
cd ELMINYAWE-Web

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your credentials

# Start dev server (http://localhost:3000)
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

---

## 🔧 Environment Setup

### Get Supabase Credentials (5 min)

1. **Create Account**: [supabase.com](https://supabase.com) → Sign up (free)
2. **New Project**: Create project → wait 2 min
3. **Get Credentials**: Settings → API
   - Copy **Project URL** → `VITE_SUPABASE_URL`
   - Copy **anon key** → `VITE_SUPABASE_ANON_KEY`
4. **Enable Auth**: Authentication → Providers → Enable Email

### Get EmailJS Credentials (5 min)

1. **Create Account**: [emailjs.com](https://emailjs.com) → Sign up (free)
2. **Add Service**: Email Services → Add Service (Gmail/Outlook)
   - Copy **Service ID** → `VITE_EMAILJS_SERVICE_ID`
3. **Get Key**: Account → General
   - Copy **Public Key** → `VITE_EMAILJS_PUBLIC_KEY`
4. **Create Templates** (2 required):
   
   **OTP Template:**
   - Name: "Verification Code"
   - Content: `Your code: {{otp_code}}`
   - Copy ID → `VITE_EMAILJS_VERIFY_TEMPLATE_ID`
   
   **Reset Template:**
   - Name: "Password Reset"
   - Content: `Reset link: {{link}}`
   - Copy ID → `VITE_EMAILJS_RESET_TEMPLATE_ID`

---

## 🗄️ Database Setup

Run in Supabase SQL Editor:

### 1. Create Tables

```sql
-- About Content
CREATE TABLE about (
  id TEXT PRIMARY KEY DEFAULT 'main',
  title TEXT NOT NULL,
  subtitle TEXT,
  text1 TEXT,
  text2 TEXT,
  text3 TEXT,
  text4 TEXT,
  stats JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  icon TEXT,
  level INTEGER CHECK (level >= 0 AND level <= 100),
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  tags TEXT[],
  demo_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social Links
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  label TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings
CREATE TABLE site_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  site_name TEXT,
  site_title TEXT,
  site_description TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_description TEXT,
  email TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Code Snippets
CREATE TABLE code_snippets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  image_url TEXT,
  author_id TEXT,
  author_name TEXT,
  author_avatar TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (extends auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Enable Row Level Security

```sql
-- Enable RLS
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read" ON about FOR SELECT USING (true);
CREATE POLICY "Public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON social_links FOR SELECT USING (true);
CREATE POLICY "Public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read" ON users FOR SELECT USING (true);
CREATE POLICY "Public read approved" ON code_snippets FOR SELECT USING (status = 'approved');

-- Admin write policies
CREATE POLICY "Admin full access" ON about FOR ALL 
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'owner')));

-- Apply to all tables
CREATE POLICY "Admin full access" ON skills FOR ALL 
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'owner')));
CREATE POLICY "Admin full access" ON projects FOR ALL 
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'owner')));
CREATE POLICY "Admin full access" ON social_links FOR ALL 
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'owner')));
CREATE POLICY "Admin full access" ON site_settings FOR ALL 
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'owner')));
CREATE POLICY "Admin full access" ON code_snippets FOR ALL 
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'owner')));
```

### 3. Insert Default Data

```sql
INSERT INTO about VALUES ('main', 'About ELMINYAWE', 'Futuristic Developer', 
  'Welcome text...', 'Experience text...', 'Focus text...', 'Innovation text...',
  '{"experience": "3+", "projects": "∞", "users": "10k+", "linesOfCode": "∞"}', NOW());

INSERT INTO site_settings VALUES ('main', 'ELMINYAWE', 'ELMINYAWE - Developer Hub', 
  'A futuristic portfolio...', 'ELMINYAWE', 'The Futurist Developer Hub', 
  'Exploring boundaries...', 'elmnyawe65@gmail.com', NOW());
```

---

## 🔐 Admin Access

### Become Owner (4 steps)

1. **Register**: Visit site → Register → Verify email
2. **Login**: Enter credentials
3. **Promote**: Click avatar → "Owner Access" → Enter `VITE_OWNER_SECRET_KEY` (default: `Yaso1`)
4. **Access Admin**: Navigate to `/#/admin`

### Admin Features

- **About Manager**: Edit bio, stats
- **Skills Manager**: Add/edit/delete skills
- **Projects Manager**: Manage portfolio
- **Social Links**: Update contact links
- **Site Settings**: Configure SEO, hero
- **Code Moderation**: Approve submissions
- **Users** (owner): Promote admins

---

## 📁 Project Structure

```
ELMINYAWE-Web/
├── .github/workflows/deploy.yml  # CI/CD
├── components/          # 27 React components
│   ├── admin/          # 6 admin managers
│   ├── auth/           # Owner access modal
│   ├── layout/         # Header, footer
│   ├── sections/       # Page sections
│   ├── three/          # 3D effects
│   └── ui/             # UI components
├── contexts/           # Auth, Toast
├── hooks/              # useAuth
├── i18n/               # EN/AR translations
├── pages/              # 8 pages
├── services/           # Supabase, EmailJS
├── public/             # Favicon, manifest
├── .env.example        # Environment template
├── package.json        # Dependencies
├── vite.config.ts      # Build config
└── README.md           # This file
```

---

## ✅ Testing

### Essential Checks

- [ ] Site loads at GitHub Pages URL
- [ ] No 404 on CSS/JS assets
- [ ] Registration → Email OTP → Login works
- [ ] Owner access with secret key
- [ ] Admin panel accessible
- [ ] About/Skills/Projects load from database
- [ ] Code snippets display with highlighting
- [ ] Contact form sends email
- [ ] Language switcher (EN ↔ AR) works
- [ ] Responsive on mobile
- [ ] 3D effects render (Starfield, Grid)

### Admin Panel Tests

- [ ] Edit About content → saves → reflects on homepage
- [ ] Add skill → appears in Skills section
- [ ] Add project → shows in Projects
- [ ] Approve code snippet → becomes public
- [ ] Update site settings → SEO meta tags update

---

## 🐛 Troubleshooting

### Build Fails
**Problem**: GitHub Actions build errors  
**Solution**: 
- Check all 9 secrets added in Settings → Secrets
- Verify secret names match exactly (case-sensitive)
- Re-run workflow from Actions tab

### 404 on Assets
**Problem**: CSS/JS return 404  
**Solution**:
- Repository name must be `ELMINYAWE-Web`
- Or update `vite.config.ts` → `base: '/YOUR-REPO-NAME/'`

### Database Not Working
**Problem**: Features fail, "not configured" errors  
**Solution**:
- Verify Supabase project is active (not paused)
- Check secrets: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Run database setup SQL

### Admin Access Denied
**Problem**: Can't access admin panel  
**Solution**:
- Must be logged in first
- Enter correct `VITE_OWNER_SECRET_KEY` in Owner Access modal
- Check role in Supabase users table

### Emails Not Sending
**Problem**: Contact form / OTP emails fail  
**Solution**:
- Verify EmailJS service is active
- Check template IDs match secrets
- Ensure 200 emails/month limit not reached

---

## 🎨 Customization

### Change Repository Name
```typescript
// vite.config.ts
base: '/YOUR-NEW-NAME/',
```

### Update Branding
Use Admin Panel → Site Settings:
- Site name, title, description
- Hero section text
- Contact email

### Add Content
Via Admin Panel:
- About: Your bio and stats
- Skills: Your tech stack
- Projects: Your portfolio
- Social: Your profiles

### Custom Domain
Settings → Pages → Custom domain → Enter domain → Update DNS

---

## 📞 Support

- **Email**: elmnyawe65@gmail.com
- **Discord**: .y31
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/ELMINYAWE-Web/issues)

---

## 📄 License

Custom developer portfolio. Free to use as template.

---

## 🎉 Quick Reference

**Deploy**: 3 steps, 8 minutes  
**Repository**: Must be `ELMINYAWE-Web` or update `vite.config.ts`  
**Secrets**: 9 required in GitHub Settings → Secrets  
**Owner Key**: Default `Yaso1` (change in secrets)  
**Admin Key**: Default `Yao12#` (change in secrets)  
**Live URL**: `https://YOUR_USERNAME.github.io/ELMINYAWE-Web/`  
**Admin Panel**: `/#/admin`

---

**Made with ❤️ by ELMINYAWE**

⭐ Star this repo if helpful!
