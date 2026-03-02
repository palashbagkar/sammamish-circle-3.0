"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Header from "../header";
import Footer from "../footer";
import { RESOURCES } from "./data";
import "./directory.css";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TYPE_COLORS: Record<string, string> = {
  Event: "#FFC300",
  Volunteering: "#10B981",
  Program: "#0EA5E9",
  Workshop: "#A78BFA",
};

function CalendarView({ resources }: { resources: typeof RESOURCES }) {
  const [month, setMonth] = useState(2); // March = 2
  const [year, setYear] = useState(2026);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getEventsForDay = (day: number) => {
    const dow = new Date(year, month, day).getDay();
    return resources.filter((r) => {
      if (r.schedule === "wed" && dow === 3) return true;
      if (r.schedule === "sat" && dow === 6) return true;
      if (r.schedule === "mon-wed" && (dow === 1 || dow === 3)) return true;
      if (/^\d{4}-\d{2}-\d{2}$/.test(r.schedule)) {
        const [y, m, d] = r.schedule.split("-").map(Number);
        return y === year && m - 1 === month && d === day;
      }
      return false;
    });
  };

  const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long" });
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .cal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
        .cal-nav { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#FFF4D2; border-radius:8px; padding:6px 14px; cursor:pointer; font-size:14px; transition:background 0.2s; }
        .cal-nav:hover { background:rgba(255,255,255,0.15); }
        .cal-month { font-family:'Source Serif Pro',serif; font-size:20px; font-weight:600; color:#FFF4D2; }
        .cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }
        .cal-day-lbl { text-align:center; font-size:11px; font-weight:600; color:rgba(255,244,210,0.4); padding:6px 0; text-transform:uppercase; letter-spacing:.05em; }
        .cal-cell { min-height:70px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:8px; padding:6px; }
        .cal-cell.empty { background:transparent; border-color:transparent; }
        .cal-cell.has-ev { border-color:rgba(255,195,0,0.2); background:rgba(255,195,0,0.04); }
        .cal-date { font-size:12px; font-weight:600; color:rgba(255,244,210,0.4); margin-bottom:3px; }
        .cal-cell.has-ev .cal-date { color:#FFF4D2; }
        .cal-dot { font-size:10px; padding:1px 5px; border-radius:4px; margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight:500; display:block; }
        .cal-legend { display:flex; flex-wrap:wrap; gap:12px; margin-top:16px; }
        .cal-legend-item { display:flex; align-items:center; gap:5px; font-size:11px; color:rgba(255,244,210,0.55); }
        .cal-legend-dot { width:8px; height:8px; border-radius:2px; flex-shrink:0; }
      `}</style>

      <div className="cal-header">
        <button className="cal-nav" onClick={() => { const d = new Date(year, month - 1); setMonth(d.getMonth()); setYear(d.getFullYear()); }}>←</button>
        <span className="cal-month">{monthName} {year}</span>
        <button className="cal-nav" onClick={() => { const d = new Date(year, month + 1); setMonth(d.getMonth()); setYear(d.getFullYear()); }}>→</button>
      </div>

      <div className="cal-grid">
        {DAYS.map(d => <div key={d} className="cal-day-lbl">{d}</div>)}
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} className="cal-cell empty" />;
          const evs = getEventsForDay(day);
          return (
            <div key={day} className={`cal-cell${evs.length ? " has-ev" : ""}`}>
              <div className="cal-date">{day}</div>
              {evs.slice(0, 2).map(ev => (
                <Link key={ev.id} href={`/directory/${ev.id}`} className="cal-dot" style={{ background: `${TYPE_COLORS[ev.type]}22`, color: TYPE_COLORS[ev.type] }}>{ev.title}</Link>
              ))}
              {evs.length > 2 && <div style={{ fontSize: 10, color: "rgba(255,244,210,0.35)" }}>+{evs.length - 2} more</div>}
            </div>
          );
        })}
      </div>

      <div className="cal-legend">
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} className="cal-legend-item">
            <div className="cal-legend-dot" style={{ background: color }} />{type}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCost, setSelectedCost] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hoveredResource, setHoveredResource] = useState<number | null>(null);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showCostFilter, setShowCostFilter] = useState(false);
  const [showTagsFilter, setShowTagsFilter] = useState(false);
  const [view, setView] = useState<"list" | "calendar">("list");

  const allTags = Array.from(new Set(RESOURCES.flatMap((r) => r.tags))).sort();
  const toggleTag = (tag: string) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const filteredResources = RESOURCES.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || r.type === selectedType;
    const matchesCost = selectedCost === "all" || (selectedCost === "free" && r.cost.toLowerCase().includes("free")) || (selectedCost === "paid" && !r.cost.toLowerCase().includes("free"));
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => r.tags.includes(tag));
    return matchesSearch && matchesType && matchesCost && matchesTags;
  });

  const resetFilters = () => { setSearchQuery(""); setSelectedType("all"); setSelectedCost("all"); setSelectedTags([]); };

  return (
    <div className="directory-page">
      <Header />
      <main className="directory-main">
        <section className="directory-hero">
          <div className="directory-hero-content">
            <h1 className="directory-title">Find Community Resources</h1>
            <p className="directory-subtitle">Discover events, volunteer opportunities, programs, and more in Sammamish</p>
          </div>
        </section>

        <section className="directory-controls">
          <div className="directory-controls-container">
            <div className="search-bar-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input type="text" className="search-bar-input" placeholder="Search resources..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </section>

        <section className="directory-overlay">
          <div className="directory-content">
            <div className="directory-content-container">

              <div className="results-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <p className="results-count">{filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"} found</p>
                <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.07)", padding: 4, borderRadius: 10 }}>
                  {(["list", "calendar"] as const).map(v => (
                    <button key={v} onClick={() => setView(v)} style={{ padding: "7px 18px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, background: view === v ? "#FFC300" : "transparent", color: view === v ? "#244747" : "rgba(255,244,210,0.55)", transition: "all 0.2s" }}>
                      {v === "list" ? "📋 List" : "📅 Calendar"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filters-wrapper">
                <div className="filter-dropdown-wrapper">
                  <button className="filter-button" onClick={() => setShowTypeFilter(!showTypeFilter)}>
                    <span>Type: {selectedType === "all" ? "All" : selectedType}</span>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {showTypeFilter && (
                    <div className="filter-dropdown">
                      <button className={`filter-option ${selectedType === "all" ? "active" : ""}`} onClick={() => { setSelectedType("all"); setShowTypeFilter(false); }}>All Types</button>
                      {["Event", "Volunteering", "Program", "Workshop"].map(type => (
                        <button key={type} className={`filter-option ${selectedType === type ? "active" : ""}`} onClick={() => { setSelectedType(type); setShowTypeFilter(false); }}>{type}</button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="filter-dropdown-wrapper">
                  <button className="filter-button" onClick={() => setShowCostFilter(!showCostFilter)}>
                    <span>Cost: {selectedCost === "all" ? "All" : selectedCost === "free" ? "Free" : "Paid"}</span>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {showCostFilter && (
                    <div className="filter-dropdown">
                      {[["all","All"],["free","Free"],["paid","Paid"]].map(([val, label]) => (
                        <button key={val} className={`filter-option ${selectedCost === val ? "active" : ""}`} onClick={() => { setSelectedCost(val); setShowCostFilter(false); }}>{label}</button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="filter-dropdown-wrapper">
                  <button className="filter-button" onClick={() => setShowTagsFilter(!showTagsFilter)}>
                    <span>Tags{selectedTags.length > 0 ? ` (${selectedTags.length})` : ""}</span>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {showTagsFilter && (
                    <div className="filter-dropdown tags-dropdown">
                      {allTags.map(tag => (
                        <button key={tag} className={`filter-option ${selectedTags.includes(tag) ? "active" : ""}`} onClick={() => toggleTag(tag)}>
                          <span>{tag}</span>
                          {selectedTags.includes(tag) && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button className="reset-filters-button" onClick={resetFilters}>Reset</button>
              </div>

              {view === "calendar" ? (
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
                  <CalendarView resources={filteredResources} />
                </div>
              ) : (
                <div className="directory-layout">
                  <div className="resources-list">
                    {filteredResources.length > 0 ? filteredResources.map(resource => (
                      <Link key={resource.id} href={`/directory/${resource.id}`} style={{ textDecoration: "none" }}>
                        <div className="resource-card-directory" onMouseEnter={() => setHoveredResource(resource.id)} onMouseLeave={() => setHoveredResource(null)}>
                          <div className="resource-card-image-container">
                            <img src={resource.image} alt={resource.title} className="resource-card-image" />
                          </div>
                          <div className="resource-card-content">
                            <div className="resource-card-header">
                              <span className="resource-type-badge">{resource.type}</span>
                            </div>
                            <h3 className="resource-card-title">{resource.title}</h3>
                            <div className="resource-card-details">
                              <div className="resource-detail-item">
                                <svg className="detail-icon" width="16" height="16" viewBox="0 0 13 14" fill="none"><path d="M2.625 0.875V1.75H1.3125C0.587891 1.75 0 2.33789 0 3.0625V4.375H12.25V3.0625C12.25 2.33789 11.6621 1.75 10.9375 1.75H9.625V0.875C9.625 0.391016 9.23398 0 8.75 0C8.26602 0 7.875 0.391016 7.875 0.875V1.75H4.375V0.875C4.375 0.391016 3.98398 0 3.5 0C3.01602 0 2.625 0.391016 2.625 0.875ZM12.25 5.25H0V12.6875C0 13.4121 0.587891 14 1.3125 14H10.9375C11.6621 14 12.25 13.4121 12.25 12.6875V5.25Z" fill="#0EA5E9" /></svg>
                                <span className="detail-text">{resource.date} • {resource.time}</span>
                              </div>
                              <div className="resource-detail-item">
                                <svg className="detail-icon" width="16" height="16" viewBox="0 0 11 14" fill="none"><path d="M5.89805 13.65C7.30078 11.8945 10.5 7.63984 10.5 5.25C10.5 2.35156 8.14844 0 5.25 0C2.35156 0 0 2.35156 0 5.25C0 7.63984 3.19922 11.8945 4.60195 13.65C4.93828 14.0684 5.56172 14.0684 5.89805 13.65ZM5.25 3.5C5.71413 3.5 6.15925 3.68437 6.48744 4.01256C6.81563 4.34075 7 4.78587 7 5.25C7 5.71413 6.81563 6.15925 6.48744 6.48744C6.15925 6.81563 5.71413 7 5.25 7C4.78587 7 4.34075 6.81563 4.01256 6.48744C3.68437 6.15925 3.5 5.71413 3.5 5.25C3.5 4.78587 3.68437 4.34075 4.01256 4.01256C4.34075 3.68437 4.78587 3.5 5.25 3.5Z" fill="#10B981" /></svg>
                                <span className="detail-text">{resource.location}</span>
                              </div>
                              <div className="resource-detail-item">
                                <svg className="detail-icon" width="16" height="16" viewBox="0 0 16 14" fill="none"><path d="M1.75 1.75C0.784766 1.75 0 2.53477 0 3.5V5.25C0 5.49062 0.202344 5.6793 0.429297 5.75859C0.943359 5.93633 1.3125 6.42578 1.3125 7C1.3125 7.57422 0.943359 8.06367 0.429297 8.24141C0.202344 8.3207 0 8.50938 0 8.75V10.5C0 11.4652 0.784766 12.25 1.75 12.25H14C14.9652 12.25 15.75 11.4652 15.75 10.5V8.75C15.75 8.50938 15.5477 8.3207 15.3207 8.24141C14.8066 8.06367 14.4375 7.57422 14.4375 7C14.4375 6.42578 14.8066 5.93633 15.3207 5.75859C15.5477 5.6793 15.75 5.49062 15.75 5.25V3.5C15.75 2.53477 14.9652 1.75 14 1.75H1.75Z" fill="#F59E0B" /></svg>
                                <span className="detail-text cost-text">{resource.cost}</span>
                              </div>
                            </div>
                            <div className="resource-tags">
                              {resource.tags.map(tag => <span key={tag} className="resource-tag-chip">{tag}</span>)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )) : (
                      <div className="no-results-message">
                        <p>No resources found matching your criteria.</p>
                        <button className="reset-filters-button" onClick={resetFilters}>Clear Filters</button>
                      </div>
                    )}
                  </div>
                  <div className="map-container">
                    <MapComponent resources={filteredResources} hoveredResourceId={hoveredResource} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
