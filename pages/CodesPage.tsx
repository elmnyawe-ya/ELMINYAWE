import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import type { CodeSnippet } from '../types';
import * as firebaseService from '../services/firebaseService';
import * as dbService from '../services/database.supabase';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';

// highlight.js is loaded via CDN
declare const hljs: any;

const CodeSnippetCard: React.FC<{ snippet: CodeSnippet }> = ({ snippet }) => {
  const codeRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [snippet.code]);

  const copyCode = async () => {
    try { await navigator.clipboard.writeText(snippet.code); } catch {}
  };

  return (
    <div className="bg-dark-bg/50 border border-neon-cyan/30 rounded-lg overflow-hidden glow-border-hover transition-all duration-300 transform hover:-translate-y-1">
      {snippet.imageUrl && <img src={snippet.imageUrl} alt={snippet.title} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h3 className="text-xl font-bold text-neon-cyan glow-text-hover">{snippet.title}</h3>
        <p className="text-gray-400 text-sm mt-1 mb-2">{snippet.description}</p>
        <div className="text-xs text-gray-500 mb-4">{snippet.language}</div>
        <div className="max-h-40 overflow-auto bg-black/50 rounded-md p-2">
            <pre><code ref={codeRef} className={`language-${snippet.language.toLowerCase()}`}>{snippet.code}</code></pre>
        </div>
        <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <img src={snippet.authorAvatar} alt={snippet.authorName} className="w-8 h-8 rounded-full border-2 border-neon-cyan/50" />
                <span className="text-gray-300 text-sm">{snippet.authorName}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={copyCode}>Copy Code</Button>
            </div>
            <span className="text-xs text-gray-500">{new Date(snippet.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

const CodesPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', language: 'javascript', code: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const approvedSnippets = await firebaseService.getApprovedSnippets();
        setSnippets(approvedSnippets);
      } catch (error) {
        console.error("Failed to fetch snippets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSnippets();
  }, []);
  
  const filteredSnippets = useMemo(() => {
    if (!searchTerm) {
      return snippets;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return snippets.filter(snippet =>
      snippet.title.toLowerCase().includes(lowercasedFilter) ||
      snippet.description.toLowerCase().includes(lowercasedFilter) ||
      snippet.language.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, snippets]);


  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.code) {
      addToast(t('fill_all_fields', 'Please fill all required fields'), 'error');
      return;
    }
    setSubmitting(true);
    try {
      let fileUrl = '';
      if (file) {
        fileUrl = await dbService.uploadCodeFile(file, user?.id || 'anonymous');
      }
      await dbService.addCodeSnippet({
        title: form.title,
        description: form.description,
        language: form.language,
        code: form.code,
        imageUrl: fileUrl,
        authorId: user?.id || 'anonymous',
        authorName: user?.username || 'Guest',
        authorAvatar: user?.avatarUrl || 'https://ui-avatars.com/api/?name=Guest',
        createdAt: Date.now(),
        status: 'pending'
      });
      addToast(t('snippet_submitted', 'Code snippet submitted for review!'), 'success');
      setForm({ title: '', description: '', language: 'javascript', code: '' });
      setFile(null);
    } catch (error) {
      addToast(t('submission_failed', 'Failed to submit snippet'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-neon-cyan glow-text mb-4 text-center">{t('codes_title')}</h1>
      <div className="mb-8 max-w-2xl mx-auto grid gap-3">
        <input type="text" placeholder={t('title')} value={form.title} onChange={(e)=>setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 bg-dark-bg/70 border border-neon-cyan/30 rounded-md" />
        <input type="text" placeholder={t('description')} value={form.description} onChange={(e)=>setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 bg-dark-bg/70 border border-neon-cyan/30 rounded-md" />
        <select value={form.language} onChange={(e)=>setForm({ ...form, language: e.target.value })} className="w-full px-4 py-2 bg-dark-bg/70 border border-neon-cyan/30 rounded-md">
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="lua">Lua</option>
        </select>
        <textarea placeholder={t('code')} value={form.code} onChange={(e)=>setForm({ ...form, code: e.target.value })} className="w-full h-40 px-4 py-2 bg-dark-bg/70 border border-neon-cyan/30 rounded-md" />
        <input type="file" onChange={(e)=>setFile(e.target.files?.[0] || null)} className="w-full px-4 py-2" />
        <Button onClick={handleSubmit} disabled={submitting}>{submitting ? t('submitting', 'Submitting...') : t('submit_for_review', 'Submit for review')}</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSnippets.map(snippet => (
          <CodeSnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
        {filteredSnippets.length === 0 && !loading && (
            <p className="text-center text-gray-500 col-span-full">No snippets found matching your search.</p>
        )}
    </div>
  );
};

export default CodesPage;