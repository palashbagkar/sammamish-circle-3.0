"use client";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Header from "./header";
import Footer from "./footer";
import { getActiveMonth, getUpcomingEvents } from "@/lib/time-logic";


export default function HomePage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // ── Upcoming Events data ──
  const now = useMemo(() => new Date(), []);
  const activeMonth = useMemo(() => getActiveMonth(now), [now]);
  const upcomingEvents = useMemo(() => getUpcomingEvents(now, 7), [now]);
  const featuredEvent = upcomingEvents[0] ?? null;
  const listEvents = useMemo(() => upcomingEvents.slice(1, 5), [upcomingEvents]);
  const featuredImage = "https://images.unsplash.com/photo-1653074281018-c08f358059ab?q=80&w=866&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // Create a ref for the stack container to track scroll
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stackScrollY } = useScroll({
    target: stackRef,
    offset: ["start 75%", "end 74.5%"]
  });

  // Date formatting helpers
  const fmtDay = (dateStr: string) => new Date(dateStr + "T00:00:00").getDate().toString().padStart(2, "0");
  const fmtMonth = (dateStr: string) => new Date(dateStr + "T00:00:00").toLocaleString("en-US", { month: "short" }).toUpperCase();
  const fmtRange = (start: string, end: string) => {
    const s = new Date(start + "T00:00:00");
    const e = new Date(end + "T00:00:00");
    return `${s.toLocaleString("en-US", { month: "short" })} ${s.getDate()} - ${e.toLocaleString("en-US", { month: "short" })} ${e.getDate()}`;
  };

  const { scrollY } = useScroll();

  // Parallax effect: hero scrolls at half speed
  const heroY = useTransform(scrollY, [0, 1000], [0, 700]);
  const brightness = useTransform(heroY, (latest) => `brightness(${100 - (latest / 5)}%)`);

  // --- Scroll-Linked Carousel Logic ---
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: carouselScrollProgress } = useScroll({
    target: carouselContainerRef,
    // Start animation when the top of the container hits the top of the viewport
    // End when the bottom of the container hits the bottom of the viewport
    offset: ["start start", "end end"]
  });

  const resourcesData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1514583079045-e928a4732ade?w=600",
      tag: "Event",
      title: "Sammamish Farmers Market",
      description: "Fresh produce, goods, and community connections every Wednesday.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1652971876875-05db98fab376?w=600",
      tag: "Volunteer",
      title: "Volunteer at Sammamish Landing",
      description: "Looking for volunteer opportunities? Join us to help clean up Sammamish Landing.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600",
      tag: "Event",
      title: "Coffee with Council",
      description: "Join three Sammamish City Council members for coffee and conversation.",
    },
    {
      id: 4,
      title: "Youth Soccer Program",
      tag: "Recreation",
      image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800",
      description: "A weekly recreational soccer program for kids at Marymoor Park.",
    },
  ];

  // Map scroll progress (0 to 1) to horizontal translation
  // Negative percentage to move cards to the left
  const maxScroll = -400; // 333px per card + gap approx
  const carouselX = useTransform(carouselScrollProgress, [0, 1], [0, maxScroll]);

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const newsletterVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log("Newsletter signup:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };



  useEffect(() => {
    const handleScroll = () => {
      const parallax = document.querySelector('.parallax-image') as HTMLElement;
      if (parallax) {
        const scrollY = window.scrollY;
        parallax.style.setProperty('--scroll-y', scrollY + 'px');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      <Header />

      {/* Hero Section with Parallax */}
      <motion.section className="hero-section" style={{ filter: brightness }}>
        <motion.div
          className="hero-background"
          style={{ y: heroY }}
        >
          <img
            src="https://images.unsplash.com/photo-1563737484889-d240317436f6"
            alt="Sammamish landscape"
            className="hero-image"
          />
          <div className="hero-overlay" />
        </motion.div>

        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Connect with Your <span className="hero-title-highlight">Community</span>
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover local events and initiatives making a difference in our community.
          </motion.p>

          {/* Reference Image UI: Hero Search Bar */}
          <motion.div
            className="hero-search-bar"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="search-field">
              <span className="search-label">WHERE</span>
              <input type="text" className="search-input" placeholder="Search areas" />
            </div>
            <div className="search-field">
              <span className="search-label">WHEN</span>
              <input type="text" className="search-input" placeholder="Add dates" />
            </div>
            <div className="search-field">
              <span className="search-label">WHAT</span>
              <input type="text" className="search-input" placeholder="Categories" />
            </div>
            <button className="hero-search-submit" aria-label="Search" onClick={() => router.push('/directory')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </motion.div>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span>Scroll Down</span>
            <span className="scroll-arrow">▽</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Resources Section with Sticky 300vh Container */}
      <section ref={carouselContainerRef} className="featured-section" style={{ height: "300vh", position: "relative", padding: 0 }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

          <div className="featured-container" style={{ width: "100%", padding: "0 100px" }}>
            <div className="featured-grid">
              {/* Header for featured section */}
              <div className="featured-header" style={{ marginBottom: "2rem" }}>
                <h2 className="featured-title">Featured Community Resources</h2>
                <p className="featured-subtitle">
                  Our current favorites: a weekly spotlight on events you won't want to miss.
                </p>
              </div>

              {/* Framer Motion Scroll-Linked Carousel */}
              <motion.div
                className="carousel-track"
                style={{ x: carouselX, display: "flex", width: "max-content", padding: "20px 0" }}
              >
                {resourcesData.map((resource, i) => {

                  // Compute the relative position of each card based on scroll progress to calculate its scale and blur
                  // This provides the 3D-perspective scale effect described in the requirements.
                  const activeRange = 0.5; // Controls how fast the falloff happens
                  const centerPoint = i / Math.max(1, resourcesData.length - 1);
                  const distance = useTransform(
                    carouselScrollProgress,
                    (val) => Math.abs(val - centerPoint)
                  );

                  const cardScale = useTransform(distance, [0, activeRange], [1, 0.8]);
                  const cardBlurOpacity = useTransform(distance, [0, activeRange], [1, 0.4]);

                  return (
                    <motion.div
                      key={resource.id}
                      className="resource-card-item"
                      style={{
                        scale: cardScale,
                        opacity: cardBlurOpacity, // Fading acts similarly to a blur focus effect without dropping severe frame rates
                        filter: useTransform(distance, [0, activeRange], ["blur(0px)", "blur(1px)"]) // Heavy blur for peripheral cards
                      }}
                    >
                      <Link href="/under-construction" style={{ textDecoration: 'none' }}>
                        <div className="resource-card-wrapper" >
                          <div className="resource-image-wrapper">
                            <img
                              src={resource.image}
                              alt={resource.title}
                              className="resource-image"
                            />
                          </div>
                          <div className="resource-content">
                            <span className="resource-tag">{resource.tag}</span>
                            <h3 className="resource-title">{resource.title}</h3>
                            <p className="resource-description">{resource.description}</p>
                            <button className="resource-learn-more">
                              <span>Learn More</span>
                              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.3226 7.19032C11.6452 6.86763 11.6452 6.34358 11.3226 6.02089L7.19212 1.89046C6.86943 1.56776 6.34538 1.56776 6.02269 1.89046C5.7 2.21315 5.7 2.73719 6.02269 3.05988L8.74619 5.78081H0.826087C0.369158 5.78081 0 6.14997 0 6.6069C0 7.06383 0.369158 7.43298 0.826087 7.43298H8.74361L6.02527 10.1539C5.70258 10.4766 5.70258 11.0006 6.02527 11.3233C6.34796 11.646 6.87201 11.646 7.1947 11.3233L11.3251 7.1929L11.3226 7.19032Z" fill="#FFC300" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )

                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events Section ── */}
      <section className="events-section">
        <div className="events-container">
          {/* Section Header */}
          <div className="events-header">
            <div className="events-header-content">
              <span className="events-eyebrow">
                Upcoming Events
              </span>
              <h2 className="events-title">
                What&apos;s Next
              </h2>
              <p className="events-description">
                Discover a seasonal collection of exclusive events, markets, and celebrations hosted across our community.
              </p>
            </div>
            <Link href="/directory" className="events-cal-link group">
              View Full Calendar
              <span className="events-cal-arrow group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Main Grid: 5-col list + 7-col hero */}
          <div className="events-grid">
            <div className="events-list-stack-col">
              {/* Active awareness month banner */}
              {activeMonth && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  className="events-month-banner"
                  style={{ marginBottom: '1rem' }}
                >
                  <div
                    className="events-month-aura"
                    style={{
                      background: `radial-gradient(circle at top right, ${activeMonth.themeColor}26 0%, transparent 60%)`,
                    }}
                  />
                  <div className="events-month-content">
                    <div className="events-month-eyebrow" style={{ color: activeMonth.themeColor }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Current Awareness Month
                    </div>
                    <h3 className="events-month-title">{activeMonth.title}</h3>
                    <div className="events-month-date">
                      <span>{fmtRange(activeMonth.startDate, activeMonth.endDate)}</span>
                    </div>
                    <p className="events-month-desc">{activeMonth.description}</p>
                  </div>
                </motion.div>
              )}

              <div className="events-list-stack-container" ref={stackRef}>
                <div className="events-stack-tray-header">
                  <span className="events-stack-tray-title">This week&apos;s Lineup</span>
                  <div className="events-stack-tray-line" />
                </div>
                {listEvents.map((ev, idx) => (
                  <EventStackCard
                    key={ev.id}
                    ev={ev}
                    idx={idx}
                    total={listEvents.length}
                    scrollYProgress={stackScrollY}
                  />
                ))}

                {listEvents.length === 0 && (
                  <div style={{ padding: '2rem', color: '#94a3b8', textAlign: 'center', border: '1px dashed #ffffff22', borderRadius: '1rem' }}>
                    No upcoming events found
                  </div>
                )}
              </div>
            </div>
            {/* RIGHT: Featured Event Hero */}
            <div className="events-right-col">
              {featuredEvent && (
                <motion.div
                  className="events-hero-col group"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <div className="events-hero-card">
                    <div className="events-hero-bg" style={{ backgroundImage: `url('${featuredImage}')` }} />
                    <div className="events-hero-overlay" />
                    <div className="events-hero-badges">
                      <span className="events-hero-badge">
                        Featured Event
                      </span>
                      <span className="events-hero-date">
                        {fmtRange(featuredEvent.startDate, featuredEvent.endDate)}
                      </span>
                    </div>
                    <div className="events-hero-content">
                      <h2 className="events-hero-title">{featuredEvent.title}</h2>
                      <p className="events-hero-desc">{featuredEvent.description}</p>
                      <div className="events-hero-ctas">
                        <Link href="/directory" className="events-hero-cta">
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={newsletterVariants}
          className="newsletter-container"
        >
          <h2 className="newsletter-title">Never Miss a Community Moment</h2>
          <p className="newsletter-subtitle">
            Get weekly updates on new events, volunteer opportunities, and community initiatives delivered straight to your inbox.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="newsletter-form-wrapper">
            <div className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-submit">
                Join Our Newsletter
              </button>
            </div>
            <p className="newsletter-disclaimer">
              No spam, just community goodness. Unsubscribe anytime.
            </p>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

// Sub-component to handle individual card scroll animations
function EventStackCard({
  ev,
  idx,
  total,
  scrollYProgress,
}: {
  ev: any;
  idx: number;
  total: number;
  scrollYProgress: any;
}) {
  const zIndex = total - idx;

  // 1.5x wider vertical spread: 18px vs 12px
  // A little more to make it obvious: 24px
  const yOffset = idx * 16;

  // Calculate flip animation based on scroll progress
  // Each card Flips out at a specific point in the scroll
  const step = 0.8 / total;
  // Give top cards an earlier start
  const flipStart = idx * step;
  const flipEnd = flipStart + (step * 0.8);

  const isLastCard = idx === total - 1;

  // Use motion values to drive the animation
  // Flips 90 degrees upward
  const rotateXBase = useTransform(scrollYProgress, [flipStart, flipEnd], [0, 90]);
  // Fades out as it flips
  const opacityBase = useTransform(scrollYProgress, [flipStart, flipEnd], [1 - (idx * 0.1), 0]);

  const rotateX = isLastCard ? 0 : rotateXBase;
  const opacityAnim = isLastCard ? 1 : opacityBase;

  // Content opacity: fade in card text when the card in front flips
  const prevFlipStart = (idx - 1) * step;
  const prevFlipEnd = prevFlipStart + (step * 0.8);
  const contentOpacity = useTransform(
    scrollYProgress,
    idx === 0 ? [0, 0] : [prevFlipStart, prevFlipEnd],
    idx === 0 ? [1, 1] : [0, 1]
  );

  // Date formatting helpers
  const fmtDay = (dateStr: string) => new Date(dateStr + "T00:00:00").getDate().toString().padStart(2, "0");
  const fmtMonth = (dateStr: string) => new Date(dateStr + "T00:00:00").toLocaleString("en-US", { month: "short" }).toUpperCase();

  const colors = ['#44474c', '#33363a', '#24272a', '#1a1c1e', '#121415'];
  const bgColor = colors[idx] || '#0d0e0f';
  // All cards are now dark enough that light text is better
  const textColor = '#e2e8f0';
  const dateColor = '#FFC300';

  return (
    <motion.div
      className="event-list-card"
      style={{
        position: 'absolute',
        top: 80,
        left: '5%',
        width: '90%',
        zIndex,
        scale: 1,
        y: yOffset,
        rotateX,
        opacity: opacityAnim,
        backgroundColor: bgColor,
        color: textColor,
        transformStyle: 'preserve-3d',
        transformOrigin: 'top center',
      }}
    >
      <motion.div className="event-list-info" style={{ opacity: contentOpacity }}>
        <div className="event-list-date-badge">
          <span className="event-list-day" style={{ color: dateColor }}>
            {fmtDay(ev.startDate)}
          </span>
          <span className="event-list-month" style={{ color: 'inherit', opacity: 0.8 }}>
            {fmtMonth(ev.startDate)}
          </span>
        </div>
        <div>
          <h3 className="event-list-title" style={{ color: 'inherit' }}>
            {ev.title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}
