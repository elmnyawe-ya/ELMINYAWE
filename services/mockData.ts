
import type { User, CodeSnippet } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'user_1',
    username: 'nyx',
    email: 'owner@elminyawe.dev',
    avatarUrl: 'https://picsum.photos/seed/nyx/200',
    bio: 'Architect of the Neon Noir. Forging the future, one line of code at a time.',
    role: 'owner',
  },
  {
    id: 'user_2',
    username: 'glitch',
    email: 'user@elminyawe.dev',
    avatarUrl: 'https://picsum.photos/seed/glitch/200',
    bio: 'Riding the data streams.',
    role: 'user',
  },
];

export const MOCK_SNIPPETS: CodeSnippet[] = [
  {
    id: 'snippet_1',
    title: 'Futuristic Glow Effect',
    description: 'A simple CSS snippet to create a glowing text effect, perfect for a sci-fi UI.',
    language: 'CSS',
    code: `
.glow-text {
  color: #fff;
  text-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #0fa,
    0 0 82px #0fa,
    0 0 92px #0fa,
    0 0 102px #0fa,
    0 0 151px #0fa;
}
    `,
    imageUrl: 'https://picsum.photos/seed/glow/800/600',
    authorId: 'user_1',
    authorName: 'nyx',
    authorAvatar: MOCK_USERS[0].avatarUrl,
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    status: 'approved',
  },
  {
    id: 'snippet_2',
    title: 'React Custom Hook for Fetch',
    description: 'A reusable React hook to handle data fetching, loading, and error states.',
    language: 'JavaScript',
    code: `
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
    `,
    authorId: 'user_2',
    authorName: 'glitch',
    authorAvatar: MOCK_USERS[1].avatarUrl,
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
    status: 'approved',
  },
   {
    id: 'snippet_3',
    title: 'Python Web Scraper',
    description: 'A basic web scraper using BeautifulSoup and Requests to extract titles from a webpage.',
    language: 'Python',
    code: `
import requests
from bs4 import BeautifulSoup

URL = 'http://example.com'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')
titles = soup.find_all('h1')

for title in titles:
    print(title.text)
    `,
    imageUrl: 'https://picsum.photos/seed/python/800/600',
    authorId: 'user_2',
    authorName: 'glitch',
    authorAvatar: MOCK_USERS[1].avatarUrl,
    createdAt: Date.now(),
    status: 'pending',
  }
];
