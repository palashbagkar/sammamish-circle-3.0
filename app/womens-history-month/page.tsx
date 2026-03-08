"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "../header";
import Footer from "../footer";
import "./whm.css";

/* ── The 3 WHM resources (mirror directory IDs 27-29) ────────────────── */
const WHM_RESOURCES = [
  {
    id: 27,
    title: "Women in Leadership Speaker Series",
    type: "Event",
    date: "Saturday, Mar 15, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Sammamish Community Center",
    cost: "Free",
    tags: ["Community", "Education", "Women's History"],
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
  },
  {
    id: 28,
    title: "Volunteer: Girls in STEM Workshop",
    type: "Volunteering",
    date: "Saturday, Mar 22, 2026",
    time: "10:00 AM - 1:00 PM",
    location: "Eastlake High School",
    cost: "Free",
    tags: ["Youth", "Education", "Volunteering", "Women's History"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800",
  },
  {
    id: 29,
    title: "Women's History Month Film Screening",
    type: "Event",
    date: "Friday, Mar 28, 2026",
    time: "6:30 PM - 9:00 PM",
    location: "Sammamish Library",
    cost: "Free",
    tags: ["Community", "Arts", "Women's History"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
  },
];

/* design.md §5 — Event type uses CTA Warm Gold #D2C49E */
const TYPE_COLORS: Record<string, string> = {
  Event: "#D2C49E",
  Volunteering: "#10B981",
  Program: "#0EA5E9",
  Workshop: "#A78BFA",
};

/* ── Timeline milestones ─────────────────────────────────────────────── */
const MILESTONES = [
  {
    year: "1848",
    title: "Seneca Falls Convention",
    description:
      "The first women\u2019s rights convention in the United States drew over 300 attendees to Seneca Falls, New York. The Declaration of Sentiments, modeled on the Declaration of Independence, demanded equal rights including suffrage.",
    side: "left" as const,
  },
  {
    year: "1872",
    title: "Victoria Woodhull Runs for President",
    description:
      "Victoria Woodhull became the first woman to run for President of the United States, nominated by the Equal Rights Party\u2014decades before women could even vote.",
    side: "right" as const,
  },
  {
    year: "1920",
    title: "19th Amendment Ratified",
    description:
      "After 72 years of activism, the 19th Amendment was ratified, granting women the constitutional right to vote. Millions of women cast ballots for the first time that November.",
    side: "left" as const,
  },
  {
    year: "1963",
    title: "Equal Pay Act Signed",
    description:
      "President Kennedy signed the Equal Pay Act, making it illegal to pay women less than men for the same work. It was the first federal law addressing gender-based wage discrimination.",
    side: "right" as const,
  },
  {
    year: "1964",
    title: "Civil Rights Act \u2013 Title VII",
    description:
      "Title VII of the Civil Rights Act prohibited employment discrimination based on sex, giving women new legal tools to challenge workplace inequality.",
    side: "left" as const,
  },
  {
    year: "1972",
    title: "Title IX Enacted",
    description:
      "Title IX prohibited sex-based discrimination in federally funded education programs, transforming women\u2019s athletics and academic opportunities across the nation.",
    side: "right" as const,
  },
  {
    year: "1981",
    title: "Sandra Day O\u2019Connor Appointed",
    description:
      "Sandra Day O\u2019Connor became the first woman appointed to the United States Supreme Court, breaking a 191-year barrier in the nation\u2019s highest court.",
    side: "left" as const,
  },
  {
    year: "1993",
    title: "Family & Medical Leave Act",
    description:
      "The FMLA was signed into law, entitling eligible employees to take unpaid, job-protected leave for family and medical reasons\u2014a landmark victory for working mothers.",
    side: "right" as const,
  },
  {
    year: "2009",
    title: "Lilly Ledbetter Fair Pay Act",
    description:
      "The first bill signed by President Obama restored protections against pay discrimination, resetting the statute of limitations with each discriminatory paycheck.",
    side: "left" as const,
  },
  {
    year: "2021",
    title: "Kamala Harris Inaugurated",
    description:
      "Kamala Harris was sworn in as the 49th Vice President of the United States\u2014the first woman, first Black person, and first person of South Asian descent to hold the office.",
    side: "right" as const,
  },
];

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function WomensHistoryMonthPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 350]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.15]);
  const brightness = useTransform(heroY, (v) => `brightness(${100 - v / 3.5}%)`);

  // Timeline parallax container
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="whm-page">
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <motion.section className="whm-hero" ref={heroRef} style={{ filter: brightness }}>
        <motion.div className="whm-hero-bg" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=2880&q=80"
            alt="Women's History Month"
            className="whm-hero-img"
          />
          <div className="whm-hero-overlay" />
        </motion.div>

        <motion.div className="whm-hero-content" style={{ opacity: heroOpacity }}>
          <motion.div
            className="whm-hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            March 2026
          </motion.div>
          <motion.h1
            className="whm-hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Women&apos;s History
            <br />
            Month
          </motion.h1>
          <motion.p
            className="whm-hero-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Honoring the courage, resilience, and achievements of women
          </motion.p>
        </motion.div>

        <motion.div
          className="whm-hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span>Scroll Down</span>
          <span className="whm-scroll-arrow">&or;</span>
        </motion.div>
      </motion.section>

      {/* ── Overview + Resources ──────────────────────────────────────── */}
      <section className="whm-overview-section">
        <div className="whm-overview-inner">
          {/* Left: Overview text */}
          <motion.div
            className="whm-overview-text"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="whm-section-tag">About</span>
            <h2 className="whm-section-title">What Is Women&apos;s History Month?</h2>
            <p className="whm-overview-body">
              Women&apos;s History Month is a celebration observed every March in the United
              States, dedicated to honoring the contributions, sacrifices, and achievements
              of women throughout American history. First established as a national
              observance in 1987 by Congress, the month grew out of a grassroots movement
              that began with a single &ldquo;Women&apos;s History Week&rdquo; in 1981, championed by
              educators and historians who recognized that women&apos;s stories were being
              systematically excluded from textbooks and public memory.
            </p>
            <p className="whm-overview-body">
              Today, Women&apos;s History Month serves as both a reflection and a call to
              action. It shines a light on trailblazers&mdash;from suffragists and scientists
              to artists, activists, and community leaders&mdash;whose work paved the way for
              the rights and opportunities many now take for granted. Here in Sammamish,
              we celebrate by spotlighting local women who make our community stronger and
              by creating spaces where the next generation can learn, connect, and be
              inspired.
            </p>
          </motion.div>

          {/* Right: 3 Resource Cards (directory format) */}
          <motion.div
            className="whm-resources-col"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <h3 className="whm-resources-heading">Get Involved This March</h3>
            <div className="whm-resources-stack">
              {WHM_RESOURCES.map((resource, i) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/directory/${resource.id}`}
                    className="whm-resource-card"
                  >
                    <div className="whm-resource-img-wrap">
                      <img
                        src={resource.image}
                        alt={resource.title}
                        className="whm-resource-img"
                      />
                    </div>
                    <div className="whm-resource-content">
                      <div className="whm-resource-header">
                        <span
                          className="whm-resource-type"
                          style={{
                            background: `${TYPE_COLORS[resource.type] || "#6B7280"}1A`,
                            color: TYPE_COLORS[resource.type] || "#6B7280",
                          }}
                        >
                          {resource.type}
                        </span>
                      </div>
                      <h4 className="whm-resource-title">{resource.title}</h4>
                      <div className="whm-resource-details">
                        <span className="whm-resource-detail">
                          <svg width="12" height="12" viewBox="0 0 13 14" fill="none">
                            <path
                              d="M2.625 0.875V1.75H1.3125C0.588 1.75 0 2.338 0 3.063V4.375H12.25V3.063C12.25 2.338 11.662 1.75 10.938 1.75H9.625V0.875C9.625 0.391 9.234 0 8.75 0C8.266 0 7.875 0.391 7.875 0.875V1.75H4.375V0.875C4.375 0.391 3.984 0 3.5 0C3.016 0 2.625 0.391 2.625 0.875ZM12.25 5.25H0V12.688C0 13.412 0.588 14 1.313 14H10.938C11.662 14 12.25 13.412 12.25 12.688V5.25Z"
                              fill="#0EA5E9"
                            />
                          </svg>
                          {resource.date} &bull; {resource.time}
                        </span>
                        <span className="whm-resource-detail">
                          <svg width="12" height="12" viewBox="0 0 11 14" fill="none">
                            <path
                              d="M5.898 13.65C7.301 11.895 10.5 7.64 10.5 5.25C10.5 2.352 8.148 0 5.25 0C2.352 0 0 2.352 0 5.25C0 7.64 3.199 11.895 4.602 13.65C4.938 14.068 5.562 14.068 5.898 13.65ZM5.25 3.5C5.714 3.5 6.159 3.684 6.487 4.013C6.816 4.341 7 4.786 7 5.25C7 5.714 6.816 6.159 6.487 6.487C6.159 6.816 5.714 7 5.25 7C4.786 7 4.341 6.816 4.013 6.487C3.684 6.159 3.5 5.714 3.5 5.25C3.5 4.786 3.684 4.341 4.013 4.013C4.341 3.684 4.786 3.5 5.25 3.5Z"
                              fill="#10B981"
                            />
                          </svg>
                          {resource.location}
                        </span>
                      </div>
                      <div className="whm-resource-tags">
                        {resource.tags.map((tag) => (
                          <span key={tag} className="whm-resource-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <Link href="/directory" className="whm-view-all-link">
              Browse All Resources
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7H11M8 4L11 7L8 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────── */}
      <section className="whm-timeline-section" ref={timelineRef}>
        <div className="whm-timeline-inner">
          <motion.div
            className="whm-section-header-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="whm-section-tag">Milestones</span>
            <h2 className="whm-section-title">A Timeline of Progress</h2>
            <p className="whm-timeline-intro">
              Key moments in the fight for women&apos;s equality in the United States.
            </p>
          </motion.div>

          <div className="whm-timeline">
            {/* Animated line */}
            <div className="whm-timeline-track">
              <motion.div className="whm-timeline-fill" style={{ height: lineHeight }} />
            </div>

            {MILESTONES.map((ms, i) => (
              <motion.div
                key={ms.year}
                className={`whm-timeline-item whm-timeline-${ms.side}`}
                initial={{ opacity: 0, x: ms.side === "left" ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="whm-timeline-dot" />
                <div className="whm-timeline-card">
                  <span className="whm-timeline-year">{ms.year}</span>
                  <h3 className="whm-timeline-card-title">{ms.title}</h3>
                  <p className="whm-timeline-card-desc">{ms.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="whm-cta-section">
        <motion.div
          className="whm-cta-inner"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="whm-cta-title">Celebrate With Us</h2>
          <p className="whm-cta-desc">
            Explore events, volunteer opportunities, and programs happening across
            Sammamish this March.
          </p>
          <Link href="/directory" className="whm-cta-btn">
            Explore the Directory
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
