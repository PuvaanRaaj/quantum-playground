"use client";
import { useEffect, useState } from "react";
import {
  Atom,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  FlaskConical,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { topics } from "../content";
import type { Topic } from "../content/types";
import TopicVisual from "../components/topic-visual";
const categories = [
  "All subjects",
  "Space & relativity",
  "Quantum mechanics",
  "Mathematics",
] as const;
function OrbitalArt({ variant = "blue" }: { variant?: string }) {
  return (
    <svg
      className={`orbital-art ${variant}`}
      viewBox="0 0 540 340"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`orb-${variant}`}>
          <stop stopColor="currentColor" stopOpacity=".22" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="285" cy="170" r="160" fill={`url(#orb-${variant})`} />
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse
          key={i}
          cx="285"
          cy="170"
          rx={60 + i * 13}
          ry={23 + i * 8}
          transform={`rotate(${i * 13 - 52} 285 170)`}
          fill="none"
          stroke="currentColor"
          opacity={0.18 + i * 0.05}
          strokeWidth="1"
        />
      ))}
      <circle cx="285" cy="170" r="22" fill="currentColor" opacity=".95" />
      <circle cx="406" cy="110" r="5" fill="currentColor" />
      <circle cx="182" cy="244" r="3" fill="currentColor" />
      <path
        d="M55 170H110M460 170H510M285 15V45M285 295V325"
        stroke="currentColor"
        opacity=".3"
      />
    </svg>
  );
}
export default function Academy() {
  const [slug, setSlug] = useState<string | null>(null),
    [search, setSearch] = useState(""),
    [category, setCategory] = useState<string>("All subjects"),
    [theme, setTheme] = useState("light"),
    [mobileNav, setMobileNav] = useState(false),
    [labOpen, setLabOpen] = useState(false),
    [answer, setAnswer] = useState<number | null>(null),
    [glossary, setGlossary] = useState(false);
  useEffect(() => {
    const sync = () => {
      const q = new URLSearchParams(location.search);
      const legacyExperiment = q.has("phase") && !q.has("topic");
      setSlug(q.get("topic") ?? (legacyExperiment ? "interference" : null));
      setLabOpen(q.get("lab") === "1" || legacyExperiment);
      setGlossary(false);
      setAnswer(null);
    };
    sync();
    window.addEventListener("popstate", sync);
    setTheme(document.documentElement.dataset.theme || "light");
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const topic = topics.find((t) => t.slug === slug);
  const visible = topics.filter(
    (t) =>
      (category === "All subjects" || t.category === category) &&
      `${t.title} ${t.subtitle} ${t.terms.map((x) => x.term).join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const allTerms = topics
    .flatMap((t) =>
      t.terms.map((term) => ({ ...term, topic: t.title, slug: t.slug })),
    )
    .filter((t) =>
      `${t.term} ${t.definition}`.toLowerCase().includes(search.toLowerCase()),
    );
  function navigate(next: string | null) {
    setSlug(next);
    setLabOpen(false);
    setAnswer(null);
    setGlossary(false);
    setMobileNav(false);
    const url = new URL(location.href);
    url.search = next ? new URLSearchParams({ topic: next }).toString() : "";
    url.hash = "";
    history.pushState({}, "", url);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("quantum-theme", next);
    } catch {}
  }
  function openLab() {
    setLabOpen(true);
    requestAnimationFrame(() =>
      document.getElementById("experiment")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      }),
    );
  }
  function showGlossary() {
    navigate(null);
    setGlossary(true);
    setSearch("");
  }
  return (
    <div className="academy">
      <header className="academy-header">
        <button
          className="nav-mobile icon-plain"
          aria-label={mobileNav ? "Close subjects" : "Open subjects"}
          onClick={() => setMobileNav(!mobileNav)}
        >
          {mobileNav ? <X size={21} /> : <Menu size={21} />}
        </button>
        <button className="academy-brand" onClick={() => navigate(null)}>
          <span className="brand-mark">
            <Atom size={24} />
          </span>
          <span>
            quantum<span className="brand-sub">playground</span>
          </span>
        </button>
        <span className="header-divider" />
        <span className="header-caption">A FIELD GUIDE TO BIG IDEAS</span>
        <nav className="header-links">
          <button
            className={!topic && !glossary ? "active" : ""}
            onClick={() => {
              navigate(null);
              setSearch("");
            }}
          >
            Library
          </button>
          <button className={glossary ? "active" : ""} onClick={showGlossary}>
            Glossary
          </button>
          <a
            href="https://github.com/PuvaanRaaj/quantum-playground"
            target="_blank"
            rel="noreferrer"
            aria-label="Source on GitHub"
          >
            <ExternalLink size={17} />
          </a>
        </nav>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          <span>{theme === "light" ? "Dark" : "Light"}</span>
        </button>
      </header>
      <div className="academy-shell">
        <aside className={`library-sidebar ${mobileNav ? "is-open" : ""}`}>
          <p className="label-caps">YOUR EXPLORATION</p>
          <button
            className={`sidebar-home ${!topic && !glossary ? "selected" : ""}`}
            onClick={() => {
              navigate(null);
              setSearch("");
            }}
          >
            <BookOpen size={17} /> The library <span>{topics.length}</span>
          </button>
          {categories.slice(1).map((group, gi) => (
            <div className="nav-group" key={group}>
              <h2>
                <span className={`category-dot dot-${gi}`} />
                {group}
              </h2>
              {topics
                .filter((t) => t.category === group)
                .map((t) => (
                  <button
                    key={t.slug}
                    className={topic?.slug === t.slug ? "selected" : ""}
                    onClick={() => navigate(t.slug)}
                    aria-current={topic?.slug === t.slug ? "page" : undefined}
                  >
                    {t.title}
                    <ChevronRight size={13} />
                  </button>
                ))}
            </div>
          ))}
          <button className="sidebar-glossary" onClick={showGlossary}>
            <CircleHelp size={16} /> Words worth knowing
          </button>
          <div className="sidebar-note">
            <Sparkles size={18} />
            <p>You don’t have to know the maths to start asking questions.</p>
          </div>
        </aside>
        <main className="academy-main">
          {topic ? (
            <>
              <div className="breadcrumbs">
                <button onClick={() => navigate(null)}>Library</button>
                <ChevronRight size={13} />
                <span>{topic.category}</span>
              </div>
              <article className={`lesson accent-${topic.accent}`}>
                <header className="lesson-title">
                  <div className="lesson-kicker">
                    <span className="label-caps">{topic.category}</span>
                    <span>
                      {topic.level} · {topic.minutes} min read
                    </span>
                  </div>
                  <h1>{topic.title}</h1>
                  <p className="lesson-subtitle">{topic.subtitle}</p>
                  <div className="lesson-actions">
                    <a href="#understand">
                      <BookOpen size={16} /> Understand the idea
                    </a>
                    <button onClick={openLab}>
                      <FlaskConical size={16} /> Jump to the experiment
                    </button>
                  </div>
                </header>
                <div className="lesson-layout">
                  <div className="lesson-prose">
                    <section id="understand" className="opening-explanation">
                      <p className="lead-paragraph">{topic.intro}</p>
                      <div className="why-it-matters">
                        <span className="label-caps">
                          WHY THIS CHANGED THINGS
                        </span>
                        <p>{topic.why}</p>
                      </div>
                      <p className="prerequisites">
                        <strong>A little preparation:</strong>{" "}
                        {topic.prerequisites.join(" · ")}
                      </p>
                    </section>
                    <section id="vocabulary" className="vocabulary-section">
                      <span className="section-number">01 / THE LANGUAGE</span>
                      <h2>First, what do these words mean?</h2>
                      <p>
                        Keep these ideas in mind as you read. You can return to
                        this section whenever a term feels unfamiliar.
                      </p>
                      <dl className="term-grid">
                        {topic.terms.map((t) => (
                          <div key={t.term}>
                            <dt>{t.term}</dt>
                            <dd>{t.definition}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                    <section id="theory">
                      <span className="section-number">
                        02 / THE IDEA, STEP BY STEP
                      </span>
                      {topic.sections.map((s, i) => (
                        <section
                          className="theory-section"
                          key={s.title}
                          id={`part-${i}`}
                        >
                          <h2>{s.title}</h2>
                          {s.paragraphs.map((p, j) => (
                            <p key={j}>{p}</p>
                          ))}
                        </section>
                      ))}
                    </section>
                    <aside className="key-insight">
                      <Sparkles size={22} />
                      <div>
                        <span className="label-caps">
                          THE IDEA TO TAKE WITH YOU
                        </span>
                        <p>{topic.insight}</p>
                      </div>
                    </aside>
                    <section id="mathematics" className="equation-section">
                      <span className="section-number">
                        03 / CONNECT IT TO THE MATHS
                      </span>
                      <h2>Read the equation like a sentence.</h2>
                      <div className="equation-display">
                        {topic.equation.expression}
                      </div>
                      <dl className="symbol-list">
                        {topic.equation.symbols.map((s) => (
                          <div key={s.symbol}>
                            <dt>{s.symbol}</dt>
                            <dd>{s.meaning}</dd>
                          </div>
                        ))}
                      </dl>
                      <p>{topic.equation.explanation}</p>
                      <div className="worked-example">
                        <span className="label-caps">A WORKED EXAMPLE</span>
                        <p>{topic.equation.example}</p>
                      </div>
                    </section>
                    <section id="misconceptions">
                      <span className="section-number">
                        04 / CLEAR UP THE CONFUSION
                      </span>
                      <h2>Easy things to get wrong.</h2>
                      {topic.misconceptions.map((m) => (
                        <div className="misconception" key={m.myth}>
                          <h3>{m.myth}</h3>
                          <p>{m.correction}</p>
                        </div>
                      ))}
                    </section>
                    <section id="check" className="knowledge-check">
                      <span className="label-caps">PAUSE & THINK</span>
                      <h2>{topic.check.question}</h2>
                      <fieldset>
                        <legend className="sr-only">Choose your answer</legend>
                        {topic.check.options.map((option, i) => (
                          <label
                            className={answer === i ? "chosen" : ""}
                            key={option}
                          >
                            <input
                              type="radio"
                              name={`check-${topic.slug}`}
                              checked={answer === i}
                              onChange={() => setAnswer(i)}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </fieldset>
                      {answer !== null && (
                        <div role="status" className="check-feedback">
                          <strong>
                            {answer === topic.check.answer
                              ? "That’s right."
                              : "Let’s reason it through."}
                          </strong>
                          <p>{topic.check.explanation}</p>
                        </div>
                      )}
                    </section>
                  </div>
                  <aside className="lesson-toc">
                    <span className="label-caps">IN THIS LESSON</span>
                    <a href="#understand">The big idea</a>
                    <a href="#vocabulary">Words to know</a>
                    <a href="#theory">The theory explained</a>
                    <a href="#mathematics">The equation & example</a>
                    <a href="#misconceptions">Common misconceptions</a>
                    <a href="#check">Check your intuition</a>
                    <button onClick={openLab}>
                      <FlaskConical size={15} /> Interactive experiment
                    </button>
                    <a href="#sources">Read further</a>
                    <p>
                      A foundation to build on, not a replacement for a full
                      course.
                    </p>
                  </aside>
                </div>
                <section id="experiment" className="lesson-experiment">
                  <div>
                    <span className="section-number">
                      05 / MAKE THE IDEA MOVE
                    </span>
                    <h2>Now, explore it for yourself.</h2>
                    <p>
                      You have the context. Change a parameter and connect what
                      you see to what you just learned.
                    </p>
                  </div>
                  {!labOpen ? (
                    <button
                      className="academy-primary"
                      onClick={() => setLabOpen(true)}
                    >
                      <FlaskConical size={18} /> Open interactive experiment{" "}
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <TopicVisual key={topic.slug} topic={topic} />
                  )}
                </section>
                <section id="sources" className="lesson-sources">
                  <span className="label-caps">
                    KEEP FOLLOWING YOUR CURIOSITY
                  </span>
                  <h2>Sources & further reading</h2>
                  <p>
                    Original explanations for this guide, with references for
                    deeper study. Illustrations demonstrate stated models;
                    mathematical proofs and experimental evidence play different
                    roles.
                  </p>
                  {topic.sources.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.title}
                      <ExternalLink size={15} />
                    </a>
                  ))}
                </section>
                <div className="lesson-bottom-nav">
                  <button onClick={() => navigate(null)}>
                    <ArrowLeft size={16} /> Back to the library
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        topics[(topics.indexOf(topic) + 1) % topics.length]
                          .slug,
                      )
                    }
                  >
                    Explore{" "}
                    {topics[(topics.indexOf(topic) + 1) % topics.length].title}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            </>
          ) : glossary ? (
            <section className="glossary-page">
              <p className="label-caps">THE LANGUAGE OF DISCOVERY</p>
              <h1>Words worth knowing.</h1>
              <p>
                Definitions in plain language, linked to the ideas that give
                them meaning.
              </p>
              <label className="library-search">
                <Search size={18} />
                <input
                  aria-label="Search glossary"
                  placeholder="Find a term: spacetime, amplitude, derivative…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <div className="glossary-grid">
                {allTerms.map((term, i) => (
                  <article key={`${term.slug}-${i}`}>
                    <h2>{term.term}</h2>
                    <p>{term.definition}</p>
                    <button onClick={() => navigate(term.slug)}>
                      {term.topic}
                      <ArrowRight size={14} />
                    </button>
                  </article>
                ))}
              </div>
              {!allTerms.length && (
                <p role="status">No matching terms. Try another word.</p>
              )}
            </section>
          ) : (
            <>
              <section className="library-intro">
                <span className="label-caps">
                  FOR THE CURIOUS, NOT JUST THE PHYSICISTS
                </span>
                <h1>
                  The universe is strange.
                  <br />
                  <em>Let’s understand it.</em>
                </h1>
                <p>
                  Meet the ideas that changed how we see reality. Learn the
                  language, follow the reasoning, then experiment with the
                  mathematics yourself.
                </p>
                <div className="library-stats">
                  <span>
                    <BookOpen size={16} /> {topics.length} in-depth lessons
                  </span>
                  <span>
                    <FlaskConical size={16} /> {topics.length} interactive
                    explorations
                  </span>
                  <span>Start with curiosity. Build the maths.</span>
                </div>
              </section>
              <section className="featured-lesson">
                <div className="featured-copy">
                  <span className="label-caps">A GOOD PLACE TO WONDER</span>
                  <h2>
                    What did Einstein
                    <br />
                    actually discover?
                  </h2>
                  <p>
                    Gravity isn’t simply an invisible pull. Learn how matter,
                    motion, space, and time fit together in general
                    relativity—and where the familiar rubber-sheet picture falls
                    short.
                  </p>
                  <button
                    className="academy-primary"
                    onClick={() => navigate("general-relativity")}
                  >
                    Understand general relativity
                    <ArrowRight size={17} />
                  </button>
                  <span className="featured-note">
                    Theory first. Vocabulary included. Experiment after.
                  </span>
                </div>
                <OrbitalArt />
              </section>
              <section className="catalog">
                <div className="catalog-heading">
                  <div>
                    <span className="label-caps">FOLLOW A THREAD</span>
                    <h2>Big ideas, made approachable.</h2>
                  </div>
                  <label className="library-search">
                    <Search size={17} />
                    <input
                      aria-label="Search lessons"
                      placeholder="Search ideas or terms…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                </div>
                <div
                  className="category-filters"
                  aria-label="Filter by subject"
                >
                  {categories.map((c) => (
                    <button
                      key={c}
                      aria-pressed={category === c}
                      onClick={() => setCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="topic-grid">
                  {visible.map((t, i) => (
                    <button
                      className={`topic-card accent-${t.accent}`}
                      key={t.slug}
                      onClick={() => navigate(t.slug)}
                    >
                      <div className="card-art">
                        <span className="card-formula">
                          {t.visual === "gravity"
                            ? "Gμν + Λgμν = κTμν"
                            : t.visual === "relativity"
                              ? "E = mc²"
                              : t.visual === "blackhole"
                                ? "rₛ = 2GM/c²"
                                : t.visual === "expansion"
                                  ? "v = H₀d"
                                  : t.visual === "interference"
                                    ? "ψ₁ + ψ₂"
                                    : t.visual === "uncertainty"
                                      ? "Δx Δp ≥ ℏ/2"
                                      : t.visual === "entanglement"
                                        ? "|Ψ⁻⟩"
                                        : t.visual === "schrodinger"
                                          ? "iℏ ∂ψ/∂t = Ĥψ"
                                          : t.visual === "pythagoras"
                                            ? "a² + b² = c²"
                                            : t.visual === "calculus"
                                              ? "∫ f(x) dx"
                                              : t.visual === "euler"
                                                ? "eⁱπ + 1 = 0"
                                                : "P(A|B)"}
                        </span>
                        <span className="card-number">
                          {String(topics.indexOf(t) + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="card-copy">
                        <span className="card-category">{t.category}</span>
                        <h3>{t.title}</h3>
                        <p>{t.subtitle}</p>
                        <div className="card-bottom">
                          <span>
                            {t.minutes} min · {t.level}
                          </span>
                          <ArrowRight size={17} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {!visible.length && (
                  <div className="empty-results">
                    <p>No lessons match that search.</p>
                    <button
                      onClick={() => {
                        setCategory("All subjects");
                        setSearch("");
                      }}
                    >
                      Show all lessons
                    </button>
                  </div>
                )}
              </section>
              <section className="learning-promise">
                <span>
                  <BookOpen size={23} />
                </span>
                <div>
                  <h2>Understanding takes more than a pretty animation.</h2>
                  <p>
                    Every lesson starts with the problem people were trying to
                    solve. You’ll meet the vocabulary, follow a derivation or
                    physical argument, work through an example, and learn what
                    the model leaves out.
                  </p>
                </div>
                <button onClick={showGlossary}>
                  Explore the glossary
                  <ArrowRight size={17} />
                </button>
              </section>
            </>
          )}
          <footer className="academy-footer">
            <span>
              <Atom size={17} /> Quantum Playground
            </span>
            <p>Physics asks what nature does. Mathematics asks what follows.</p>
            <button onClick={toggleTheme}>
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}{" "}
              {theme === "light" ? "Dark" : "Light"} mode
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}
