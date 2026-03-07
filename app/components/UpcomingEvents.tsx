"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getActiveMonth, getUpcomingEvents } from "@/lib/time-logic";

/* ─── helpers ─── */

/** Format "MAR" from "2026-03-08" */
function fmtMonth(dateStr: string) {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleString("en-US", { month: "short" }).toUpperCase();
}
function fmtDay(dateStr: string) {
    return new Date(dateStr + "T00:00:00").getDate().toString().padStart(2, "0");
}
function fmtRange(start: string, end: string) {
    const s = new Date(start + "T00:00:00");
    const e = new Date(end + "T00:00:00");
    const sm = s.toLocaleString("en-US", { month: "short" });
    const em = e.toLocaleString("en-US", { month: "short" });
    return `${sm} ${s.getDate()} - ${em} ${e.getDate()}`;
}

/* ─── animation variants ─── */

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

const heroVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" as const },
    },
};

/* ─── component ─── */

export default function UpcomingEvents() {
    const now = useMemo(() => new Date(), []);
    const activeMonth = useMemo(() => getActiveMonth(now), [now]);
    const upcoming = useMemo(() => getUpcomingEvents(now, 7), [now]);

    // First event = featured hero; rest = list cards
    const featured = upcoming[0] ?? null;
    const listEvents = upcoming.slice(1, 5);

    // Stitch-generated hero image
    const featuredImage =
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBTKjMJW7wylzTpNJV8FJjtkipwWphuHo9n7_VfLEqrNlX73tBTuIwKl7GkJA3C4DddhFv_qcqf5X7-znpQWjsPgVnQsyxbscxqQD9EAjhGNG_r-aMmdA9C2qeZBQvhdanFgM0cwiU4W8phfIaZEuclEBp7NkwMgCAAPnxrx2jazH8OD4L5-1cbWTwltMLAL54G-voJh3EVh9LAL3VRTyP8IWMkNNbd0OH2vL01Szeyd3m4XqDqnTy1YIRhsQj3GZU_8CkjxNOuS8qx";

    return (
        <section className="padding-left-7vw padding-right-7vw relative w-full overflow-hidden bg-black">
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-20 lg:py-20 w-full">

                {/* ── Section Header ── */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-xl">
                        <span
                            className="font-bold tracking-widest text-xs uppercase mb-3 block"
                            style={{ color: "#FFC300" }}
                        >
                            Curated Happenings
                        </span>
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl text-white mb-4"
                            style={{ fontFamily: "'Source Serif Pro', 'ui-serif', serif" }}
                        >
                            What&apos;s Next
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Discover a seasonal collection of exclusive events, markets, and
                            celebrations hosted across our community.
                        </p>
                    </div>
                    <Link
                        href="/directory"
                        className="flex items-center font-semibold hover:gap-3 transition-all gap-2 group"
                        style={{ color: "#FFC300" }}
                    >
                        View Full Calendar
                        <span className="group-hover:translate-x-1 transition-transform text-xl">→</span>
                    </Link>
                </div>

                {/* ── Active awareness month banner ── */}
                {activeMonth && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 flex items-center gap-3 rounded-xl px-5 py-3 backdrop-blur-xl"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ background: activeMonth.themeColor }}
                        />
                        <span
                            className="text-xs font-semibold uppercase tracking-wide"
                            style={{ color: activeMonth.themeColor }}
                        >
                            This Month
                        </span>
                        <span className="text-sm font-medium text-slate-200">
                            {activeMonth.title}
                        </span>
                        <span className="ml-1 text-xs text-slate-500">
                            — {activeMonth.description}
                        </span>
                    </motion.div>
                )}

                {/* ── Main Grid Layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* LEFT Column: Event List */}
                    <motion.div
                        className="lg:col-span-5 flex flex-col gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {listEvents.map((ev, idx) => {
                            const isFirst = idx === 0;
                            return (
                                <motion.div
                                    key={ev.id}
                                    variants={cardVariants}
                                    className={`group flex items-center justify-between rounded-xl backdrop-blur-xl border transition-all cursor-pointer ${isFirst
                                        ? "p-8 bg-white/5 border-white/10 relative z-10"
                                        : "p-6 bg-white/5 border-white/10 opacity-40 scale-[0.85] origin-left"
                                        }`}
                                    style={
                                        isFirst
                                            ? { boxShadow: `0 0 30px ${ev.themeColor}26` }
                                            : undefined
                                    }
                                >
                                    <div className="flex gap-6 items-center">
                                        {/* Date badge */}
                                        <div
                                            className="flex flex-col items-center justify-center min-w-[60px] h-[70px] rounded-lg"
                                            style={{
                                                background: "#2d5757",
                                                border: "1px solid rgba(45,87,87,0.3)",
                                            }}
                                        >
                                            <span
                                                className="font-bold text-lg"
                                                style={{ color: isFirst ? ev.themeColor : "#FFC300" }}
                                            >
                                                {fmtDay(ev.startDate)}
                                            </span>
                                            <span className="text-slate-300 text-xs uppercase font-medium">
                                                {fmtMonth(ev.startDate)}
                                            </span>
                                        </div>
                                        {/* Event info */}
                                        <div>
                                            <h3 className="text-white font-bold text-lg group-hover:text-[#FFC300] transition-colors">
                                                {ev.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <span className="text-slate-600 group-hover:text-[#FFC300] transition-colors text-2xl">
                                        ›
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* RIGHT Column: Featured Event Card */}
                    {featured && (
                        <motion.div
                            className="lg:col-span-7 relative group h-full flex"
                            variants={heroVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className="relative w-full min-h-[500px] rounded-2xl overflow-hidden flex flex-col justify-end p-8 md:p-12 lg:p-16">
                                {/* Background Image with Overlay */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url('${featuredImage}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Badges + Date */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <span
                                            className="px-3 py-1 text-xs font-bold rounded uppercase tracking-widest"
                                            style={{ background: featured.themeColor, color: "#000" }}
                                        >
                                            Featured Event
                                        </span>
                                        <span className="text-white text-sm font-medium">
                                            {fmtRange(featured.startDate, featured.endDate)}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2
                                        className="text-4xl md:text-5xl text-white mb-6 leading-tight"
                                        style={{ fontFamily: "'Source Serif Pro', 'ui-serif', serif" }}
                                    >
                                        {featured.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-slate-300 max-w-lg mb-8 text-lg leading-relaxed">
                                        {featured.description}
                                    </p>

                                    {/* CTAs */}
                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            href="/directory"
                                            className="font-bold px-8 py-4 rounded-lg transition-colors flex items-center gap-2 hover:opacity-90"
                                            style={{ background: featured.themeColor, color: "#000" }}
                                        >
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
