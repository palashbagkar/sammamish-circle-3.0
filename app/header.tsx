"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header-container ${hasScrolled ? "scrolled" : ""}`}>
      <style>{`
        .user-icon-btn {
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; text-decoration: none; margin-left: 6px;
          transition: background 0.2s ease;
        }
        .user-icon-btn:hover { background: rgba(255,255,255,0.2); }
      `}</style>
      <div className="header-content">
        <Link href="/" className="logo-section">
          <h1 className="logo-text">Sammamish Circle</h1>
        </Link>

        <nav className="nav-menu">
          <Link href="/directory" className="nav-link">Directory</Link>
          <Link href="/news" className="nav-link">News</Link>
          <Link href="/submit" className="nav-link">Submit a Resource</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/references" className="nav-link">References</Link>
          <Link href="/crisis" className="nav-link" style={{ color: "#F87171" }}>Crisis</Link>
          <Link href="/account" className="user-icon-btn" aria-label="My account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
