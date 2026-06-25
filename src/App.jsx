import { useState, useEffect, useRef } from "react";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";

const CSS = `
  @import url('${FONT_URL}');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --navy: #080E1F;
    --navy2: #0D1629;
    --navy3: #111D35;
    --blue: #2563EB;
    --blue-light: #60A5FA;
    --cyan: #22D3EE;
    --gold: #F59E0B;
    --gold-light: #FCD34D;
    --white: #F9FAFB;
    --muted: #94A3B8;
    --border: rgba(96,165,250,0.15);
    --glass: rgba(13,22,41,0.7);
    --glass2: rgba(255,255,255,0.04);
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: var(--navy); color: var(--white); }
  .display { font-family: 'Space Grotesk', sans-serif; }
  .mono { font-family: 'JetBrains Mono', monospace; }

  .glass-card {
    background: var(--glass2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 16px;
    transition: all 0.3s ease;
  }
  .glass-card:hover {
    border-color: rgba(96,165,250,0.35);
    background: rgba(255,255,255,0.06);
    transform: translateY(-2px);
  }

  .btn-primary {
    background: linear-gradient(135deg, #2563EB, #1D4ED8);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 12px 28px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 24px rgba(37,99,235,0.35);
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(37,99,235,0.5); }

  .btn-ghost {
    background: transparent;
    color: var(--white);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 28px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-ghost:hover { border-color: rgba(96,165,250,0.5); background: rgba(96,165,250,0.08); }

  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
  .fade-in-delay-1 { transition-delay: 0.1s; }
  .fade-in-delay-2 { transition-delay: 0.2s; }
  .fade-in-delay-3 { transition-delay: 0.3s; }
  .fade-in-delay-4 { transition-delay: 0.4s; }

  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    color: var(--blue-light);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-label::before, .section-label::after {
    content: '';
    width: 24px;
    height: 1px;
    background: var(--blue-light);
    opacity: 0.6;
  }

  .gradient-text {
    background: linear-gradient(135deg, #60A5FA, #22D3EE, #818CF8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .gold-text {
    background: linear-gradient(135deg, #F59E0B, #FCD34D);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .skill-bar-track {
    width: 100%;
    height: 4px;
    background: rgba(255,255,255,0.08);
    border-radius: 4px;
    overflow: hidden;
  }
  .skill-bar-fill {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, #2563EB, #22D3EE);
    width: 0%;
    transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
  }

  .timeline-line {
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, rgba(96,165,250,0.6), rgba(96,165,250,0.1));
  }
  .timeline-dot {
    position: absolute;
    left: 12px;
    top: 28px;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563EB, #22D3EE);
    border: 2px solid var(--navy);
    box-shadow: 0 0 12px rgba(37,99,235,0.6);
  }

  .nav-link {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
    cursor: pointer;
  }
  .nav-link:hover { color: var(--white); }
  .nav-link.active { color: var(--blue-light); }

  .stat-number {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 36px;
    font-weight: 700;
    background: linear-gradient(135deg, #60A5FA, #22D3EE);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .service-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-bottom: 16px;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    background: rgba(37,99,235,0.12);
    border: 1px solid rgba(37,99,235,0.25);
    color: #93C5FD;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
  }

  .contact-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    color: var(--white);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .contact-input:focus { border-color: rgba(96,165,250,0.5); background: rgba(255,255,255,0.07); }
  .contact-input::placeholder { color: var(--muted); }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
    70% { transform: scale(1); box-shadow: 0 0 0 16px rgba(37,99,235,0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37,99,235,0); }
  }
  @keyframes grid-move {
    0% { background-position: 0 0; }
    100% { background-position: 40px 40px; }
  }
  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: grid-move 8s linear infinite;
  }
  .hero-glow {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    pointer-events: none;
  }
  .hero-glow-2 {
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%);
    top: 20%; right: 10%;
    pointer-events: none;
  }

  .cert-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 20px;
    transition: all 0.3s;
  }
  .cert-card:hover { border-color: rgba(245,158,11,0.4); transform: translateY(-2px); }
  .cert-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 8px rgba(245,158,11,0.5);
    flex-shrink: 0;
    margin-top: 3px;
  }

  .mobile-menu {
    position: fixed; top: 60px; left: 0; right: 0;
    background: rgba(8,14,31,0.98);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 20px;
    z-index: 998;
    display: flex; flex-direction: column; gap: 16px;
  }
  @media (max-width: 768px) {
    .hero-content { text-align: center; }
    .hero-btns { justify-content: center; }
    .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
    .services-grid { grid-template-columns: 1fr !important; }
    .skills-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .about-grid { grid-template-columns: 1fr !important; }
    .hero-avatar { display: none; }
  }
`;

const NAV_LINKS = ["About","Experience","Services","Skills","Projects","Certifications","Contact"];

const STATS = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "CRM Projects" },
  { value: 50, suffix: "+", label: "Stakeholders Managed" },
  { value: 25, suffix: "+", label: "Process Improvements" },
  { value: 100, suffix: "+", label: "Requirements Gathered" },
];

const SERVICES = [
  { icon: "📋", label: "Business Analysis", color: "#2563EB", items: ["Stakeholder Interviews","BRD & FRD Documentation","Gap Analysis","User Story Creation","Requirements Elicitation"] },
  { icon: "🔗", label: "CRM Implementation", color: "#0EA5E9", items: ["Salesforce CRM","Dynamics 365","Zoho CRM","HubSpot CRM","CRM Adoption Strategy"] },
  { icon: "⚙️", label: "Process Improvement", color: "#6366F1", items: ["Process Mapping","BPMN Documentation","Workflow Optimization","Automation Recommendations","Operational Analysis"] },
  { icon: "🚀", label: "SaaS Consulting", color: "#22D3EE", items: ["Product Demonstrations","Customer Discovery","Solution Design","User Adoption","Feedback Management"] },
  { icon: "📊", label: "Data & Reporting", color: "#F59E0B", items: ["Dashboard Design","KPI Tracking","Power BI Analytics","Excel Reporting","Business Intelligence"] },
  { icon: "🌍", label: "Go-To-Market Strategy", color: "#10B981", items: ["Competitive Analysis","Market Expansion","Customer Segmentation","Business Development"] },
];

const SKILL_GROUPS = [
  { title: "Business Analysis", skills: [
    { name: "Requirements Gathering", pct: 92 },
    { name: "Stakeholder Management", pct: 88 },
    { name: "Process Mapping / BPMN", pct: 85 },
    { name: "BRD Documentation", pct: 90 },
    { name: "Gap Analysis", pct: 87 },
  ]},
  { title: "CRM & SaaS", skills: [
    { name: "Salesforce CRM", pct: 82 },
    { name: "Microsoft Dynamics 365", pct: 75 },
    { name: "Zoho / HubSpot CRM", pct: 80 },
    { name: "SaaS Consulting", pct: 88 },
    { name: "CRM Adoption Strategy", pct: 85 },
  ]},
  { title: "Data & Analytics", skills: [
    { name: "Microsoft Excel", pct: 90 },
    { name: "Power BI", pct: 78 },
    { name: "Data Visualization", pct: 80 },
    { name: "KPI Reporting", pct: 88 },
    { name: "Data Science Fundamentals", pct: 72 },
  ]},
  { title: "Agile & Project Management", skills: [
    { name: "Agile / Scrum", pct: 82 },
    { name: "Jira & Backlog Management", pct: 78 },
    { name: "Sprint Planning", pct: 80 },
    { name: "Cross-functional Collaboration", pct: 90 },
  ]},
];

const EXPERIENCE = [
  {
    company: "EA Tech Corporation Pvt Ltd",
    role: "Business Development Executive",
    period: "Jan 2026 – Present",
    location: "Bhubaneswar, Odisha",
    current: true,
    highlights: [
      "Conducted discovery & requirement gathering sessions with SME clients across South Africa",
      "Documented functional & business requirements for CRM implementations",
      "Performed AS-IS and TO-BE business process analysis",
      "Delivered tailored SaaS product demonstrations for EazzQuote & EazzHR",
      "Tracked sales pipeline metrics and business performance indicators",
      "Executed B2B lead generation via LinkedIn and strategic prospecting",
    ],
  },
  {
    company: "Suprit IT Infoways Pvt Ltd (IndiaMART Partner)",
    role: "Client Acquisition Executive",
    period: "Jul 2025 – Jan 2026",
    location: "Bhubaneswar, Odisha",
    current: false,
    highlights: [
      "Conducted client needs assessments and solution consulting",
      "Developed client-focused proposals and onboarding documentation",
      "Built qualified B2B sales pipelines through market research",
      "Applied consultative selling to understand business requirements",
      "Achieved client acquisition and business growth targets",
    ],
  },
];

const CERTS = [
  { title: "Data Science Certification", issuer: "NareshIT, Hyderabad", year: "2023–2024", color: "#2563EB" },
  { title: "CRM Implementation Training", issuer: "Professional Development", year: "2024", color: "#0EA5E9" },
  { title: "Business Analysis Programs", issuer: "Online Learning Platforms", year: "Ongoing", color: "#6366F1" },
  { title: "Agile & Scrum Fundamentals", issuer: "Agile Alliance", year: "2024", color: "#22D3EE" },
  { title: "Salesforce CRM (In Progress)", issuer: "Salesforce Trailhead", year: "2025", color: "#F59E0B" },
];

function useIntersect(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimCounter({ target, suffix, active }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
      setVal(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return <span>{val}{suffix}</span>;
}

function SkillBar({ name, pct, visible }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "#CBD5E1" }}>{name}</span>
        <span className="mono" style={{ fontSize: 12, color: "#60A5FA" }}>{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: visible ? `${pct}%` : "0%" }} />
      </div>
    </div>
  );
}

function Section({ id, children, style }) {
  const [ref, visible] = useIntersect();
  return (
    <section id={id} ref={ref} style={{ padding: "80px 0", ...style }}>
      <div className={`fade-in ${visible ? "visible" : ""}`} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {children}
      </div>
    </section>
  );
}

function SectionHeader({ label, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <span className="section-label">{label}</span>
      </div>
      <h2 className="display" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>{title}</h2>
      {sub && <p style={{ color: "#94A3B8", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const statsRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.1 });
    if (statsRef.current) o1.observe(statsRef.current);
    if (skillsRef.current) o2.observe(skillsRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sections = ["about","experience","services","skills","projects","certifications","contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) { setActiveNav(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleForm = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy)", overflowX: "hidden" }}>
      <style>{CSS}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: "rgba(8,14,31,0.85)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid var(--border)", height: 60,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div className="display" style={{ fontWeight: 700, fontSize: 18 }}>
            <span className="gradient-text">Pritam's</span>
            <span style={{ color: "#9ade12", marginLeft: 6, fontSize: 17, fontWeight: 400 }}>· Portfolio</span>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV_LINKS.map(n => (
              <span key={n} className={`nav-link ${activeNav === n.toLowerCase() ? "active" : ""}`}
                onClick={() => scrollTo(n.toLowerCase())}
                style={{ display: window.innerWidth < 768 ? "none" : "block" }}>
                {n}
              </span>
            ))}
            <button className="btn-primary" onClick={() => scrollTo("contact")}
              style={{ padding: "8px 18px", fontSize: 13 }}>
              Hire Me
            </button>
            <button onClick={() => setMenuOpen(m => !m)} style={{ background: "none", border: "none", color: "var(--white)", cursor: "pointer", fontSize: 22, display: "flex" }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(n => (
            <span key={n} className="nav-link" style={{ fontSize: 16, padding: "4px 0" }} onClick={() => scrollTo(n.toLowerCase())}>{n}</span>
          ))}
        </div>
      )}

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 60 }}>
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />

        {/* Decorative orb top-right */}
        <div style={{ position: "absolute", top: 100, right: "8%", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.2)", animation: "spin-slow 20s linear infinite" }} />
        <div style={{ position: "absolute", top: 140, right: "12%", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(34,211,238,0.15)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
            <div className="hero-content">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#10B981", animation: "pulse-ring 2s infinite" }} />
                <span className="mono" style={{ color: "#94A3B8", fontSize: 13 }}>Available for opportunities</span>
              </div>

              <h1 className="display" style={{ fontSize: "clamp(25px,4vw,34px)", fontWeight: 700, lineHeight: 2.1, marginBottom: 17 }}>
                <span style={{ display: "block", color: "var(--white)" }}>Pritam Narayan Behera</span>
                
              </h1>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {["Business Analyst","CRM Consultant","SaaS Specialist","Digital Transformation"].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.8, maxWidth: 580, marginBottom: 36 }}>
                Results-driven professional bridging business objectives with technology-driven solutions — specializing in CRM implementation, process optimization, and stakeholder collaboration to deliver measurable outcomes.
              </p>

              <div className="hero-btns" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <button className="btn-primary" onClick={() => scrollTo("projects")}>
                  <span>↗</span> View Projects
                </button>
                <a className="btn-ghost" href="mailto:pritamnarayan771@gmail.com">
                  <span>✉</span> Let's Connect
                </a>
                <button className="btn-ghost" onClick={() => scrollTo("about")}>
                  <span>↓</span> Learn More
                </button>
              </div>
            </div>

            {/* Avatar card */}
            <div className="hero-avatar" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <div style={{
                position: "relative", width: 220, height: 220,
                animation: "float 5s ease-in-out infinite",
              }}>
                <div style={{
                  width: "100%", height: "100%", borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(34,211,238,0.2))",
                  border: "2px solid rgba(96,165,250,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden",
                  backdropFilter: "blur(10px)",
                }}>
<img
  src="/profile.png"
  alt="Pritam Narayan Behera"
  style={{
    width: "100%",
    height: "160%",
    objectFit: "cover",
    objectPosition: "50% 20%",
    borderRadius: "50%",
  }}
/>
                </div>
                <div style={{ position: "absolute", bottom: 10, right: 10, background: "#10B981", borderRadius: "50%", width: 20, height: 20, border: "2px solid var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✓</div>
              </div>

              {/* Mini stat pills */}
              {[
                { emoji: "🏆", val: "2+ yrs", label: "Experience" },
                { emoji: "⚡", val: "10+", label: "CRM Projects" },
              ].map(s => (
                <div key={s.label} className="glass-card" style={{ padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{s.emoji}</span>
                  <div>
                    <div className="display" style={{ fontWeight: 700, fontSize: 16, color: "#60A5FA" }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, marginTop: 64 }}>
            {STATS.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: "20px 16px", textAlign: "center" }}>
                <div className="stat-number">
                  <AnimCounter target={s.value} suffix={s.suffix} active={statsVisible} />
                </div>
                <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <SectionHeader label="About Me" title={<>The Person Behind the <span className="gradient-text">Analysis</span></>}
          sub="Bridging business objectives with technology-driven solutions through data, CRM systems, and strategic thinking." />
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <h3 className="display" style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#F9FAFB" }}>Professional Focus</h3>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
              I'm a Business Analyst and CRM Implementation Professional with a strong academic foundation in Mathematics, Operations Management, Information Technology, and Data Science. My work bridges the gap between business strategy and technology execution.
            </p>
            <p style={{ color: "#94A3B8", lineHeight: 1.8, fontSize: 15 }}>
              Currently at EA Tech Corporation, I help SME clients across South Africa implement and adopt CRM solutions, gather business requirements, and transform their operational processes for measurable efficiency gains.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
              {["Business Requirement Analysis","CRM Consulting","Digital Transformation","Process Improvement","SaaS Strategy","Data Analytics","Stakeholder Management","Agile Delivery"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="display" style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: "#F9FAFB" }}>Education</h3>
            {[
              { degree: "B.Sc. Mathematics", inst: "Netaji Subhas Memorial City College", period: "2016 – 2019", icon: "📐" },
              { degree: "MBA · Operations & IT", inst: "Regional College of Management", period: "2020 – 2022", icon: "🎓" },
              { degree: "Data Science Certification", inst: "NareshIT, Hyderabad", period: "2023 – 2024", icon: "📊" },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20, padding: "16px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 12 }}>
                <div style={{ fontSize: 28 }}>{e.icon}</div>
                <div>
                  <div className="display" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{e.degree}</div>
                  <div style={{ color: "#60A5FA", fontSize: 13, marginBottom: 3 }}>{e.inst}</div>
                  <div className="mono" style={{ color: "#94A3B8", fontSize: 12 }}>{e.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" style={{ background: "linear-gradient(180deg, var(--navy) 0%, var(--navy2) 100%)" }}>
        <SectionHeader label="Experience" title={<>Professional <span className="gradient-text">Journey</span></>}
          sub="A track record of driving business growth and operational excellence across CRM, SaaS, and process transformation." />

        <div style={{ position: "relative", paddingLeft: 48 }}>
          <div className="timeline-line" />
          {EXPERIENCE.map((exp, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 40 }}>
              <div className="timeline-dot" />
              <div className="glass-card" style={{ padding: "28px 28px 24px", marginLeft: 16 }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <h3 className="display" style={{ fontSize: 18, fontWeight: 700 }}>{exp.company}</h3>
                      {exp.current && <span style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#10B981", fontSize: 11, padding: "2px 10px", borderRadius: 20, fontWeight: 500 }}>Current</span>}
                    </div>
                    <div style={{ color: "#60A5FA", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{exp.role}</div>
                    <div style={{ color: "#94A3B8", fontSize: 13 }}>📍 {exp.location}</div>
                  </div>
                  <span className="mono" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", color: "#93C5FD", fontSize: 12, padding: "6px 14px", borderRadius: 8, whiteSpace: "nowrap" }}>{exp.period}</span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {exp.highlights.map((h, j) => (
                    <li key={j} style={{ display: "flex", gap: 10, color: "#CBD5E1", fontSize: 14, lineHeight: 1.6 }}>
                      <span style={{ color: "#2563EB", marginTop: 2, flexShrink: 0 }}>▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services">
        <SectionHeader label="Services" title={<>What I <span className="gradient-text">Deliver</span></>}
          sub="End-to-end business analysis and CRM consulting services designed to transform your operations." />
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: "24px 22px" }}>
              <div className="service-icon" style={{ background: `${s.color}22` }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
              </div>
              <h3 className="display" style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>{s.label}</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                {s.items.map((it, j) => (
                  <li key={j} style={{ fontSize: 13, color: "#94A3B8", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" style={{ background: "linear-gradient(180deg, var(--navy) 0%, var(--navy2) 100%)" }}>
        <SectionHeader label="Skills" title={<>Areas of <span className="gradient-text">Expertise</span></>}
          sub="Proficiency across business analysis, CRM platforms, data tools, and agile methodologies." />
        <div ref={skillsRef} className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 28 }}>
          {SKILL_GROUPS.map((g, i) => (
            <div key={i} className="glass-card" style={{ padding: "24px 22px" }}>
              <h3 className="display" style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, color: "#60A5FA" }}>{g.title}</h3>
              {g.skills.map((sk, j) => <SkillBar key={j} name={sk.name} pct={sk.pct} visible={skillsVisible} />)}
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <SectionHeader label="Featured Project" title={<>Case Study: <span className="gradient-text">CRM Transformation</span></>}
          sub="A deep-dive into a real enterprise CRM rollout — from requirements to results." />

        <div className="glass-card" style={{ padding: "36px 32px", border: "1px solid rgba(37,99,235,0.3)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 28 }}>
            <div>
              <span className="tag" style={{ marginBottom: 12, display: "inline-block" }}>Enterprise CRM</span>
              <h3 className="display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Enterprise EazzQuote CRM Rollout</h3>
              <p style={{ color: "#60A5FA", fontSize: 14 }}>CRM Business Analyst / Implementation Consultant</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Salesforce Sales Cloud","Salesforce Service Cloud","Data Loader","Excel","Jira","Power BI"].map(t => (
                <span key={t} style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#FCD34D", fontSize: 11, padding: "4px 10px", borderRadius: 6, fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>

          <p style={{ color: "#CBD5E1", lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>
            Led a comprehensive CRM transformation initiative to modernize sales operations, customer service workflows, and business reporting capabilities for a growing B2B organization.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
            <div>
              <h4 className="display" style={{ fontWeight: 600, fontSize: 15, marginBottom: 14, color: "#F9FAFB" }}>Key Responsibilities</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {["Gathered and documented business requirements","Configured lead, opportunity & case management","Migrated customer data from legacy systems","Designed KPI dashboards and reports","Coordinated stakeholder engagement","Supported user adoption and training"].map(r => (
                  <li key={r} style={{ display: "flex", gap: 10, color: "#94A3B8", fontSize: 14 }}>
                    <span style={{ color: "#2563EB", flexShrink: 0 }}>▸</span>{r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="display" style={{ fontWeight: 600, fontSize: 15, marginBottom: 14, color: "#F9FAFB" }}>Business Impact</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { metric: "40%", label: "Reduction in manual data entry" },
                  { metric: "↑ High", label: "CRM adoption rates" },
                  { metric: "360°", label: "Sales pipeline visibility" },
                  { metric: "✓", label: "Lead conversion tracking accuracy" },
                  { metric: "↑", label: "Operational reporting quality" },
                ].map(m => (
                  <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(37,99,235,0.08)", borderRadius: 8, border: "1px solid rgba(37,99,235,0.15)" }}>
                    <span className="display" style={{ fontWeight: 700, color: "#60A5FA", fontSize: 18, minWidth: 44 }}>{m.metric}</span>
                    <span style={{ color: "#94A3B8", fontSize: 13 }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications" style={{ background: "linear-gradient(180deg, var(--navy2) 0%, var(--navy) 100%)" }}>
        <SectionHeader label="Certifications" title={<>Credentials & <span className="gold-text">Achievements</span></>}
          sub="Continuous learning through formal certifications and professional development programs." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
          {CERTS.map((c, i) => (
            <div key={i} className="cert-card">
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div className="cert-dot" style={{ background: c.color, boxShadow: `0 0 8px ${c.color}66` }} />
                <div>
                  <div className="display" style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{c.title}</div>
                  <div style={{ color: "#94A3B8", fontSize: 13, marginBottom: 4 }}>{c.issuer}</div>
                  <div className="mono" style={{ color: "#F59E0B", fontSize: 12 }}>{c.year}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <SectionHeader label="Contact" title={<>Let's <span className="gradient-text">Connect</span></>}
          sub="Open to Business Analysis, CRM Consulting, SaaS Implementation, and Digital Transformation opportunities." />

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40 }}>
          {/* Contact info */}
          <div>
            <div className="glass-card" style={{ padding: "28px 24px", marginBottom: 20 }}>
              {[
                { icon: "✉", label: "Email", value: "pritamnarayan771@gmail.com", href: "mailto:pritamnarayan771@gmail.com" },
                { icon: "📞", label: "Phone", value: "+91 7978795384", href: "tel:+917978795384" },
                { icon: "📍", label: "Location", value: "Bhubaneswar, Odisha, India" },
                { icon: "🔗", label: "LinkedIn", value: "linkedin.com/in/pritamnarayan", href: "https://www.linkedin.com/in/pritamnarayan/" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 3 ? 20 : 0, padding: i < 3 ? "0 0 20px" : 0, borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(37,99,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ color: "#94A3B8", fontSize: 12, marginBottom: 3 }}>{c.label}</div>
                    {c.href ? (
                      <a href={c.href} style={{ color: "#60A5FA", fontSize: 14, textDecoration: "none" }}>{c.value}</a>
                    ) : (
                      <div style={{ color: "#F9FAFB", fontSize: 14 }}>{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card" style={{ padding: "20px 24px" }}>
              <h4 className="display" style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Open to Opportunities</h4>
              {["Business Analyst","CRM Consultant","SaaS Implementation","Digital Transformation","Process Improvement"].map(r => (
                <div key={r} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", color: "#94A3B8", fontSize: 13 }}>
                  <span style={{ color: "#10B981" }}>✓</span> {r}
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="glass-card" style={{ padding: "28px 28px" }}>
            <h3 className="display" style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}>Send a Message</h3>
            {formSent ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h4 className="display" style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: "#10B981" }}>Message Sent!</h4>
                <p style={{ color: "#94A3B8" }}>Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleForm}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ color: "#94A3B8", fontSize: 12, display: "block", marginBottom: 6 }}>Name</label>
                    <input className="contact-input" placeholder="Your Name" value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
                  </div>
                  <div>
                    <label style={{ color: "#94A3B8", fontSize: 12, display: "block", marginBottom: 6 }}>Email</label>
                    <input className="contact-input" type="email" placeholder="your@email.com" value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required />
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ color: "#94A3B8", fontSize: 12, display: "block", marginBottom: 6 }}>Subject</label>
                  <input className="contact-input" placeholder="CRM Consultation / Business Analysis Opportunity" value={formData.subject}
                    onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} required />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ color: "#94A3B8", fontSize: 12, display: "block", marginBottom: 6 }}>Message</label>
                  <textarea className="contact-input" rows={5} placeholder="Tell me about your project or opportunity..." value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} required
                    style={{ resize: "vertical", minHeight: 120 }} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="display" style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
            <span className="gradient-text">Pritam Narayan Behera</span>
          </div>
          <p style={{ color: "#d4e70b", fontSize: 13, marginBottom: 16 }}>Business Analyst · CRM Consultant · Digital Transformation Professional</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 20 }}>
            {NAV_LINKS.map(n => (
              <span key={n} style={{ color: "#64748B", fontSize: 13, cursor: "pointer" }} onClick={() => scrollTo(n.toLowerCase())}>{n}</span>
            ))}
          </div>
          <p style={{ color: "#eeee0c", fontSize: 12 }}>© {new Date().getFullYear()} Pritam Narayan Behera. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}