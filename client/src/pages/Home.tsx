import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  Heart,
  Image as ImageIcon,
  Lock,
  Pause,
  Play,
  Share2,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const heroImage = "/photos/my-frames-hero.webp";

type Filter = "everything" | "places" | "people" | "details";

const frames = [
  {
    index: "01",
    category: "places" as Filter,
    subtitle: "Places that stayed with me",
    title: "Out there",
    image: "/photos/my-frames-place.webp",
    copy: "The roads, corners, coastlines, and quiet views that made me stop for a second longer than usual.",
  },
  {
    index: "02",
    category: "people" as Filter,
    subtitle: "The people in the frame",
    title: "Close enough",
    image: "/photos/my-frames-people.webp",
    copy: "A collection of faces, gestures, and small expressions I never want to forget.",
  },
  {
    index: "03",
    category: "details" as Filter,
    subtitle: "The things I notice",
    title: "In between",
    image: "/photos/my-frames-detail.webp",
    copy: "Light on a table. A shadow on the wall. The ordinary details that quietly become a memory.",
  },
];

const filterLabels: { id: Filter; label: string }[] = [
  { id: "everything", label: "Everything" },
  { id: "places", label: "Places" },
  { id: "people", label: "People" },
  { id: "details", label: "Details" },
];

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFrame, setActiveFrame] = useState<number | null>(null);
  const [showNote, setShowNote] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Filter>("everything");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleFrames = frames.filter((frame) => activeFilter === "everything" || frame.category === activeFilter);
  const scrollToArchive = () => document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-[#f4f1ec] selection:bg-[#b73843] selection:text-white">
      <nav className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
        <a className="wordmark" href="#top" aria-label="My Frames home">
          <span className="wordmark-mark">M</span>
          <span>my frames</span>
        </a>
        <div className="nav-links">
          <a href="#archive">The archive</a>
          <a href="#note">For my people</a>
          <button className="nav-share" type="button" onClick={() => setShowNote(true)}>
            <Share2 size={15} />
            <span>Share this with you</span>
          </button>
        </div>
      </nav>

      <section id="top" className="hero-shell">
        <div className="hero-media" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="hero-vignette" />
        <div className="hero-grain" />
        <div className="hero-content page-width">
          <div className="eyebrow reveal-up"><span className="eyebrow-dot" />A personal photo journal</div>
          <p className="hero-kicker reveal-up delay-1">Collection one · places, people, passing moments</p>
          <h1 className="hero-title reveal-up delay-2">My life in <em>frames.</em><span>kept close.</span></h1>
          <p className="hero-summary reveal-up delay-3">A small archive of the things I have seen, the people I love, and the moments I wanted to keep a little longer.</p>
          <div className="hero-actions reveal-up delay-4">
            <button className="button button-primary" type="button" onClick={() => setIsPlaying(true)}><Play size={16} fill="currentColor" />Open the collection</button>
            <button className="button button-ghost" type="button" onClick={scrollToArchive}>Browse the archive <ArrowDown size={16} /></button>
          </div>
          <div className="hero-meta reveal-up delay-4"><span>personal archive</span><span className="meta-divider" /><span>made to be shared</span></div>
        </div>
        <button className="sound-toggle" type="button" onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}>{isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}<span>{isMuted ? "sound off" : "sound on"}</span></button>
        <button className="scroll-cue" type="button" onClick={scrollToArchive} aria-label="Scroll to archive"><span>scroll to continue</span><ChevronDown size={17} /></button>
      </section>

      <section className="intro-section page-width">
        <div className="section-kicker">A note before you look around</div>
        <div className="intro-grid">
          <h2>For the people who know me best — here is what I see.</h2>
          <div className="intro-copy">
            <p>This is not a portfolio or a highlight reel. It is a living collection of tiny observations, favorite places, and the faces that make everything feel more like home.</p>
            <div className="signature-line"><span>Collected over time</span><span className="signature">with love, always</span></div>
          </div>
        </div>
      </section>

      <section id="archive" className="chapters-section">
        <div className="page-width">
          <div className="section-heading-row">
            <div><div className="section-kicker">The archive</div><h2 className="section-title">Things worth keeping</h2></div>
            <span className="section-count">{frames.length} collections · always growing</span>
          </div>
          <div className="filter-tabs" role="tablist" aria-label="Filter the photo archive">
            {filterLabels.map((filter) => <button key={filter.id} className={`filter-tab ${activeFilter === filter.id ? "filter-tab--active" : ""}`} type="button" role="tab" aria-selected={activeFilter === filter.id} onClick={() => setActiveFilter(filter.id)}>{filter.label}</button>)}
          </div>
          <div className="memory-grid">
            {visibleFrames.map((frame, index) => (
              <button key={frame.index} className={`memory-card ${index === 1 ? "memory-card--offset" : ""}`} type="button" onClick={() => setActiveFrame(frames.indexOf(frame))}>
                <div className="memory-image-wrap"><img src={frame.image} alt="" className="memory-image" /><div className="memory-image-overlay" /><span className="memory-number">{frame.index}</span><span className="memory-open"><ArrowRight size={17} /></span></div>
                <div className="memory-info"><span className="memory-subtitle">{frame.subtitle}</span><h3>{frame.title}</h3><p>{frame.copy}</p></div>
              </button>
            ))}
          </div>
          <div className="archive-hint"><Camera size={16} /><span>More frames are waiting to be added here.</span></div>
        </div>
      </section>

      <section id="note" className="note-section page-width">
        <div className="note-card">
          <div className="note-art note-art-left"><Sparkles size={19} /></div>
          <div className="note-card-inner">
            <div className="section-kicker">For my closest ones</div><Heart className="note-heart" size={27} fill="currentColor" />
            <h2>Thanks for being<br /><em>part of the picture.</em></h2>
            <p>The best photographs are never just about what was in front of the camera. They are about who was there to make the moment matter.</p>
            <button className="button button-light" type="button" onClick={() => setShowNote(true)}>Open the note <ArrowRight size={16} /></button>
          </div>
          <div className="note-art note-art-right"><Sparkles size={15} /></div>
        </div>
      </section>

      <footer className="site-footer page-width"><div className="footer-brand"><span className="wordmark-mark">M</span> my frames</div><p>A visual archive of a life in progress.</p><span className="footer-year">∞ &nbsp; always collecting</span></footer>

      {activeFrame !== null && (
        <div className="modal-backdrop" role="presentation" onClick={() => setActiveFrame(null)}>
          <div className="memory-modal" role="dialog" aria-modal="true" aria-label={frames[activeFrame].title} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setActiveFrame(null)} aria-label="Close frame"><X size={18} /></button>
            <img src={frames[activeFrame].image} alt="" />
            <div className="modal-copy"><span className="section-kicker">Frame {frames[activeFrame].index}</span><h2>{frames[activeFrame].title}</h2><p>{frames[activeFrame].copy}</p><div className="modal-detail"><Check size={15} /> Saved in my personal archive</div></div>
          </div>
        </div>
      )}

      {showNote && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowNote(false)}>
          <div className="letter-modal" role="dialog" aria-modal="true" aria-label="A note for close friends and family" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close modal-close-dark" type="button" onClick={() => setShowNote(false)} aria-label="Close note"><X size={18} /></button>
            <Lock size={18} className="letter-lock" /><span className="section-kicker">A little context · just for you</span><h2>Hey, you.</h2>
            <p>You are part of so many of these photographs, whether you are in the frame or simply the reason I looked up and noticed the light. I made this little archive to share the way the world looks from where I am standing.</p>
            <p>Thank you for being the kind of person I want to send things to — the view, the song, the blurry photo, the ordinary moment that somehow felt important.</p>
            <div className="letter-signoff">Glad you are here <span>♥</span></div>
          </div>
        </div>
      )}

      {isPlaying && (
        <div className="trailer-overlay" role="presentation" onClick={() => setIsPlaying(false)}>
          <div className="trailer-frame" role="dialog" aria-modal="true" aria-label="My frames collection preview" onClick={(event) => event.stopPropagation()}>
            <div className="trailer-background" style={{ backgroundImage: `url(${heroImage})` }} /><div className="trailer-shade" />
            <button className="modal-close" type="button" onClick={() => setIsPlaying(false)} aria-label="Close collection preview"><X size={18} /></button>
            <div className="trailer-content"><div className="trailer-logo"><Camera size={19} /> <span>my frames</span></div><div className="trailer-play"><Pause size={23} fill="currentColor" /></div><p>Now viewing: a small archive of a life in progress.</p><div className="trailer-progress"><span /></div><div className="trailer-controls"><span>00:14</span><span>∞</span></div></div>
          </div>
        </div>
      )}
    </main>
  );
}
