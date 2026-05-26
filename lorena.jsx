import { useState, useEffect, useRef } from "react";

const HERO_NAME = "Lyelson";

const phases = [
  {
    id: 1,
    title: "FASE 1",
    subtitle: "A Amizade",
    location: "🏫 FACULDADE",
    color: "#4ade80",
    bg: "#0f2318",
    stars: "#4ade80",
    story: [
      "Era mais uma tarde na faculdade...",
      "Dois estranhos dividiam o mesmo corredor.",
      "Ninguém sabia ainda, mas aquela amizade",
      "mudaria tudo. 💚",
    ],
    emoji: "📚",
    cleared: "AMIZADE CONQUISTADA!",
  },
  {
    id: 2,
    title: "FASE 2",
    subtitle: "A Viagem",
    location: "🌊 PRAIA",
    color: "#38bdf8",
    bg: "#071a2e",
    stars: "#38bdf8",
    story: [
      "Uma viagem com os amigos.",
      "Areia, mar e risadas.",
      "E no meio de tudo isso,",
      "algo diferente começou a nascer. 💙",
    ],
    emoji: "🏖️",
    cleared: "MEMÓRIA ESPECIAL DESBLOQUEADA!",
  },
  {
    id: 3,
    title: "FASE 3",
    subtitle: "O Começo",
    location: "💞 11 MESES",
    color: "#f472b6",
    bg: "#2a0a1a",
    stars: "#f472b6",
    story: [
      "Amigos viraram algo mais.",
      "O coração acelerou pela primeira vez.",
      `${HERO_NAME} & Lorena`,
      "começa aqui. 💗",
    ],
    emoji: "💕",
    cleared: "+11 MESES JUNTOS!",
  },
  {
    id: 4,
    title: "FASE 4",
    subtitle: "Os Planos",
    location: "🎵 PLANOS - BK",
    color: "#c084fc",
    bg: "#180a2e",
    stars: "#c084fc",
    story: [
      '"Tenho planos com você..."',
      "Construir um lar, uma família.",
      "Cada passo junto",
      "é o melhor plano que existe. 💜",
    ],
    emoji: "🏡",
    cleared: "FUTURO DESBLOQUEADO!",
  },
  {
    id: 5,
    title: "FASE 5",
    subtitle: "Hoje",
    location: "🏆 BOSS FINAL: O AMOR",
    color: "#fbbf24",
    bg: "#1a0f00",
    stars: "#fbbf24",
    story: [
      "Faculdade → Praia → Amor → Família",
      "Cada fase mais incrível que a anterior.",
      `Lorena, você é meu jogador 2 favorito.`,
      "Feliz aniversário de namoro! 💛",
    ],
    emoji: "👑",
    cleared: "VOCÊ COMPLETOU O JOGO! ❤️",
  },
];

function PixelHeart({ color = "#ff0055", size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 9" style={{ imageRendering: "pixelated" }}>
      <rect x="1" y="0" width="3" height="1" fill={color} />
      <rect x="6" y="0" width="3" height="1" fill={color} />
      <rect x="0" y="1" width="4" height="2" fill={color} />
      <rect x="5" y="1" width="4" height="2" fill={color} />
      <rect x="0" y="3" width="9" height="2" fill={color} />
      <rect x="1" y="5" width="7" height="2" fill={color} />
      <rect x="2" y="7" width="5" height="1" fill={color} />
      <rect x="3" y="8" width="3" height="1" fill={color} />
    </svg>
  );
}

function PixelStar({ color, x, y, size = 4 }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        opacity: Math.random() * 0.6 + 0.3,
        imageRendering: "pixelated",
      }}
    />
  );
}

function Stars({ color }) {
  const stars = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() > 0.7 ? 4 : 2,
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.current.map((s) => (
        <PixelStar key={s.id} color={color} x={s.x} y={s.y} size={s.size} />
      ))}
    </div>
  );
}

function PixelChar({ color = "#fff", emoji }) {
  return (
    <div style={{ fontSize: 40, filter: "drop-shadow(0 0 8px " + color + ")", animation: "bob 1s infinite" }}>
      {emoji}
    </div>
  );
}

function CharacterSprite({ src, size = 80, color = "#fff", style = {} }) {
  return (
    <img
      src={src}
      alt="character"
      style={{
        width: size,
        height: "auto",
        imageRendering: "pixelated",
        filter: `drop-shadow(0 0 10px ${color})`,
        animation: "bob 1s infinite",
        ...style,
      }}
    />
  );
}

function TypeWriter({ lines, color, onDone }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIdx >= lines.length) {
      setDone(true);
      onDone && onDone();
      return;
    }
    if (charIdx < lines[lineIdx].length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx, done, lines, onDone]);

  return (
    <div style={{ minHeight: 120, display: "flex", flexDirection: "column", gap: 8 }}>
      {lines.slice(0, lineIdx + 1).map((line, i) => (
        <p
          key={i}
          style={{
            margin: 0,
            color: i < lineIdx ? color : color,
            opacity: i < lineIdx ? 0.7 : 1,
            fontSize: 12,
            lineHeight: 1.8,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          {i < lineIdx ? line : line.slice(0, charIdx)}
          {i === lineIdx && !done && (
            <span style={{ animation: "blink 0.8s infinite", color }}> █</span>
          )}
        </p>
      ))}
    </div>
  );
}

function PhaseCard({ phase, onComplete, index }) {
  const [storyDone, setStoryDone] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 100);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.5s ease",
        background: phase.bg,
        border: `3px solid ${phase.color}`,
        borderRadius: 0,
        padding: 24,
        marginBottom: 24,
        position: "relative",
        boxShadow: `0 0 20px ${phase.color}44, inset 0 0 40px ${phase.bg}`,
        imageRendering: "pixelated",
      }}
    >
      <Stars color={phase.stars} />

      {/* Corner decorations */}
      {["topleft", "topright", "bottomleft", "bottomright"].map((pos) => (
        <div
          key={pos}
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            background: phase.color,
            ...(pos.includes("top") ? { top: -2 } : { bottom: -2 }),
            ...(pos.includes("left") ? { left: -2 } : { right: -2 }),
          }}
        />
      ))}

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: phase.color, marginBottom: 4 }}>
              {phase.title}
            </div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 14, color: "#fff" }}>
              {phase.subtitle}
            </div>
          </div>
          <PixelChar color={phase.color} emoji={phase.emoji} />
        </div>

        {/* Location bar */}
        <div
          style={{
            background: `${phase.color}22`,
            border: `1px solid ${phase.color}`,
            padding: "6px 12px",
            marginBottom: 20,
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 9,
            color: phase.color,
          }}
        >
          📍 {phase.location}
        </div>

        {/* Story */}
        <TypeWriter lines={phase.story} color="#ddd" onDone={() => setStoryDone(true)} />

        {/* Button */}
        {storyDone && !cleared && (
          <button
            onClick={() => {
              setCleared(true);
              setTimeout(() => onComplete && onComplete(), 400);
            }}
            style={{
              marginTop: 20,
              background: "transparent",
              border: `2px solid ${phase.color}`,
              color: phase.color,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 9,
              padding: "10px 16px",
              cursor: "pointer",
              transition: "all 0.2s",
              animation: "pulse 1.5s infinite",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = phase.color;
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = phase.color;
            }}
          >
            ▶ PRÓXIMA FASE
          </button>
        )}

        {cleared && (
          <div
            style={{
              marginTop: 20,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 9,
              color: phase.color,
              animation: "blink 0.5s 4",
            }}
          >
            ✓ {phase.cleared}
          </div>
        )}
      </div>
    </div>
  );
}

function Confetti({ active }) {
  const pieces = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ["#f472b6", "#fbbf24", "#4ade80", "#38bdf8", "#c084fc"][Math.floor(Math.random() * 5)],
      delay: Math.random() * 2,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 3 + 2,
    }))
  );

  if (!active) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 100 }}>
      {pieces.current.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size,
            background: p.color,
            animation: `fall ${p.speed}s ${p.delay}s infinite linear`,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [lives] = useState(3);
  const bottomRef = useRef(null);

  const handlePhaseComplete = (phaseIndex) => {
    setCompletedPhases((prev) => [...prev, phaseIndex]);
    if (phaseIndex < phases.length - 1) {
      setCurrentPhase(phaseIndex + 1);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      setGameComplete(true);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
          background: #050505;
          min-height: 100vh;
        }

        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px #ff0055, 0 0 20px #ff0055; }
          50% { text-shadow: 0 0 20px #ff0055, 0 0 40px #ff0055, 0 0 60px #ff0055; }
        }
        @keyframes titleGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #ff0055; }
      `}</style>

      <Confetti active={gameComplete} />

      {/* Scanline overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          pointerEvents: "none",
          zIndex: 50,
        }}
      />

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 16px", fontFamily: "'Press Start 2P', monospace" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32, padding: 24, border: "3px solid #ff0055", background: "#0a0000", position: "relative" }}>
          <Stars color="#ff0055" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 9, color: "#ff0055", marginBottom: 8, letterSpacing: 4 }}>
              ★ SPECIAL EDITION ★
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#fff",
                lineHeight: 1.6,
                animation: "titleGlow 2s infinite",
                textShadow: "0 0 10px #ff0055",
              }}
            >
              LORENA
            </div>
            <div style={{ fontSize: 10, color: "#ff0055", marginTop: 8 }}>
              THE JOURNEY
            </div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 8 }}>
              {[...Array(lives)].map((_, i) => (
                <PixelHeart key={i} color="#ff0055" size={20} />
              ))}
            </div>
          </div>
        </div>

        {/* Score bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 16px",
            background: "#111",
            border: "2px solid #333",
            marginBottom: 24,
            fontSize: 8,
            color: "#888",
          }}
        >
          <span>FASES: {completedPhases.length}/{phases.length}</span>
          <span>MESES: 11 💕</span>
          <span>SCORE: {completedPhases.length * 1000}</span>
        </div>

        {/* Start screen */}
        {!gameStarted && (
          <div
            style={{
              textAlign: "center",
              padding: 40,
              border: "3px solid #ff0055",
              background: "#0a0000",
              marginBottom: 24,
              animation: "slideIn 0.5s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 16, alignItems: "flex-end" }}>
              <CharacterSprite src="/lyelson.png" size={90} color="#ff0055" />
              <CharacterSprite src="/lorena.png" size={90} color="#ff0055" />
            </div>
            <p style={{ fontSize: 10, color: "#ccc", lineHeight: 2, marginBottom: 8 }}>
              Para:
            </p>
            <p style={{ fontSize: 14, color: "#ff0055", lineHeight: 2, marginBottom: 24, animation: "glow 2s infinite" }}>
              LORENA
            </p>
            <p style={{ fontSize: 9, color: "#888", lineHeight: 2, marginBottom: 32 }}>
              A nossa história em 5 fases.
            </p>
            <button
              onClick={() => setGameStarted(true)}
              style={{
                background: "#ff0055",
                border: "none",
                color: "#fff",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 10,
                padding: "14px 24px",
                cursor: "pointer",
                animation: "blink 1s infinite",
              }}
            >
              ▶ INICIAR
            </button>
          </div>
        )}

        {/* Phases */}
        {gameStarted &&
          phases.slice(0, currentPhase + 1).map((phase, index) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              index={index}
              onComplete={() => handlePhaseComplete(index)}
            />
          ))}

        {/* Game complete */}
        {gameComplete && (
          <div
            ref={bottomRef}
            style={{
              textAlign: "center",
              padding: 32,
              border: "3px solid #fbbf24",
              background: "#0a0800",
              animation: "slideIn 0.6s ease",
              position: "relative",
            }}
          >
            <Stars color="#fbbf24" />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  fontSize: 14,
                  color: "#fbbf24",
                  marginBottom: 20,
                  textShadow: "0 0 20px #fbbf24",
                  animation: "glow 1.5s infinite",
                }}
              >
                VOCÊ VENCEU!
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 20, alignItems: "flex-end" }}>
                <CharacterSprite src="/lyelson.png" size={100} color="#fbbf24" />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  {[...Array(3)].map((_, i) => (
                    <PixelHeart key={i} color="#ff0055" size={22} />
                  ))}
                </div>
                <CharacterSprite src="/lorena.png" size={100} color="#fbbf24" />
              </div>
              <div style={{ fontSize: 9, color: "#ccc", lineHeight: 2.5, marginBottom: 24 }}>
                <p>Feliz aniversário de namoro,</p>
                <p style={{ color: "#ff0055", fontSize: 12 }}>Lorena ❤️</p>
                <p style={{ marginTop: 12, color: "#888" }}>
                  11 meses. Muitos mais pela frente.
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
                {[...Array(5)].map((_, i) => (
                  <PixelHeart key={i} color="#ff0055" size={28} />
                ))}
              </div>
              <div style={{ marginTop: 24, fontSize: 8, color: "#555" }}>
                — {HERO_NAME}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </>
  );
}
