import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

export default function App() {
  const [accepted, setAccepted] = useState(false)
  const [noPos, setNoPos] = useState({ x: 24, y: 24 })
  const [musicOn, setMusicOn] = useState(false)
  const [idea, setIdea] = useState('')
  const arenaRef = useRef(null)
  const noRef = useRef(null)

  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        size: 16 + Math.random() * 16,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    []
  )

  const dateIdeas = [
    {
      label: 'Drink wine together',
      image:
        'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Sunset picnic',
      image:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Cozy movie night',
      image:
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Stargazing walk',
      image:
        'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Watch a theater acting event',
      image:
        'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Music concert night',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    },
  ]

  function moveNoButton() {
    if (!arenaRef.current || !noRef.current) return
    const arenaRect = arenaRef.current.getBoundingClientRect()
    const buttonRect = noRef.current.getBoundingClientRect()
    const padding = 10
    const maxX = Math.max(padding, arenaRect.width - buttonRect.width - padding)
    const maxY = Math.max(padding, arenaRect.height - buttonRect.height - padding)
    const nextX = Math.random() * maxX
    const nextY = Math.random() * maxY
    setNoPos({ x: nextX, y: nextY })
  }

  useEffect(() => {
    moveNoButton()
  }, [])

  return (
    <div className="app">
      <div className="hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}px`,
              opacity: heart.opacity,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <div className="card">
        <p className="eyebrow">A little question</p>
        <h1>Will you be my Valentine?</h1>
        <p className="subtitle">I planned a very sweet yes.</p>

        <div className="music">
          <span>Background music</span>
          <button className="music-toggle" onClick={() => setMusicOn((v) => !v)}>
            {musicOn ? 'Pause' : 'Play'}
          </button>
        </div>
        {musicOn ? (
          <div className="music-embed" aria-hidden="true">
            <iframe
              title="Valentine music"
              src="https://www.youtube.com/embed/M7TXYPnKEyY?autoplay=1&loop=1&playlist=M7TXYPnKEyY&controls=0"
              allow="autoplay"
            />
          </div>
        ) : null}

        <div className="arena" ref={arenaRef}>
          <button className="yes" onClick={() => setAccepted(true)}>Yes</button>
          <button
            className="no"
            ref={noRef}
            style={{ left: noPos.x, top: noPos.y }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            aria-label="No (try to click me)"
          >
            No
          </button>
        </div>
      </div>

      {accepted ? (
        <div className="celebrate" role="dialog" aria-live="polite">
          <div className="celebrate-card">
            <p className="eyebrow">Congrats!</p>
            <h2>I knew it. I love you.</h2>
            <p className="subtitle">Now come here so I can hug you for real.</p>
            <div className="ideas">
              <p className="ideas-title">Pick a date idea:</p>
              <div className="ideas-list">
                {dateIdeas.map((ideaItem) => (
                  <button
                    key={ideaItem.label}
                    className={idea === ideaItem.label ? 'idea active' : 'idea'}
                    onClick={() => setIdea(ideaItem.label)}
                  >
                    <img src={ideaItem.image} alt={ideaItem.label} loading="lazy" />
                    <span>{ideaItem.label}</span>
                  </button>
                ))}
              </div>
              {idea ? <p className="ideas-choice">Chosen: {idea}</p> : null}
            </div>
            <button className="close" onClick={() => setAccepted(false)}>Back</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
