"use client";
import { useState, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";

// ── Types ──────────────────────────────────────────────────────────────────
interface Story {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  body: string;
  image: string;
  source?: string;
  verified: boolean;
  isUserSubmitted: boolean;
  featured?: boolean;
}

// ── Curated stories ────────────────────────────────────────────────────────
const CURATED: Story[] = [
  {
    id: "c1",
    title: "City Council Approves $12M Evans Creek Preserve Expansion",
    category: "Government",
    author: "Sammamish Circle Staff",
    date: "March 1, 2026",
    excerpt: "The Sammamish City Council voted 6–1 to approve a comprehensive park expansion at Evans Creek Preserve, adding 40 acres of protected trail space and a new environmental education center slated to open by 2027.",
    body: "The Sammamish City Council voted 6–1 this week to approve a comprehensive park expansion at Evans Creek Preserve, adding 40 acres of protected trail space and a new environmental education center. The $12 million project will be funded through a combination of state grants and local bonds. Construction is expected to begin in late 2026, with the education center slated to open by spring 2027. Councilmember Rodriguez called the vote 'a generational investment in our community's green future.'",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900",
    verified: true,
    isUserSubmitted: false,
    featured: true,
  },
  {
    id: "c2",
    title: "Farmers Market Returns to Sammamish Commons This Spring",
    category: "Community",
    author: "Sammamish Circle Staff",
    date: "February 28, 2026",
    excerpt: "The beloved weekly market kicks off its 14th season on March 18, featuring 45 local vendors, live music, and a new chef demonstration stage.",
    body: "The Sammamish Farmers Market kicks off its 14th season at Sammamish Commons on March 18, running every Wednesday from 3–8 PM through October. This year's lineup includes 45 local vendors — up from 38 last year — spanning fresh produce, artisan foods, handcrafts, and native plant nurseries. New this season: a chef demonstration stage, sponsored by the Sammamish Culinary Collective, where local chefs will prepare dishes using market ingredients every other week.",
    image: "https://images.unsplash.com/photo-1514583079045-e928a4732ade?w=900",
    verified: true,
    isUserSubmitted: false,
  },
  {
    id: "c3",
    title: "New Sammamish Library Digital Hub Opens to Residents",
    category: "Education",
    author: "Sammamish Circle Staff",
    date: "February 25, 2026",
    excerpt: "The renovated library now features a 20-station digital learning center, 3D printing lab, and expanded youth coding programs free to all cardholders.",
    body: "King County Library System unveiled a fully renovated digital hub at the Sammamish Library branch last Tuesday. The space features 20 high-performance workstations, a 3D printing and laser-cutting lab, podcast recording booth, and a dedicated youth coding corner equipped with robotics kits. All services are free to library cardholders. Branch manager Alicia Yuen said demand for digital skills training has 'tripled in the past three years,' prompting the $800,000 renovation funded through a KCLS capital levy.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900",
    verified: true,
    isUserSubmitted: false,
  },
  {
    id: "c4",
    title: "Traffic Relief: 228th Ave Corridor Improvement Plan Released",
    category: "Infrastructure",
    author: "Sammamish Circle Staff",
    date: "February 22, 2026",
    excerpt: "The city's long-awaited traffic study proposes roundabouts, synchronized signals, and a protected bike lane to ease the 228th Ave bottleneck by 2028.",
    body: "After two years of study, the City of Sammamish released its 228th Avenue SE Corridor Improvement Plan. Key proposals include two new roundabouts at SE 4th and SE 8th Streets, a coordinated signal timing system spanning 12 intersections, and a protected two-way bike lane running the full 1.4-mile corridor. The plan, if approved, is projected to reduce peak-hour delays by 22%. A public comment period runs through March 31. The City Council will vote on funding in April.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900",
    verified: true,
    isUserSubmitted: false,
  },
  {
    id: "c5",
    title: "Soaring Eagle Regional Park Adds 3 New Trail Loops",
    category: "Environment",
    author: "Sammamish Circle Staff",
    date: "February 18, 2026",
    excerpt: "King County Parks completed a long-planned expansion connecting Soaring Eagle to the Klahanie trail network, totaling 17 miles of natural surface trails.",
    body: "King County Parks officially opened three new trail loops at Soaring Eagle Regional Park this month, adding 4.2 miles of natural-surface hiking to an already beloved destination. The new trails — Ridgeline, Fern Hollow, and Creekside — connect to the existing Klahanie trail network, creating a continuous 17-mile route. The project was a collaboration between King County, the Mountains to Sound Greenway Trust, and hundreds of volunteer trail builders who contributed over 3,000 hours.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",
    verified: true,
    isUserSubmitted: false,
  },
  {
    id: "c6",
    title: "Sammamish High School Students Win Regional Robotics Championship",
    category: "Education",
    author: "Sammamish Circle Staff",
    date: "February 14, 2026",
    excerpt: "The Eastlake High School Robotics Team placed first at the FIRST Robotics Regional, earning a spot at the national championship in Houston this April.",
    body: "The Eastlake High School Robotics Team (Team 2907) claimed first place at the Washington State FIRST Robotics Regional Competition, earning a coveted berth at the national championship in Houston, Texas this April. The team's robot, nicknamed 'Thunderbird,' wowed judges with its autonomous accuracy and alliance strategy. Coach Priya Sharma credited 'thousands of hours of after-school work and the support of our incredible parent volunteers and corporate sponsors.'",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900",
    verified: true,
    isUserSubmitted: false,
  },
];

const CATEGORIES = ["All", "Government", "Community", "Education", "Environment", "Infrastructure", "Arts", "Sports", "Business"];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Government:     { bg: "rgba(99,102,241,0.15)",  text: "#a5b4fc" },
  Community:      { bg: "rgba(16,185,129,0.15)",   text: "#6ee7b7" },
  Education:      { bg: "rgba(59,130,246,0.15)",   text: "#93c5fd" },
  Environment:    { bg: "rgba(34,197,94,0.15)",    text: "#86efac" },
  Infrastructure: { bg: "rgba(249,115,22,0.15)",   text: "#fdba74" },
  Arts:           { bg: "rgba(236,72,153,0.15)",   text: "#f9a8d4" },
  Sports:         { bg: "rgba(234,179,8,0.15)",    text: "#fde047" },
  Business:       { bg: "rgba(20,184,166,0.15)",   text: "#99f6e4" },
};

function CategoryBadge({ category }: { category: string }) {
  const c = CATEGORY_COLORS[category] ?? { bg: "rgba(255,255,255,0.1)", text: "rgba(255,255,255,0.7)" };
  return (
    <span style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, letterSpacing: "0.05em", textTransform: "uppercase", display: "inline-block" }}>
      {category}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(16,185,129,0.15)", color: "#6ee7b7", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, letterSpacing: "0.04em" }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M1.5 5L3.5 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </span>
  );
}

function PendingBadge() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(236,194,45,0.12)", color: "#ECC22D", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, letterSpacing: "0.04em" }}>
      ◷ Pending Review
    </span>
  );
}

// ── Submit form modal ──────────────────────────────────────────────────────
function SubmitStoryModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (s: Story) => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: "", category: "Community", excerpt: "", body: "", author: "", source: "", image: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const up = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.excerpt.trim()) e.excerpt = "Summary is required";
    if (!form.body.trim()) e.body = "Story content is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.author.trim()) e.author = "Author name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleSubmit = () => {
    if (!validateStep2()) return;
    const story: Story = {
      id: `u${Date.now()}`,
      title: form.title,
      category: form.category,
      author: form.author,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      excerpt: form.excerpt,
      body: form.body,
      image: form.image || "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=900",
      source: form.source,
      verified: false,
      isUserSubmitted: true,
    };
    onSubmit(story);
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 8, border: "none",
    background: "rgba(255,255,255,0.95)", color: "#333",
    fontFamily: "'Inter',sans-serif", fontSize: 14, outline: "none",
    boxSizing: "border-box", transition: "all 0.2s",
  };
  const labelStyle: React.CSSProperties = { display: "block", color: "white", fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 500, marginBottom: 8 };
  const errStyle: React.CSSProperties = { color: "#fca5a5", fontSize: 12, marginTop: 4 };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", padding: 24 }}>
      <div style={{ background: "#2d4a46", width: "100%", maxWidth: 600, borderRadius: 16, padding: "40px", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", maxHeight: "90vh", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2 style={{ fontFamily: "'Source Serif Pro',serif", fontSize: 28, fontWeight: 600, color: "white", margin: "0 0 4px" }}>
              Submit a Story
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Step {step} of 2</span>
              <div style={{ display: "flex", gap: 4 }}>
                {[1,2].map((s) => (
                  <div key={s} style={{ width: 24, height: 4, borderRadius: 999, background: s <= step ? "#ECC22D" : "rgba(255,255,255,0.2)", transition: "background 0.3s" }} />
                ))}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "rgba(96,141,141,0.35)", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 style={{ color: "white", fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 600, margin: 0 }}>Story Details</h3>

              <div>
                <label style={labelStyle}>Headline <span style={{ color: "#ECC22D" }}>*</span></label>
                <input style={{ ...inputStyle, ...(errors.title ? { boxShadow: "0 0 0 2px rgba(252,165,165,0.5)" } : {}) }} placeholder="Enter your story headline" value={form.title} onChange={(e) => up("title", e.target.value)} />
                {errors.title && <p style={errStyle}>{errors.title}</p>}
              </div>

              <div>
                <label style={labelStyle}>Category <span style={{ color: "#ECC22D" }}>*</span></label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category} onChange={(e) => up("category", e.target.value)}>
                  {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Summary <span style={{ color: "#ECC22D" }}>*</span></label>
                <textarea
                  style={{ ...inputStyle, resize: "vertical", minHeight: 80, lineHeight: 1.5 }}
                  placeholder="A 1–2 sentence summary that appears in the news feed…"
                  value={form.excerpt}
                  onChange={(e) => up("excerpt", e.target.value)}
                />
                {errors.excerpt && <p style={errStyle}>{errors.excerpt}</p>}
              </div>
            </div>

            <div style={{ background: "rgba(96,141,141,0.35)", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 style={{ color: "white", fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 600, margin: 0 }}>Full Story</h3>
              <div>
                <label style={labelStyle}>Story Content <span style={{ color: "#ECC22D" }}>*</span></label>
                <textarea
                  style={{ ...inputStyle, resize: "vertical", minHeight: 180, lineHeight: 1.6 }}
                  placeholder="Write your full story here. Include as much detail as possible — context, quotes, and community impact…"
                  value={form.body}
                  onChange={(e) => up("body", e.target.value)}
                />
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4, textAlign: "right" }}>{form.body.length} characters</p>
                {errors.body && <p style={errStyle}>{errors.body}</p>}
              </div>

              <div>
                <label style={labelStyle}>Cover Image URL <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>(optional)</span></label>
                <input style={inputStyle} placeholder="https://example.com/image.jpg" value={form.image} onChange={(e) => up("image", e.target.value)} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={handleNext}
                style={{ background: "#ECC22D", color: "#244747", border: "none", borderRadius: 9999, padding: "13px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: 8 }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "rgba(96,141,141,0.35)", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 style={{ color: "white", fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 600, margin: 0 }}>Your Information</h3>

              <div>
                <label style={labelStyle}>Author Name <span style={{ color: "#ECC22D" }}>*</span></label>
                <input style={{ ...inputStyle, ...(errors.author ? { boxShadow: "0 0 0 2px rgba(252,165,165,0.5)" } : {}) }} placeholder="Your full name or pen name" value={form.author} onChange={(e) => up("author", e.target.value)} />
                {errors.author && <p style={errStyle}>{errors.author}</p>}
              </div>

              <div>
                <label style={labelStyle}>Source or Reference URL <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>(optional)</span></label>
                <input style={inputStyle} placeholder="https://sammamish.us/..." value={form.source} onChange={(e) => up("source", e.target.value)} />
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>
                  Linking to an official source helps our team verify your story faster.
                </p>
              </div>
            </div>

            {/* Preview card */}
            <div style={{ background: "rgba(96,141,141,0.35)", borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: "white", fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, margin: "0 0 12px", color: "rgba(255,255,255,0.6)" }}>Preview</h3>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                {(form.image || true) && (
                  <div style={{ width: 80, height: 60, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,0.1)" }}>
                    <img src={form.image || "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=200"} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                <div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                    <CategoryBadge category={form.category} />
                    <PendingBadge />
                  </div>
                  <p style={{ fontFamily: "'Source Serif Pro',serif", fontSize: 15, fontWeight: 600, color: "white", margin: "0 0 4px", lineHeight: 1.3 }}>{form.title || "Your headline will appear here"}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0 }}>By {form.author || "Author"} · Just now</p>
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(236,194,45,0.08)", border: "1px solid rgba(236,194,45,0.2)", borderRadius: 10, padding: "14px 18px" }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,244,210,0.7)", margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: "#ECC22D" }}>About verification:</strong> Our team reviews community stories within 48 hours. Verified stories appear with a green badge and are promoted in the feed. Stories with official source links are prioritized.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={() => setStep(1)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: 9999, padding: "13px 24px", fontSize: 14, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
                ← Back
              </button>
              <button onClick={handleSubmit} style={{ background: "#ECC22D", color: "#244747", border: "none", borderRadius: 9999, padding: "13px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                Submit Story
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Story reader modal ─────────────────────────────────────────────────────
function StoryReader({ story, onClose }: { story: Story; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 999, display: "flex", alignItems: "flex-start", justifyContent: "center", backdropFilter: "blur(4px)", padding: "60px 24px 40px", overflowY: "auto" }}>
      <div style={{ background: "#2d4a46", width: "100%", maxWidth: 720, borderRadius: 16, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
        {story.image && (
          <div style={{ width: "100%", height: 320, overflow: "hidden" }}>
            <img src={story.image} alt={story.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <div style={{ padding: "36px 40px 48px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
            <CategoryBadge category={story.category} />
            {story.verified ? <VerifiedBadge /> : story.isUserSubmitted ? <PendingBadge /> : null}
          </div>
          <h1 style={{ fontFamily: "'Source Serif Pro',serif", fontSize: 32, fontWeight: 600, color: "white", margin: "0 0 16px", lineHeight: 1.25 }}>{story.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>By <strong style={{ color: "rgba(255,255,255,0.8)" }}>{story.author}</strong></span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{story.date}</span>
            {story.source && <>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <a href={story.source} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#ECC22D", textDecoration: "none" }}>Source ↗</a>
            </>}
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.75, margin: 0, whiteSpace: "pre-wrap" }}>{story.body}</p>
        </div>
        <div style={{ padding: "0 40px 36px", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "#ECC22D", color: "#244747", border: "none", borderRadius: 9999, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── News card ──────────────────────────────────────────────────────────────
function NewsCard({ story, onClick, featured }: { story: Story; onClick: () => void; featured?: boolean }) {
  if (featured) {
    return (
      <div
        onClick={onClick}
        style={{ background: "rgba(96,141,141,0.4)", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", display: "grid", gridTemplateColumns: "1fr 1fr" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.25)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        <div style={{ position: "relative" }}>
          <img src={story.image} alt={story.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(36,71,71,0.6))" }} />
        </div>
        <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(236,194,45,0.15)", color: "#ECC22D", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 999, width: "fit-content", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            ★ Featured
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <CategoryBadge category={story.category} />
            {story.verified && <VerifiedBadge />}
          </div>
          <h2 style={{ fontFamily: "'Source Serif Pro',serif", fontSize: 26, fontWeight: 600, color: "white", margin: 0, lineHeight: 1.3 }}>{story.title}</h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6 }}>{story.excerpt}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{story.author}</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{story.date}</span>
          </div>
          <button style={{ background: "#ECC22D", color: "#244747", border: "none", borderRadius: 9999, padding: "11px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif", width: "fit-content", marginTop: 8 }}>
            Read Story →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      style={{ background: "rgba(96,141,141,0.4)", borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 28px rgba(0,0,0,0.2)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
    >
      <div style={{ height: 160, overflow: "hidden", flexShrink: 0 }}>
        <img src={story.image} alt={story.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <CategoryBadge category={story.category} />
          {story.verified && <VerifiedBadge />}
          {story.isUserSubmitted && !story.verified && <PendingBadge />}
        </div>
        <h3 style={{ fontFamily: "'Source Serif Pro',serif", fontSize: 18, fontWeight: 600, color: "white", margin: 0, lineHeight: 1.35, flex: 1 }}>{story.title}</h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{story.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{story.author}</span>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{story.date}</span>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function NewsPage() {
  const [stories, setStories] = useState<Story[]>(CURATED);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSubmit, setShowSubmit] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sc_user_stories");
      if (stored) {
        const userStories: Story[] = JSON.parse(stored);
        setStories([...CURATED, ...userStories]);
      }
    } catch {}
  }, []);

  const handleSubmitStory = (story: Story) => {
    const updatedStories = [...stories, story];
    setStories(updatedStories);
    const userStories = updatedStories.filter((s) => s.isUserSubmitted);
    localStorage.setItem("sc_user_stories", JSON.stringify(userStories));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const filtered = stories.filter((s) => selectedCategory === "All" || s.category === selectedCategory);
  const featured = filtered.find((s) => s.featured);
  const rest = filtered.filter((s) => !s.featured);

  return (
    <div style={{ minHeight: "100vh", background: "#244747", color: "white", fontFamily: "'Inter',sans-serif", display: "flex", flexDirection: "column" }}>

      <Header />

      {/* ── Hero ── */}
      <div style={{ width: "100%", background: "linear-gradient(to bottom, #000000aa 0px, transparent 600px)", paddingTop: 130, paddingBottom: 48, paddingLeft: 80, paddingRight: 80, boxSizing: "border-box" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 10px" }}>Sammamish Circle</p>
              <h1 style={{ fontFamily: "'Source Serif Pro',serif", fontSize: 56, fontWeight: 600, color: "white", margin: "0 0 12px", lineHeight: 1.1 }}>
                Community <span style={{ color: "#ECC22D" }}>News</span>
              </h1>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: "rgba(255,255,255,0.65)", margin: 0, maxWidth: 480, lineHeight: 1.5 }}>
                Local news, community stories, and verified updates from around Sammamish. Anyone can contribute.
              </p>
            </div>
            <button
              onClick={() => setShowSubmit(true)}
              style={{ background: "#ECC22D", color: "#244747", border: "none", borderRadius: 9999, padding: "15px 30px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: "0 4px 12px rgba(0,0,0,0.2), 0 12px 20px rgba(0,0,0,0.15)", flexShrink: 0, transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#d4a928")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#ECC22D")}
            >
              + Write a Story
            </button>
          </div>
        </div>
      </div>

      {/* ── Category filters ── */}
      <div style={{ paddingLeft: 80, paddingRight: 80, paddingBottom: 32, boxSizing: "border-box" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "8px 18px", borderRadius: 9999,
                  border: selectedCategory === cat ? "none" : "1px solid rgba(255,255,255,0.2)",
                  background: selectedCategory === cat ? "#ECC22D" : "transparent",
                  color: selectedCategory === cat ? "#244747" : "rgba(255,255,255,0.65)",
                  fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: selectedCategory === cat ? 700 : 500,
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, paddingLeft: 80, paddingRight: 80, paddingBottom: 100, boxSizing: "border-box" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "rgba(255,255,255,0.4)", fontSize: 15 }}>
              No stories in this category yet.{" "}
              <button onClick={() => setShowSubmit(true)} style={{ background: "none", border: "none", color: "#ECC22D", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 600, padding: 0 }}>
                Be the first to write one!
              </button>
            </div>
          )}

          {/* Featured */}
          {featured && (
            <div style={{ marginBottom: 32 }}>
              <NewsCard story={featured} onClick={() => setSelectedStory(featured)} featured />
            </div>
          )}

          {/* Community submissions banner */}
          {stories.filter((s) => s.isUserSubmitted).length > 0 && (selectedCategory === "All" || rest.some((s) => s.isUserSubmitted)) && (
            <div style={{ background: "rgba(236,194,45,0.07)", border: "1px solid rgba(236,194,45,0.2)", borderRadius: 12, padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>📝</span>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "rgba(255,244,210,0.7)", margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: "#ECC22D" }}>Community stories</strong> are submitted by residents. Stories with a green <span style={{ color: "#6ee7b7", fontWeight: 600 }}>Verified</span> badge have been reviewed by our team.
              </p>
            </div>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {rest.map((story) => (
                <NewsCard key={story.id} story={story} onClick={() => setSelectedStory(story)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      {showSubmit && <SubmitStoryModal onClose={() => setShowSubmit(false)} onSubmit={handleSubmitStory} />}
      {selectedStory && <StoryReader story={selectedStory} onClose={() => setSelectedStory(null)} />}

      {/* ── Toast ── */}
      {showToast && (
        <div style={{
          position: "fixed", bottom: 32, right: 32, zIndex: 9999,
          background: "#2d4a46", border: "1px solid rgba(16,185,129,0.4)", borderRadius: 12,
          padding: "16px 24px", boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          display: "flex", alignItems: "center", gap: 12, animation: "slideUp 0.3s ease",
        }}>
          <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
          <div style={{ width: 32, height: 32, background: "rgba(16,185,129,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8L6 12L14 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, color: "white", margin: "0 0 2px" }}>Story submitted!</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>We&apos;ll review it within 48 hours.</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
