"use client";
import Link from "next/link";
import Header from "../header";
import Footer from "../footer";

interface HotlineEntry {
  name: string;
  number: string;
  hours: string;
  description: string;
  sms?: string;
  chat?: string;
}

interface HotlineCategory {
  category: string;
  icon: string;
  color: string;
  entries: HotlineEntry[];
}

const HOTLINES: HotlineCategory[] = [
  {
    category: "Mental Health & Suicide Prevention",
    icon: "🧠",
    color: "#A78BFA",
    entries: [
      {
        name: "988 Suicide & Crisis Lifeline",
        number: "988",
        hours: "24/7",
        description: "Call or text 988 for free, confidential support for people in distress. Serves the entire US including Washington State.",
        sms: "Text HOME to 988",
        chat: "988lifeline.org",
      },
      {
        name: "Crisis Connections (King County)",
        number: "866-427-4747",
        hours: "24/7",
        description: "Local King County crisis line providing immediate support, assessment, and referrals for mental health and substance use crises.",
      },
      {
        name: "Teen Link (WA State)",
        number: "866-833-6546",
        hours: "6 PM – 10 PM daily",
        description: "Peer support line for teens in Washington State, staffed by trained teen volunteers. Also available via online chat.",
        sms: "Text TEEN to 839863",
        chat: "teenlink.org",
      },
    ],
  },
  {
    category: "Domestic Violence & Sexual Assault",
    icon: "🛡️",
    color: "#F87171",
    entries: [
      {
        name: "National DV Hotline",
        number: "800-799-7233",
        hours: "24/7",
        description: "Confidential support for anyone affected by domestic violence. TTY: 800-787-3224. Offers safety planning, resources, and referrals.",
        sms: "Text START to 88788",
        chat: "thehotline.org",
      },
      {
        name: "DAWN (Domestic Abuse Women's Network)",
        number: "425-656-7867",
        hours: "24/7",
        description: "Eastside King County's DV shelter and advocacy organization serving the Sammamish and Bellevue area. Safe housing referrals available.",
      },
      {
        name: "RAINN Sexual Assault Hotline",
        number: "800-656-4673",
        hours: "24/7",
        description: "National sexual assault hotline connecting callers to local rape crisis centers. Confidential support and local referrals.",
        chat: "rainn.org/get-help",
      },
    ],
  },
  {
    category: "Substance Use & Recovery",
    icon: "💊",
    color: "#34D399",
    entries: [
      {
        name: "SAMHSA National Helpline",
        number: "800-662-4357",
        hours: "24/7",
        description: "Free, confidential information and treatment referrals for substance use disorders. Service available in English and Spanish.",
      },
      {
        name: "Washington Recovery Help Line",
        number: "866-789-1511",
        hours: "24/7",
        description: "State-wide helpline for substance use, problem gambling, and mental health. Connects callers to local WA treatment resources.",
        chat: "warecoveryhelpline.org",
      },
    ],
  },
  {
    category: "Child & Youth Safety",
    icon: "👶",
    color: "#FBBF24",
    entries: [
      {
        name: "Childhelp National Child Abuse Hotline",
        number: "800-422-4453",
        hours: "24/7",
        description: "Immediate crisis intervention, information, and referrals. Staffed by professional crisis counselors. TTY available.",
        sms: "Text HELLO to 898764",
      },
      {
        name: "WA Child Protective Services",
        number: "800-422-7828",
        hours: "24/7",
        description: "Report child abuse or neglect in Washington State. DCYF will assess and respond to reports of children at risk of harm.",
      },
      {
        name: "Eastside Baby Corner",
        number: "425-865-0234",
        hours: "Mon–Fri, 9 AM – 4 PM",
        description: "Sammamish-area nonprofit providing essential supplies (diapers, clothing, baby gear) to families in need on the Eastside.",
      },
    ],
  },
  {
    category: "Food & Housing Emergencies",
    icon: "🏠",
    color: "#0EA5E9",
    entries: [
      {
        name: "211 United Way (King County)",
        number: "211",
        hours: "24/7",
        description: "Dial 2-1-1 to connect with local food banks, shelters, utility assistance, and other social services in King County.",
        chat: "wa211.org",
      },
      {
        name: "Hopelink (Eastside)",
        number: "425-943-6700",
        hours: "Mon–Fri, 8 AM – 5 PM",
        description: "Sammamish-area emergency food bank, rental assistance, and transportation support for residents in crisis.",
      },
      {
        name: "Emergency Shelter (King County)",
        number: "206-374-9000",
        hours: "24/7",
        description: "King County emergency shelter placement for individuals and families experiencing homelessness.",
      },
    ],
  },
  {
    category: "Emergency Services",
    icon: "🚨",
    color: "#F87171",
    entries: [
      {
        name: "Emergency (Police / Fire / EMS)",
        number: "911",
        hours: "24/7",
        description: "For immediate life-threatening emergencies only. Call 911 for police, fire, or medical emergencies in Sammamish.",
      },
      {
        name: "Sammamish Police (Non-Emergency)",
        number: "425-577-5656",
        hours: "24/7",
        description: "For non-emergency police matters in Sammamish, WA. Use when a situation is urgent but not immediately life-threatening.",
      },
      {
        name: "Poison Control Center",
        number: "800-222-1222",
        hours: "24/7",
        description: "Immediate expert guidance for poisoning emergencies — medications, household chemicals, plants, and more. Free and confidential.",
      },
    ],
  },
];

export default function CrisisPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#244747", color: "white", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .cr-page { min-height: 100vh; background: #244747; }
        .cr-hero { padding: 120px 48px 60px; max-width: 900px; margin: 0 auto; text-align: center; }
        .cr-label { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #F87171; background: rgba(248,113,113,0.12); border: 1px solid rgba(248,113,113,0.3); padding: 5px 14px; border-radius: 999px; margin-bottom: 24px; }
        .cr-title { font-family: 'Source Serif Pro', serif; font-size: 48px; font-weight: 600; color: #FFF4D2; line-height: 1.15; margin-bottom: 20px; }
        .cr-subtitle { font-size: 16px; line-height: 1.7; color: rgba(255,244,210,0.7); max-width: 600px; margin: 0 auto 40px; }
        .cr-911 { display: inline-flex; align-items: center; gap: 10px; background: #F87171; color: white; font-size: 18px; font-weight: 800; padding: 14px 32px; border-radius: 12px; text-decoration: none; letter-spacing: .02em; transition: background 0.2s; }
        .cr-911:hover { background: #ef4444; }
        .cr-body { max-width: 960px; margin: 0 auto; padding: 0 48px 80px; }
        .cr-section { margin-bottom: 48px; }
        .cr-section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,244,210,0.1); }
        .cr-section-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .cr-section-title { font-family: 'Source Serif Pro', serif; font-size: 22px; color: #FFF4D2; font-weight: 600; }
        .cr-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .cr-card { background: rgba(20,39,39,0.9); border: 1px solid rgba(255,244,210,0.1); border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 8px; transition: border-color 0.2s; }
        .cr-card:hover { border-color: rgba(255,244,210,0.22); }
        .cr-card-name { font-size: 15px; font-weight: 700; color: #FFF4D2; line-height: 1.3; }
        .cr-card-number { font-size: 22px; font-weight: 800; letter-spacing: .02em; text-decoration: none; transition: opacity 0.15s; }
        .cr-card-number:hover { opacity: 0.8; }
        .cr-card-hours { font-size: 11px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; color: rgba(255,244,210,0.4); }
        .cr-card-desc { font-size: 13px; line-height: 1.6; color: rgba(255,244,210,0.65); margin-top: 4px; }
        .cr-card-extras { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
        .cr-extra-pill { font-size: 11px; padding: 3px 10px; border-radius: 999px; background: rgba(255,255,255,0.06); color: rgba(255,244,210,0.6); border: 1px solid rgba(255,255,255,0.1); }
        .cr-disclaimer { max-width: 960px; margin: 0 auto; padding: 0 48px 80px; }
        .cr-disclaimer-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,244,210,0.1); border-radius: 12px; padding: 20px 24px; font-size: 13px; color: rgba(255,244,210,0.5); line-height: 1.7; }
        @media (max-width: 768px) {
          .cr-hero { padding: 100px 24px 48px; }
          .cr-title { font-size: 32px; }
          .cr-body { padding: 0 24px 60px; }
          .cr-disclaimer { padding: 0 24px 60px; }
          .cr-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cr-page">
        <Header />

        {/* Hero */}
        <div className="cr-hero">
          <div className="cr-label">Crisis Resources</div>
          <h1 className="cr-title">You Are Not Alone</h1>
          <p className="cr-subtitle">
            If you or someone you know is in crisis, help is available right now.
            Sammamish Circle has compiled trusted local and national hotlines for our community.
          </p>
          <a href="tel:911" className="cr-911">
            🚨 Call 911 for Life-Threatening Emergencies
          </a>
        </div>

        {/* Hotline Categories */}
        <div className="cr-body">
          {HOTLINES.map((section) => (
            <div key={section.category} className="cr-section">
              <div className="cr-section-header">
                <div className="cr-section-icon" style={{ background: `${section.color}22` }}>
                  {section.icon}
                </div>
                <h2 className="cr-section-title">{section.category}</h2>
              </div>

              <div className="cr-cards">
                {section.entries.map((entry) => (
                  <div key={entry.name} className="cr-card">
                    <div className="cr-card-name">{entry.name}</div>
                    <a
                      href={`tel:${entry.number.replace(/[^0-9]/g, "")}`}
                      className="cr-card-number"
                      style={{ color: section.color }}
                    >
                      {entry.number}
                    </a>
                    <div className="cr-card-hours">{entry.hours}</div>
                    <p className="cr-card-desc">{entry.description}</p>
                    {(entry.sms || entry.chat) && (
                      <div className="cr-card-extras">
                        {entry.sms && <span className="cr-extra-pill">💬 {entry.sms}</span>}
                        {entry.chat && <span className="cr-extra-pill">🌐 {entry.chat}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="cr-disclaimer">
          <div className="cr-disclaimer-box">
            <strong style={{ color: "rgba(255,244,210,0.75)" }}>Note:</strong> Sammamish Circle compiles
            this information as a community resource. Phone numbers and hours may change — please verify
            with the organization directly if needed. In an immediate emergency, always call 911.
            If you have suggestions for additional resources, please use our{" "}
            <Link href="/submit" style={{ color: "#FFC300", textDecoration: "underline" }}>Submit a Resource</Link> page.
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
