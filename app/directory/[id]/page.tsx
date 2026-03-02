"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../header";
import Footer from "../../footer";
import { RESOURCES } from "../data";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: number;
}

export default function ResourceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const resource = RESOURCES.find(r => r.id === Number(id));

  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const commentsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!resource) return;
    try {
      const stored = localStorage.getItem(`sc_comments_${resource.id}`);
      if (stored) setComments(JSON.parse(stored));
    } catch {}
  }, [resource]);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  if (!resource) {
    return (
      <div style={{ minHeight: "100vh", background: "#244747", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <p style={{ color: "#FFF4D2", fontFamily: "Inter, sans-serif", fontSize: 18 }}>Resource not found.</p>
        <Link href="/directory" style={{ color: "#FFC300", fontFamily: "Inter, sans-serif" }}>← Back to Directory</Link>
      </div>
    );
  }

  const postComment = () => {
    if (!text.trim()) return;
    const c: Comment = { id: Date.now().toString(), author: author.trim() || "Anonymous", text: text.trim(), timestamp: Date.now() };
    const updated = [...comments, c];
    setComments(updated);
    localStorage.setItem(`sc_comments_${resource.id}`, JSON.stringify(updated));
    setText("");
  };

  const formatTime = (ts: number) => new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " · " + new Date(ts).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  const typeColor: Record<string, string> = { Event: "#FFC300", Volunteering: "#10B981", Program: "#0EA5E9", Workshop: "#A78BFA" };
  const color = typeColor[resource.type] ?? "#FFC300";

  return (
    <div style={{ minHeight: "100vh", background: "#244747", color: "white", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .rd-page { min-height: 100vh; background: #244747; }
        .rd-hero { position: relative; width: 100%; height: 420px; overflow: hidden; }
        .rd-hero-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rd-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #244747 0%, rgba(36,71,71,0.6) 50%, rgba(36,71,71,0.2) 100%); }
        .rd-back { position: absolute; top: 90px; left: 48px; display: flex; align-items: center; gap: 8px; color: rgba(255,244,210,0.85); font-size: 14px; font-weight: 500; text-decoration: none; background: rgba(36,71,71,0.7); backdrop-filter: blur(8px); border: 1px solid rgba(255,244,210,0.15); padding: 8px 16px; border-radius: 999px; transition: all 0.2s; z-index: 10; }
        .rd-back:hover { background: rgba(36,71,71,0.9); color: #FFF4D2; }
        .rd-hero-badge { position: absolute; bottom: 32px; left: 48px; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 5px 14px; border-radius: 999px; }
        .rd-body { max-width: 1200px; margin: 0 auto; padding: 40px 48px 80px; display: grid; grid-template-columns: 1fr 340px; gap: 40px; align-items: start; }
        .rd-left {}
        .rd-title { font-family: 'Source Serif Pro', serif; font-size: 36px; font-weight: 600; color: #FFF4D2; line-height: 1.2; margin: 0 0 16px; }
        .rd-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .rd-tag { font-size: 12px; padding: 4px 12px; border-radius: 999px; background: rgba(255,195,0,0.1); color: #FFC300; border: 1px solid rgba(255,195,0,0.25); font-weight: 500; }
        .rd-section-title { font-family: 'Source Serif Pro', serif; font-size: 22px; color: #FFF4D2; margin: 0 0 12px; }
        .rd-about { font-size: 15px; line-height: 1.7; color: rgba(255,244,210,0.8); margin-bottom: 40px; }
        .rd-divider { height: 1px; background: rgba(255,244,210,0.1); margin-bottom: 32px; }
        .rd-forum-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .rd-count-pill { font-family: 'Inter', sans-serif; font-size: 12px; background: rgba(255,195,0,0.1); color: #FFC300; border: 1px solid rgba(255,195,0,0.25); padding: 3px 10px; border-radius: 999px; font-weight: 600; }
        .rd-comments { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .rd-comment { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 12px; padding: 16px 18px; }
        .rd-comment-hdr { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .rd-comment-author { font-size: 13px; font-weight: 600; color: #FFC300; }
        .rd-comment-time { font-size: 11px; color: rgba(255,244,210,0.35); }
        .rd-comment-text { font-size: 14px; color: rgba(255,244,210,0.85); line-height: 1.55; }
        .rd-no-comments { text-align: center; padding: 32px; color: rgba(255,244,210,0.35); font-size: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; margin-bottom: 24px; }
        .rd-post-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 20px; }
        .rd-post-title { font-size: 14px; font-weight: 600; color: rgba(255,244,210,0.6); margin-bottom: 12px; }
        .rd-inp { width: 100%; padding: 11px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.07); color: #FFF4D2; font-family: 'Inter', sans-serif; font-size: 13px; outline: none; box-sizing: border-box; margin-bottom: 10px; }
        .rd-inp::placeholder { color: rgba(255,244,210,0.3); }
        .rd-inp:focus { border-color: rgba(255,195,0,0.4); }
        .rd-textarea { width: 100%; padding: 11px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.07); color: #FFF4D2; font-family: 'Inter', sans-serif; font-size: 13px; outline: none; resize: none; box-sizing: border-box; min-height: 80px; margin-bottom: 10px; }
        .rd-textarea::placeholder { color: rgba(255,244,210,0.3); }
        .rd-textarea:focus { border-color: rgba(255,195,0,0.4); }
        .rd-post-btn { background: #FFC300; color: #244747; border: none; border-radius: 8px; padding: 11px 24px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.2s; }
        .rd-post-btn:hover { background: #e6b000; }
        .rd-post-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .rd-sidebar { position: sticky; top: 100px; }
        .rd-info-card { background: rgba(20,39,39,0.9); border: 1px solid rgba(255,244,210,0.12); border-radius: 16px; padding: 24px; margin-bottom: 16px; }
        .rd-info-title { font-family: 'Source Serif Pro', serif; font-size: 16px; color: #FFF4D2; margin-bottom: 18px; }
        .rd-info-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,244,210,0.07); }
        .rd-info-row:last-child { border-bottom: none; padding-bottom: 0; }
        .rd-info-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
        .rd-info-label { font-size: 10px; font-weight: 600; letter-spacing: .07em; color: rgba(255,244,210,0.4); text-transform: uppercase; margin-bottom: 3px; }
        .rd-info-value { font-size: 13px; color: #FFF4D2; font-weight: 500; line-height: 1.4; }
        .rd-action-btn { display: block; width: 100%; padding: 13px; border-radius: 10px; border: none; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; text-align: center; transition: all 0.2s; margin-bottom: 10px; text-decoration: none; }
        .rd-action-primary { background: #FFC300; color: #244747; }
        .rd-action-primary:hover { background: #e6b000; }
        .rd-action-secondary { background: rgba(255,255,255,0.07); color: #FFF4D2; border: 1px solid rgba(255,255,255,0.15); }
        .rd-action-secondary:hover { background: rgba(255,255,255,0.12); }
        .rd-verified { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #10B981; margin-top: 16px; justify-content: center; }
        @media (max-width: 900px) {
          .rd-body { grid-template-columns: 1fr; padding: 24px 24px 60px; }
          .rd-sidebar { position: static; }
          .rd-back { left: 24px; }
          .rd-hero-badge { left: 24px; }
          .rd-title { font-size: 28px; }
        }
      `}</style>

      <div className="rd-page">
        <Header />

        {/* Hero */}
        <div className="rd-hero">
          <img src={resource.image} alt={resource.title} className="rd-hero-img" />
          <div className="rd-hero-overlay" />
          <Link href="/directory" className="rd-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Directory
          </Link>
          <span className="rd-hero-badge" style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>{resource.type}</span>
        </div>

        {/* Body */}
        <div className="rd-body">
          {/* Left column */}
          <div className="rd-left">
            <h1 className="rd-title">{resource.title}</h1>
            <div className="rd-tags">
              {resource.tags.map(t => <span key={t} className="rd-tag">{t}</span>)}
            </div>

            <h2 className="rd-section-title">About This Resource</h2>
            <p className="rd-about">{resource.description}</p>

            <div className="rd-divider" />

            {/* Forum */}
            <div className="rd-forum-header">
              <h2 className="rd-section-title" style={{ margin: 0 }}>Community Forum</h2>
              <span className="rd-count-pill">{comments.length} {comments.length === 1 ? "comment" : "comments"}</span>
            </div>

            <div className="rd-comments">
              {comments.length === 0
                ? <div className="rd-no-comments">No comments yet — be the first to share your experience!</div>
                : comments.map(c => (
                  <div key={c.id} className="rd-comment">
                    <div className="rd-comment-hdr">
                      <span className="rd-comment-author">{c.author}</span>
                      <span className="rd-comment-time">{formatTime(c.timestamp)}</span>
                    </div>
                    <p className="rd-comment-text">{c.text}</p>
                  </div>
                ))
              }
              <div ref={commentsEndRef} />
            </div>

            <div className="rd-post-box">
              <p className="rd-post-title">Leave a comment</p>
              <input className="rd-inp" placeholder="Your name (optional)" value={author} onChange={e => setAuthor(e.target.value)} maxLength={40} />
              <textarea className="rd-textarea" placeholder="Share your experience, ask a question, or leave a tip for others..." value={text} onChange={e => setText(e.target.value)} maxLength={500} onKeyDown={e => { if (e.key === "Enter" && e.metaKey) postComment(); }} />
              <button className="rd-post-btn" onClick={postComment} disabled={!text.trim()}>Post Comment</button>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="rd-sidebar">
            <div className="rd-info-card">
              <p className="rd-info-title">Event Details</p>

              <div className="rd-info-row">
                <div className="rd-info-icon" style={{ background: "rgba(14,165,233,0.15)" }}>📅</div>
                <div>
                  <div className="rd-info-label">Date</div>
                  <div className="rd-info-value">{resource.date}</div>
                </div>
              </div>

              <div className="rd-info-row">
                <div className="rd-info-icon" style={{ background: "rgba(14,165,233,0.15)" }}>🕐</div>
                <div>
                  <div className="rd-info-label">Time</div>
                  <div className="rd-info-value">{resource.time}</div>
                </div>
              </div>

              <div className="rd-info-row">
                <div className="rd-info-icon" style={{ background: "rgba(16,185,129,0.15)" }}>📍</div>
                <div>
                  <div className="rd-info-label">Location</div>
                  <div className="rd-info-value">{resource.location}</div>
                </div>
              </div>

              <div className="rd-info-row">
                <div className="rd-info-icon" style={{ background: "rgba(16,185,129,0.15)" }}>🗺️</div>
                <div>
                  <div className="rd-info-label">Address</div>
                  <div className="rd-info-value">{resource.address}</div>
                </div>
              </div>

              <div className="rd-info-row">
                <div className="rd-info-icon" style={{ background: "rgba(245,158,11,0.15)" }}>💰</div>
                <div>
                  <div className="rd-info-label">Cost</div>
                  <div className="rd-info-value">{resource.cost}</div>
                </div>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rd-action-btn rd-action-primary"
            >
              Get Directions →
            </a>

            <Link href="/directory" className="rd-action-btn rd-action-secondary">
              ← Browse All Resources
            </Link>

            <div className="rd-verified">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              Verified by Sammamish Circle
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
