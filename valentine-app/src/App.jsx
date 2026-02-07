import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

export default function App() {
  const [accepted, setAccepted] = useState(false)
  const [noPos, setNoPos] = useState({ x: 24, y: 24 })
  const [musicOn, setMusicOn] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [countdown, setCountdown] = useState('')
  const [surprise, setSurprise] = useState(null)

  const arenaRef = useRef(null)
  const noRef = useRef(null)
  const audioRef = useRef(null)

  const personalMessage = 'Урангоо, Will you be my valentine?💖'

  const surprises = useMemo(
    () => [
      'Бэлэг: Чиний дуртай шоколад 🍫',
      'Санахад: Чиний инээмсэглэл миний өдөр бүрийн гэрэл.',
      'Бэлэг: Хамтдаа авсан зурагны жаазтай цомог 📸',
      'Санахад: Чамтай хамт байх бүртээ аз жаргалтай.',
      'Бэлэг: Халуун кофе + миний тэврэлт ☕',
      'Санахад: Чи миний хамгийн хайртай хүн.'
    ],
    []
  )

  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 7 + Math.random() * 8,
        size: 12 + Math.random() * 24,
        opacity: 0.5 + Math.random() * 0.4,
      })),
    []
  )

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

  const toggleMusic = () => { setMusicOn(v => !v) }

  function handleHeartClick() {
    const next = surprises[Math.floor(Math.random() * surprises.length)]
    setSurprise(next)
    setTimeout(() => setSurprise(null), 2400)
  }

  // Typing animation for main question
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setTypedText(personalMessage.slice(0, i + 1))
      i += 1
      if (i === personalMessage.length) clearInterval(interval)
    }, 90)
    return () => clearInterval(interval)
  }, [])

  // Countdown to Valentine’s Day (Feb 14)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const valentine = new Date(now.getFullYear(), 1, 14, 0, 0, 0)
      if (now > valentine) valentine.setFullYear(valentine.getFullYear() + 1)
      const diff = valentine - now
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setCountdown(`${days} өдөр ${hours}ц ${minutes}м ${seconds}с`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    moveNoButton()
  }, [])

  

  return (
    <div className="app">
      <div className="gradient-bg" />

      <div className="hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <button
            key={heart.id}
            className="heart"
            onClick={handleHeartClick}
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}px`,
              opacity: heart.opacity,
            }}
            aria-label="Heart surprise"
          >
            ♥
          </button>
        ))}
      </div>

      {surprise ? <div className="surprise">{surprise}</div> : null}

      <div className="card">
        <p className="eyebrow">Бяцхан асуулт</p>
        <h1>{typedText || '...'}</h1>
        <p className="subtitle">Валентины өдөр хүртэл: {countdown}</p>

        <div className="music">
          <span>Зөвхөн чи бид хоёрыг илтгэх дуу</span>
          <button className="music-toggle" onClick={toggleMusic}>
            {musicOn ? 'Түр зогсоох' : 'Тоглуулах'}
          </button>
        </div>
        {musicOn && ( 
  <div className="music-embed"> 
    <iframe
      width="0"
      height="0"
      title="Valentine music"
      src={`https://www.youtube.com/embed/tpA_vbdkiAo?autoplay=1&loop=1&playlist=tpA_vbdkiAo`}
      allow="autoplay"
      frameBorder="0"
    ></iframe>
  </div>
)}

        <div className="arena" ref={arenaRef}>
          <button className="yes" onClick={() => setAccepted(true)}>Тийм</button>
          <button
            className="no"
            ref={noRef}
            style={{ left: noPos.x, top: noPos.y }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            aria-label="Үгүй (барьж үзээрэй)"
          >
            Үгүй
          </button>
        </div>
      </div>

      {accepted ? (
        <div className="celebrate" role="dialog" aria-live="polite">
          <div className="celebrate-card">
            <p className="eyebrow">Урилга</p>
            <h2>Гэгээн Валентины өдрийн хүндэтгэлийн уулзалт</h2>
            <div className="invite">
              <p>Хүндэт Урангоо Танаа,</p>
              <div className="invite-divider" aria-hidden="true" />
              <p>
                Хайр, халамжаар бялхсан Гэгээн Валентины өдрийг тохиолдуулан
                2026 оны 2 сарын 14-ний өдөр
                манай гэрт болох хүндэтгэлийн уулзалтад
                Таныг хүрэлцэн ирэхийг урьж байна.
              </p>
              <p>Хүндэтгэсэн, Чиний хайрт Calm</p>
            </div>
            <button className="close" onClick={() => setAccepted(false)}>Буцах</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
