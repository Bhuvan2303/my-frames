import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Lock,
  Pause,
  Play,
  Share2,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const heroImage =
  "/manus-storage/our-story-hero_2b1e8b0b.jpg";

const memories = [
  {
    index: "01",
    title: "The beginning",
    subtitle: "A very good day to meet you",
    image:
      "/manus-storage/our-story-rooftop_25060fa7.jpg",
    copy: "Some stories start with a grand gesture. Ours started quietly — a little curiosity, a lot of laughing, and that feeling that the day had shifted somehow.",
  },
  {
    index: "02",
    title: "Same sky",
    subtitle: "Different cities, same feeling",
    image:
      "/manus-storage/our-story-coffee_c27e915f.jpg",
    copy: "Distance turned ordinary moments into something sacred: a voice note, a shared playlist, and staying up just a little later to hear about your day.",
  },
  {
    index: "03",
    title: "The little things",
    subtitle: "Our favorite kind of ordinary",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85",
    copy: "The best parts were never the picture-perfect ones. They were the in-between moments, the inside jokes, and the comfortable silence.",
  },
];

function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMemory, setActiveMemory] = useState<number | null>(null);
  const [showLetter, setShowLetter] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToMemories = () => {
    document.getElementById("chapters")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-[#f4f1ec] selection:bg-[#b73843] selection:text-white">
      <nav className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
        <a className="wordmark" href="#top" aria-label="Our Story home">
          <span className="wordmark-mark">O</span>
          <span>our story</span>
        </a>
        <div className="nav-links">
          <a href="#chapters">Chapters</a>
          <a href="#note">The note</a>
          <button className="nav-share" type="button" onClick={() => setShowLetter(true)}>
            <Share2 size={15} />
            <span>Share the story</span>
          </button>
        </div>
      </nav>

      <section id="top" className="hero-shell">
        <div className="hero-media" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="hero-vignette" />
        <div className="hero-grain" />
        <div className="hero-content page-width">
          <div className="eyebrow reveal-up">
            <span className="eyebrow-dot" />
            A story made for two
          </div>
          <p className="hero-kicker reveal-up delay-1">Season one · 08.14.2022 — forever</p>
          <h1 className="hero-title reveal-up delay-2">
            You are my
            <em>favorite</em>
            <span>story.</span>
          </h1>
          <p className="hero-summary reveal-up delay-3">
            A little collection of the moments that made us. Press play when you want to remember how it all feels.
          </p>
          <div className="hero-actions reveal-up delay-4">
            <button className="button button-primary" type="button" onClick={() => setIsPlaying(true)}>
              <Play size={16} fill="currentColor" />
              Play our trailer
            </button>
            <button className="button button-ghost" type="button" onClick={scrollToMemories}>
              Explore chapters
              <ArrowDown size={16} />
            </button>
          </div>
          <div className="hero-meta reveal-up delay-4">
            <span>PG · romance</span>
            <span className="meta-divider" />
            <span>∞ rewatchable</span>
          </div>
        </div>
        <button className="sound-toggle" type="button" onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}>
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>{isMuted ? "sound off" : "sound on"}</span>
        </button>
        <button className="scroll-cue" type="button" onClick={scrollToMemories} aria-label="Scroll to chapters">
          <span>scroll to continue</span>
          <ChevronDown size={17} />
        </button>
      </section>

      <section className="intro-section page-width">
        <div className="section-kicker">A message from the director</div>
        <div className="intro-grid">
          <h2>For all the versions of us that brought us here.</h2>
          <div className="intro-copy">
            <p>
              This is not a highlight reel. It is a soft place to land — a reminder that the smallest moments can make the biggest love stories.
            </p>
            <div className="signature-line">
              <span>Made with all my love</span>
              <span className="signature">yours, always</span>
            </div>
          </div>
        </div>
      </section>

      <section id="chapters" className="chapters-section">
        <div className="page-width">
          <div className="section-heading-row">
            <div>
              <div className="section-kicker">The archive</div>
              <h2 className="section-title">Our favorite chapters</h2>
            </div>
            <span className="section-count">03 moments · 01 forever</span>
          </div>
          <div className="memory-grid">
            {memories.map((memory, index) => (
              <button
                key={memory.index}
                className={`memory-card ${index === 1 ? "memory-card--offset" : ""}`}
                type="button"
                onClick={() => setActiveMemory(index)}
              >
                <div className="memory-image-wrap">
                  <img src={memory.image} alt="" className="memory-image" />
                  <div className="memory-image-overlay" />
                  <span className="memory-number">{memory.index}</span>
                  <span className="memory-open"><ArrowRight size={17} /></span>
                </div>
                <div className="memory-info">
                  <span className="memory-subtitle">{memory.subtitle}</span>
                  <h3>{memory.title}</h3>
                  <p>{memory.copy}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="note" className="note-section page-width">
        <div className="note-card">
          <div className="note-art note-art-left"><Sparkles size={19} /></div>
          <div className="note-card-inner">
            <div className="section-kicker">A note for you</div>
            <Heart className="note-heart" size={27} fill="currentColor" />
            <h2>There is nowhere else<br /><em>I would rather be.</em></h2>
            <p>Thanks for being the plot twist I never saw coming — and the ending I never want to reach.</p>
            <button className="button button-light" type="button" onClick={() => setShowLetter(true)}>
              Open the full note <ArrowRight size={16} />
            </button>
          </div>
          <div className="note-art note-art-right"><Sparkles size={15} /></div>
        </div>
      </section>

      <footer className="site-footer page-width">
        <div className="footer-brand"><span className="wordmark-mark">O</span> our story</div>
        <p>Created for the one who makes every ordinary day feel like a premiere.</p>
        <span className="footer-year">∞ &nbsp; 2024 — forever</span>
      </footer>

      {activeMemory !== null && (
        <div className="modal-backdrop" role="presentation" onClick={() => setActiveMemory(null)}>
          <div className="memory-modal" role="dialog" aria-modal="true" aria-label={memories[activeMemory].title} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setActiveMemory(null)} aria-label="Close chapter"><X size={18} /></button>
            <img src={memories[activeMemory].image} alt="" />
            <div className="modal-copy">
              <span className="section-kicker">Chapter {memories[activeMemory].index}</span>
              <h2>{memories[activeMemory].title}</h2>
              <p>{memories[activeMemory].copy}</p>
              <div className="modal-detail"><Check size={15} /> Saved in our forever archive</div>
            </div>
          </div>
        </div>
      )}

      {showLetter && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowLetter(false)}>
          <div className="letter-modal" role="dialog" aria-modal="true" aria-label="The full note" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close modal-close-dark" type="button" onClick={() => setShowLetter(false)} aria-label="Close note"><X size={18} /></button>
            <Lock size={18} className="letter-lock" />
            <span className="section-kicker">Private screening · just us</span>
            <h2>Hey, you.</h2>
            <p>Somehow, you made a home out of every place we have been. I hope you know that I notice the way you make hard days softer, how easily you make me laugh, and how much better the world feels with you in it.</p>
            <p>So here is my favorite promise: I will keep choosing you, in every season, in every city, in every version of our story still waiting to be written.</p>
            <div className="letter-signoff">Always yours <span>♥</span></div>
          </div>
        </div>
      )}

      {isPlaying && (
        <div className="trailer-overlay" role="presentation" onClick={() => setIsPlaying(false)}>
          <div className="trailer-frame" role="dialog" aria-modal="true" aria-label="Our story trailer" onClick={(event) => event.stopPropagation()}>
            <div className="trailer-background" style={{ backgroundImage: `url(${heroImage})` }} />
            <div className="trailer-shade" />
            <button className="modal-close" type="button" onClick={() => setIsPlaying(false)} aria-label="Close trailer"><X size={18} /></button>
            <div className="trailer-content">
              <div className="trailer-logo">O<span>our story</span></div>
              <div className="trailer-play"><Pause size={23} fill="currentColor" /></div>
              <p>Now playing: the part where it all makes sense.</p>
              <div className="trailer-progress"><span /></div>
              <div className="trailer-controls"><span>00:14</span><span>∞</span></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
