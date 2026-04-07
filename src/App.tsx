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

import { useState, useEffect, useRef, useCallback, type TransitionEvent } from 'react';
import './App.css';

const greetings = [
  "Hello", "Hola", "Bonjour", "Hallo", "Ciao", "Привет", "你好", "Olá", "مرحبا",
  "नमस्ते", "こんにちは", "안녕하세요", "Sawubona", "Salam", "Hej",
  "Kamusta", "Xin chào", "Tere", "Selamat", "Mingalaba", "Jambo", "Zdravstvuyte",
  "Aloha", "Merhaba", "Szia", "Salve", "Sveiki", "Dia dhuit", "Cześć", "Kia ora",
  "Sawatdee", "Halo", "Mhoro", "Saluton", "Bula", "Yassas", "Dobry den", "Mabuhay"
];

interface RepoStats {
  stars: number;
  forks: number;
}

const projectRepoPaths = [
  "SchizoidDevelopment/schizoid",
  "Lyzev/PerfectlyBalancedHorses",
  "Lyzev/SchummelPartie",
  "Lyzev/HorsePower",
  "SchizoidDevelopment/kratos",
  "SchizoidDevelopment/piko"
];

function createProjectIconUrl(repoPath: string) {
  return `https://raw.githubusercontent.com/${repoPath}/refs/heads/master/.idea/icon.png`;
}

function preloadImage(url: string, timeoutMs = 5000) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      resolve();
    };

    const timeoutId = window.setTimeout(finish, timeoutMs);

    img.onload = finish;
    img.onerror = finish;
    img.src = url;

    if (img.complete) finish();
  });
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
        // ignoring
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
  const iconUrl = createProjectIconUrl(repoPath);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`project-card ${highlight ? 'highlight-card' : ''}`}>
      <div>
        <div className="project-icon-wrapper">
          <img
            src={iconUrl}
            alt={`${title} icon`}
            className="project-icon"
            onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none'; }}
          />
        </div>
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
      </div>
      <div className="project-footer">
        <span className="repo-stats">
          <span className="stat-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-label="Stars" role="img">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L1.144 6.164a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
            </svg>
            {stats ? stats.stars : '-'}
          </span>
          <span className="stat-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-label="Forks" role="img">
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 2 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
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
          <span>•</span>
          <span className="pr-date">{date}</span>
        </span>
        <span className="view-link">View PR</span>
      </div>
    </a>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFinalWord, setIsFinalWord] = useState(false);
  const [loadingText, setLoadingText] = useState<string>(() => {
    const available = greetings.slice(1);
    return available[Math.floor(Math.random() * available.length)];
  });
  const [loadingKey, setLoadingKey] = useState(1);
  const statsLoadedRef = useRef(false);
  const imagesLoadedRef = useRef(false);
  const tickRef = useRef(1);
  const lastTextRef = useRef(loadingText);

  useEffect(() => {
    const statsPromise = Promise.allSettled(projectRepoPaths.map(async (repoPath) => {
      const cacheKey = `gh-repo-stats-${repoPath}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 15 * 60 * 1000) return;
        } catch {
          // ignoring
        }
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
      } catch {
        // ignoring
      }
    }));

    const imagesPromise = Promise.allSettled(
      projectRepoPaths.map((repoPath) => preloadImage(createProjectIconUrl(repoPath)))
    );

    statsPromise.finally(() => {
      statsLoadedRef.current = true;
    });

    imagesPromise.finally(() => {
      imagesLoadedRef.current = true;
    });
  }, []);

  const handleTextAnimationEnd = useCallback(() => {
    if (isFadingOut) return;

    if (isFinalWord) {
      setIsFadingOut(true);
      return;
    }

    if (tickRef.current >= 3 && statsLoadedRef.current && imagesLoadedRef.current) {
      lastTextRef.current = greetings[0];
      setLoadingText(greetings[0]);
      setLoadingKey(k => k + 1);
      setIsFinalWord(true);
    } else {
      const available = greetings.slice(1).filter(g => g !== lastTextRef.current);
      const text = available[Math.floor(Math.random() * available.length)];
      lastTextRef.current = text;
      setLoadingText(text);
      setLoadingKey(k => k + 1);
      tickRef.current++;
    }
  }, [isFadingOut, isFinalWord]);

  const handleContainerTransitionEnd = useCallback((event: TransitionEvent<HTMLDivElement>) => {
    if (!isFadingOut || event.propertyName !== 'opacity') return;
    setIsLoading(false);
  }, [isFadingOut]);

  return (
    <>
      <div className="app-container">
      <main className="section">
        <h1 className="hero-title">"ABOUT ME"</h1>
        <p className="hero-subtitle">
          Hi, I'm Lyzev<sup className="name-super">⎡Бен⎤</sup>, a software developer from Central Europe. I started programming in 2020 and learned Java as my first programming language.
        </p>

        <p className="contact-info">
          <a href="mailto:contact@lyzev.dev" className="btn-primary">Mail</a>
          <a href="https://github.com/Lyzev" target="_blank" rel="noopener noreferrer" className="view-link">GitHub</a>
          <a href="https://lyzev.dev/discord" target="_blank" rel="noopener noreferrer" className="view-link">Discord</a>
        </p>
      </main>

      <section className="section">
        <h2 className="section-title">"PROJECTS"</h2>
        <div className="cards-grid">
          <RepoCard
            title="Piko"
            description="Effortlessly manage events in your application with this lightweight and flexible event management library."
            repoPath="SchizoidDevelopment/piko"
            url="https://github.com/SchizoidDevelopment/piko"
          />
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
            title="PerfectlyBalancedHorses"
            description="A Minecraft server plugin that improves horse breeding by boosting and balancing speed, jump, and health stats."
            repoPath="Lyzev/PerfectlyBalancedHorses"
            url="https://github.com/Lyzev/PerfectlyBalancedHorses/"
          />
          <RepoCard
            title="SchummelPartie"
            description="A configurable Pummel Party mod with an in-game GUI and gameplay modules for practice and custom sessions."
            repoPath="Lyzev/SchummelPartie"
            url="https://github.com/Lyzev/SchummelPartie/"
          />
          <RepoCard
            title="HorsePower"
            description="A Minecraft mod that scores horse stats, displays power in HUD/inventory, and includes commands to find strong horses nearby."
            repoPath="Lyzev/HorsePower"
            url="https://github.com/Lyzev/HorsePower/"
          />
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">"CONTRIBUTIONS"</h2>
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
        <div className="app-footer-inner">
          <div className="footer-left">
            <p>Copyright &copy; {new Date().getFullYear()} Lyzev. All rights reserved.</p>
          </div>

          <div className="footer-center">
            <a href="https://docs.github.com/en/site-policy/privacy-policies">Privacy Policy</a>
            <span className="footer-separator">|</span>
            <a href="https://www.gnu.org/licenses/agpl-3.0.html">Terms of Use</a>
          </div>

          <div className="footer-right">
            <p>Europe</p>
          </div>
        </div>
      </footer>
      </div>

      {isLoading && (
        <div
          className={`loader-container${isFadingOut ? ' fading-out' : ''}`}
          onTransitionEnd={handleContainerTransitionEnd}
        >
          <div
            key={loadingKey}
            className={`loader-text${isFinalWord ? ' loader-text--final' : ''}`}
            onAnimationEnd={handleTextAnimationEnd}
          >
            {loadingText}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
