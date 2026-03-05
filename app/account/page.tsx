"use client";
import React, { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import { RESOURCES } from "../directory/data";

interface HourEntry {
  id: string;
  activity: string;
  date: string;
  hours: number;
  notes: string;
}

interface ProfileData {
  name: string;
  bio: string;
  location: string;
  email: string;
}

interface Collection {
  id: string;
  name: string;
  resourceIds: number[];
}

const TABS = [
  { label: "Saved Resources", icon: "★" },
  { label: "Volunteer Hours", icon: "◷" },
  { label: "Past Events", icon: "✓" },
];

function loadJSON<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function saveJSON(key: string, val: unknown) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState(0);

  const [profile, setProfile] = useState<ProfileData>({ name: "", bio: "", location: "", email: "" });
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState<ProfileData>({ name: "", bio: "", location: "", email: "" });

  const [hourEntries, setHourEntries] = useState<HourEntry[]>([]);
  const [showHourForm, setShowHourForm] = useState(false);
  const [hourForm, setHourForm] = useState({ activity: "", date: "", hours: "", notes: "" });

  const [attendedIds, setAttendedIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  // Saved Resources tab sub-state
  const [activeColId, setActiveColId] = useState<string | null>(null); // null = "All Saved"
  const [newColName, setNewColName] = useState("");

  useEffect(() => {
    try {
      const p = localStorage.getItem("sc_profile");
      if (p) { const parsed = JSON.parse(p); setProfile(parsed); setProfileDraft(parsed); }
      setHourEntries(loadJSON<HourEntry[]>("sc_volunteer_hours", []));
      setAttendedIds(loadJSON<number[]>("sc_attended_events", []));
      setSavedIds(loadJSON<number[]>("sc_saved_resources", []));
      setCollections(loadJSON<Collection[]>("sc_collections", []));
    } catch {}
  }, []);

  const saveProfile = () => {
    setProfile(profileDraft);
    saveJSON("sc_profile", profileDraft);
    setEditingProfile(false);
  };

  const totalHours = hourEntries.reduce((s, e) => s + e.hours, 0);

  const addHourEntry = () => {
    if (!hourForm.activity || !hourForm.date || !hourForm.hours) return;
    const entry: HourEntry = { id: Date.now().toString(), activity: hourForm.activity, date: hourForm.date, hours: Number(hourForm.hours), notes: hourForm.notes };
    const updated = [entry, ...hourEntries];
    setHourEntries(updated);
    saveJSON("sc_volunteer_hours", updated);
    setHourForm({ activity: "", date: "", hours: "", notes: "" });
    setShowHourForm(false);
  };

  const deleteHourEntry = (id: string) => {
    const updated = hourEntries.filter((e) => e.id !== id);
    setHourEntries(updated);
    saveJSON("sc_volunteer_hours", updated);
  };

  const toggleAttended = (id: number) => {
    const updated = attendedIds.includes(id) ? attendedIds.filter((i) => i !== id) : [...attendedIds, id];
    setAttendedIds(updated);
    saveJSON("sc_attended_events", updated);
  };

  const unsaveResource = (id: number) => {
    const next = savedIds.filter((x) => x !== id);
    setSavedIds(next);
    saveJSON("sc_saved_resources", next);
    // Remove from all collections
    const updatedCols = collections.map((c) => ({ ...c, resourceIds: c.resourceIds.filter((r) => r !== id) }));
    setCollections(updatedCols);
    saveJSON("sc_collections", updatedCols);
    // Reset active col if it becomes empty
    if (activeColId) {
      const col = updatedCols.find((c) => c.id === activeColId);
      if (col && col.resourceIds.length === 0) setActiveColId(null);
    }
  };

  const createCollection = () => {
    if (!newColName.trim()) return;
    const col: Collection = { id: Date.now().toString(), name: newColName.trim(), resourceIds: [] };
    const updated = [...collections, col];
    setCollections(updated);
    saveJSON("sc_collections", updated);
    setNewColName("");
  };

  const deleteCollection = (colId: string) => {
    const updated = collections.filter((c) => c.id !== colId);
    setCollections(updated);
    saveJSON("sc_collections", updated);
    if (activeColId === colId) setActiveColId(null);
  };

  const toggleResourceInCollection = (colId: string, resourceId: number) => {
    const updated = collections.map((c) =>
      c.id === colId
        ? { ...c, resourceIds: c.resourceIds.includes(resourceId) ? c.resourceIds.filter((r) => r !== resourceId) : [...c.resourceIds, resourceId] }
        : c
    );
    setCollections(updated);
    saveJSON("sc_collections", updated);
  };

  const initials = profile.name
    ? profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const savedResources = RESOURCES.filter((r) => savedIds.includes(r.id));
  const attendedResources = RESOURCES.filter((r) => attendedIds.includes(r.id));

  // Resources shown in Saved tab (filtered by active collection or all)
  const activeCol = collections.find((c) => c.id === activeColId);
  const displayedSaved = activeColId && activeCol
    ? savedResources.filter((r) => activeCol.resourceIds.includes(r.id))
    : savedResources;

  return (
    <div className="acc-page">
      <style>{`
        .acc-page {
          min-height: 100vh;
          background: #244747;
          color: white;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* Profile */
        .acc-profile-hero {
          padding: 110px 80px 0;
          max-width: 960px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }
        .acc-profile-card {
          background: rgba(96, 141, 141, 0.4);
          border-radius: 12px;
          padding: 32px;
          display: flex;
          align-items: flex-start;
          gap: 28px;
        }
        .acc-avatar {
          width: 80px; height: 80px; border-radius: 50%;
          background: #ECC22D; display: flex; align-items: center; justify-content: center;
          font-size: 28px; font-weight: 700; color: #244747; flex-shrink: 0; letter-spacing: -1px;
        }
        .acc-profile-body { flex: 1; min-width: 0; }
        .acc-profile-name {
          font-family: 'Source Serif Pro', serif; font-size: 28px; font-weight: 600;
          color: #fff; margin: 0 0 4px; line-height: 1.2;
        }
        .acc-profile-name-placeholder {
          font-family: 'Source Serif Pro', serif; font-size: 28px; font-weight: 600;
          color: rgba(255,255,255,0.3); margin: 0 0 4px; font-style: italic;
        }
        .acc-profile-meta { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 10px; }
        .acc-profile-meta-item { font-size: 13px; color: rgba(255,255,255,0.6); }
        .acc-profile-bio { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0; max-width: 520px; }
        .acc-profile-bio-placeholder { font-size: 14px; color: rgba(255,255,255,0.35); font-style: italic; }
        .acc-profile-stats { display: flex; gap: 28px; margin-top: 20px; flex-wrap: wrap; }
        .acc-stat { display: flex; flex-direction: column; gap: 2px; }
        .acc-stat-val { font-size: 22px; font-weight: 700; color: #ECC22D; line-height: 1; }
        .acc-stat-lbl { font-size: 11px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.06em; }
        .acc-profile-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex-shrink: 0; }
        .acc-edit-btn {
          background: #ECC22D; border: none; color: #244747; padding: 12px 28px;
          border-radius: 9999px; cursor: pointer; font-size: 14px; font-weight: 600;
          font-family: 'Inter', sans-serif; transition: background 0.2s; white-space: nowrap;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.1);
        }
        .acc-edit-btn:hover { background: #d4a928; }
        .acc-profile-edit-form { display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .acc-edit-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* Inputs */
        .acc-inp {
          width: 100%; padding: 12px 16px; border-radius: 8px; border: none;
          background: rgba(255,255,255,0.95); color: #333; font-family: 'Inter',sans-serif;
          font-size: 14px; outline: none; box-sizing: border-box; transition: all 0.2s;
        }
        .acc-inp::placeholder { color: #999; }
        .acc-inp:focus { background: #fff; box-shadow: 0 0 0 3px rgba(236,194,45,0.3); }
        textarea.acc-inp { resize: vertical; min-height: 80px; line-height: 1.5; }

        .acc-edit-btns { display: flex; gap: 10px; }
        .acc-save-btn {
          background: #ECC22D; color: #244747; border: none; border-radius: 9999px;
          padding: 12px 28px; font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: 'Inter',sans-serif; transition: background 0.2s;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .acc-save-btn:hover { background: #d4a928; }
        .acc-cancel-btn {
          background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white;
          border-radius: 9999px; padding: 12px 20px; font-size: 14px; cursor: pointer;
          font-family: 'Inter',sans-serif; transition: background 0.2s;
        }
        .acc-cancel-btn:hover { background: rgba(255,255,255,0.05); }

        /* Main */
        .acc-main {
          flex: 1; padding: 36px 80px 80px; max-width: 960px; margin: 0 auto;
          width: 100%; box-sizing: border-box;
        }

        /* Tabs */
        .acc-tabs {
          display: flex; gap: 4px; margin-bottom: 28px;
          background: rgba(96,141,141,0.3); padding: 5px; border-radius: 12px; width: fit-content;
        }
        .acc-tab {
          display: flex; align-items: center; gap: 6px; padding: 9px 20px;
          border-radius: 8px; border: none; cursor: pointer; font-family: 'Inter',sans-serif;
          font-size: 13px; font-weight: 500; transition: all 0.2s;
          background: transparent; color: rgba(255,255,255,0.55);
        }
        .acc-tab.active { background: #ECC22D; color: #244747; font-weight: 700; }
        .acc-tab:not(.active):hover { background: rgba(255,255,255,0.08); color: white; }

        /* Cards */
        .acc-card { background: rgba(96,141,141,0.4); border-radius: 12px; padding: 32px; }
        .acc-card-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 16px; margin-bottom: 24px; flex-wrap: wrap;
        }
        .acc-card-title { font-family: 'Source Serif Pro',serif; font-size: 28px; color: white; margin: 0 0 4px; font-weight: 600; }
        .acc-card-sub { font-size: 14px; color: rgba(255,255,255,0.7); margin: 0; }
        .acc-primary-btn {
          background: #ECC22D; color: #244747; border: none; border-radius: 9999px;
          padding: 12px 28px; font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: 'Inter',sans-serif; transition: background 0.2s;
          white-space: nowrap; flex-shrink: 0;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.1);
        }
        .acc-primary-btn:hover { background: #d4a928; }

        /* Collections row */
        .acc-col-pills {
          display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; align-items: center;
        }
        .acc-col-pill {
          padding: 7px 16px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.2);
          background: transparent; color: rgba(255,255,255,0.65); font-family: 'Inter',sans-serif;
          font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 6px;
        }
        .acc-col-pill:hover { background: rgba(255,255,255,0.08); color: white; }
        .acc-col-pill.active { background: #ECC22D; border-color: #ECC22D; color: #244747; font-weight: 700; }
        .acc-col-pill-del {
          background: transparent; border: none; color: inherit; cursor: pointer;
          padding: 0; font-size: 14px; line-height: 1; opacity: 0.6;
          display: flex; align-items: center;
        }
        .acc-col-pill-del:hover { opacity: 1; }
        .acc-col-create { display: flex; gap: 8px; margin-bottom: 24px; }

        /* Resource grid */
        .acc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
        .acc-rc {
          background: rgba(255,255,255,0.08); border-radius: 12px; padding: 18px;
          transition: background 0.2s; display: flex; flex-direction: column;
        }
        .acc-rc:hover { background: rgba(255,255,255,0.12); }
        .acc-rc.is-saved { background: rgba(236,194,45,0.1); }
        .acc-rc.is-attended { background: rgba(16,185,129,0.1); }
        .acc-rc-type { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: rgba(255,255,255,0.45); text-transform: uppercase; margin-bottom: 6px; }
        .acc-rc-title { font-size: 15px; font-weight: 600; color: white; margin-bottom: 6px; line-height: 1.3; }
        .acc-rc-meta { font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 2px; line-height: 1.4; }
        .acc-rc-tags { display: flex; gap: 5px; flex-wrap: wrap; margin: 10px 0 14px; flex: 1; align-content: flex-start; }
        .acc-rc-tag { font-size: 10px; padding: 3px 8px; border-radius: 999px; background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.8); }
        .acc-rc-cols { font-size: 11px; color: #ECC22D; margin-bottom: 8px; font-weight: 600; }

        .acc-toggle-btn {
          width: 100%; padding: 9px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);
          background: transparent; color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 600;
          cursor: pointer; font-family: 'Inter',sans-serif; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 5px;
        }
        .acc-toggle-btn:hover:not(.is-on-saved):not(.is-on-attended) { background: rgba(255,255,255,0.1); color: white; }
        .acc-toggle-btn.is-on-saved { background: rgba(236,194,45,0.2); border-color: rgba(236,194,45,0.5); color: #ECC22D; }
        .acc-toggle-btn.is-on-attended { background: rgba(16,185,129,0.15); border-color: rgba(16,185,129,0.4); color: #10B981; }

        /* Hours */
        .acc-hours-hero {
          text-align: center; padding: 28px; background: rgba(236,194,45,0.1);
          border-radius: 12px; margin-bottom: 20px;
        }
        .acc-hours-num { font-size: 64px; font-weight: 700; color: #ECC22D; line-height: 1; }
        .acc-hours-lbl { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 6px; }
        .acc-log-form {
          background: rgba(96,141,141,0.4); border-radius: 12px; padding: 24px;
          margin: 16px 0; display: flex; flex-direction: column; gap: 12px;
        }
        .acc-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .acc-entry-list { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
        .acc-entry {
          display: flex; align-items: center; gap: 14px; background: rgba(255,255,255,0.08);
          border-radius: 10px; padding: 13px 16px; transition: background 0.2s;
        }
        .acc-entry:hover { background: rgba(255,255,255,0.11); }
        .acc-entry-date { font-size: 11px; color: rgba(255,255,255,0.45); min-width: 76px; flex-shrink: 0; }
        .acc-entry-name { flex: 1; font-size: 14px; color: white; font-weight: 500; }
        .acc-entry-note { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 2px; }
        .acc-hrs-badge { background: rgba(236,194,45,0.18); color: #ECC22D; border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 700; white-space: nowrap; }
        .acc-del { background: transparent; border: none; color: rgba(255,255,255,0.25); cursor: pointer; font-size: 18px; padding: 0 4px; line-height: 1; transition: color 0.2s; flex-shrink: 0; }
        .acc-del:hover { color: #ff6b6b; }

        .acc-divider-label { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin: 28px 0 12px; }

        .acc-empty { text-align: center; padding: 48px 20px; color: rgba(255,255,255,0.45); font-size: 14px; line-height: 1.7; }
        .acc-empty a { color: #ECC22D; }

        @media (max-width: 900px) {
          .acc-profile-hero, .acc-main { padding-left: 24px; padding-right: 24px; }
          .acc-profile-hero { padding-top: 90px; }
          .acc-profile-card { flex-direction: column; }
          .acc-profile-actions { flex-direction: row; align-self: flex-start; }
          .acc-form-row, .acc-edit-row { grid-template-columns: 1fr; }
          .acc-tabs { width: 100%; flex-wrap: wrap; }
          .acc-tab { flex: 1; min-width: 100px; justify-content: center; font-size: 12px; padding: 8px 10px; }
        }
      `}</style>

      <Header />

      {/* Profile */}
      <div className="acc-profile-hero">
        <div className="acc-profile-card">
          <div className="acc-avatar">{initials}</div>

          {editingProfile ? (
            <div className="acc-profile-edit-form">
              <div className="acc-edit-row">
                <input className="acc-inp" placeholder="Full name" value={profileDraft.name} onChange={(e) => setProfileDraft((p) => ({ ...p, name: e.target.value }))} />
                <input className="acc-inp" placeholder="Email address" value={profileDraft.email} onChange={(e) => setProfileDraft((p) => ({ ...p, email: e.target.value }))} />
              </div>
              <input className="acc-inp" placeholder="Location (e.g. Sammamish, WA)" value={profileDraft.location} onChange={(e) => setProfileDraft((p) => ({ ...p, location: e.target.value }))} />
              <textarea className="acc-inp" placeholder="Short bio — tell the community about yourself…" value={profileDraft.bio} onChange={(e) => setProfileDraft((p) => ({ ...p, bio: e.target.value }))} />
              <div className="acc-edit-btns">
                <button className="acc-save-btn" onClick={saveProfile}>Save Profile</button>
                <button className="acc-cancel-btn" onClick={() => { setProfileDraft(profile); setEditingProfile(false); }}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="acc-profile-body">
              {profile.name ? <h1 className="acc-profile-name">{profile.name}</h1> : <p className="acc-profile-name-placeholder">Your name</p>}
              <div className="acc-profile-meta">
                {profile.email && <span className="acc-profile-meta-item">✉ {profile.email}</span>}
                {profile.location && <span className="acc-profile-meta-item">📍 {profile.location}</span>}
              </div>
              {profile.bio ? <p className="acc-profile-bio">{profile.bio}</p> : <p className="acc-profile-bio-placeholder">Add a short bio to introduce yourself to the community.</p>}
              <div className="acc-profile-stats">
                <div className="acc-stat"><span className="acc-stat-val">{totalHours}</span><span className="acc-stat-lbl">Hours Volunteered</span></div>
                <div className="acc-stat"><span className="acc-stat-val">{attendedIds.length}</span><span className="acc-stat-lbl">Events Attended</span></div>
                <div className="acc-stat"><span className="acc-stat-val">{savedIds.length}</span><span className="acc-stat-lbl">Saved Resources</span></div>
                <div className="acc-stat"><span className="acc-stat-val">{collections.length}</span><span className="acc-stat-lbl">Collections</span></div>
              </div>
            </div>
          )}

          {!editingProfile && (
            <div className="acc-profile-actions">
              <button className="acc-edit-btn" onClick={() => setEditingProfile(true)}>
                {profile.name ? "Edit Profile" : "Create Profile"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <main className="acc-main">
        <div className="acc-tabs">
          {TABS.map((t, i) => (
            <button key={t.label} className={`acc-tab${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {/* ── Saved Resources ── */}
        {activeTab === 0 && (
          <div className="acc-card">
            <div className="acc-card-header">
              <div>
                <h2 className="acc-card-title">Saved Resources</h2>
                <p className="acc-card-sub">Bookmark resources from the directory, then organize them into collections.</p>
              </div>
              <a href="/directory" style={{ background: "#ECC22D", color: "#244747", border: "none", borderRadius: "9999px", padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "background 0.2s", textDecoration: "none", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", whiteSpace: "nowrap", flexShrink: 0, display: "inline-flex", alignItems: "center" }}>
                Browse Directory →
              </a>
            </div>

            {/* Collection pills */}
            <div className="acc-col-pills">
              <button
                className={`acc-col-pill${!activeColId ? " active" : ""}`}
                onClick={() => setActiveColId(null)}
              >
                All Saved ({savedResources.length})
              </button>
              {collections.map((col) => (
                <button
                  key={col.id}
                  className={`acc-col-pill${activeColId === col.id ? " active" : ""}`}
                  onClick={() => setActiveColId(activeColId === col.id ? null : col.id)}
                >
                  {col.name} ({col.resourceIds.filter((id) => savedIds.includes(id)).length})
                  <span
                    className="acc-col-pill-del"
                    onClick={(e) => { e.stopPropagation(); deleteCollection(col.id); }}
                    role="button"
                    aria-label="Delete collection"
                  >×</span>
                </button>
              ))}
            </div>

            {/* Create collection */}
            <div className="acc-col-create">
              <input
                className="acc-inp"
                style={{ flex: 1 }}
                placeholder="New collection name (e.g. Health, Sports, Arts)…"
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createCollection()}
              />
              <button className="acc-primary-btn" onClick={createCollection}>+ Create</button>
            </div>

            {/* Resource grid */}
            {displayedSaved.length === 0 ? (
              <div className="acc-empty">
                {activeColId
                  ? <>This collection is empty.<br /><span style={{ fontSize: 13 }}>Add resources to it using the Collection button on the <a href="/directory">Directory</a>.</span></>
                  : <>No saved resources yet.<br /><span style={{ fontSize: 13 }}>Click ☆ on any resource in the <a href="/directory">Directory</a> to bookmark it here.</span></>}
              </div>
            ) : (
              <div className="acc-grid">
                {displayedSaved.map((r) => {
                  const resourceCols = collections.filter((c) => c.resourceIds.includes(r.id));
                  return (
                    <div key={r.id} className="acc-rc is-saved">
                      <div className="acc-rc-type">{r.type}</div>
                      <div className="acc-rc-title">{r.title}</div>
                      <div className="acc-rc-meta">{r.date} · {r.time}</div>
                      <div className="acc-rc-meta">{r.location}</div>
                      {resourceCols.length > 0 && (
                        <div className="acc-rc-cols">In: {resourceCols.map(c => c.name).join(", ")}</div>
                      )}
                      <div className="acc-rc-tags">{r.tags.map((t) => <span key={t} className="acc-rc-tag">{t}</span>)}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <a href={`/directory/${r.id}`} style={{ flex: 1, padding: 9, borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "all 0.2s" }}>
                          View →
                        </a>
                        <button
                          className="acc-toggle-btn is-on-saved"
                          style={{ flex: 1 }}
                          onClick={() => unsaveResource(r.id)}
                        >★ Remove</button>
                      </div>

                      {/* Collection toggles */}
                      {collections.length > 0 && (
                        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {collections.map((col) => {
                            const inCol = col.resourceIds.includes(r.id);
                            return (
                              <button
                                key={col.id}
                                onClick={() => toggleResourceInCollection(col.id, r.id)}
                                style={{
                                  padding: "3px 10px", borderRadius: 999,
                                  border: `1px solid ${inCol ? "rgba(236,194,45,0.5)" : "rgba(255,255,255,0.15)"}`,
                                  background: inCol ? "rgba(236,194,45,0.15)" : "transparent",
                                  color: inCol ? "#ECC22D" : "rgba(255,255,255,0.5)",
                                  fontSize: 11, fontWeight: 600, cursor: "pointer",
                                  fontFamily: "'Inter',sans-serif", transition: "all 0.2s",
                                }}
                              >
                                {inCol ? "✓ " : "+ "}{col.name}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Volunteer Hours ── */}
        {activeTab === 1 && (
          <div className="acc-card">
            <div className="acc-card-header">
              <div>
                <h2 className="acc-card-title">Volunteer Hours</h2>
                <p className="acc-card-sub">Track the time you give back to the community.</p>
              </div>
              <button className="acc-primary-btn" onClick={() => setShowHourForm((v) => !v)}>
                {showHourForm ? "Cancel" : "+ Log Hours"}
              </button>
            </div>

            <div className="acc-hours-hero">
              <div className="acc-hours-num">{totalHours}</div>
              <div className="acc-hours-lbl">total hours volunteered</div>
            </div>

            {showHourForm && (
              <div className="acc-log-form">
                <input className="acc-inp" placeholder="Activity name (e.g. Sammamish Landing cleanup)" value={hourForm.activity} onChange={(e) => setHourForm((f) => ({ ...f, activity: e.target.value }))} />
                <div className="acc-form-row">
                  <input className="acc-inp" type="date" value={hourForm.date} onChange={(e) => setHourForm((f) => ({ ...f, date: e.target.value }))} />
                  <input className="acc-inp" type="number" min="0.5" step="0.5" placeholder="Hours (e.g. 2.5)" value={hourForm.hours} onChange={(e) => setHourForm((f) => ({ ...f, hours: e.target.value }))} />
                </div>
                <input className="acc-inp" placeholder="Notes (optional)" value={hourForm.notes} onChange={(e) => setHourForm((f) => ({ ...f, notes: e.target.value }))} />
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="acc-save-btn" onClick={addHourEntry}>Save Entry</button>
                  <button className="acc-cancel-btn" onClick={() => setShowHourForm(false)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="acc-entry-list">
              {hourEntries.length === 0 && (
                <div className="acc-empty">
                  No hours logged yet.<br />
                  <span style={{ fontSize: 13 }}>Click &quot;+ Log Hours&quot; to get started!</span>
                </div>
              )}
              {hourEntries.map((e) => (
                <div key={e.id} className="acc-entry">
                  <div className="acc-entry-date">{e.date}</div>
                  <div style={{ flex: 1 }}>
                    <div className="acc-entry-name">{e.activity}</div>
                    {e.notes && <div className="acc-entry-note">{e.notes}</div>}
                  </div>
                  <div className="acc-hrs-badge">{e.hours}h</div>
                  <button className="acc-del" onClick={() => deleteHourEntry(e.id)} aria-label="Delete">×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Past Events ── */}
        {activeTab === 2 && (
          <div className="acc-card">
            <div className="acc-card-header">
              <div>
                <h2 className="acc-card-title">Past Events & Activities</h2>
                <p className="acc-card-sub">Events and resources you&apos;ve marked as attended.</p>
              </div>
            </div>

            {attendedResources.length > 0 && (
              <>
                <div className="acc-grid">
                  {attendedResources.map((r) => (
                    <div key={r.id} className="acc-rc is-attended">
                      <div className="acc-rc-type">{r.type}</div>
                      <div className="acc-rc-title">{r.title}</div>
                      <div className="acc-rc-meta">{r.date} · {r.time}</div>
                      <div className="acc-rc-meta">{r.location}</div>
                      <div className="acc-rc-tags">{r.tags.map((t) => <span key={t} className="acc-rc-tag">{t}</span>)}</div>
                      <button className="acc-toggle-btn is-on-attended" onClick={() => toggleAttended(r.id)}>✓ Attended — remove</button>
                    </div>
                  ))}
                </div>
                <p className="acc-divider-label">Mark more as attended</p>
              </>
            )}

            {RESOURCES.filter((r) => !attendedIds.includes(r.id)).length === 0 ? (
              <div className="acc-empty">You&apos;ve attended everything! Nice work.</div>
            ) : (
              <>
                {attendedResources.length === 0 && (
                  <div className="acc-empty" style={{ paddingBottom: 16 }}>
                    Nothing marked as attended yet.<br />
                    <span style={{ fontSize: 13 }}>Check off events below.</span>
                  </div>
                )}
                <div className="acc-grid">
                  {RESOURCES.filter((r) => !attendedIds.includes(r.id)).map((r) => (
                    <div key={r.id} className="acc-rc">
                      <div className="acc-rc-type">{r.type}</div>
                      <div className="acc-rc-title">{r.title}</div>
                      <div className="acc-rc-meta">{r.date} · {r.time}</div>
                      <div className="acc-rc-meta">{r.location}</div>
                      <div className="acc-rc-tags">{r.tags.map((t) => <span key={t} className="acc-rc-tag">{t}</span>)}</div>
                      <button className="acc-toggle-btn" onClick={() => toggleAttended(r.id)}>Mark as Attended</button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
