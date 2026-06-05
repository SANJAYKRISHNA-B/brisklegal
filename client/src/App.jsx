import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Who We Are", path: "/who-we-are" },
  { label: "Mission", path: "/mission" },
  { label: "Practice Areas", path: "/practice-areas" },
  { label: "Approach", path: "/approach" },
  { label: "Clients", path: "/clients" },
  { label: "Contact", path: "/contact" }
];

const authNavItems = [
  { label: "Sign In", path: "/signin" }
];

const missionParagraphs = [
  "BriskLegal exists to deliver integrated, precise, and outcome-oriented professional solutions that bridge the traditional divide between law, business, and finance. By bringing together Advocates, Company Secretaries, and Chartered Accountants, the firm provides a comprehensive advisory framework that addresses litigation, corporate structuring, regulatory compliance, taxation, governance, and financial planning as interconnected dimensions of a client's needs. Every engagement is approached with a commitment to clarity, strategic thinking, and execution-driven advice that supports both immediate resolution and long-term stability.",
  "The firm's mission is anchored in professional integrity, responsiveness, and deep domain expertise. BriskLegal is committed to safeguarding client interests through meticulous legal drafting, informed representation, and proactive compliance advisory across diverse statutory and regulatory regimes. Whether assisting with dispute resolution, corporate governance, or financial structuring, the firm seeks to provide solutions that are practical, defensible, and aligned with evolving legal and commercial realities.",
  "Equally, the firm is dedicated to advancing knowledge, strengthening institutional governance, and expanding access to legal awareness. Through research initiatives, professional training, technology-enabled services, and community engagement, BriskLegal aims to contribute to a more informed and compliant business environment while maintaining the highest standards of professional accountability and client confidentiality."
];

const introduction = [
  "BriskLegal is a multidisciplinary professional services firm providing integrated legal, regulatory, and business advisory solutions. By combining legal expertise with corporate governance and financial insight, we offer clients a structured and comprehensive approach to addressing complex legal and commercial challenges.",
  "Our firm operates at the intersection of law, compliance, and business strategy. We assist individuals, entrepreneurs, and organizations in managing risk, structuring operations, resolving disputes, and maintaining regulatory discipline. Every engagement is driven by precision, clarity, and an execution-focused mindset."
];

const whyBrisk = [
  {
    title: "Integrated Advisory Framework",
    copy: "Legal, governance, and financial expertise working together under one institutional structure."
  },
  {
    title: "Business-Oriented Legal Strategy",
    copy: "Advice that aligns with commercial realities, operational priorities, and long-term growth plans."
  },
  {
    title: "Preventive and Risk-Focused Thinking",
    copy: "Emphasis on compliance, documentation, and structured decision-making to minimize future disputes."
  },
  {
    title: "Execution-Driven Practice",
    copy: "Solutions designed for implementation, not theory."
  },
  {
    title: "Professional Integrity and Confidentiality",
    copy: "Every matter handled with discretion, responsibility, and institutional discipline."
  }
];

const practiceAreas = [
  {
    title: "Litigation & Dispute Resolution",
    summary:
      "Representation and strategic advisory across civil, commercial, criminal, and regulatory disputes. The firm supports clients from pre-litigation assessment to trial and appellate proceedings, including arbitration and mediation.",
    details: [
      "BriskLegal's disputes practice is structured around strategy, precision, and outcome-driven representation. The firm advises and represents clients across civil, commercial, criminal, regulatory, and tax disputes, handling matters from the pre-litigation stage through trial and appellate proceedings.",
      "The team is equipped to manage complex commercial conflicts, recovery actions, contractual disputes, property matters, white-collar issues, and regulatory proceedings. Alongside courtroom advocacy, the practice places strong emphasis on arbitration, mediation, and structured settlement negotiations."
    ]
  },
  {
    title: "Corporate & Commercial Advisory",
    summary:
      "Business structuring, contract drafting and negotiation, transaction support, joint venture documentation, and commercial risk allocation frameworks.",
    details: [
      "The corporate practice at BriskLegal is designed to function as a long-term legal partner to businesses at every stage of growth. The firm advises on structuring, governance, investments, transactions, and operational frameworks, aligning legal architecture with commercial strategy.",
      "The team assists with incorporation, joint ventures, shareholder arrangements, business restructuring, commercial contracts, and transaction documentation with emphasis on risk allocation, enforceability, and clarity."
    ]
  },
  {
    title: "Corporate Governance & Compliance",
    summary:
      "Advisory on governance structures, board processes, statutory compliance, regulatory filings, and institutional policy frameworks for companies and business entities.",
    details: [
      "This practice is dedicated to strengthening internal governance systems and ensuring strict adherence to statutory and procedural requirements.",
      "The firm advises on board processes, statutory filings, compliance audits, policy frameworks, governance protocols, statutory records, and internal compliance mechanisms for companies, LLPs, and institutional entities."
    ]
  },
  {
    title: "Taxation & Financial Advisory",
    summary:
      "Strategic support on tax planning, compliance structuring, financial documentation, and regulatory representation, aligned with business and operational objectives.",
    details: [
      "BriskLegal provides integrated support on tax and financial matters, recognizing that legal and fiscal considerations are inseparable in modern business operations.",
      "The firm supports clients with transaction planning, financial documentation, regulatory alignment, and representation in tax-related proceedings."
    ]
  },
  {
    title: "Insolvency, Restructuring & Recovery",
    summary:
      "Advisory on financial distress, recovery strategy, enforcement actions, and structured resolution frameworks for creditors and business entities.",
    details: [
      "The insolvency and restructuring practice focuses on preserving value, managing financial distress, and protecting stakeholder interests.",
      "The team assists with debt recovery, enforcement actions, resolution strategy, and stakeholder negotiations, ensuring that the legal approach remains commercially pragmatic."
    ]
  },
  {
    title: "Property & Real Estate Law",
    summary:
      "Title due diligence, transactional documentation, ownership structuring, and dispute management relating to real estate and property assets.",
    details: [
      "BriskLegal provides comprehensive legal support for property transactions, ownership structuring, and real estate disputes.",
      "Services include title due diligence, transaction documentation, advisory on ownership rights, and representation in property-related disputes."
    ]
  },
  {
    title: "Intellectual Property Advisory",
    summary:
      "Protection, structuring, and enforcement of brand and proprietary rights, including advisory on commercialization and risk management.",
    details: [
      "The intellectual property practice is focused on the protection, commercialization, and enforcement of intangible assets.",
      "The firm assists with registration strategy, licensing arrangements, assignment structures, and enforcement measures."
    ]
  },
  {
    title: "Labour & Employment Law Advisory",
    summary:
      "Employment contracts, HR policies, workplace governance, workforce restructuring, compliance audits, and advisory under India's consolidated Labour Codes.",
    details: [
      "BriskLegal advises organizations on the full spectrum of labour and employment matters, with a strong focus on regulatory compliance, workforce structuring, and risk prevention.",
      "The practice supports employment contracts, service rules, HR policies, disciplinary procedures, workplace governance frameworks, employee disputes, termination processes, restructuring, and compliance audits."
    ]
  },
  {
    title: "Estate Planning & Succession Advisory",
    summary:
      "Structuring wills, trusts, and family arrangements to enable smooth transition and protection of personal and business assets.",
    details: [
      "This practice assists individuals, families, and business owners in structuring the protection and transfer of assets.",
      "The firm supports clients in creating wills, trusts, and family arrangements and also addresses succession disputes and related proceedings."
    ]
  },
  {
    title: "Regulatory Advisory & Representation",
    summary:
      "Advisory on statutory compliance and representation before regulatory authorities and tribunals across corporate and commercial matters.",
    details: [
      "BriskLegal provides focused advisory on navigating regulatory environments and interacting with statutory authorities.",
      "The team assists in regulatory filings, responses to notices, licensing matters, and representation before authorities and tribunals."
    ]
  },
  {
    title: "Retainer & General Counsel Services",
    summary:
      "Continuous legal oversight, contract review, compliance monitoring, risk assessment, dispute prevention, and day-to-day advisory.",
    details: [
      "BriskLegal offers structured retainer-based advisory to businesses seeking continuous legal oversight and proactive risk management.",
      "This model enables businesses to anticipate legal challenges, strengthen governance practices, and operate with consistent legal support aligned to long-term objectives."
    ]
  }
];

const approachSteps = [
  {
    title: "Understanding the Requirement",
    copy: "Each matter begins with a structured assessment of legal exposure, commercial priorities, and regulatory implications."
  },
  {
    title: "Strategic Structuring",
    copy: "We design clear, legally sound frameworks tailored to the client's objectives and operating environment."
  },
  {
    title: "Execution & Representation",
    copy: "From documentation and compliance to negotiations and dispute resolution, we ensure disciplined execution."
  },
  {
    title: "Ongoing Advisory Support",
    copy: "Continuous guidance to help clients remain compliant, prepared, and protected as they grow."
  }
];

const clients = [
  "Startups and emerging businesses",
  "MSMEs and family-owned enterprises",
  "Corporates and institutional entities",
  "Promoters, founders, and professionals",
  "Individuals and families"
];

const slideImages = [
  "/images/hero_1.jpg",
  "/images/hero_2.jpg",
  "/images/hero_3.jpg",
  "/images/blog-1.jpg",
  "/images/blog-2.jpg",
  "/images/blog-3.jpg"
];

const teamMembers = [
  {
    name: "Advocates",
    role: "Litigation, contracts, advisory, and representation"
  },
  {
    name: "Company Secretaries",
    role: "Governance, statutory compliance, board processes, and filings"
  },
  {
    name: "Chartered Accountants",
    role: "Tax, financial structuring, documentation, and transaction insight"
  }
];

const profileMembers = [
  {
    name: "Ananya Rao",
    role: "Managing Partner, Dispute Resolution",
    image: "/images/person_1.jpg"
  },
  {
    name: "Rohan Mehta",
    role: "Partner, Corporate & Commercial Advisory",
    image: "/images/person_2.jpg"
  },
  {
    name: "Kavya Iyer",
    role: "Company Secretary, Governance & Compliance",
    image: "/images/person_3.jpg"
  },
  {
    name: "Arjun Nair",
    role: "Chartered Accountant, Tax & Financial Advisory",
    image: "/images/person_4.jpg"
  },
  {
    name: "Meera Shah",
    role: "Associate Counsel, Regulatory Representation",
    image: "/images/person_5.jpg"
  }
];

const partnerSignals = [
  "Integrated legal desk",
  "Compliance review",
  "Tax and finance alignment",
  "Board and governance support"
];

const advisorySystems = [
  {
    title: "Dispute Readiness",
    subtitle: "Pre-litigation risk, evidence review, representation strategy",
    tags: ["Disputes", "Strategy", "Resolution"],
    image: "/images/blog-1.jpg",
    path: "/practice-areas"
  },
  {
    title: "Governance Architecture",
    subtitle: "Board processes, filings, policies, records, and compliance rhythm",
    tags: ["Governance", "Compliance", "Secretarial"],
    image: "/images/hero_3.jpg",
    path: "/mission"
  },
  {
    title: "Transaction Structure",
    subtitle: "Contracts, tax alignment, documentation, and commercial risk allocation",
    tags: ["Corporate", "Tax", "Finance"],
    image: "/images/blog-2.jpg",
    path: "/approach"
  },
  {
    title: "Continuous Counsel",
    subtitle: "Retainer-based legal oversight for growing businesses and institutions",
    tags: ["Retainer", "Advisory", "Support"],
    image: "/images/blog-4.jpg",
    path: "/contact"
  }
];

const clientStories = [
  {
    name: "Founder Desk",
    role: "Startup and emerging business advisory",
    quote:
      "Structured support for contracts, entity hygiene, compliance calendars, and founder decision-making before issues become disputes.",
    metric: "Early stage"
  },
  {
    name: "Board Room",
    role: "Corporate and institutional governance",
    quote:
      "Clear governance records, disciplined filings, policy frameworks, and board-ready documentation for regulated operating environments.",
    metric: "Governance"
  },
  {
    name: "Family Office",
    role: "Succession and asset protection",
    quote:
      "Succession planning, wills, trusts, and family arrangements designed around continuity, certainty, and conflict prevention.",
    metric: "Continuity"
  }
];

const insightNotes = [
  "Regulatory developments translated into practical action points.",
  "Compliance expectations mapped before filings, notices, and board decisions.",
  "Legal and financial risks reviewed together for stronger outcomes."
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  appointmentDate: "",
  message: ""
};

const emptyAuthForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  remember: false
};

const oauthProviders = [
  { label: "Google", icon: "google", provider: "google" },
  { label: "Microsoft", icon: "microsoft", provider: "azure" }
];

function ProviderIcon({ type }) {
  if (type === "google") {
    return (
      <svg className="provider-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285f4" d="M22.6 12.24c0-.73-.07-1.43-.19-2.1H12v3.98h5.95a5.08 5.08 0 0 1-2.2 3.33v2.72h3.56c2.08-1.9 3.29-4.72 3.29-7.93Z" />
        <path fill="#34a853" d="M12 23c2.97 0 5.46-.97 7.28-2.63l-3.56-2.72c-.99.65-2.25 1.04-3.72 1.04-2.86 0-5.29-1.9-6.15-4.47H2.18v2.81A11 11 0 0 0 12 23Z" />
        <path fill="#fbbc05" d="M5.85 14.22A6.6 6.6 0 0 1 5.5 12c0-.77.13-1.52.35-2.22V6.97H2.18A10.82 10.82 0 0 0 1 12c0 1.77.43 3.44 1.18 5.03l3.67-2.81Z" />
        <path fill="#ea4335" d="M12 5.31c1.61 0 3.06.55 4.2 1.62l3.15-3.1A10.7 10.7 0 0 0 12 1 11 11 0 0 0 2.18 6.97l3.67 2.81C6.71 7.21 9.14 5.31 12 5.31Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg className="provider-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#0a66c2" />
        <path fill="#fff" d="M6.2 9.1h3.1v9.7H6.2V9.1Zm1.55-4.8a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM11.1 9.1h2.97v1.33h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74v5.23h-3.1v-4.64c0-1.1-.02-2.53-1.54-2.53-1.55 0-1.79 1.2-1.79 2.45v4.72H11.1V9.1Z" />
      </svg>
    );
  }

  return (
    <svg className="provider-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#f25022" d="M2 2h9.4v9.4H2V2Z" />
      <path fill="#7fba00" d="M12.6 2H22v9.4h-9.4V2Z" />
      <path fill="#00a4ef" d="M2 12.6h9.4V22H2v-9.4Z" />
      <path fill="#ffb900" d="M12.6 12.6H22V22h-9.4v-9.4Z" />
    </svg>
  );
}

function getPasswordStrength(password) {
  if (!password) {
    return { className: "empty", label: "Password strength", percent: 0 };
  }

  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password)
  ];
  const score = checks.filter(Boolean).length;

  if (score <= 2) {
    return { className: "weak", label: "Weak", percent: 34 };
  }

  if (score <= 4) {
    return { className: "good", label: "Good", percent: 68 };
  }

  return { className: "strong", label: "Strong", percent: 100 };
}

function validateAuthForm(form, isSignup) {
  const errors = {};
  const email = form.email.trim();
  const phone = form.phone.replace(/\D/g, "");
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const indianMobilePattern = /^[6-9]\d{9}$/;

  if (isSignup && !form.name.trim()) {
    errors.name = "Enter your full name.";
  }

  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address, for example name@example.com.";
  }

  if (isSignup && !phone) {
    errors.phone = "Enter your 10-digit mobile number.";
  } else if (isSignup && !indianMobilePattern.test(phone)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }

  if (!form.password) {
    errors.password = "Enter your password.";
  } else if (isSignup && form.password.length < 8) {
    errors.password = "Use at least 8 characters.";
  }

  if (isSignup && !form.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (isSignup && form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

function getFriendlyAuthError(message, isSignup) {
  const normalized = String(message || "").toLowerCase();

  if (normalized.includes("unable to exchange external code")) {
    return "Connection failed. Please try again.";
  }

  if (normalized.includes("unsupported provider") || normalized.includes("provider is not enabled")) {
    return "Connection failed. Please try again.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "Email or password is incorrect.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Please confirm your email before signing in.";
  }

  if (normalized.includes("already registered") || normalized.includes("already exists")) {
    return isSignup
      ? "This email is already registered. Please sign in instead."
      : "This account already exists.";
  }

  if (normalized.includes("password")) {
    return "Please check the password requirements and try again.";
  }

  if (normalized.includes("rate limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  return "Connection failed. Please try again.";
}

function ScrollEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.classList.add("effects-ready");

    const targets = document.querySelectorAll(
      [
        ".story-section .section-heading",
        ".story-section .split",
        ".story-section .prose",
        ".story-section .card-grid",
        ".story-section .timeline-grid",
        ".story-section .client-grid",
        ".story-section .home-editorial-template",
        ".story-section .home-ledger-template",
        ".story-section .home-framework-template",
        ".story-section .home-service-template",
        ".story-section .home-process-template",
        ".story-section .home-team-template",
        ".story-section .home-client-template",
        ".story-section .home-dual-template",
        ".story-section .home-contact-template",
        ".story-section .home-work-template",
        ".story-section .case-study-grid",
        ".story-section .client-marquee",
        ".story-section .testimonial-grid",
        ".story-section .insight-note-grid",
        ".story-section .route-story-grid",
        ".story-section .home-command-panel",
        ".story-section .home-illustration-dock",
        ".story-section .slide-visual",
        ".story-section .story-copy",
        ".story-section .partner-strip",
        ".story-section .member-grid",
        ".story-section .contact-form",
        ".story-section .info-card",
        ".story-section .practice-card",
        ".story-section .timeline-card",
        ".story-section .feature-panel",
        ".story-section .client-card"
      ].join(", ")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    targets.forEach((target, index) => {
      target.classList.add("scroll-reveal");
      target.style.setProperty("--reveal-delay", `${Math.min((index % 5) * 70, 280)}ms`);
      observer.observe(target);
    });

    requestAnimationFrame(() => {
      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          target.classList.add("is-visible");
        }
      });
    });

    return () => {
      observer.disconnect();
      document.body.classList.remove("effects-ready");
    };
  }, [pathname]);

  useEffect(() => {
    let frameId = 0;
    const sections = Array.from(document.querySelectorAll(".story-section"));

    const updateSections = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight || 1;
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
          const clamped = Math.min(Math.max(progress, 0), 1);
          section.style.setProperty("--section-progress", clamped.toFixed(4));
          section.style.setProperty("--section-shift", `${((clamped - 0.5) * 42).toFixed(2)}px`);
          section.style.setProperty("--section-shift-y", `${(clamped * 160).toFixed(2)}px`);
          section.style.setProperty("--section-reveal-scale", (0.2 + clamped * 0.8).toFixed(4));
          section.style.setProperty("--visual-float", `${((0.5 - clamped) * 42).toFixed(2)}px`);
          section.style.setProperty("--glow-opacity", (0.35 + clamped * 0.45).toFixed(4));
          section.style.setProperty("--bg-zoom", `${(112 + clamped * 18).toFixed(2)}%`);
          section.style.setProperty("--bg-mark-scale", (0.92 + clamped * 0.18).toFixed(4));
          section.style.setProperty("--law-pan", `${((clamped - 0.5) * 120).toFixed(2)}px`);
          const focus = 1 - Math.min(Math.abs(clamped - 0.5) * 2.15, 1);
          section.style.setProperty("--section-focus", focus.toFixed(4));
          section.style.setProperty("--home-content-y", `${((1 - focus) * 76).toFixed(2)}px`);
          section.style.setProperty("--home-content-scale", (0.94 + focus * 0.06).toFixed(4));
          section.style.setProperty("--home-content-opacity", (0.42 + focus * 0.58).toFixed(4));
          section.style.setProperty("--home-card-y", `${((1 - focus) * 42).toFixed(2)}px`);
          section.style.setProperty("--home-tilt", `${((clamped - 0.5) * -5).toFixed(2)}deg`);
          section.style.setProperty("--home-line-opacity", (0.34 + focus * 0.66).toFixed(4));
          section.style.setProperty("--home-line-scale", (0.45 + focus * 0.55).toFixed(4));
          section.style.setProperty("--home-node-ring", `${(4 + focus * 14).toFixed(2)}px`);
          section.style.setProperty("--home-visual-scale", (1.02 + focus * 0.05).toFixed(4));
          section.classList.toggle("is-current", clamped > 0.18 && clamped < 0.86);
        });
      });
    };

    updateSections();
    window.addEventListener("scroll", updateSections, { passive: true });
    window.addEventListener("resize", updateSections);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateSections);
      window.removeEventListener("resize", updateSections);
    };
  }, [pathname]);

  return null;
}

function Logo() {
  return (
    <NavLink className="logo" to="/" aria-label="BriskLegal home">
      <span className="logo-mark">
        <img src="/images/brisk_monogram.jpeg" alt="" />
      </span>
      <span>BRISKLEGAL</span>
    </NavLink>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="primary-navigation" className={open ? "primary-nav open" : "primary-nav"}>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <span className="nav-auth-actions">
            {authNavItems.map((item) => (
              <NavLink
                key={item.path}
                className="nav-auth-button primary"
                to={item.path}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </span>
        </nav>
      </div>
    </header>
  );
}

function LoadingSplash() {
  const { pathname } = useLocation();
  const isFirstPath = useRef(true);
  const initialMode = useRef(
    performance.getEntriesByType("navigation")[0]?.type === "reload" ? "refresh" : "entry"
  );
  const [splash, setSplash] = useState({
    visible: true,
    mode: initialMode.current,
    key: 0
  });

  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return undefined;
    }

    setSplash((current) => ({
      visible: true,
      mode: "route",
      key: current.key + 1
    }));
  }, [pathname]);

  useEffect(() => {
    if (!splash.visible) {
      return undefined;
    }

    const duration = 1550;
    const timer = window.setTimeout(
      () => setSplash((current) => ({ ...current, visible: false })),
      duration
    );

    return () => window.clearTimeout(timer);
  }, [splash.key, splash.mode, splash.visible]);

  if (!splash.visible) {
    return null;
  }

  return (
    <div
      key={splash.key}
      className={`loading-splash ${splash.mode}-splash`}
      role="status"
      aria-label="Loading BriskLegal"
    >
      <div className="splash-grid" aria-hidden="true" />
      <div className="splash-mark">
        <img src="/images/brisk_monogram.jpeg" alt="" />
      </div>
    </div>
  );
}

function RouteScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
}

async function storeAuthProfile(user, fallback = {}) {
  if (!supabase || !user) {
    return;
  }

  const profile = {
    id: user.id,
    email: user.email,
    full_name:
      fallback.name ||
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.user_metadata?.preferred_username ||
      "",
    phone: fallback.phone || user.phone || user.user_metadata?.phone || "",
    avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || "",
    provider: user.app_metadata?.provider || "email",
    updated_at: new Date().toISOString()
  };

  const { error: rpcError } = await supabase.rpc("upsert_current_user_profile", {
    profile_email: profile.email,
    profile_full_name: profile.full_name,
    profile_phone: profile.phone,
    profile_avatar_url: profile.avatar_url,
    profile_provider: profile.provider
  });

  if (!rpcError) {
    return;
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      ...profile
    },
    { onConflict: "id" }
  );

  if (error) {
    console.error("Profile sync failed", error.message);
  }
}

function AuthSessionSync() {
  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        storeAuthProfile(data.session.user);
      }
    });

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        storeAuthProfile(data.user);
      }
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") && session?.user) {
        storeAuthProfile(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return null;
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function slideBackground(index) {
  return { "--slide-bg": `url("${slideImages[index % slideImages.length]}")` };
}

function AdvancedPageHero({
  eyebrow,
  title,
  copy,
  imageIndex = 0,
  signals = [],
  illustration = "scales",
  children
}) {
  return (
    <section className="page-hero advanced-page-hero" style={slideBackground(imageIndex)}>
      <div className="container advanced-hero-grid">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {copy && <p>{copy}</p>}
          {children}
        </div>
        <div className="page-hero-card route-illustration-card" aria-label="Page highlights">
          <LegalIllustration variant={illustration} />
          <div className="hero-signal-list">
            {signals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LegalIllustration({ variant = "scales" }) {
  return (
    <div className={`legal-illustration ${variant}`} aria-hidden="true">
      <span className="ill-ring" />
      <span className="ill-ring secondary" />
      <span className="ill-document primary" />
      <span className="ill-document secondary" />
      <span className="ill-scale-base" />
      <span className="ill-scale-stem" />
      <span className="ill-scale-beam" />
      <span className="ill-scale-pan left" />
      <span className="ill-scale-pan right" />
      <span className="ill-spark one" />
      <span className="ill-spark two" />
      <span className="ill-spark three" />
      <span className="ill-courthouse-roof" />
      <span className="ill-courthouse-base" />
      <span className="ill-column one" />
      <span className="ill-column two" />
      <span className="ill-column three" />
      <span className="ill-gavel-head" />
      <span className="ill-gavel-handle" />
      <span className="ill-shield" />
      <span className="ill-network-link one" />
      <span className="ill-network-link two" />
      <span className="ill-network-link three" />
      <span className="ill-network-node one" />
      <span className="ill-network-node two" />
      <span className="ill-network-node three" />
      <span className="ill-client-card one" />
      <span className="ill-client-card two" />
      <span className="ill-client-card three" />
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="home-hero slide-hero" style={slideBackground(0)}>
        <div className="hero-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Integrated Legal, Regulatory, and Business Advisory</p>
            <p className="hero-superline">Partners in your legal journey.</p>
            <h1 className="brand-heading">BRISKLEGAL</h1>
            <div className="hero-copy-panel">
              <p>
                A multidisciplinary professional firm delivering strategic legal, compliance, and
                business solutions through a unified platform of Advocates, Company Secretaries, and
                Chartered Accountants.
              </p>
              <p>
                Built to support individuals, startups, businesses, and institutions in navigating
                legal complexities with clarity, structure, and confidence.
              </p>
            </div>
            <div className="hero-actions">
              <NavLink className="button primary" to="/contact">
                Consult
              </NavLink>
              <NavLink className="button" to="/who-we-are">
                Our Team
              </NavLink>
              <NavLink className="button" to="/who-we-are">
                Explore
              </NavLink>
              <NavLink className="button" to="/practice-areas">
                Practice Areas
              </NavLink>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero_2.jpg" alt="Professional legal advisory discussion" />
            <div className="legal-motion" aria-hidden="true">
              <span>Case Review</span>
              <span>Compliance</span>
              <span>Strategy</span>
            </div>
          </div>
        </div>
        <div className="container partner-strip" aria-label="BriskLegal multidisciplinary platform">
          {partnerSignals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
      </section>

      <section className="section story-section home-story-panel slide-story-panel dark-panel" style={slideBackground(1)}>
        <span className="story-node">01</span>
        <div className="container home-editorial-template">
          <div className="story-copy home-section-copy">
            <p className="eyebrow">Introduction</p>
            <h2>Who We Are</h2>
            <p>
              A single coordinated desk for legal, governance, finance, and commercial decisions.
            </p>
          </div>
          <div className="home-command-panel">
            <LegalIllustration variant="documents" />
            <div className="home-signal-grid">
              <span>Law</span>
              <span>Governance</span>
              <span>Finance</span>
              <span>Strategy</span>
            </div>
          </div>
          <div className="prose home-elevated-prose">
            {introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section story-section home-story-panel slide-story-panel light-panel" style={slideBackground(2)}>
        <span className="story-node">02</span>
        <div className="container home-ledger-template">
          <div className="home-section-copy">
            <p className="eyebrow">Our Mission</p>
            <h2>Precise, outcome-oriented professional solutions.</h2>
          </div>
          <div className="home-mission-ledger">
            {missionParagraphs.map((paragraph, index) => (
              <article className="feature-panel mission-panel" key={paragraph}>
                <span className="panel-index">{String(index + 1).padStart(2, "0")}</span>
                <p>{paragraph}</p>
              </article>
            ))}
          </div>
          <div className="home-illustration-dock">
            <LegalIllustration variant="shield" />
          </div>
        </div>
      </section>

      <section className="section story-section home-story-panel slide-story-panel dark-panel" style={slideBackground(3)}>
        <span className="story-node">03</span>
        <div className="container home-framework-template">
          <div className="story-copy home-section-copy">
            <p className="eyebrow">Why BriskLegal</p>
            <h2>A Structured, Integrated Approach</h2>
            <p>
              BriskLegal is built on the idea that effective legal solutions require more than
              isolated advice. Every matter is viewed through legal, regulatory, financial, and
              operational lenses together.
            </p>
          </div>
          <div className="home-orbit-system" aria-hidden="true">
            <LegalIllustration variant="network" />
            <span>Legal</span>
            <span>Compliance</span>
            <span>Finance</span>
          </div>
          <div className="home-framework-list">
            {whyBrisk.map((item, index) => (
              <article className="info-card" key={item.title}>
                <span className="panel-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section story-section home-story-panel slide-story-panel dark-panel work-showcase-panel" style={slideBackground(0)}>
        <span className="story-node">04</span>
        <div className="container home-work-template">
          <div className="home-section-copy work-intro">
            <p className="eyebrow">Selected Advisory Systems</p>
            <h2>Complex legal work organised like a professional operating system.</h2>
            <p>
              Each advisory stream is handled as a clear system: context, structure, execution,
              and continuity.
            </p>
          </div>
          <div className="case-study-grid">
            {advisorySystems.map((system, index) => (
              <NavLink className="case-study-card" to={system.path} key={system.title}>
                <img src={system.image} alt="" />
                <div className="case-study-overlay">
                  <div className="case-tags">
                    {system.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="panel-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{system.title}</h3>
                  <p>{system.subtitle}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      <section className="section story-section home-story-panel slide-story-panel light-panel service-panel" style={slideBackground(4)}>
        <span className="story-node">05</span>
        <div className="container home-service-template">
          <div className="home-section-copy">
            <p className="eyebrow">Practice Areas</p>
            <h2>Our Areas of Expertise</h2>
            <p>Each practice area is structured as a focused advisory surface for quick review.</p>
          </div>
          <div className="home-service-rail">
            {practiceAreas.map((area, index) => (
              <article className="practice-card service-stack-card" key={area.title}>
                <span className="panel-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{area.title}</h3>
                <p>{area.summary}</p>
                <NavLink className="service-link" to="/practice-areas">
                  Read about this service
                </NavLink>
              </article>
            ))}
          </div>
          <div className="home-illustration-dock service-illustration">
            <LegalIllustration variant="courthouse" />
          </div>
        </div>
      </section>

      <section className="section story-section home-story-panel slide-story-panel dark-panel" style={slideBackground(5)}>
        <span className="story-node">06</span>
        <div className="container home-process-template">
          <div className="home-section-copy">
            <p className="eyebrow">How We Work</p>
            <h2>Our Approach</h2>
            <p>A controlled professional journey from diagnosis to continued advisory support.</p>
          </div>
          <div className="home-process-board">
            {approachSteps.map((step, index) => (
              <article className="timeline-card process-step-card" key={step.title}>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
          <div className="home-process-visual">
            <LegalIllustration variant="gavel" />
            <span>From assessment to execution</span>
          </div>
        </div>
      </section>

      <section className="section story-section home-story-panel slide-story-panel light-panel" style={slideBackground(1)}>
        <span className="story-node">07</span>
        <div className="container home-team-template">
          <div className="home-illustration-dock">
            <LegalIllustration variant="network" />
          </div>
          <div className="home-section-copy">
            <p className="eyebrow">Partners & Members</p>
            <h2>Multidisciplinary professionals working as one advisory platform.</h2>
            <p>BriskLegal brings complementary professional strengths into one execution-focused framework.</p>
          </div>
          <div className="member-grid">
            {teamMembers.map((member) => (
              <article className="info-card member-card" key={member.name}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section story-section home-story-panel slide-story-panel dark-panel" style={slideBackground(2)}>
        <span className="story-node">08</span>
        <div className="container home-client-template">
          <div className="home-section-copy">
            <p className="eyebrow">Who We Work With</p>
            <h2>Support for businesses, institutions, professionals, and families.</h2>
            <p>BriskLegal supports a diverse client base through practical, structured advisory.</p>
          </div>
          <div className="home-client-illustration">
            <LegalIllustration variant="clients" />
          </div>
          <div className="home-client-matrix">
            {clients.map((client, index) => (
              <article className="client-card" key={client}>
                <span className="panel-index">{String(index + 1).padStart(2, "0")}</span>
                {client}
              </article>
            ))}
          </div>
          <div className="client-marquee" aria-label="Client segments">
            <div className="client-marquee-track">
              {[...clients, ...clients].map((client, index) => (
                <span key={`${client}-${index}`}>{client}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section story-section home-story-panel slide-story-panel light-panel" style={slideBackground(3)}>
        <span className="story-node">09</span>
        <div className="container home-dual-template">
          <article className="feature-panel">
            <p className="eyebrow">Retainer & General Counsel Services</p>
            <h2>Ongoing Legal Support for Businesses</h2>
            <p>
              BriskLegal offers structured retainer arrangements designed to provide continuous
              legal and compliance support. These engagements function as an extended advisory
              framework for organizations that require consistent legal oversight.
            </p>
            <p>
              Services typically include contract review, regulatory guidance, compliance
              monitoring, documentation support, and strategic advisory on operational legal risks.
              This model enables businesses to anticipate issues early and maintain stability
              through informed decision-making.
            </p>
          </article>
          <article className="feature-panel">
            <p className="eyebrow">Knowledge & Insights</p>
            <h2>Practical Legal Intelligence</h2>
            <p>
              Our firm is committed to continuous research, professional development, and
              knowledge-sharing. Through regular insights, updates, and analysis, we aim to keep
              clients informed about regulatory developments, compliance expectations, and evolving
              legal landscapes that may impact their decisions and operations.
            </p>
          </article>
          <div className="home-illustration-dock">
            <LegalIllustration variant="shield" />
          </div>
          <div className="insight-note-grid">
            {insightNotes.map((note, index) => (
              <span key={note}>
                {String(index + 1).padStart(2, "0")} / {note}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section story-section home-story-panel slide-story-panel closing-panel" style={slideBackground(5)}>
        <span className="story-node">10</span>
        <div className="container home-contact-template">
          <div className="contact-copy">
            <p className="eyebrow">Closing Section</p>
            <p className="closing-brand">BRISKLEGAL</p>
            <h2>Clarity in Law. Structure in Strategy. Confidence in Decisions.</h2>
            <p>
              BriskLegal provides integrated legal and professional support designed to help
              clients navigate complexity, manage risk, and build with certainty.
            </p>
            <p>Phone | Email | Office Address</p>
          </div>
          <div className="home-contact-illustration">
            <LegalIllustration variant="gavel" />
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function WhoWeAre() {
  return (
    <>
      <AdvancedPageHero
        eyebrow="Who We Are"
        title="Integrated counsel for law, compliance, and business strategy."
        copy="A multidisciplinary professional services firm operating at the intersection of legal precision, governance discipline, and commercial practicality."
        imageIndex={0}
        illustration="documents"
        signals={["Advocates", "Company Secretaries", "Chartered Accountants"]}
      />
      <section className="section story-section slide-story-panel light-panel inner-template illustrated-route" style={slideBackground(1)}>
        <span className="story-node">01</span>
        <div className="container split illustrated-split">
          <div className="illustration-stage">
            <LegalIllustration variant="documents" />
          </div>
          <div className="prose elevated-copy">
            {introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="container member-grid route-member-grid">
          {teamMembers.map((member) => (
            <article className="info-card member-card" key={member.name}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
        <div className="container profile-grid">
          {profileMembers.map((member) => (
            <article className="profile-card" key={member.name}>
              <img src={member.image} alt={member.name} />
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="container route-story-grid">
          {clientStories.map((story) => (
            <article className="story-testimonial" key={story.name}>
              <span>{story.metric}</span>
              <h3>{story.name}</h3>
              <p>{story.role}</p>
              <blockquote>{story.quote}</blockquote>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Mission() {
  return (
    <>
      <AdvancedPageHero
        eyebrow="Our Mission"
        title="Precise, outcome-oriented professional solutions."
        copy="A unified advisory model built around clarity, professional integrity, and execution."
        imageIndex={1}
        illustration="shield"
        signals={["Integrated advice", "Strategic drafting", "Confidential counsel"]}
      />
      <section className="section story-section slide-story-panel light-panel inner-template" style={slideBackground(2)}>
        <span className="story-node">01</span>
        <div className="container route-composition">
          <div className="route-composition-copy">
            <SectionHeading
              eyebrow="Mission Framework"
              title="Law, business, governance, and finance handled as connected decisions."
            />
            <div className="mission-ledger">
              {missionParagraphs.map((paragraph, index) => (
                <article className="feature-panel mission-panel" key={paragraph}>
                  <span className="panel-index">{String(index + 1).padStart(2, "0")}</span>
                  <p>{paragraph}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="illustration-stage sticky-illustration">
            <LegalIllustration variant="scales" />
          </div>
        </div>
      </section>
    </>
  );
}

function PracticeAreas() {
  return (
    <>
      <AdvancedPageHero
        eyebrow="BriskLegal Services"
        title="Our Areas of Expertise"
        copy="Each practice area is presented as a focused advisory box for easier review and faster decisions."
        imageIndex={3}
        illustration="courthouse"
        signals={["Disputes", "Corporate", "Compliance", "Tax"]}
      />
      <section className="section story-section slide-story-panel light-panel practice-template" style={slideBackground(4)}>
        <span className="story-node">01</span>
        <div className="container route-band">
          <div>
            <p className="eyebrow">Service Architecture</p>
            <h2>Practice areas arranged as a professional advisory map.</h2>
          </div>
          <div className="illustration-stage compact-illustration">
            <LegalIllustration variant="courthouse" />
          </div>
        </div>
        <div className="container practice-showcase">
          {practiceAreas.map((area, index) => (
            <article className="practice-card practice-detail-card" key={area.title}>
              <span className="panel-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{area.title}</h3>
              <p>{area.summary}</p>
              <div className="practice-detail-copy">
                {area.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Approach() {
  return (
    <>
      <AdvancedPageHero
        eyebrow="How We Work"
        title="Our Approach"
        copy="A disciplined process that moves from diagnosis to structure, execution, and continued support."
        imageIndex={5}
        illustration="gavel"
        signals={["Assess", "Structure", "Execute", "Support"]}
      />
      <section className="section story-section slide-story-panel dark-panel approach-template" style={slideBackground(0)}>
        <span className="story-node">01</span>
        <div className="container route-band dark-route-band">
          <div>
            <p className="eyebrow">Process Map</p>
            <h2>From complexity to confident decisions.</h2>
          </div>
          <div className="illustration-stage compact-illustration">
            <LegalIllustration variant="gavel" />
          </div>
        </div>
        <div className="container approach-lanes">
          {approachSteps.map((step, index) => (
            <article className="timeline-card approach-lane" key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Clients() {
  return (
    <>
      <AdvancedPageHero
        eyebrow="Who We Work With"
        title="Support for businesses, institutions, professionals, and families."
        copy="BriskLegal supports clients that need structured decisions, reliable documentation, and continuing legal oversight."
        imageIndex={2}
        illustration="clients"
        signals={["Founders", "MSMEs", "Corporates", "Families"]}
      />
      <section className="section story-section slide-story-panel light-panel clients-template" style={slideBackground(1)}>
        <span className="story-node">01</span>
        <div className="container route-band">
          <div>
            <p className="eyebrow">Client Segments</p>
            <h2>Advisory designed around operating reality.</h2>
          </div>
          <div className="illustration-stage compact-illustration">
            <LegalIllustration variant="clients" />
          </div>
        </div>
        <div className="container client-showcase">
          {clients.map((client, index) => (
            <article className="client-card client-profile" key={client}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{client}</h3>
              <p>
                Structured support for legal risk, documentation, compliance discipline, and
                practical decision-making.
              </p>
            </article>
          ))}
        </div>
        <div className="container testimonial-grid">
          {clientStories.map((story) => (
            <article className="story-testimonial" key={story.name}>
              <span>{story.metric}</span>
              <h3>{story.name}</h3>
              <p>{story.role}</p>
              <blockquote>{story.quote}</blockquote>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your consultation request..." });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "appointment" })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send request.");
      }

      setForm(emptyForm);
      setStatus({ type: "success", message: "Your consultation request was sent." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <form className="contact-form" onSubmit={submitForm}>
      <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={updateField} required />
      <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={updateField} required />
      <input name="phone" type="tel" placeholder="Phone no." value={form.phone} onChange={updateField} />
      <input name="appointmentDate" type="date" value={form.appointmentDate} onChange={updateField} />
      <textarea
        name="message"
        placeholder="Briefly describe your requirement"
        value={form.message}
        onChange={updateField}
        required
      />
      <button type="submit" disabled={status.type === "loading"}>
        Schedule a Consultation
      </button>
      {status.message && (
        <p className={`form-status ${status.type}`} role="status">
          {status.message}
        </p>
      )}
    </form>
  );
}

function Contact() {
  return (
    <>
      <AdvancedPageHero
        eyebrow="Contact Us"
        title="Clarity in Law. Structure in Strategy. Confidence in Decisions."
        copy="Share your requirement and the office will review the context before the next step."
        imageIndex={4}
        illustration="network"
        signals={["Consultation", "Confidential", "Structured intake"]}
      />
      <section className="section contact-section story-section slide-story-panel closing-panel contact-template" style={slideBackground(5)}>
        <span className="story-node">01</span>
        <div className="container split">
          <div className="contact-copy contact-intake-panel">
            <div className="illustration-stage compact-illustration">
              <LegalIllustration variant="network" />
            </div>
            <p className="eyebrow">Schedule a Consultation</p>
            <h2>Start with the issue, documents, exposure, and decision needed.</h2>
            <p>Share a short note and our office will contact you to discuss next steps.</p>
            <div className="contact-points">
              <span>Phone</span>
              <span>Email</span>
              <span>Office Address</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function AuthPage({ mode }) {
  const isSignup = mode === "signup";
  const [form, setForm] = useState(emptyAuthForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [ssoModal, setSsoModal] = useState({ open: false, provider: "", state: "idle", message: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const passwordStrength = getPasswordStrength(form.password);
  const errorId = (name) => `${mode}-${name}-error`;
  const inputErrorProps = (name) => ({
    "aria-invalid": Boolean(fieldErrors[name]),
    "aria-describedby": fieldErrors[name] ? errorId(name) : undefined
  });

  const updateField = (event) => {
    const { checked, name, type, value } = event.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : nextValue }));
    setFieldErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const submitAuth = async (event) => {
    event.preventDefault();
    const validationErrors = validateAuthForm(form, isSignup);

    if (Object.keys(validationErrors).length) {
      setFieldErrors(validationErrors);
      setStatus({ type: "idle", message: "" });
      return;
    }

    setFieldErrors({});
    setStatus({ type: "loading", message: "Connecting securely..." });

    if (!isSupabaseConfigured || !supabase) {
      setStatus({
        type: "error",
        message: "Auth is not configured. Check client/.env and restart the dev server."
      });
      return;
    }

    const authResponse = isSignup
      ? await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: {
            data: {
              full_name: form.name.trim(),
              phone: `+91${form.phone.replace(/\D/g, "")}`
            },
            emailRedirectTo: `${window.location.origin}/signin`
          }
        })
      : await supabase.auth.signInWithPassword({
          email: form.email.trim(),
          password: form.password
        });

    if (authResponse.error) {
      setStatus({ type: "error", message: getFriendlyAuthError(authResponse.error.message, isSignup) });
      return;
    }

    await storeAuthProfile(authResponse.data.user, {
      name: form.name,
      phone: isSignup ? `+91${form.phone.replace(/\D/g, "")}` : form.phone
    });
    if (isSignup) {
      setSuccessModalOpen(true);
    }
    setStatus({
      type: "success",
      message: isSignup
        ? "Successfully signed up. Please check your email inbox to confirm your BriskLegal account."
        : "Signed in successfully."
    });
  };

  const signInWithProvider = async (provider, label) => {
    setFieldErrors({});
    setStatus({ type: "idle", message: "" });
    setSsoModal({
      open: true,
      provider: label,
      state: "loading",
      message: `Connecting ${label} with BriskLegal.`
    });

    if (!isSupabaseConfigured || !supabase) {
      setSsoModal({
        open: true,
        provider: label,
        state: "error",
        message: "Auth is not configured. Check client/.env and restart the dev server."
      });
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/signin`,
        ...(provider === "azure" ? { scopes: "email" } : {})
      }
    });

    if (error) {
      setSsoModal({
        open: true,
        provider: label,
        state: "error",
        message: getFriendlyAuthError(error.message, isSignup)
      });
    }
  };

  return (
    <section className={`auth-page ${isSignup ? "signup-page" : "signin-page"}`}>
      <div className="auth-shell">
        <div className="auth-panel">
          <Logo />
          <p className="auth-kicker">Secure advisory workspace</p>
          <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
          <p>
            {isSignup
              ? "Register for consultations, matter updates, and advisory document access."
              : "Access consultation requests, matter notes, and structured advisory updates."}
          </p>

          {status.message && (
            <div
              className={`auth-alert ${status.type}`}
              role={status.type === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              <strong>
                {status.type === "error"
                  ? "Unable to continue"
                  : status.type === "success"
                    ? "Success"
                    : "Please wait"}
              </strong>
              <span>{status.message}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={submitAuth} noValidate>
            {isSignup && (
              <label>
                Full Name
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={updateField}
                  {...inputErrorProps("name")}
                />
                {fieldErrors.name && (
                  <span className="field-error" id={errorId("name")}>
                    {fieldErrors.name}
                  </span>
                )}
              </label>
            )}
            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={updateField}
                {...inputErrorProps("email")}
              />
              {fieldErrors.email && (
                <span className="field-error" id={errorId("email")}>
                  {fieldErrors.email}
                </span>
              )}
            </label>
            {isSignup && (
              <label>
                Phone
                <span className="phone-field">
                  <span className="phone-prefix">+91</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength="10"
                    placeholder="Enter 10-digit mobile number"
                    value={form.phone}
                    onChange={updateField}
                    {...inputErrorProps("phone")}
                  />
                </span>
                {fieldErrors.phone && (
                  <span className="field-error" id={errorId("phone")}>
                    {fieldErrors.phone}
                  </span>
                )}
              </label>
            )}
            <label>
              Password
              <span className="password-field">
                <input
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={updateField}
                  {...inputErrorProps("password")}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setPasswordVisible((current) => !current)}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                  title={passwordVisible ? "Hide password" : "Show password"}
                >
                  <span className={`eye-icon ${passwordVisible ? "is-open" : ""}`} aria-hidden="true" />
                </button>
              </span>
              {isSignup && (
                <span className={`password-strength ${passwordStrength.className}`}>
                  <span className="password-strength-track">
                    <span style={{ width: `${passwordStrength.percent}%` }} />
                  </span>
                  <em>{passwordStrength.label}</em>
                </span>
              )}
              {fieldErrors.password && (
                <span className="field-error" id={errorId("password")}>
                  {fieldErrors.password}
                </span>
              )}
            </label>
            {isSignup && (
              <label>
                Confirm Password
                <span className="password-field">
                  <input
                    name="confirmPassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={updateField}
                    {...inputErrorProps("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setConfirmPasswordVisible((current) => !current)}
                    aria-label={confirmPasswordVisible ? "Hide confirm password" : "Show confirm password"}
                    title={confirmPasswordVisible ? "Hide confirm password" : "Show confirm password"}
                  >
                    <span className={`eye-icon ${confirmPasswordVisible ? "is-open" : ""}`} aria-hidden="true" />
                  </button>
                </span>
                {fieldErrors.confirmPassword && (
                  <span className="field-error" id={errorId("confirmPassword")}>
                    {fieldErrors.confirmPassword}
                  </span>
                )}
              </label>
            )}

            <div className="auth-options">
              <label className="auth-check">
                <input
                  name="remember"
                  type="checkbox"
                  checked={form.remember}
                  onChange={updateField}
                />
                Remember me
              </label>
              {!isSignup && <NavLink to="/contact">Forgot password?</NavLink>}
            </div>

            <button type="submit" disabled={status.type === "loading"}>
              {isSignup ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="auth-divider">
            <span />
            <em>Or</em>
            <span />
          </div>

          <div className="auth-socials">
            {oauthProviders.map((item) => (
              <button
                type="button"
                key={item.provider}
                onClick={() => signInWithProvider(item.provider, item.label)}
                aria-label={`Continue with ${item.label}`}
                title={`Continue with ${item.label}`}
              >
                <ProviderIcon type={item.icon} />
              </button>
            ))}
          </div>

          {isSignup && (
            <p className="auth-switch">
              Already registered? <NavLink to="/signin">Sign in</NavLink>
            </p>
          )}
        </div>

        <div className="auth-visual" aria-hidden="true">
          <div className="auth-visual-image">
            <img src="/images/hero_2.jpg" alt="" />
          </div>
          <div className="auth-visual-card">
            <span>Privileged</span>
            <h2>{isSignup ? "Start with clarity." : "Continue with confidence."}</h2>
            <p>
              Legal, governance, finance, and compliance support arranged in one professional
              workspace.
            </p>
          </div>
          <LegalIllustration variant={isSignup ? "network" : "shield"} />
        </div>
      </div>

      {successModalOpen && (
        <div className="auth-modal-backdrop" role="presentation">
          <div
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-success-title"
          >
            <Logo />
            <p className="auth-kicker">Email confirmation</p>
            <h2 id="signup-success-title">Successfully signed up</h2>
            <p>
              Please check your email inbox and confirm your BriskLegal account before signing in.
            </p>
            <div className="auth-modal-actions">
              <button type="button" onClick={() => setSuccessModalOpen(false)}>
                Stay Here
              </button>
              <NavLink to="/signin" onClick={() => setSuccessModalOpen(false)}>
                Go to Sign In
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {ssoModal.open && (
        <div className="auth-modal-backdrop" role="presentation">
          <div
            className="auth-modal sso-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sso-modal-title"
          >
            <Logo />
            {ssoModal.state === "loading" && (
              <div className="sso-loader loading">
                <span className="sso-spinner" aria-hidden="true" />
              </div>
            )}
            <p className="auth-kicker">Secure SSO</p>
            <h2 id="sso-modal-title">
              {ssoModal.state === "loading" ? `Connecting ${ssoModal.provider}` : "Connection failed"}
            </h2>
            {ssoModal.state === "loading" && <p>{ssoModal.message}</p>}
            {ssoModal.state === "error" && (
              <div className="auth-modal-actions">
                <button
                  type="button"
                  onClick={() => setSsoModal({ open: false, provider: "", state: "idle", message: "" })}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function OAuthCallbackNotice() {
  const location = useLocation();
  const navigate = useNavigate();
  const [oauthError, setOauthError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hashParams = new URLSearchParams(location.hash.replace(/^#/, ""));
    const rawError =
      params.get("error_description") ||
      hashParams.get("error_description") ||
      params.get("error") ||
      hashParams.get("error") ||
      "";

    if (!rawError) {
      setOauthError("");
      return;
    }

    const decodedError = decodeURIComponent(rawError);
    setOauthError(getFriendlyAuthError(decodedError, false));
    window.history.replaceState(null, "", "/signin");
  }, [location.hash, location.search]);

  if (!oauthError) {
    return null;
  }

  return (
    <div className="auth-modal-backdrop" role="presentation">
      <div
        className="auth-modal sso-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="oauth-error-title"
      >
        <Logo />
        <p className="auth-kicker">SSO callback</p>
        <h2 id="oauth-error-title">Connection failed</h2>
        <div className="auth-modal-actions">
          <button type="button" onClick={() => navigate("/signin", { replace: true })}>
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <AdvancedPageHero
      eyebrow="404"
      title="Page not found"
      copy="The page you requested does not exist."
      imageIndex={0}
      illustration="scales"
      signals={["Return", "Navigate", "Continue"]}
    >
      <p>The page you requested does not exist.</p>
      <NavLink className="button primary inline" to="/">
        Back to Home
      </NavLink>
    </AdvancedPageHero>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>
            Integrated legal, regulatory, and business advisory for individuals, startups,
            businesses, and institutions.
          </p>
        </div>
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="container copyright">
        Copyright &copy; {new Date().getFullYear()} BriskLegal. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isAuthRoute = pathname === "/signin" || pathname === "/signup";

  return (
    <>
      <LoadingSplash />
      <OAuthCallbackNotice />
      <AuthSessionSync />
      <RouteScrollReset />
      <ScrollEffects />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/practice-areas" element={<PracticeAreas />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<AuthPage mode="signin" />} />
          <Route path="/signup" element={<Navigate to="/signin" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAuthRoute && <Footer />}
    </>
  );
}
