import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Camera,
  ChevronDown,
  Heart,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'

const frames = [
  {
    id: 1,
    category: 'places',
    image: '/photos/my-frames-place.webp',
    subtitle: 'PLACES THAT STAYED WITH ME',
    title: 'Out there',
    description:
      'The roads, corners, coastlines, and quiet views that made me stop for a second longer than usual.',
  },
  {
    id: 2,
    category: 'people',
    image: '/photos/my-frames-people.webp',
    subtitle: 'THE PEOPLE IN THE FRAME',
    title: 'Close enough',
    description:
      'A collection of faces, gestures, and small expressions I never want to forget.',
  },
  {
    id: 3,
    category: 'details',
    image: '/photos/my-frames-detail.webp',
    subtitle: 'THE THINGS I NOTICE',
    title: 'In between',
    description:
      'Light on a table. A shadow on the wall. The ordinary details that quietly become a memory.',
  },
] as const

type Frame = (typeof frames)[number]
type Category = 'all' | Frame['category']

type ModalState =
  | { type: 'frame'; frame: Frame }
  | { type: 'note' }
  | { type: 'collection' }
  | null

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

function Modal({ modal, onClose }: { modal: Exclude<ModalState, null>; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useLockBodyScroll(Boolean(modal))

  useEffect(() => {
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const frame = modal.type === 'frame' ? modal.frame : null

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className={`modal-shell ${modal.type === 'collection' ? 'modal-collection' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={modal.type === 'frame' ? frame?.title : modal.type === 'note' ? 'Personal note' : 'Collection preview'}
      >
        <button ref={closeRef} className="icon-button modal-close" onClick={onClose} aria-label="Close dialog">
          <X size={19} />
        </button>

        {modal.type === 'frame' && frame && (
          <div className="frame-modal-grid">
            <div className="modal-image-wrap">
              <img src={frame.image} alt={frame.title} className="modal-image" />
              <span className="frame-number">FRAME {String(frame.id).padStart(2, '0')}</span>
            </div>
            <div className="modal-copy">
              <span className="eyebrow">{frame.subtitle}</span>
              <h2>{frame.title}</h2>
              <p>{frame.description}</p>
              <div className="archive-stamp">Saved in my personal archive</div>
            </div>
          </div>
        )}

        {modal.type === 'note' && (
          <div className="note-modal">
            <span className="eyebrow">A SMALL NOTE</span>
            <Heart size={28} fill="currentColor" aria-hidden="true" />
            <h2>Hey, you.</h2>
            <p>
              You are part of so many of these photographs, whether you are in the frame or simply the reason I looked up and noticed the light. I made this little archive to share the way the world looks from where I am standing.
            </p>
            <p>
              Thank you for being the kind of person I want to send things to — the view, the song, the blurry photo, the ordinary moment that somehow felt important.
            </p>
            <p>Glad you are here ♥</p>
          </div>
        )}

        {modal.type === 'collection' && <CollectionPreview onClose={onClose} />}
      </div>
    </div>
  )
}

function CollectionPreview({ onClose }: { onClose: () => void }) {
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(34)

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setProgress((value) => (value >= 100 ? 0 : value + 1)), 1200)
    return () => window.clearInterval(timer)
  }, [playing])

  return (
    <section className="collection-preview" aria-label="Collection preview">
      <img src="/photos/my-frames-hero.webp" alt="" className="collection-image" />
      <div className="collection-overlay" />
      <div className="collection-content">
        <div className="collection-topline">
          <div className="collection-brand"><Camera size={17} /> my frames</div>
          <button className="icon-button" onClick={onClose} aria-label="Close collection preview"><X size={20} /></button>
        </div>
        <div className="collection-center">
          <div className="collection-icon"><Camera size={23} /></div>
          <span className="eyebrow">NOW VIEWING</span>
          <h2>A small archive of a life in progress.</h2>
          <button className="play-control" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause preview' : 'Play preview'}>
            {playing ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
          </button>
        </div>
        <div className="collection-bottom">
          <div className="progress-track" aria-label={`Preview ${progress}% complete`}><span style={{ width: `${progress}%` }} /></div>
          <div className="time-row"><span>00:{String(Math.floor(progress * 0.59)).padStart(2, '0')}</span><span>00:59</span></div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [modal, setModal] = useState<ModalState>(null)
  const [soundOn, setSoundOn] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const visibleFrames = useMemo(
    () => (activeCategory === 'all' ? frames : frames.filter((frame) => frame.category === activeCategory)),
    [activeCategory],
  )

  const openCollection = () => setModal({ type: 'collection' })

  return (
    <div className="site-shell">
      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <a href="#top" className="brand" aria-label="My Frames home">
          <span className="brand-mark">M</span>
          <span>MY FRAMES</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#archive">The archive</a>
          <a href="#people">For my people</a>
        </nav>
        <a className="share-button" href="#people">
          <span className="share-text">Share this with you</span>
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <img src="/photos/my-frames-hero.webp" alt="Cinematic personal archive cover" className="hero-image" />
          <div className="hero-gradient" />
          <div className="grain" />
          <div className="hero-content">
            <div className="hero-kicker">
              <span>A PERSONAL PHOTO JOURNAL</span>
              <span>COLLECTION ONE · PLACES, PEOPLE, PASSING MOMENTS</span>
            </div>
            <h1 id="hero-title">My life in <em>frames.</em><br />kept close.</h1>
            <p className="hero-description">A small archive of the things I have seen, the people I love, and the moments I wanted to keep a little longer.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={openCollection}>Open the collection <ArrowRight size={17} /></button>
              <a className="button button-secondary" href="#archive">Browse the archive <ArrowDown size={17} /></a>
            </div>
            <div className="hero-meta">
              <span>PERSONAL ARCHIVE</span><span>MADE TO BE SHARED</span>
            </div>
          </div>
          <div className="sound-toggle">
            <button onClick={() => setSoundOn((value) => !value)} aria-pressed={soundOn} aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}>
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
              {soundOn ? 'SOUND ON' : 'SOUND OFF'}
            </button>
          </div>
          <a href="#intro" className="scroll-cue" aria-label="Scroll to introduction"><span>SCROLL</span><span className="scroll-line" /></a>
        </section>

        <section id="intro" className="intro section-pad">
          <div className="section-rule" />
          <div className="intro-layout">
            <span className="eyebrow">A NOTE BEFORE YOU LOOK AROUND</span>
            <div>
              <h2>For the people who know me best — <em>here is what I see.</em></h2>
              <p>A personal collection of observations, favorite places, and people. Nothing here is meant to be perfect. These are simply the frames I chose not to let disappear.</p>
              <div className="signature"><span>Collected over time</span><em>with love, always</em></div>
            </div>
          </div>
        </section>

        <section id="archive" className="archive section-pad" aria-labelledby="archive-title">
          <div className="archive-heading">
            <div>
              <span className="eyebrow">THE ARCHIVE</span>
              <h2 id="archive-title">Things worth <em>keeping.</em></h2>
            </div>
            <span className="archive-count">3 COLLECTIONS · ALWAYS GROWING</span>
          </div>
          <div className="filters" role="group" aria-label="Filter frames">
            {(['all', 'places', 'people', 'details'] as const).map((category) => (
              <button key={category} className={activeCategory === category ? 'filter active' : 'filter'} onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}>
                {category === 'all' ? 'Everything' : category[0].toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="frames-grid">
            {visibleFrames.map((frame) => (
              <article key={frame.id} className="frame-card" tabIndex={0} onClick={() => setModal({ type: 'frame', frame })} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setModal({ type: 'frame', frame }) } }}>
                <div className="frame-image-wrap">
                  <img src={frame.image} alt="" className="frame-image" />
                  <div className="frame-overlay" />
                  <span className="frame-index">0{frame.id}</span>
                  <button className="card-arrow" onClick={(event) => { event.stopPropagation(); setModal({ type: 'frame', frame }) }} aria-label={`Open ${frame.title}`}><ArrowRight size={18} /></button>
                </div>
                <div className="frame-copy">
                  <span className="eyebrow">{frame.subtitle}</span>
                  <h3>{frame.title}</h3>
                  <p>{frame.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="archive-more"><Camera size={18} /><span>More frames are waiting to be added here.</span></div>
        </section>

        <section id="people" className="people-note section-pad">
          <div className="note-decor note-decor-one" /><div className="note-decor note-decor-two" />
          <div className="note-inner">
            <span className="eyebrow">FOR MY CLOSEST ONES</span>
            <Heart size={25} fill="currentColor" aria-hidden="true" />
            <h2>Thanks for being<br /><em>part of the picture.</em></h2>
            <p>The best photographs are never just about what was in front of the camera. They are about who was there to make the moment matter.</p>
            <button className="button note-button" onClick={() => setModal({ type: 'note' })}>Open the note <ArrowRight size={17} /></button>
          </div>
        </section>
      </main>

      <footer className="footer section-pad">
        <div className="footer-top"><div className="brand"><span className="brand-mark">M</span><span>MY FRAMES</span></div><span>A visual archive of a life in progress.</span></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} MY FRAMES</span><span>∞ ALWAYS COLLECTING</span></div>
      </footer>

      {modal && <Modal modal={modal} onClose={() => setModal(null)} />}
    </div>
  )
}

export default App
