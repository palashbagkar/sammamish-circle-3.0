"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "../header";
import Footer from "../footer";
import "./government.css";

/* ── Data ────────────────────────────────────────────────────────────────── */

const COUNCIL_MEMBERS = [
  {
    name: "Karen Liu",
    role: "Mayor",
    since: "2024",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Serving her second term, Mayor Liu focuses on sustainable growth and community-led development across Sammamish.",
  },
  {
    name: "David Patel",
    role: "Deputy Mayor",
    since: "2023",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "A longtime advocate for parks and recreation, Deputy Mayor Patel champions equitable access to public spaces.",
  },
  {
    name: "Sarah Chen",
    role: "Councilmember",
    since: "2022",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Councilmember Chen brings deep expertise in public safety and neighborhood planning to the council.",
  },
  {
    name: "Michael Torres",
    role: "Councilmember",
    since: "2024",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "First-term member Torres is leading the charge on housing affordability and transit connectivity.",
  },
  {
    name: "Priya Sharma",
    role: "Councilmember",
    since: "2023",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    bio: "Councilmember Sharma drives environmental policy and the city's climate action plan.",
  },
  {
    name: "James Whitfield",
    role: "Councilmember",
    since: "2022",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "A fiscal conservative, Councilmember Whitfield ensures responsible budgeting and infrastructure investment.",
  },
  {
    name: "Amara Okafor",
    role: "Councilmember",
    since: "2024",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    bio: "Councilmember Okafor advocates for arts, culture, and youth programming throughout the city.",
  },
];

const BILLS = [
  {
    id: "ORD-2026-04",
    title: "Sammamish Town Center Zoning Amendment",
    status: "Under Review",
    statusColor: "#F59E0B",
    date: "Feb 28, 2026",
    summary: "Amends the Town Center plan to allow mixed-use buildings up to five stories along Issaquah-Pine Lake Road, with ground-floor retail requirements and public plaza mandates.",
    category: "Zoning & Land Use",
  },
  {
    id: "ORD-2026-03",
    title: "Community Safety & Sidewalk Improvement Act",
    status: "Passed",
    statusColor: "#10B981",
    date: "Feb 14, 2026",
    summary: "Allocates $4.2M for sidewalk construction on 228th Ave SE and East Lake Sammamish Parkway, plus new pedestrian-activated crosswalk signals at three intersections.",
    category: "Infrastructure",
  },
  {
    id: "ORD-2026-02",
    title: "Urban Tree Canopy Preservation Ordinance",
    status: "Passed",
    statusColor: "#10B981",
    date: "Jan 30, 2026",
    summary: "Strengthens protections for significant trees on private property, requiring 2:1 replacement ratios and creating a heritage tree registry for specimens over 100 years old.",
    category: "Environment",
  },
  {
    id: "ORD-2026-01",
    title: "Small Business Grant & Licensing Reform",
    status: "Passed",
    statusColor: "#10B981",
    date: "Jan 15, 2026",
    summary: "Establishes a $500K annual micro-grant program for Sammamish-based small businesses and streamlines the business licensing process from 12 steps to 4.",
    category: "Economic Development",
  },
  {
    id: "RES-2026-01",
    title: "Youth Mental Health Services Expansion",
    status: "Under Review",
    statusColor: "#F59E0B",
    date: "Mar 1, 2026",
    summary: "Proposes a partnership with Overlake Medical Center to establish a free walk-in counseling clinic for residents ages 12-24, funded through the city's ARPA reserves.",
    category: "Public Health",
  },
  {
    id: "RES-2025-09",
    title: "Beaver Lake Park Trail Restoration",
    status: "In Committee",
    statusColor: "#0EA5E9",
    date: "Dec 12, 2025",
    summary: "Directs the Parks Department to rebuild 2.4 miles of eroded trails at Beaver Lake Park, add ADA-accessible boardwalks, and install wayfinding signage.",
    category: "Parks & Recreation",
  },
];

const MEETINGS = [
  { date: "Mar 11", day: "Tue", title: "City Council Regular Meeting", time: "6:30 PM", location: "City Hall, Council Chambers" },
  { date: "Mar 18", day: "Tue", title: "Planning Commission Hearing", time: "7:00 PM", location: "City Hall, Room 202" },
  { date: "Mar 20", day: "Thu", title: "Parks & Recreation Board", time: "6:00 PM", location: "City Hall, Conference Room B" },
  { date: "Mar 25", day: "Tue", title: "City Council Regular Meeting", time: "6:30 PM", location: "City Hall, Council Chambers" },
  { date: "Apr 1", day: "Tue", title: "Budget & Finance Committee", time: "5:00 PM", location: "City Hall, Room 202" },
  { date: "Apr 8", day: "Tue", title: "City Council Regular Meeting", time: "6:30 PM", location: "City Hall, Council Chambers" },
];

const CONTRIBUTE_WAYS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3C8.477 3 4 7.477 4 13V20C4 21.657 5.343 23 7 23H9C9.552 23 10 22.552 10 22V15C10 14.448 9.552 14 9 14H6V13C6 8.582 9.582 5 14 5C18.418 5 22 8.582 22 13V14H19C18.448 14 18 14.448 18 15V22C18 22.552 18.448 23 19 23H21C22.657 23 24 21.657 24 20V13C24 7.477 19.523 3 14 3Z" fill="#D2C49E"/>
      </svg>
    ),
    title: "Attend Public Hearings",
    description: "Every council meeting includes a public comment period. Sign up to speak on issues that matter to you\u2014no appointment needed.",
    cta: "View Meeting Calendar",
    href: "#meetings",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M22 4H6C4.895 4 4 4.895 4 6V18C4 19.105 4.895 20 6 20H10L14 24L18 20H22C23.105 20 24 19.105 24 18V6C24 4.895 23.105 4 22 4Z" fill="#D2C49E"/>
        <path d="M9 10H19M9 14H15" stroke="#244747" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Submit Written Comments",
    description: "Can't attend in person? Submit written testimony on any agenda item. Comments are read into the record and shared with all councilmembers.",
    cta: "Comment Portal",
    href: "#",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L4 9L14 14L24 9L14 4Z" fill="#D2C49E"/>
        <path d="M4 14L14 19L24 14" stroke="#D2C49E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 19L14 24L24 19" stroke="#D2C49E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Join a Board or Commission",
    description: "The city has 7 advisory boards covering planning, parks, arts, and more. Volunteer your expertise and directly shape city policy.",
    cta: "View Open Positions",
    href: "#",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="2" fill="#D2C49E"/>
        <path d="M4 10L14 16L24 10" stroke="#244747" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Contact Your Representatives",
    description: "Every councilmember maintains an open-door policy. Reach out by email, phone, or schedule a one-on-one meeting at City Hall.",
    cta: "Find Contact Info",
    href: "#council",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Zoning & Land Use": "#A78BFA",
  "Infrastructure": "#0EA5E9",
  "Environment": "#10B981",
  "Economic Development": "#F59E0B",
  "Public Health": "#F87171",
  "Parks & Recreation": "#34D399",
};

/* ── Components ──────────────────────────────────────────────────────────── */

function CouncilCard({
  member,
  index,
}: {
  member: (typeof COUNCIL_MEMBERS)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="gov-council-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-60px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="gov-council-img-wrap">
        <img src={member.image} alt={member.name} className="gov-council-img" />
        <div className="gov-council-img-overlay" />
        <motion.div
          className="gov-council-bio-panel"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
          transition={{ duration: 0.25 }}
        >
          <p>{member.bio}</p>
        </motion.div>
      </div>
      <div className="gov-council-info">
        <span className="gov-council-role">{member.role}</span>
        <h3 className="gov-council-name">{member.name}</h3>
        <span className="gov-council-since">Serving since {member.since}</span>
      </div>
    </motion.div>
  );
}

function BillCard({
  bill,
  index,
}: {
  bill: (typeof BILLS)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className={`gov-bill-card ${expanded ? "expanded" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      viewport={{ once: true, margin: "-40px" }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="gov-bill-header">
        <div className="gov-bill-meta">
          <span
            className="gov-bill-category"
            style={{
              background: `${CATEGORY_COLORS[bill.category] || "#6B7280"}18`,
              color: CATEGORY_COLORS[bill.category] || "#6B7280",
            }}
          >
            {bill.category}
          </span>
          <span className="gov-bill-id">{bill.id}</span>
        </div>
        <span
          className="gov-bill-status"
          style={{
            background: `${bill.statusColor}1A`,
            color: bill.statusColor,
            borderColor: `${bill.statusColor}40`,
          }}
        >
          {bill.status}
        </span>
      </div>

      <h3 className="gov-bill-title">{bill.title}</h3>

      <motion.div
        className="gov-bill-body"
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="gov-bill-summary">{bill.summary}</p>
      </motion.div>

      <div className="gov-bill-footer">
        <span className="gov-bill-date">{bill.date}</span>
        <span className="gov-bill-expand-hint">
          {expanded ? "Collapse" : "Read more"}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function GovernmentPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 350]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.2]);
  const brightness = useTransform(heroY, (v) => `brightness(${100 - v / 3.5}%)`);

  const [billFilter, setBillFilter] = useState<string>("all");
  const filteredBills =
    billFilter === "all"
      ? BILLS
      : BILLS.filter((b) =>
          billFilter === "passed"
            ? b.status === "Passed"
            : billFilter === "review"
              ? b.status === "Under Review"
              : b.status === "In Committee"
        );

  return (
    <div className="gov-page">
      <Header />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <motion.section className="gov-hero" ref={heroRef} style={{ filter: brightness }}>
        <motion.div className="gov-hero-bg" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=2880&q=80"
            alt="Sammamish City Hall"
            className="gov-hero-img"
          />
          <div className="gov-hero-overlay" />
        </motion.div>

        <motion.div className="gov-hero-content" style={{ opacity: heroOpacity }}>
          <motion.div
            className="gov-hero-badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            City of Sammamish
          </motion.div>
          <motion.h1
            className="gov-hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Local
            <br />
            Government
          </motion.h1>
          <motion.p
            className="gov-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transparent governance, community-driven decisions
          </motion.p>
        </motion.div>

        <motion.div
          className="gov-hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span>Scroll Down</span>
          <span className="gov-scroll-arrow">&or;</span>
        </motion.div>
      </motion.section>

      {/* ── Quick Stats Bar ──────────────────────────────────────────── */}
      <section className="gov-stats-bar">
        <motion.div
          className="gov-stats-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { number: "7", label: "Council Members" },
            { number: "12", label: "Bills This Year" },
            { number: "94%", label: "Voter Turnout '25" },
            { number: "24", label: "Public Meetings/Yr" },
          ].map((stat, i) => (
            <motion.div
              className="gov-stat-item"
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="gov-stat-number">{stat.number}</span>
              <span className="gov-stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── City Council ─────────────────────────────────────────────── */}
      <section className="gov-section gov-council-section" id="council">
        <div className="gov-section-inner">
          <motion.div
            className="gov-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="gov-section-tag">Leadership</span>
            <h2 className="gov-section-title">City Council</h2>
            <p className="gov-section-desc">
              Seven elected councilmembers serve four-year terms, meeting twice monthly to
              set policy, approve budgets, and guide the future of Sammamish.
            </p>
          </motion.div>

          <div className="gov-council-grid">
            {/* Mayor - featured large */}
            <CouncilCard member={COUNCIL_MEMBERS[0]} index={0} />
            {COUNCIL_MEMBERS.slice(1).map((m, i) => (
              <CouncilCard key={m.name} member={m} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bills & Legislation ──────────────────────────────────────── */}
      <section className="gov-section gov-bills-section" id="bills">
        <div className="gov-section-inner">
          <motion.div
            className="gov-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="gov-section-tag">Legislation</span>
            <h2 className="gov-section-title">Recent Bills & Ordinances</h2>
            <p className="gov-section-desc">
              Track the latest legislation shaping Sammamish. Click any bill to read a summary.
            </p>
          </motion.div>

          <div className="gov-bill-filters">
            {[
              { key: "all", label: "All" },
              { key: "passed", label: "Passed" },
              { key: "review", label: "Under Review" },
              { key: "committee", label: "In Committee" },
            ].map((f) => (
              <button
                key={f.key}
                className={`gov-bill-filter-btn ${billFilter === f.key ? "active" : ""}`}
                onClick={() => setBillFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="gov-bills-list">
            {filteredBills.map((bill, i) => (
              <BillCard key={bill.id} bill={bill} index={i} />
            ))}
            {filteredBills.length === 0 && (
              <div className="gov-bills-empty">No bills match this filter.</div>
            )}
          </div>
        </div>
      </section>

      {/* ── How to Contribute ────────────────────────────────────────── */}
      <section className="gov-section gov-contribute-section" id="contribute">
        <div className="gov-section-inner">
          <motion.div
            className="gov-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="gov-section-tag">Get Involved</span>
            <h2 className="gov-section-title">How Citizens Can Contribute</h2>
            <p className="gov-section-desc">
              Your voice matters. Here are the ways you can actively participate in
              shaping the future of Sammamish.
            </p>
          </motion.div>

          <div className="gov-contribute-grid">
            {CONTRIBUTE_WAYS.map((way, i) => (
              <motion.div
                className="gov-contribute-card"
                key={way.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -6 }}
              >
                <div className="gov-contribute-icon">{way.icon}</div>
                <h3 className="gov-contribute-title">{way.title}</h3>
                <p className="gov-contribute-desc">{way.description}</p>
                <a href={way.href} className="gov-contribute-cta">
                  {way.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7H11M8 4L11 7L8 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Meetings ────────────────────────────────────────── */}
      <section className="gov-section gov-meetings-section" id="meetings">
        <div className="gov-section-inner">
          <motion.div
            className="gov-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="gov-section-tag">Schedule</span>
            <h2 className="gov-section-title">Upcoming Public Meetings</h2>
            <p className="gov-section-desc">
              All meetings are open to the public. Agendas are posted 72 hours in advance.
            </p>
          </motion.div>

          <div className="gov-meetings-list">
            {MEETINGS.map((mtg, i) => (
              <motion.div
                className="gov-meeting-row"
                key={`${mtg.date}-${mtg.title}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true, margin: "-30px" }}
              >
                <div className="gov-meeting-date-block">
                  <span className="gov-meeting-day">{mtg.day}</span>
                  <span className="gov-meeting-date">{mtg.date}</span>
                </div>
                <div className="gov-meeting-details">
                  <h4 className="gov-meeting-title">{mtg.title}</h4>
                  <div className="gov-meeting-meta">
                    <span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M6 3.5V6L8 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      {mtg.time}
                    </span>
                    <span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1C3.79 1 2 2.79 2 5C2 7.76 6 11 6 11C6 11 10 7.76 10 5C10 2.79 8.21 1 6 1Z" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="6" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                      {mtg.location}
                    </span>
                  </div>
                </div>
                <button className="gov-meeting-rsvp">View Agenda</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="gov-cta-section">
        <motion.div
          className="gov-cta-inner"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="gov-cta-title">Stay Informed, Stay Involved</h2>
          <p className="gov-cta-desc">
            Subscribe to city council updates and never miss a vote, hearing, or community decision.
          </p>
          <div className="gov-cta-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="gov-cta-input"
            />
            <button className="gov-cta-btn">Subscribe</button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
