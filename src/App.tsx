/*
 * This file is part of https://github.com/Lyzev/lyzev.github.io.
 *
 * Copyright (c) 2026. Lyzev
 *
 * Piko is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, version 3 of the License, or
 * (at your option) any later version.
 *
 * Piko is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with Piko. If not, see https://www.gnu.org/licenses/agpl-3.0.en.html.
 */

import { useState, useEffect, useRef } from 'react';
import './App.css';

const greetings = [
  "Hello", "Hola", "Bonjour", "Hallo", "Ciao", "Привет", "你好", "Olá", "مرحبا",
  "नमस्ते", "こんにちは", "안녕하세요", "Sawubona", "Salam", "Shalom", "Hej",
  "Kamusta", "Xin chào", "Tere", "Selamat", "Mingalaba", "Jambo", "Zdravstvuyte",
  "Aloha", "Merhaba", "Szia", "Salve", "Sveiki", "Dia dhuit", "Cześć", "Kia ora",
  "Sawatdee", "Halo", "Mhoro", "Saluton", "Bula", "Yassas", "Dobry den", "Mabuhay"
];

interface RepoStats {
  stars: number;
  forks: number;
}

function useRepoStats(repoPath: string) {
  const [stats, setStats] = useState<RepoStats | null>(() => {
    const cacheKey = `gh-repo-stats-${repoPath}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < 15 * 60 * 1000) {
          return parsed.stats;
        }
      } catch {
        // Ignore parsing errors
      }
    }
    return null;
  });

  useEffect(() => {
    if (stats) return;

    const cacheKey = `gh-repo-stats-${repoPath}`;

    fetch(`https://api.github.com/repos/${repoPath}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (data.stargazers_count !== undefined && data.forks_count !== undefined) {
          const newStats = { stars: data.stargazers_count, forks: data.forks_count };
          setStats(newStats);
          localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), stats: newStats }));
        }
      })
      .catch((err) => console.error(`Failed to fetch stats for ${repoPath}`, err));
  }, [repoPath, stats]);

  return stats;
}

function RepoCard({ title, description, repoPath, url, highlight }: { title: string, description: string, repoPath: string, url: string, highlight?: boolean }) {
  const stats = useRepoStats(repoPath);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`project-card ${highlight ? 'highlight-card' : ''}`}>
      <div>
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
      </div>
      <div className="project-footer">
        <span className="repo-stats">
          <span className="stat-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-label="Stars" role="img">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
            </svg>
            {stats ? stats.stars : '-'}
          </span>
          <span className="stat-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-label="Forks" role="img">
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
            </svg>
            {stats ? stats.forks : '-'}
          </span>
        </span>
        <span className="view-link">View project</span>
      </div>
    </a>
  );
}

function PRCard({ title, description, url, status, date, highlight }: { title: string, description: string, url: string, status: string, date: string, highlight?: boolean }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`project-card pr-card ${highlight ? 'highlight-card' : ''}`}>
      <div>
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
      </div>
      <div className="project-footer pr-footer">
        <span className="pr-meta">
          <span className={`pr-status ${status.toLowerCase()}`}>{status}</span>
          <span className="pr-date">{date}</span>
        </span>
        <span className="view-link">View PR</span>
      </div>
    </a>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [loadingKey, setLoadingKey] = useState(0);
  const statsLoadedRef = useRef(false);

  useEffect(() => {
    const repos = ["SchizoidDevelopment/schizoid", "SchizoidDevelopment/kratos", "SchizoidDevelopment/piko"];
    Promise.allSettled(repos.map(async (repoPath) => {
      const cacheKey = `gh-repo-stats-${repoPath}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 15 * 60 * 1000) return;
        } catch {}
      }
      try {
        const res = await fetch(`https://api.github.com/repos/${repoPath}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.stargazers_count !== undefined && data.forks_count !== undefined) {
          localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            stats: { stars: data.stargazers_count, forks: data.forks_count }
          }));
        }
      } catch {}
    })).finally(() => {
      statsLoadedRef.current = true;
    });
  }, []);

  useEffect(() => {
    let tick = 0;
    let lastText = "";

    const setWord = (isEnding = false) => {
      if (isEnding) {
        lastText = greetings[0];
      } else {
        const available = greetings.slice(1).filter(g => g !== lastText);
        lastText = available[Math.floor(Math.random() * available.length)];
      }
      setLoadingText(lastText);
      setLoadingKey(k => k + 1);
    };

    setWord();
    tick++;

    const interval = setInterval(() => {
      if (tick >= 4 && statsLoadedRef.current) {
        if (lastText === greetings[0]) {
           setIsLoading(false);
           clearInterval(interval);
        } else {
           setWord(true);
        }
      } else {
        setWord();
        tick++;
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div key={loadingKey} className="loader-text">
          {loadingText}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <main className="hero-section">
        <fieldset className="intro-box">
          <legend className="intro-legend">Lyzev</legend>
          <p className="intro-text">
            Hi, I'm Lyzev<sup className="name-super">⎡Бен⎤</sup>, a software developer from Central Europe. I started programming in 2020 and learned Java as my first programming language. I contribute to various open source projects on GitHub, focusing on fixing bugs and adding new features. I also love reverse engineering and making mods for games.
          </p>
        </fieldset>

        <p className="contact-info">
          Reach me via{' '}
          <a href="mailto:contact@lyzev.dev">Mail</a>,{' '}
          <a href="https://github.com/Lyzev" target="_blank" rel="noopener noreferrer">GitHub</a>, or{' '}
          <a href="https://lyzev.dev/discord" target="_blank" rel="noopener noreferrer">Discord</a>.
        </p>
      </main>

      <section className="projects-section">
        <h2 className="section-title">Projects</h2>
        <div className="cards-grid">
          <RepoCard
            title="Schizoid"
            description="Elevate your Minecraft gameplay with this free and feature-rich client built with Fabric API and utilizing mixin-based injection techniques."
            repoPath="SchizoidDevelopment/schizoid"
            url="https://github.com/SchizoidDevelopment/schizoid"
            highlight={true}
          />
          <RepoCard
            title="Kratos"
            description="A flexible Kotlin library for seamless management and tracking of customizable application settings."
            repoPath="SchizoidDevelopment/kratos"
            url="https://github.com/SchizoidDevelopment/kratos"
          />
          <RepoCard
            title="Piko"
            description="Effortlessly manage events in your application with this lightweight and flexible event management library."
            repoPath="SchizoidDevelopment/piko"
            url="https://github.com/SchizoidDevelopment/piko"
          />
        </div>
      </section>

      <section className="projects-section">
        <h2 className="section-title">Open Source Contributions</h2>
        <div className="cards-grid pr-grid">
          <PRCard
            title="PR #320 on imgui-java"
            description="Enhance OpenGL compatibility checks for sampler objects."
            url="https://github.com/SpaiR/imgui-java/pull/320"
            status="Merged"
            date="Feb 2, 2025"
            highlight={true}
          />
          <PRCard
            title="PR #4636 on baritone"
            description="Added settings to control block placement in fluid sources and flowing fluids."
            url="https://github.com/cabaletta/baritone/pull/4636"
            status="Merged"
            date="Feb 8, 2025"
          />
          <PRCard
            title="PR #3671 on meteor-client"
            description="Add Dual Kawase Blur (aka. Dual Filter)."
            url="https://github.com/MeteorDevelopment/meteor-client/pull/3671"
            status="Merged"
            date="May 21, 2023"
          />
        </div>
      </section>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Lyzev. All rights reserved.</p>
        <p className="legal-links">
          Hosted on <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">GitHub Pages</a> (<a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">Privacy</a>) and routed by <a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">Cloudflare</a> (<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Privacy</a>).
        </p>
      </footer>
    </div>
  );
}

export default App;
