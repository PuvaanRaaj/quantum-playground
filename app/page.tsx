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
  Sun,
  X,
} from "lucide-react";
import { topics, loadTopic } from "../content/library";
import type { Topic } from "../content/types";
import TopicVisual from "../components/topic-visual";
const categories = [
  "All subjects",
  "Space & relativity",
  "Quantum mechanics",
  "Mathematics",
  "Classical physics",
] as const;
export default function Academy() {
  const [slug, setSlug] = useState<string | null>(null),
    [search, setSearch] = useState(""),
    [category, setCategory] = useState<string>("All subjects"),
    [theme, setTheme] = useState("light"),
    [mobileNav, setMobileNav] = useState(false),
    [labOpen, setLabOpen] = useState(false),
    [answer, setAnswer] = useState<number | null>(null),
    [glossary, setGlossary] = useState(false);
  const [loadedTopic, setLoadedTopic] = useState<Topic | null>(null);
  const [loadError, setLoadError] = useState(false);
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
  const selected = topics.find((t) => t.slug === slug);
  const topic = loadedTopic?.slug === slug ? loadedTopic : undefined;
  useEffect(() => {
    let cancelled = false;
    setLoadError(false);
    if (slug && selected)
      loadTopic(slug)
        .then((t) => {
          if (!cancelled) setLoadedTopic(t);
        })
        .catch(() => {
          if (!cancelled) setLoadError(true);
        });
    return () => {
      cancelled = true;
    };
  }, [slug, selected]);
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
          <p className="label-caps">SUBJECTS</p>
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
            <details
              className="nav-group"
              key={group}
              open={topic?.category === group || category === group}
            >
              <summary>
                <span className={`category-dot dot-${gi}`} />
                {group}
              </summary>
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
            </details>
          ))}
          <button className="sidebar-glossary" onClick={showGlossary}>
            <CircleHelp size={16} /> Glossary
          </button>
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
                      {
                        {
                          "Start here": "Introductory",
                          "Build intuition": "Intermediate",
                          "Go deeper": "Advanced",
                        }[topic.level]
                      }{" "}
                      · {topic.minutes} min read
                    </span>
                  </div>
                  <h1>{topic.title}</h1>
                  <p className="lesson-subtitle">{topic.subtitle}</p>
                  <div className="lesson-actions">
                    <a href="#understand">
                      <BookOpen size={16} /> Read the explanation
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
                        <span className="label-caps">CONTEXT</span>
                        <p>{topic.why}</p>
                      </div>
                      <p className="prerequisites">
                        <strong>Prerequisites:</strong>{" "}
                        {topic.prerequisites.join(" · ")}
                      </p>
                    </section>
                    <section id="vocabulary" className="vocabulary-section">
                      <span className="section-number">01 / DEFINITIONS</span>
                      <h2>Definitions</h2>
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
                      <span className="section-number">02 / THEORY</span>
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
                      <div>
                        <span className="label-caps">KEY POINT</span>
                        <p>{topic.insight}</p>
                      </div>
                    </aside>
                    <section id="mathematics" className="equation-section">
                      <span className="section-number">03 / MATHEMATICS</span>
                      <h2>Equation and worked example</h2>
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
                        04 / MISCONCEPTIONS
                      </span>
                      <h2>Common misconceptions</h2>
                      {topic.misconceptions.map((m) => (
                        <div className="misconception" key={m.myth}>
                          <h3>{m.myth}</h3>
                          <p>{m.correction}</p>
                        </div>
                      ))}
                    </section>
                    <section id="check" className="knowledge-check">
                      <span className="label-caps">
                        CHECK YOUR UNDERSTANDING
                      </span>
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
                    <a href="#understand">Introduction</a>
                    <a href="#vocabulary">Definitions</a>
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
                      05 / INTERACTIVE MODEL
                    </span>
                    <h2>Interactive model</h2>
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
                  <span className="label-caps">REFERENCES</span>
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
                        topics[
                          (topics.findIndex((t) => t.slug === topic.slug) + 1) %
                            topics.length
                        ].slug,
                      )
                    }
                  >
                    Explore{" "}
                    {
                      topics[
                        (topics.findIndex((t) => t.slug === topic.slug) + 1) %
                          topics.length
                      ].title
                    }
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            </>
          ) : selected ? (
            <section className="lesson-loading" role="status">
              <h1>{selected.title}</h1>
              <p>
                {loadError
                  ? "The lesson could not load. Please reload the page."
                  : "Loading lesson…"}
              </p>
            </section>
          ) : glossary ? (
            <section className="glossary-page">
              <p className="label-caps"></p>
              <h1>Glossary.</h1>
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
                <h1>Physics and mathematics</h1>
                <p>
                  {topics.length} lessons with explanations, worked examples,
                  and interactive models.
                </p>
              </section>
              <section className="catalog">
                <div className="catalog-heading">
                  <div>
                    <h2>Lessons</h2>
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
                      <div className="card-copy">
                        <span className="card-category">{t.category}</span>
                        <h3>{t.title}</h3>
                        <p>{t.subtitle}</p>
                        <div className="card-bottom">
                          <span>
                            {t.minutes} min ·{" "}
                            {
                              {
                                "Start here": "Introductory",
                                "Build intuition": "Intermediate",
                                "Go deeper": "Advanced",
                              }[t.level]
                            }
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
            </>
          )}
          <footer className="academy-footer">
            <span>
              <Atom size={17} /> Quantum Playground
            </span>

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
