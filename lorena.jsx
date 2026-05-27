import { useState, useEffect, useRef, useCallback } from "react";

const HERO_NAME = "Lyelson";

// ──────────────────────────────────────────
// DATA
// ──────────────────────────────────────────

const LAB_DIALOGUE = [
  { speaker: "lorena", text: "oi... você é novo aqui na turma?" },
  { speaker: "lyelson", text: "sou sim. eu sou o Lyelson." },
  {
    speaker: "lorena",
    text: "Lorena! quer ser meu parceiro de laboratório?",
    choices: ["Claro! 😊", "Por que não? 🤔"],
  },
  { speaker: "lyelson", text: "foi assim que começou." },
  { speaker: "lorena", text: "nem imaginávamos... 💚", last: true },
];

const CHAT_MESSAGES = [
  { from: "lorena",  text: "você ainda tá acordado?",            delay: 900  },
  { from: "lyelson", text: "tô... não consigo dormir",           delay: 1300 },
  { from: "lorena",  text: "eu também 😅",                       delay: 800  },
  { from: "lorena",  text: "posso te perguntar uma coisa?",      delay: 700  },
  { from: "lyelson", text: "pode",                               delay: 1100 },
  { from: "lorena",  text: "qual é o seu maior sonho?",          delay: 1000 },
  { from: "lyelson", text: "ter uma família",                    delay: 1900 },
  { from: "lyelson", text: "uma casa, alguém ao lado",           delay: 800  },
  { from: "lorena",  text: "❤️",                                 delay: 500  },
  { from: "lorena",  text: "o meu também",                      delay: 700  },
  { from: "lyelson", text: "tá tarde... você devia dormir",      delay: 1500 },
  { from: "lorena",  text: "não quero parar de falar com você", delay: 800  },
  { from: "lyelson", text: "eu também não 🌙",                   delay: 1100 },
];

const MEMORY_CARDS = [
  { emoji: "✈️", title: "Alcântara",   desc: "Uma viagem que nunca vou esquecer" },
  { emoji: "🌳", title: "APA",         desc: "Passeios longos, sem pressa" },
  { emoji: "🏡", title: "Nossa Casa",  desc: "Um lar que vamos construir" },
  { emoji: "💒", title: "Família",     desc: "O maior de todos os planos" },
];

const GALLERY = [
  { src: "/g01.png", caption: "❤️ juntos, do jeitinho que eu amo" },
  { src: "/g02.jpg", caption: "🎈 festa com você é sempre diferente" },
  { src: "/g03.jpg", caption: "😂 ela me mordeu e achou normal kkkk" },
  { src: "/g04.jpg", caption: "🤪 a gente é exatamente assim... loucos" },
  { src: "/g05.png", caption: "🍽️ até na cantina a gente é dupla perfeita" },
  { src: "/g06.jpg", caption: "💨 você com o cabelo no ventilador... lindo demais" },
  { src: "/g07.png", caption: "📱 mesmo de longe, você preenche tudo" },
  { src: "/g08.jpg", caption: "🌳 qualquer lugar fica bonito do seu lado" },
  { src: "/g09.jpg", caption: "😷 mesmo de máscara, te reconheceria em qualquer lugar" },
  { src: "/g10.jpg", caption: "😊 esse sorriso é meu favorito no mundo inteiro" },
  { src: "/g11.jpg", caption: "😄 a touca, o riso... perfeita" },
  { src: "/g12.jpg", caption: "🐸 artista, doidiça, e ainda linda demais" },
  { src: "/g13.jpg", caption: "👁️ esses olhos verdes que me derretem todo dia" },
  { src: "/g14.jpg", caption: "👁️ te olhei e fui, Doidiça" },
];

const ATTACKS = [
  { label: "❤️ AMOR",      damage: [15, 25], color: "#ff0055" },
  { label: "🛡️ CONFIANÇA", damage: [20, 30], color: "#0a8fd1" },
  { label: "⭐ 11 MESES",  damage: [25, 35], color: "#c98a06" },
  { label: "💪 JUNTOS",    damage: [30, 40], color: "#15a34a" },
];

const BOSS_TAUNTS = [
  '"Será que ele te ama de verdade?"',
  '"E se não der certo?"',
  '"Você tem certeza disso?"',
  '"Vai durar mesmo?"',
  '"Você realmente merece isso?"',
  '"E se ele cansar de você?"',
];

const QUIZ_QUESTIONS = [
  {
    q: "O que Lyelson fez quando você se declarou?",
    opts: ["Chorou emocionado 😭", "Ficou em silêncio 🤫", "Saiu correndo 🏃"],
    correct: 1,
    ok:   "Isso! Fiquei em silêncio... você ficou nervosa. Mas era amor. 🤍",
    fail: "Errou! Fiquei em silêncio. Você ficou nervosa. Mas era amor. 🤍",
  },
  {
    q: "Quantos meses a gente completa hoje?",
    opts: ["9 meses 🤔", "11 meses 💕", "1 ano 🎉"],
    correct: 1,
    ok:   "11 meses! (não 9 como alguém chegou a dizer... 😂💜)",
    fail: "Não são 9! Alguém errou as datas hein 😂 São 11!",
  },
  {
    q: "Qual memória real vocês dois têm?",
    opts: ["Viagem pra Alcântara ✈️", "Pular de paraquedas 🪂", "Escalar montanha 🏔️"],
    correct: 0,
    ok:   "Alcântara! Uma das memórias favoritas. 💙",
    fail: "Ainda não! Mas Alcântara sim — foi incrível. 💙",
  },
  {
    q: "O que Lyelson planeja com você?",
    opts: ["Uma família e uma casa 🏡", "Só amizade 😅", "Sumir na praia 🏖️"],
    correct: 0,
    ok:   "Uma família e uma casa. O futuro dos dois. 💛",
    fail: "A certa é: uma família e uma casa. O futuro dos dois. 💛",
  },
];

const PHASES = [
  {
    id: 1, title: "FASE 1", subtitle: "O Encontro",
    location: "🧪 LABORATÓRIO DE QUÍMICA",
    color: "#15a34a", bg: "#eafff1", stars: "#15a34a",
    story: ["No laboratório, dois estranhos.", "Aos poucos, foram virando amigos.", "Sem pressa. Sem saber", "onde aquilo ia chegar. 💚"],
    emoji: "📚", cleared: "AMIZADE CONQUISTADA!",
    illustration: "/fase1-laboratorio.jpg", mechanic: "dialogue",
  },
  {
    id: 2, title: "FASE 2", subtitle: "A Queda",
    location: "😂 RUA GRANDE",
    color: "#e06c0a", bg: "#fff5e8", stars: "#e06c0a",
    story: ["Ela caiu na minha frente.", "Na Rua Grande. Do nada. 💀", "Eu tentei não rir... não consegui.", "Mas segurei a mão dela. 🧡"],
    emoji: "💨", cleared: "MEMÓRIA ÉPICA SALVA! 😂",
    mechanic: "catch",
  },
  {
    id: 3, title: "FASE 3", subtitle: "A Viagem",
    location: "🌊 PRAIA DO BACABA",
    color: "#0a8fd1", bg: "#e8f6ff", stars: "#0a8fd1",
    story: ["Uma viagem mudou tudo.", "O Bacaba, o sol, e você do meu lado.", "Foi ali que a gente se reencontrou", "e algo maior começou. 💙"],
    emoji: "🏖️", cleared: "MEMÓRIA ESPECIAL DESBLOQUEADA!",
    illustration: "/fase2-praia.jpg", mechanic: "clicker",
  },
  {
    id: 4, title: "FASE 4", subtitle: "A Noite",
    location: "🌙 UMA NOITE EM CLARO",
    color: "#d6308a", bg: "#ffeef7", stars: "#d6308a",
    story: ["Você se declarou. Eu fiquei em silêncio.", "Você ficou nervosa. Eu fiquei confuso.", "Mas numa noite em claro te conhecendo,", "eu entendi: era você. 💗"],
    emoji: "💕", cleared: "+11 MESES JUNTOS!",
    illustration: "/fase3-comeco.jpg", mechanic: "chat",
  },
  {
    id: 5, title: "FASE 5", subtitle: "Os Planos",
    location: "🎵 PLANOS — BK",
    color: "#9333ea", bg: "#f6ecff", stars: "#9333ea",
    story: ["APA, Alcântara, praça, Rua Grande...", "(e aquela queda que nunca vou esquecer 💀)", "Cada memória contigo é minha favorita.", "Tenho planos com você, Doidiça. 💜"],
    emoji: "🏡", cleared: "FUTURO DESBLOQUEADO!",
    illustration: "/fase4-planos.jpg", mechanic: "cards",
  },
  {
    id: 6, title: "FASE 6", subtitle: "Hoje",
    location: "🏆 CHEFE FINAL: A DÚVIDA",
    color: "#c98a06", bg: "#fff8e6", stars: "#c98a06",
    story: ["Minha vida não tinha cor.", "Você chegou e me fez querer viver de novo.", "Amor de Vida Minha,", "obrigado por existir. 💛"],
    emoji: "👑", cleared: "A DÚVIDA FOI DERROTADA! ❤️",
    illustration: "/fase5-final.jpg", mechanic: "boss",
  },
];

// ──────────────────────────────────────────
// BASE COMPONENTS
// ──────────────────────────────────────────

function PixelHeart({ color = "#ff0055", size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 9" style={{ imageRendering: "pixelated", display: "block" }}>
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

function Stars({ color, n = 30 }) {
  const pts = useRef(
    Array.from({ length: n }, (_, i) => ({
      id: i, x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`,
      s: Math.random() > 0.7 ? 4 : 2, o: Math.random() * 0.4 + 0.15,
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {pts.current.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: p.x, top: p.y,
          width: p.s, height: p.s, background: color, opacity: p.o,
        }} />
      ))}
    </div>
  );
}

function Sprite({ src, size = 80, glow, style: ext = {} }) {
  return (
    <img src={src} alt="" style={{
      width: size, height: "auto", imageRendering: "pixelated",
      filter: glow ? `drop-shadow(0 0 12px ${glow})` : undefined,
      animation: "bob 1.3s ease-in-out infinite",
      ...ext,
    }} />
  );
}

function TypeWriter({ lines, color, onDone }) {
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (li >= lines.length) { setDone(true); onDone?.(); return; }
    if (ci < lines[li].length) {
      const t = setTimeout(() => setCi(c => c + 1), 36);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setLi(l => l + 1); setCi(0); }, 520);
    return () => clearTimeout(t);
  }, [ci, li, done, lines, onDone]);

  return (
    <div style={{ minHeight: 110, display: "flex", flexDirection: "column", gap: 10 }}>
      {lines.slice(0, li + 1).map((ln, i) => (
        <p key={i} style={{
          margin: 0, color, fontSize: 11, lineHeight: 2,
          opacity: i < li ? 0.55 : 1,
          fontFamily: "'Press Start 2P', monospace",
        }}>
          {i < li ? ln : ln.slice(0, ci)}
          {i === li && !done && <span style={{ animation: "blink .7s infinite" }}> █</span>}
        </p>
      ))}
    </div>
  );
}

function PixelBtn({ children, color, onClick, anim, style: ext = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? color : "transparent",
        border: `2px solid ${color}`,
        color: hover ? "#000" : color,
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 9, padding: "11px 18px",
        cursor: "pointer", transition: "all .2s",
        animation: anim ? `pulse 1.5s infinite` : undefined,
        boxShadow: `0 0 10px ${color}44`,
        ...ext,
      }}
    >
      {children}
    </button>
  );
}

function ProgressBar({ value, max, color, label }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color, marginBottom: 6 }}>
          {label}
        </div>
      )}
      <div style={{ height: 16, background: "#ffe8f4", border: `2px solid ${color}44`, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, height: "100%", width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          transition: "width .25s ease", boxShadow: `0 0 8px ${color}`,
        }} />
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#fff",
          textShadow: "0 1px 2px rgba(120,20,60,.9)",
        }}>
          {value}/{max}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// MECHANIC: DIALOGUE (Phase 1)
// ──────────────────────────────────────────

function MechanicDialogue({ phase, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(false);

  const cur = LAB_DIALOGUE[idx];
  const isLorena = cur?.speaker === "lorena";
  const color = phase.color;

  const advance = (choice) => {
    if (cur.choices && !chosen) {
      setChosen(true);
      setTimeout(() => { setIdx(i => i + 1); setChosen(false); }, 600);
      return;
    }
    if (cur.last) { onComplete(); return; }
    setIdx(i => i + 1);
  };

  if (!cur) return null;

  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 7.5,
        color, textAlign: "center", marginBottom: 14,
      }}>
        💬 DIÁLOGO — O ENCONTRO
      </p>

      {/* Scene with real lab background */}
      <div style={{
        backgroundImage: "url(/cena-laboratorio.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
        imageRendering: "pixelated",
        border: `2px solid ${color}`,
        overflow: "hidden", position: "relative",
        height: 310,
      }}>
        {/* Dark overlay for readability */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.40)" }} />

        {/* Location label */}
        <div style={{
          position: "absolute", top: 7, left: 0, right: 0, zIndex: 3,
          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
          color: "#fff", textAlign: "center",
          textShadow: "0 1px 4px #000, 0 0 8px #000",
        }}>
          ── LABORATÓRIO DE QUÍMICA ──
        </div>

        {/* Characters in scene (highlight active speaker) */}
        <div style={{
          position: "absolute", bottom: 138, left: 0, right: 0,
          display: "flex", justifyContent: "space-between",
          padding: "0 18px", zIndex: 2, pointerEvents: "none",
        }}>
          {/* Lorena (left) */}
          <div style={{
            opacity: isLorena ? 1 : 0.3, transition: "opacity .3s",
            animation: "bob 1.4s infinite",
          }}>
            <img src="/lorena.png" alt="Lorena" style={{
              width: 68, imageRendering: "pixelated",
              filter: isLorena ? "drop-shadow(0 0 14px #f472b6)" : "none",
            }} />
          </div>
          {/* Lyelson (right) */}
          <div style={{
            opacity: !isLorena ? 1 : 0.3, transition: "opacity .3s",
            animation: "bob 1.4s 0.35s infinite",
          }}>
            <img src="/lyelson.png" alt="Lyelson" style={{
              width: 68, imageRendering: "pixelated",
              filter: !isLorena ? `drop-shadow(0 0 14px ${color})` : "none",
            }} />
          </div>
        </div>

        {/* Dialogue box at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3,
          background: "rgba(255,240,248,0.96)",
          borderTop: `2px solid ${isLorena ? "#f472b655" : color + "55"}`,
          padding: "9px 12px 11px",
        }}>
          {/* Speaker: face portrait + name */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 7,
            justifyContent: isLorena ? "flex-start" : "flex-end",
          }}>
            {isLorena && (
              <img src="/lorena-rosto.png" alt="Lorena" style={{
                width: 30, height: 30, imageRendering: "pixelated",
                border: "2px solid #f472b6",
                filter: "drop-shadow(0 0 5px #f472b6)",
              }} />
            )}
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 7,
              color: isLorena ? "#d6308a" : color,
            }}>
              {isLorena ? "LORENA" : HERO_NAME.toUpperCase()}
            </div>
            {!isLorena && (
              <img src="/lyelson-rosto.png" alt="Lyelson" style={{
                width: 30, height: 30, imageRendering: "pixelated",
                border: `2px solid ${color}`,
                filter: `drop-shadow(0 0 5px ${color})`,
              }} />
            )}
          </div>

          {/* Speech text */}
          <div style={{
            background: "rgba(255,255,255,0.7)",
            border: `1px solid ${isLorena ? "#f472b622" : color + "22"}`,
            padding: "8px 10px", marginBottom: 9,
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 8.5, color: "#2d0020", lineHeight: 2.1,
          }}>
            {cur.text}
          </div>

          {/* Choices or continue */}
          {cur.choices ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {cur.choices.map((ch, i) => (
                <PixelBtn key={i} color={color} onClick={() => advance(ch)} style={{ fontSize: 7.5 }}>
                  {ch}
                </PixelBtn>
              ))}
            </div>
          ) : (
            <button onClick={() => advance()} style={{
              background: "transparent", border: "none",
              fontFamily: "'Press Start 2P', monospace", fontSize: 7.5,
              color: "#cc6699", cursor: "pointer",
              animation: "blink 1s infinite",
            }}>
              ▶ continuar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// MECHANIC: CATCH (Phase 2)
// ──────────────────────────────────────────

function MechanicCatch({ phase, onComplete }) {
  const [y, setY] = useState(0);
  const [x, setX] = useState(45);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const yRef = useRef(0);
  const ivRef = useRef(null);
  const needed = 3;
  const color = phase.color;

  const startFall = useCallback(() => {
    yRef.current = 0;
    setY(0); setX(35 + Math.random() * 30); setStatus("falling");
  }, []);

  useEffect(() => {
    if (status === "idle") {
      const t = setTimeout(startFall, 700);
      return () => clearTimeout(t);
    }
    if (status === "falling") {
      ivRef.current = setInterval(() => {
        yRef.current += 1.5;
        setY(yRef.current);
        setX(() => 50 + Math.sin(yRef.current * 0.065) * 24);
        if (yRef.current >= 84) {
          clearInterval(ivRef.current);
          setStatus("missed");
          setTimeout(() => setStatus("idle"), 1000);
        }
      }, 28);
      return () => clearInterval(ivRef.current);
    }
  }, [status, startFall]);

  const catchIt = () => {
    if (status !== "falling") return;
    clearInterval(ivRef.current);
    const ns = score + 1;
    setScore(ns); setStatus("caught");
    if (ns >= needed) {
      setTimeout(() => { setStatus("done"); setTimeout(onComplete, 1200); }, 700);
    } else {
      setTimeout(() => setStatus("idle"), 900);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      {/* Score hearts */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 10 }}>
        {[...Array(needed)].map((_, i) => (
          <div key={i} style={{
            width: 22, height: 22,
            background: i < score ? color : "transparent",
            border: `2px solid ${color}`,
            boxShadow: i < score ? `0 0 10px ${color}` : "none",
            transition: "all .3s",
          }} />
        ))}
      </div>
      <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color, textAlign: "center", marginBottom: 10 }}>
        SEGURA ELA ANTES DE CAIR!
      </p>

      {/* Arena */}
      <div style={{
        position: "relative", height: 230,
        backgroundImage: "url(/cena-rua.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
        imageRendering: "pixelated",
        border: `2px solid ${color}`, overflow: "hidden",
      }}>
        {/* Darkening overlay for contrast */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />

        {/* Location label */}
        <div style={{
          position: "absolute", top: 6, left: 0, right: 0,
          fontFamily: "'Press Start 2P', monospace", fontSize: 7,
          color: "#fff", textAlign: "center",
          textShadow: "0 1px 4px #000, 0 0 8px #000",
        }}>
          ── RUA GRANDE ──
        </div>

        {/* Falling character */}
        {status === "falling" && (
          <button onClick={catchIt} style={{
            position: "absolute",
            left: `${x}%`, top: `${y}%`,
            transform: "translateX(-50%) rotate(18deg)",
            background: "transparent", border: "none",
            cursor: "pointer",
            filter: `drop-shadow(0 0 10px ${color})`,
            transition: "left .05s linear", zIndex: 5,
            padding: 0, lineHeight: 0,
          }}>
            <img src="/lorena-caindo.png" alt="Lorena caindo" style={{
              width: 52, imageRendering: "pixelated",
              display: "block",
            }} />
          </button>
        )}

        {status === "caught" && (
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.55)", animation: "popIn .3s ease",
          }}>
            <img src="/fase2-pegou.png" alt="Segurou!" style={{
              width: 120, imageRendering: "pixelated",
              filter: `drop-shadow(0 0 18px ${color})`,
              animation: "bob 1s infinite",
            }} />
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: "#4ade80", marginTop: 8 }}>SEGUROU! 💪</div>
          </div>
        )}

        {status === "missed" && (
          <div style={{
            position: "absolute", bottom: 32, left: 0, right: 0,
            textAlign: "center", fontFamily: "'Press Start 2P', monospace",
            fontSize: 8, color: "#ff0055", animation: "slideIn .3s ease",
          }}>
            CAIU DE NOVO! 😂
          </div>
        )}

        {status === "done" && (
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.75)", animation: "popIn .4s ease",
          }}>
            <img src="/fase2-pegou.png" alt="Juntos!" style={{
              width: 130, imageRendering: "pixelated",
              filter: `drop-shadow(0 0 24px ${color}) drop-shadow(0 0 40px #fbbf2444)`,
              animation: "bob 1.3s infinite",
            }} />
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#fbbf24", marginTop: 10 }}>MISSÃO CUMPRIDA! 🏆</div>
          </div>
        )}
      </div>
      <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#444", textAlign: "center", marginTop: 8 }}>
        Clique nela para segurar!
      </p>
    </div>
  );
}

// ──────────────────────────────────────────
// MECHANIC: CLICKER (Phase 3)
// ──────────────────────────────────────────

function MechanicClicker({ phase, onComplete }) {
  const [clicks, setClicks] = useState(0);
  const [floaters, setFloaters] = useState([]);
  const [done, setDone] = useState(false);
  const needed = 25;
  const color = phase.color;

  const handleClick = (e) => {
    if (done) return;
    const nc = clicks + 1;
    setClicks(nc);
    const id = Date.now() + Math.random();
    const rect = e.currentTarget.getBoundingClientRect();
    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;
    setFloaters(f => [...f, { id, x: rx, y: ry }]);
    setTimeout(() => setFloaters(f => f.filter(h => h.id !== id)), 1000);
    if (nc >= needed) {
      setDone(true);
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <ProgressBar value={clicks} max={needed} color={color} label="AMOR COLETADO:" />

      {/* Beach scene */}
      <div
        onClick={handleClick}
        style={{
          position: "relative", height: 200,
          backgroundImage: "url(/cena-praia.jpg)",
          backgroundSize: "cover", backgroundPosition: "center",
          imageRendering: "pixelated",
          border: `2px solid ${color}`,
          cursor: done ? "default" : "pointer",
          overflow: "hidden", userSelect: "none",
        }}
      >
        {/* Light overlay for heart contrast */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.12)" }} />

        {/* Big heart to click */}
        {!done && (
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "bob 1.2s infinite",
          }}>
            <PixelHeart color={color} size={72} />
          </div>
        )}

        {/* Floating hearts on click */}
        {floaters.map(f => (
          <div key={f.id} style={{
            position: "absolute", left: f.x, top: f.y,
            pointerEvents: "none", animation: "floatUp .9s ease-out forwards",
            transform: "translate(-50%,-50%)",
          }}>
            <PixelHeart color={color} size={20} />
          </div>
        ))}

        {done && (
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "#aaddff99", animation: "popIn .4s ease",
          }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>💙</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color }}>AMOR COLETADO!</div>
          </div>
        )}

        {/* Hint */}
        {!done && clicks === 0 && (
          <div style={{
            position: "absolute", bottom: 38, left: 0, right: 0,
            fontFamily: "'Press Start 2P', monospace", fontSize: 7,
            color: "#fff", textAlign: "center",
            textShadow: "0 1px 4px #000, 0 0 8px #000",
            animation: "blink 1.5s infinite",
          }}>
            TOQUE NA TELA!
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// MECHANIC: CHAT (Phase 4)
// ──────────────────────────────────────────

function MechanicChat({ phase, onComplete }) {
  const [vis, setVis] = useState(0);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const color = phase.color;

  useEffect(() => {
    if (vis >= CHAT_MESSAGES.length) {
      setTyping(false);
      setTimeout(() => setDone(true), 700);
      return;
    }
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setVis(v => v + 1);
      setTimeout(() => ref.current?.scrollTo({ top: 9999, behavior: "smooth" }), 60);
    }, CHAT_MESSAGES[vis].delay);
    return () => clearTimeout(t);
  }, [vis]);

  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color, textAlign: "center", marginBottom: 10 }}>
        📱 UMA NOITE EM CLARO
      </p>
      <div style={{ border: `2px solid ${color}44`, background: "#fff8fc", overflow: "hidden" }}>
        {/* Header */}
        <div style={{
          background: `${color}14`, borderBottom: `1px solid ${color}33`,
          padding: "8px 12px", display: "flex", alignItems: "center", gap: 10,
        }}>
          <img src="/lorena-rosto.png" alt="Lorena" style={{
            width: 34, height: 34, imageRendering: "pixelated",
            border: `2px solid ${color}`,
            filter: `drop-shadow(0 0 4px ${color}88)`,
          }} />
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#994466" }}>Lorena</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: "#22aa55", marginTop: 3 }}>● ativa</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/lyelson-pensando.png" alt="Lyelson pensando" style={{
              width: 30, height: 30, imageRendering: "pixelated",
              filter: "drop-shadow(0 0 4px #ffffff22)",
              opacity: 0.6,
            }} />
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: "#cc6688" }}>🌙 03:47</span>
          </div>
        </div>

        {/* Messages */}
        <div ref={ref} style={{
          height: 220, overflowY: "auto", padding: "10px 10px",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          {CHAT_MESSAGES.slice(0, vis).map((msg, i) => {
            const me = msg.from === "lyelson";
            return (
              <div key={i} style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start", animation: "slideIn .25s ease" }}>
                <div style={{
                  background: me ? `${color}1a` : "#fff0f8",
                  border: `1px solid ${me ? color + "55" : "#ffd6e8"}`,
                  padding: "7px 11px", maxWidth: "76%",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 7.5, color: me ? color : "#994466", lineHeight: 1.9,
                }}>
                  {msg.text}
                </div>
              </div>
            );
          })}
          {typing && (
            <div style={{ display: "flex" }}>
              <div style={{
                background: "#ffe8f4", border: "1px solid #ffd6e8",
                padding: "8px 14px", fontSize: 14, color: "#444",
                letterSpacing: 4, animation: "blink .9s infinite",
              }}>•••</div>
            </div>
          )}
          {done && (
            <div style={{
              textAlign: "center", fontFamily: "'Press Start 2P', monospace",
              fontSize: 7.5, color, animation: "popIn .4s ease", marginTop: 4,
            }}>
              🌙 assim foi a noite...
            </div>
          )}
        </div>

        {done && (
          <div style={{ borderTop: `1px solid ${color}33`, padding: "10px", textAlign: "center" }}>
            <PixelBtn color={color} onClick={onComplete} anim>❤️ CONTINUAR</PixelBtn>
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// MECHANIC: CARD FLIP (Phase 5)
// ──────────────────────────────────────────

function MechanicCards({ phase, onComplete }) {
  const [flipped, setFlipped] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const color = phase.color;

  const flip = (i) => {
    if (flipped.has(i)) { setSelected(i); return; }
    const nf = new Set(flipped);
    nf.add(i);
    setFlipped(nf);
    setSelected(i);
    if (nf.size === MEMORY_CARDS.length) {
      setTimeout(onComplete, 1200);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7.5, color, textAlign: "center", marginBottom: 12 }}>
        🃏 DESCUBRA OS PLANOS!
      </p>

      {/* Card grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        {MEMORY_CARDS.map((card, i) => {
          const isFlipped = flipped.has(i);
          const isSel = selected === i;
          return (
            <div
              key={i}
              onClick={() => flip(i)}
              style={{
                height: 100,
                border: `2px solid ${isFlipped ? color : "#ddbbdd"}`,
                background: isFlipped ? `${color}14` : "#fff0f8",
                cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: 8, transition: "all .3s",
                boxShadow: isSel && isFlipped ? `0 0 16px ${color}44` : "none",
                position: "relative", overflow: "hidden",
              }}
            >
              {!isFlipped ? (
                <>
                  <div style={{ fontSize: 24, filter: "grayscale(1) brightness(0.2)", marginBottom: 4 }}>❓</div>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: "#ccaacc" }}>CLIQUE</div>
                </>
              ) : (
                <div style={{ textAlign: "center", animation: "popIn .35s ease" }}>
                  <div style={{ fontSize: 26, marginBottom: 5 }}>{card.emoji}</div>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color, marginBottom: 4 }}>{card.title}</div>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 5.5, color: "#aa7799", lineHeight: 1.7 }}>{card.desc}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: "#cc6699", textAlign: "center" }}>
        {flipped.size}/{MEMORY_CARDS.length} planos revelados
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// MECHANIC: BOSS (Phase 6)
// ──────────────────────────────────────────

function MechanicBoss({ phase, onComplete }) {
  const [hp, setHp] = useState(100);
  const [taunt, setTaunt] = useState(BOSS_TAUNTS[0]);
  const [fdmg, setFdmg] = useState(null);
  const [shaking, setShaking] = useState(false);
  const [attacking, setAttacking] = useState(false);
  const [flash, setFlash] = useState(false);
  const [defeated, setDefeated] = useState(false);
  const [cd, setCd] = useState(false);
  const color = phase.color;

  const attack = (atk) => {
    if (defeated || cd) return;
    setCd(true);
    setAttacking(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 130);
    const crit = Math.random() < 0.2;
    let dmg = Math.floor(Math.random() * (atk.damage[1] - atk.damage[0] + 1) + atk.damage[0]);
    if (crit) dmg = Math.floor(dmg * 1.8);
    const nh = Math.max(0, hp - dmg);
    setHp(nh); setFdmg({ v: dmg, c: atk.color, crit });
    setShaking(true);
    setTimeout(() => { setShaking(false); setAttacking(false); }, 500);
    setTimeout(() => setFdmg(null), 1100);
    if (nh <= 0) {
      setDefeated(true);
      setTimeout(onComplete, 3000);
    } else {
      setTimeout(() => {
        setTaunt(BOSS_TAUNTS[Math.floor(Math.random() * BOSS_TAUNTS.length)]);
        setCd(false);
      }, 1000);
    }
  };

  const hpc = hp > 60 ? "#c084fc" : hp > 30 ? "#fbbf24" : "#ff0055";

  return (
    <div style={{ marginBottom: 20 }}>
      {/* HP bar */}
      <div style={{
        position: "relative", height: 26,
        border: `2px solid ${hpc}`, background: "#f8f0ff",
        marginBottom: 12, overflow: "hidden", transition: "border-color .4s",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, height: "100%", width: `${hp}%`,
          background: `linear-gradient(90deg,${hpc}55,${hpc})`,
          transition: "width .35s, background .4s", boxShadow: `0 0 10px ${hpc}`,
        }} />
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          fontFamily: "'Press Start 2P', monospace", fontSize: 7.5, color: "#5a0080",
          textShadow: "0 1px 3px #ddb0ff",
        }}>
          ⚠ A DÚVIDA — {hp} VIDA
        </div>
      </div>

      {/* ── CINEMATIC BATTLE ARENA ── */}
      <div style={{
        position: "relative", height: 290,
        background: "linear-gradient(180deg, #faf0ff 0%, #f5e8ff 45%, #faf0ff 100%)",
        border: `2px solid #c084fc33`,
        overflow: "hidden", marginBottom: 12,
      }}>
        {/* Atmospheric radial glow behind boss */}
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", height: "65%",
          background: "radial-gradient(ellipse at 50% 30%, #c084fc18 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Ground floor glow */}
        <div style={{
          position: "absolute", bottom: 56, left: 0, right: 0,
          height: 2, background: "#c084fc33",
        }} />

        {/* Screen flash on attack */}
        {flash && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 20,
            background: "rgba(255,220,255,0.07)", pointerEvents: "none",
          }} />
        )}

        {/* ── BOSS — center, tall ── */}
        <div style={{
          position: "absolute", top: 8, left: "50%",
          transform: "translateX(-50%)", zIndex: 5,
          textAlign: "center",
        }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img src="/boss-duvida.png" alt="A Dúvida" style={{
              width: 175, imageRendering: "pixelated",
              animation: defeated ? "none" : shaking ? "shake .4s" : "bob 2.2s infinite",
              filter: defeated
                ? "grayscale(1) brightness(.08)"
                : `drop-shadow(0 0 22px #c084fc) drop-shadow(0 0 55px #c084fc33)`,
              opacity: defeated ? .1 : 1,
              transition: "opacity 1s, filter .5s",
            }} />

            {/* Damage number floats above boss */}
            {fdmg && (
              <div style={{
                position: "absolute", top: -22, left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: fdmg.crit ? 15 : 12, color: fdmg.c,
                animation: "floatUp 1.05s ease-out forwards",
                pointerEvents: "none", whiteSpace: "nowrap", zIndex: 15,
                textShadow: `0 0 18px ${fdmg.c}, 0 2px 4px #000`,
              }}>
                {fdmg.crit && (
                  <div style={{ fontSize: 7, textAlign: "center", marginBottom: 2 }}>CRÍTICO!</div>
                )}
                -{fdmg.v}
              </div>
            )}

            {defeated && (
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 60, animation: "popIn .4s ease", zIndex: 10,
              }}>💥</div>
            )}
          </div>

          {!defeated && (
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 6,
              color: "#7c2fc7", marginTop: 2, letterSpacing: 1,
            }}>A DÚVIDA</div>
          )}
        </div>

        {/* ── LYELSON — bottom left ── */}
        <div style={{
          position: "absolute", bottom: 6, left: 6, zIndex: 6,
          textAlign: "center",
          filter: attacking
            ? "drop-shadow(0 0 18px #fbbf24) drop-shadow(0 0 8px #ff0055)"
            : "drop-shadow(0 0 5px #c084fc33)",
          animation: attacking ? "shake .25s" : "bob 1.7s infinite",
          transition: "filter .15s",
        }}>
          <img
            src={attacking ? "/ataque-pose.png" : "/lyelson.png"}
            alt="Lyelson"
            style={{ width: 72, imageRendering: "pixelated", display: "block", transition: "none" }}
          />
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 5.5,
            color: attacking ? "#c98a06" : "#7c2fc7",
            marginTop: 3, transition: "color .15s",
          }}>LYELSON</div>
        </div>

        {/* ── LORENA — bottom right ── */}
        <div style={{
          position: "absolute", bottom: 6, right: 6, zIndex: 6,
          textAlign: "center",
          filter: attacking
            ? "drop-shadow(0 0 18px #f472b6) drop-shadow(0 0 8px #ff0055)"
            : "drop-shadow(0 0 5px #c084fc33)",
          animation: attacking ? "shake .25s" : "bob 1.7s .45s infinite",
          transition: "filter .15s",
        }}>
          <img
            src={attacking ? "/ataque-pose.png" : "/lorena.png"}
            alt="Lorena"
            style={{ width: 72, imageRendering: "pixelated", display: "block", transition: "none" }}
          />
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 5.5,
            color: attacking ? "#d6308a" : "#7c2fc7",
            marginTop: 3, transition: "color .15s",
          }}>LORENA</div>
        </div>

        {/* Victory overlay */}
        {defeated && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 8,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "flex-end",
            paddingBottom: 14, background: "rgba(0,0,0,0.35)",
            animation: "popIn .5s ease",
          }}>
            <div style={{
              fontFamily: "'Press Start 2P', monospace", fontSize: 11,
              color: "#fbbf24", textShadow: "0 0 20px #fbbf24, 0 0 40px #fbbf2466",
              animation: "blink .5s 5", textAlign: "center", lineHeight: 2,
            }}>
              🏆 VITÓRIA!
            </div>
          </div>
        )}
      </div>

      {/* Taunt bubble */}
      {!defeated ? (
        <div style={{
          background: "#faf0ff", border: "1px solid #c084fc1a",
          padding: "7px 14px", marginBottom: 12,
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 7, color: "#7c2fc7", fontStyle: "italic",
          lineHeight: 2, textAlign: "center",
        }}>
          {taunt}
        </div>
      ) : (
        <div style={{
          fontFamily: "'Press Start 2P', monospace", fontSize: 9,
          color: "#c98a06", marginBottom: 14, textAlign: "center",
          textShadow: "0 2px 6px #fbbf2455",
        }}>
          A DÚVIDA FOI DERROTADA! ❤️
        </div>
      )}

      {!defeated && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {ATTACKS.map(atk => (
              <PixelBtn
                key={atk.label}
                color={cd ? "#ccaacc" : atk.color}
                onClick={() => attack(atk)}
                style={{ fontSize: 7, opacity: cd ? 0.4 : 1 }}
              >
                {atk.label}
              </PixelBtn>
            ))}
          </div>
          <p style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 6.5,
            color: "#994466", textAlign: "center", marginTop: 10,
          }}>
            Derrote a Dúvida com Amor e Confiança!
          </p>
        </>
      )}
    </div>
  );
}

// ──────────────────────────────────────────
// QUIZ
// ──────────────────────────────────────────

function Quiz({ onComplete }) {
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = QUIZ_QUESTIONS[qi];

  const answer = (i) => {
    if (sel !== null) return;
    setSel(i);
    if (i === q.correct) setScore(s => s + 1);
    setTimeout(() => {
      if (qi < QUIZ_QUESTIONS.length - 1) { setQi(qi + 1); setSel(null); }
      else setDone(true);
    }, 2100);
  };

  if (done) return (
    <div style={{
      textAlign: "center", padding: "32px 24px",
      border: "3px solid #fbbf24", background: "#fffbee",
      animation: "slideIn .5s ease", marginBottom: 24, position: "relative",
    }}>
      <Stars color="#fbbf24" n={25} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 28, marginBottom: 12 }}>🎯</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: "#c98a06", marginBottom: 20 }}>QUIZ CONCLUÍDO!</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#664455", lineHeight: 2.8, marginBottom: 24 }}>
          <p>Você acertou <span style={{ color: "#c98a06" }}>{score}/{QUIZ_QUESTIONS.length}</span></p>
          {score === QUIZ_QUESTIONS.length
            ? <p style={{ color: "#15a34a", marginTop: 8 }}>PERFEITO! Você me conhece bem 💚</p>
            : score >= 2
            ? <p style={{ color: "#d6308a", marginTop: 8 }}>Quase! Mas agora sabe tudo 💕</p>
            : <p style={{ color: "#d6308a", marginTop: 8 }}>Tudo bem... o importante vem agora 💛</p>
          }
        </div>
        <PixelBtn color="#d6308a" onClick={onComplete} anim style={{ fontSize: 10, padding: "14px 28px", boxShadow: "0 0 20px #d6308a44" }}>
          ❤️ VER DECLARAÇÃO
        </PixelBtn>
      </div>
    </div>
  );

  return (
    <div style={{
      padding: 24, border: "3px solid #f472b6",
      background: "#fff0f8", animation: "slideIn .5s ease",
      marginBottom: 24, position: "relative",
    }}>
      <Stars color="#f472b6" n={20} />
      {["tl","tr","bl","br"].map(p => (
        <div key={p} style={{
          position: "absolute", width: 10, height: 10, background: "#f472b6",
          top: p.startsWith("t") ? -3 : undefined, bottom: p.startsWith("b") ? -3 : undefined,
          left: p.endsWith("l") ? -3 : undefined, right: p.endsWith("r") ? -3 : undefined,
        }} />
      ))}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: "#d6308a" }}>❓ QUIZ SURPRESA</div>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: "#994466" }}>{qi + 1}/{QUIZ_QUESTIONS.length}</div>
        </div>
        <div style={{ height: 4, background: "#ffd6e8", marginBottom: 18, border: "1px solid #f472b633", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(qi / QUIZ_QUESTIONS.length) * 100}%`, background: "#f472b6", transition: "width .4s", boxShadow: "0 0 8px #f472b6" }} />
        </div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 9, color: "#2d0020", lineHeight: 2.1, marginBottom: 20 }}>
          {q.q}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.opts.map((opt, i) => {
            const right = i === q.correct, chosen = i === sel;
            let bc = "#d6308a", bg = "#fff", tc = "#a3216a";
            if (sel !== null) {
              if (right) { bc = "#15a34a"; bg = "#eafff1"; tc = "#0e7a37"; }
              else if (chosen) { bc = "#ff0055"; bg = "#ffe8ee"; tc = "#cc0044"; }
              else { bc = "#ddaacc"; tc = "#aa7799"; }
            }
            return (
              <button key={i} onClick={() => answer(i)} style={{
                background: bg, border: `2px solid ${bc}`, color: tc,
                fontFamily: "'Press Start 2P', monospace", fontSize: 8,
                padding: "11px 14px", cursor: sel === null ? "pointer" : "default",
                textAlign: "left", transition: "all .25s", lineHeight: 1.8,
              }}>
                {right && sel !== null ? "✓ " : chosen && !right ? "✗ " : "  "}{opt}
              </button>
            );
          })}
        </div>
        {sel !== null && (
          <div style={{
            marginTop: 14, fontFamily: "'Press Start 2P', monospace", fontSize: 8,
            color: sel === q.correct ? "#0e7a37" : "#cc0044",
            borderLeft: `3px solid ${sel === q.correct ? "#15a34a" : "#ff0055"}`,
            paddingLeft: 12, lineHeight: 1.9,
          }}>
            {sel === q.correct ? q.ok : q.fail}
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// PHASE CARD
// ──────────────────────────────────────────

function PhaseCard({ phase, onComplete, index }) {
  const [step, setStep] = useState(phase.mechanic);
  const [storyDone, setStoryDone] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [visible, setVisible] = useState(false);
  const isLast = phase.id === PHASES.length;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 100);
    return () => clearTimeout(t);
  }, [index]);

  const MECHANIC_MAP = {
    dialogue: MechanicDialogue,
    catch:    MechanicCatch,
    clicker:  MechanicClicker,
    chat:     MechanicChat,
    cards:    MechanicCards,
    boss:     MechanicBoss,
  };
  const Mechanic = MECHANIC_MAP[step];

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "all .5s ease",
      background: phase.bg, border: `3px solid ${phase.color}`,
      padding: 22, marginBottom: 28, position: "relative",
      boxShadow: `0 0 28px ${phase.color}22, inset 0 0 60px ${phase.bg}`,
    }}>
      <Stars color={phase.stars} n={25} />

      {/* Corner pixels */}
      {["tl","tr","bl","br"].map(p => (
        <div key={p} style={{
          position: "absolute", width: 10, height: 10, background: phase.color,
          top: p.startsWith("t") ? -3 : undefined, bottom: p.startsWith("b") ? -3 : undefined,
          left: p.endsWith("l") ? -3 : undefined, right: p.endsWith("r") ? -3 : undefined,
        }} />
      ))}

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 8.5, color: phase.color, marginBottom: 5, textShadow: `0 0 8px ${phase.color}55` }}>
              {phase.title}
            </div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 13, color: "#1a1a2e", textShadow: "none" }}>
              {phase.subtitle}
            </div>
          </div>
          <div style={{ fontSize: 36, filter: `drop-shadow(0 0 10px ${phase.color})`, animation: "bob 1.3s infinite" }}>
            {phase.emoji}
          </div>
        </div>

        {/* Location */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: `${phase.color}14`, border: `1px solid ${phase.color}55`,
          padding: "5px 12px", marginBottom: 20,
          fontFamily: "'Press Start 2P', monospace", fontSize: 7.5, color: phase.color,
        }}>
          📍 {phase.location}
        </div>

        {/* Mechanic */}
        {Mechanic && step === phase.mechanic && (
          <Mechanic phase={phase} onComplete={() => setStep("story")} />
        )}

        {/* Illustration */}
        {step === "story" && phase.illustration && (
          <div style={{
            marginBottom: 20, border: `2px solid ${phase.color}`,
            overflow: "hidden", position: "relative",
            boxShadow: `0 0 16px ${phase.color}22`,
          }}>
            <img src={phase.illustration} alt={phase.subtitle} style={{ width: "100%", display: "block", imageRendering: "pixelated" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 55%, ${phase.bg}ee)` }} />
          </div>
        )}

        {/* Story */}
        {step === "story" && (
          <TypeWriter lines={phase.story} color="#444" onDone={() => setStoryDone(true)} />
        )}

        {/* Next button */}
        {step === "story" && storyDone && !cleared && (
          <PixelBtn
            color={phase.color}
            anim
            onClick={() => { setCleared(true); setTimeout(() => onComplete?.(), 400); }}
            style={{ marginTop: 20 }}
          >
            {isLast ? "▶ VER DECLARAÇÃO" : "▶ PRÓXIMA FASE"}
          </PixelBtn>
        )}

        {cleared && (
          <div style={{
            marginTop: 20, fontFamily: "'Press Start 2P', monospace",
            fontSize: 9, color: phase.color, animation: "blink .5s 4",
            textShadow: `0 0 10px ${phase.color}`,
          }}>
            ✓ {phase.cleared}
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// CONFETTI
// ──────────────────────────────────────────

function Confetti({ active }) {
  const pieces = useRef(
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ["#f472b6","#fbbf24","#4ade80","#38bdf8","#c084fc","#fb923c"][i % 6],
      delay: Math.random() * 2.5,
      size: Math.random() * 9 + 3,
      speed: Math.random() * 3 + 2,
    }))
  );
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 100 }}>
      {pieces.current.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: -20,
          width: p.size, height: p.size, background: p.color,
          animation: `fall ${p.speed}s ${p.delay}s infinite linear`,
        }} />
      ))}
    </div>
  );
}

// ──────────────────────────────────────────
// PHOTO GALLERY
// ──────────────────────────────────────────

function PhotoGallery() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0); // -1 left, 1 right
  const touchX = useRef(null);
  const total = GALLERY.length;

  const go = (next) => {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  };
  const prev = () => go((idx - 1 + total) % total);
  const next = () => go((idx + 1) % total);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) next();
    else if (dx > 40) prev();
    touchX.current = null;
  };

  const photo = GALLERY[idx];

  return (
    <div style={{ marginBottom: 24, border: "3px solid #d6308a", background: "#fff0f7", position: "relative", boxShadow: "0 0 28px #d6308a18" }}>
      <Stars color="#d6308a" n={18} />
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{
          textAlign: "center", fontFamily: "'Press Start 2P', monospace",
          fontSize: 8, color: "#d6308a", padding: "14px 0 10px", letterSpacing: 2,
        }}>
          📸 NOSSA HISTÓRIA
        </div>

        {/* Photo frame */}
        <div
          style={{ position: "relative", width: "100%", overflow: "hidden", background: "#1a0010", cursor: "pointer" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={next}
        >
          <img
            key={idx}
            src={photo.src}
            alt={`foto ${idx + 1}`}
            style={{
              width: "100%", height: 320,
              objectFit: "cover", objectPosition: "center top",
              display: "block",
              animation: "fadeIn .35s ease",
            }}
          />
          {/* Dark gradient bottom for caption */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
            background: "linear-gradient(transparent, rgba(30,0,15,.82))",
          }} />
          {/* Caption over photo */}
          <div style={{
            position: "absolute", bottom: 12, left: 12, right: 12,
            fontFamily: "'Press Start 2P', monospace", fontSize: 8.5,
            color: "#fff", lineHeight: 2,
            textShadow: "0 1px 6px #000, 0 0 20px #ff0055",
          }}>
            {photo.caption}
          </div>
          {/* Counter badge */}
          <div style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(30,0,15,.75)", border: "1px solid #ff005544",
            fontFamily: "'Press Start 2P', monospace", fontSize: 7,
            color: "#ff6699", padding: "4px 8px",
          }}>
            {idx + 1}/{total}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px 4px" }}>
          <button onClick={prev} style={{
            background: "transparent", border: "2px solid #d6308a", color: "#d6308a",
            fontFamily: "'Press Start 2P', monospace", fontSize: 11,
            padding: "7px 14px", cursor: "pointer",
          }}>◀</button>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center", maxWidth: "60%" }}>
            {GALLERY.map((_, i) => (
              <div
                key={i}
                onClick={() => go(i)}
                style={{
                  width: i === idx ? 10 : 6, height: i === idx ? 10 : 6,
                  background: i === idx ? "#d6308a" : "#f9a8d4",
                  cursor: "pointer", transition: "all .2s",
                  borderRadius: 0,
                }}
              />
            ))}
          </div>

          <button onClick={next} style={{
            background: "transparent", border: "2px solid #d6308a", color: "#d6308a",
            fontFamily: "'Press Start 2P', monospace", fontSize: 11,
            padding: "7px 14px", cursor: "pointer",
          }}>▶</button>
        </div>

        {/* Hint */}
        <div style={{
          textAlign: "center", fontFamily: "'Press Start 2P', monospace",
          fontSize: 6.5, color: "#cc6699", paddingBottom: 12,
        }}>
          ← toque na foto ou arraste →
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// APP
// ──────────────────────────────────────────

export default function App() {
  const [cur, setCur] = useState(0);
  const [done, setDone] = useState([]);
  const [started, setStarted] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [victory, setVictory] = useState(false);
  const bottomRef = useRef(null);

  // ── Intro sequence state ──
  const [introPhase, setIntroPhase] = useState(0); // 0=error 1=troll 2=loading 3=game
  const [loadProgress, setLoadProgress] = useState(0);
  const [errCount, setErrCount] = useState(0);

  // Error screen fake progress
  useEffect(() => {
    if (introPhase !== 0) return;
    const iv = setInterval(() => setErrCount(c => Math.min(c + 2, 100)), 100);
    return () => clearInterval(iv);
  }, [introPhase]);

  // Error → Troll after 5s
  useEffect(() => {
    if (introPhase !== 0) return;
    const t = setTimeout(() => setIntroPhase(1), 5000);
    return () => clearTimeout(t);
  }, [introPhase]);

  // Troll → Loading after 5s
  useEffect(() => {
    if (introPhase !== 1) return;
    const t = setTimeout(() => setIntroPhase(2), 5000);
    return () => clearTimeout(t);
  }, [introPhase]);

  // Loading bar fills over ~4.5s
  useEffect(() => {
    if (introPhase !== 2) return;
    const iv = setInterval(() => setLoadProgress(p => Math.min(p + 2, 100)), 90);
    return () => clearInterval(iv);
  }, [introPhase]);

  // Loading complete → game
  useEffect(() => {
    if (introPhase === 2 && loadProgress >= 100) {
      const t = setTimeout(() => setIntroPhase(3), 700);
      return () => clearTimeout(t);
    }
  }, [introPhase, loadProgress]);

  // ── Live love counter ──
  const [loveTime, setLoveTime] = useState(null);
  useEffect(() => {
    const calc = () => {
      const start = new Date(2025, 5, 27); // 27 de Junho de 2025
      const now   = new Date();
      const diff  = now - start;
      const totalSecs = Math.floor(diff / 1000);
      const totalMins = Math.floor(diff / 60000);
      const totalHrs  = Math.floor(diff / 3600000);
      const totalDays = Math.floor(diff / 86400000);
      const secs   = Math.floor((diff % 60000) / 1000);
      const mins   = Math.floor((diff % 3600000) / 60000);
      const hrs    = Math.floor((diff % 86400000) / 3600000);
      const days   = totalDays % 30;
      const months = Math.floor((totalDays % 365) / 30);
      const years  = Math.floor(totalDays / 365);
      setLoveTime({ totalSecs, totalMins, totalHrs, totalDays, secs, mins, hrs, days, months, years });
    };
    calc();
    const iv = setInterval(calc, 1000);
    return () => clearInterval(iv);
  }, []);

  const scroll = () => setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 150);

  const phaseComplete = (i) => {
    setDone(p => [...p, i]);
    if (i < PHASES.length - 1) { setCur(i + 1); scroll(); }
    else { setQuiz(true); scroll(); }
  };

  const quizComplete = () => { setQuiz(false); setVictory(true); scroll(); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#fce4ec;min-height:100vh;}

        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
        @keyframes fall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
        @keyframes glow{0%,100%{text-shadow:0 0 10px #ff0055,0 0 20px #ff0055}50%{text-shadow:0 0 20px #ff0055,0 0 50px #ff0055,0 0 80px #ff0055}}
        @keyframes titleGlow{0%,100%{opacity:1;filter:brightness(1)}50%{opacity:.88;filter:brightness(1.2)}}
        @keyframes slideIn{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-9px) rotate(-2deg)}40%{transform:translateX(9px) rotate(2deg)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
        @keyframes floatUp{0%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}100%{opacity:0;transform:translate(-50%,-120%) scale(.8)}}
        @keyframes popIn{0%{transform:scale(0);opacity:0}70%{transform:scale(1.25);opacity:1}100%{transform:scale(1);opacity:1}}
        @keyframes heartFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-10px) scale(1.1)}}

        @keyframes errBlink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes trollPop{0%{transform:scale(0) rotate(-10deg)}60%{transform:scale(1.2) rotate(3deg)}100%{transform:scale(1) rotate(0)}}

        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#fce4ec;}
        ::-webkit-scrollbar-thumb{background:#ff0055;}
      `}</style>

      {/* ── INTRO: TELA DE ERRO ── */}
      {introPhase === 0 && (
        <div style={{
          position: "fixed", inset: 0, background: "#080808",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontFamily: "monospace", padding: 32, zIndex: 9999,
          animation: "fadeIn .3s ease",
        }}>
          <div style={{ color: "#ff2020", fontSize: 48, marginBottom: 20, animation: "errBlink 1.2s infinite" }}>⚠️</div>
          <div style={{ color: "#ff2020", fontSize: 20, fontWeight: "bold", marginBottom: 16, letterSpacing: 3, textAlign: "center" }}>
            ERRO CRÍTICO DO SISTEMA
          </div>
          <div style={{ width: "90%", maxWidth: 340, background: "#0d0d0d", border: "1px solid #ff2020", padding: 20, marginBottom: 20 }}>
            <div style={{ color: "#cc0000", fontSize: 12, lineHeight: 2.2, marginBottom: 16 }}>
              Este dispositivo encontrou um problema grave e precisa ser reiniciado.
            </div>
            <div style={{ color: "#ff4444", fontSize: 11, lineHeight: 2, marginBottom: 16 }}>
              Código: <span style={{ color: "#ff6666", fontWeight: "bold" }}>0x000LORENA_404</span>
            </div>
            <div style={{ color: "#888", fontSize: 11, marginBottom: 8 }}>Coletando informações de erro...</div>
            <div style={{ height: 6, background: "#1a0000", border: "1px solid #440000", marginBottom: 6 }}>
              <div style={{ height: "100%", background: "#ff2020", width: `${errCount}%`, transition: "width .15s" }} />
            </div>
            <div style={{ color: "#ff2020", fontSize: 11, fontWeight: "bold" }}>{errCount}%</div>
          </div>
          <div style={{ color: "#440000", fontSize: 10, textAlign: "center", lineHeight: 2 }}>
            Reiniciando automaticamente...
          </div>
        </div>
      )}

      {/* ── INTRO: TELA TROUXA ── */}
      {introPhase === 1 && (
        <div style={{
          position: "fixed", inset: 0,
          background: "linear-gradient(135deg, #1a0010 0%, #0d0020 100%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontFamily: "'Press Start 2P', monospace", padding: 32, zIndex: 9999,
          animation: "fadeIn .2s ease",
        }}>
          <div style={{ fontSize: 56, marginBottom: 18, animation: "trollPop .5s ease forwards, bob 1.2s .5s infinite" }}>
            😂
          </div>
          <div style={{
            color: "#ff0055", fontSize: 24, marginBottom: 14, textAlign: "center",
            animation: "titleGlow 1s infinite",
            textShadow: "0 0 20px #ff0055",
          }}>
            TROUXA!!
          </div>
          <div style={{ color: "#ff6699", fontSize: 14, marginBottom: 10, textAlign: "center", letterSpacing: 2 }}>
            Kkkkkkkkkkk
          </div>
          <div style={{ color: "#ff3377", fontSize: 11, marginBottom: 24, textAlign: "center", lineHeight: 2.2 }}>
            te enganei hein?? 😂😂
          </div>
          <div style={{
            color: "#cc2255", fontSize: 9, textAlign: "center", lineHeight: 2.5,
            background: "#1a001088", border: "1px solid #ff005533", padding: "12px 20px",
          }}>
            não é vírus não bb ❤️
          </div>
          <div style={{ marginTop: 28, display: "flex", gap: 12, animation: "fadeIn 1s .3s both" }}>
            {[...Array(5)].map((_,i) => (
              <div key={i} style={{ animation: `bob ${1.2 + i * 0.2}s infinite` }}>
                <PixelHeart color="#ff0055" size={24} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── INTRO: CARREGAMENTO ROMÂNTICO ── */}
      {introPhase === 2 && (
        <div style={{
          position: "fixed", inset: 0,
          background: "linear-gradient(135deg, #1a0015 0%, #0a0018 50%, #160010 100%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontFamily: "'Press Start 2P', monospace", padding: 32, zIndex: 9999,
          animation: "fadeIn .5s ease",
        }}>
          {/* Floating hearts bg */}
          {[...Array(8)].map((_,i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${10 + i * 11}%`, top: `${15 + (i % 3) * 20}%`,
              opacity: 0.12,
              animation: `bob ${2 + i * 0.4}s ${i * 0.3}s infinite`,
            }}>
              <PixelHeart color="#ff0055" size={18} />
            </div>
          ))}

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 14, marginBottom: 32 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ animation: `bob ${1.2 + i * 0.3}s ${i * 0.2}s infinite` }}>
                  <PixelHeart color="#ff0055" size={32} />
                </div>
              ))}
            </div>

            <div style={{
              color: "#ff3377", fontSize: 14, marginBottom: 6, letterSpacing: 3,
              animation: "titleGlow 2s infinite",
              textShadow: "0 0 20px #ff005566",
            }}>
              CARREGANDO
            </div>
            <div style={{ color: "#ff6699", fontSize: 9, marginBottom: 6 }}>uma surpresa especial</div>
            <div style={{ color: "#cc2244", fontSize: 8, marginBottom: 32 }}>para você, Lorena ❤️</div>

            <div style={{ width: 260, marginBottom: 10 }}>
              <div style={{ height: 10, background: "#33001188", border: "2px solid #ff005533", marginBottom: 8, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #ff0055, #ff66aa, #ff0055)",
                  backgroundSize: "200% 100%",
                  width: `${loadProgress}%`, transition: "width .2s",
                  animation: "titleGlow 1s infinite",
                }} />
              </div>
              <div style={{ color: "#ff3377", fontSize: 9, textAlign: "center" }}>{loadProgress}%</div>
            </div>

            <div style={{ color: "#cc2244", fontSize: 8, textAlign: "center", lineHeight: 2.8, marginTop: 16, minHeight: 28 }}>
              {loadProgress < 25 ? "iniciando a jornada..." :
               loadProgress < 50 ? "carregando memórias..." :
               loadProgress < 75 ? "preparando com amor..." :
               loadProgress < 95 ? "quase lá, bb..." :
               "✨ pronto! ✨"}
            </div>
          </div>
        </div>
      )}

      {/* ── JOGO PRINCIPAL ── */}
      {introPhase >= 3 && (<>
      <Confetti active={victory} />

      {/* Scanlines — subtle on light theme */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50,
        background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,90,150,.04) 3px,rgba(255,90,150,.04) 4px)",
      }} />

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 14px", fontFamily: "'Press Start 2P', monospace" }}>

        {/* ── HEADER ── */}
        <div style={{
          textAlign: "center", marginBottom: 26, padding: "26px 20px",
          border: "3px solid #ff0055", background: "#fff5f8", position: "relative",
          boxShadow: "0 0 40px #ff005518",
        }}>
          <Stars color="#ff0055" n={40} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 10 }}>
              {[1,0,1,0,1].map((f,i) => (
                <div key={i} style={{ width: 8, height: 8, background: f ? "#ff0055" : "transparent", border: "1px solid #ff005533" }} />
              ))}
            </div>
            <div style={{ fontSize: 8, color: "#cc3366", marginBottom: 5, letterSpacing: 4 }}>★ EDIÇÃO ESPECIAL ★</div>
            <div style={{
              fontSize: 22, color: "#cc0044", lineHeight: 1.5,
              animation: "titleGlow 2.5s infinite",
              textShadow: "0 0 12px #ff005566",
            }}>
              LORENA
            </div>
            <div style={{ fontSize: 8, color: "#ff0055", marginTop: 5, letterSpacing: 3 }}>A JORNADA</div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 12 }}>
              <PixelHeart color="#ff0055" size={22} />
              <PixelHeart color="#ff0055" size={22} />
              <PixelHeart color="#ff0055" size={22} />
            </div>
          </div>
        </div>

        {/* ── HUD ── */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          padding: "9px 16px", background: "#ffe8f3",
          border: "2px solid #ffb3d1", marginBottom: 24,
          fontSize: 7.5, color: "#994466",
        }}>
          <span>FASES: <span style={{ color: "#cc3366" }}>{done.length}/{PHASES.length}</span></span>
          <span style={{ color: "#e0429a" }}>11 MESES 💕</span>
          <span>PONTOS: <span style={{ color: "#cc3366" }}>{done.length * 1000}</span></span>
        </div>

        {/* ── LOVE COUNTER ── */}
        {loveTime && (
          <div style={{
            marginBottom: 24, border: "3px solid #ff0055",
            background: "#fff0f7", position: "relative",
            padding: "20px 16px 18px",
            boxShadow: "0 0 28px #ff005514",
          }}>
            <Stars color="#ff0055" n={22} />
            <div style={{ position: "relative", zIndex: 1 }}>

              {/* Title */}
              <div style={{
                textAlign: "center", fontFamily: "'Press Start 2P', monospace",
                fontSize: 8, color: "#d6308a", marginBottom: 18, letterSpacing: 2,
              }}>
                💕 JUNTOS HÁ...
              </div>

              {/* Anos / Meses / Dias */}
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
                {[
                  { v: loveTime.years,  l: "ANOS"  },
                  { v: loveTime.months, l: "MESES" },
                  { v: loveTime.days,   l: "DIAS"  },
                ].map(({ v, l }) => (
                  <div key={l} style={{
                    background: "#fff", border: "2px solid #ff0055",
                    padding: "10px 8px", textAlign: "center", minWidth: 68, flex: 1,
                    boxShadow: "0 2px 8px #ff005511",
                  }}>
                    <div style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: 22, color: "#cc0044", lineHeight: 1,
                    }}>{v}</div>
                    <div style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: 6.5, color: "#994466", marginTop: 7,
                    }}>{l}</div>
                  </div>
                ))}
              </div>

              {/* HH:MM:SS digital clock */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, marginBottom: 18 }}>
                {[
                  { v: String(loveTime.hrs).padStart(2,"0"),  l: "HRS" },
                  null,
                  { v: String(loveTime.mins).padStart(2,"0"), l: "MIN" },
                  null,
                  { v: String(loveTime.secs).padStart(2,"0"), l: "SEG" },
                ].map((item, i) => item === null ? (
                  <div key={i} style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 22, color: "#ff0055",
                    marginBottom: 14,
                    animation: "blink 1s infinite",
                  }}>:</div>
                ) : (
                  <div key={i} style={{
                    background: "#2d0020", border: "2px solid #ff0055",
                    padding: "7px 6px", textAlign: "center", minWidth: 52,
                    boxShadow: "0 0 12px #ff005533",
                  }}>
                    <div style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: 18, color: "#ff3377", lineHeight: 1,
                    }}>{item.v}</div>
                    <div style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: 6, color: "#ff6699", marginTop: 5,
                    }}>{item.l}</div>
                  </div>
                ))}
              </div>

              {/* Total stats */}
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 7.5, color: "#994466",
                lineHeight: 3.2, textAlign: "center",
                background: "#ffe8f3", padding: "12px 14px",
                border: "1px solid #ffb3d1",
              }}>
                <div>🗓️ {loveTime.totalDays.toLocaleString("pt-BR")} dias juntos</div>
                <div>⏰ {loveTime.totalHrs.toLocaleString("pt-BR")} horas de amor</div>
                <div>⚡ {loveTime.totalMins.toLocaleString("pt-BR")} minutos felizes</div>
                <div style={{ color: "#d6308a", fontSize: 8 }}>
                  💖 {loveTime.totalSecs.toLocaleString("pt-BR")} segundos com você
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── PHOTO GALLERY ── */}
        <PhotoGallery />

        {/* ── START SCREEN ── */}
        {!started && (
          <div style={{
            padding: "0 0 32px", border: "3px solid #ff0055",
            background: "#fff0f5", marginBottom: 24,
            animation: "slideIn .5s ease", position: "relative", overflow: "hidden",
          }}>
            <Stars color="#ff0055" n={30} />

            {/* Platform scene */}
            <div style={{ position: "relative", height: 200 }}>
              {/* Sky */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, #ffe4f0 0%, #ffd6e8 50%, #ffe4f0 100%)",
              }} />

              {/* Stars in sky */}
              {[...Array(12)].map((_, i) => (
                <div key={i} style={{
                  position: "absolute", width: 2, height: 2, background: "#ff0055",
                  opacity: .3 + (i % 3) * .15,
                  left: `${(i * 8.7 + 5) % 95}%`, top: `${(i * 11.3) % 50}%`,
                }} />
              ))}

              {/* Left platform */}
              <div style={{
                position: "absolute", bottom: 40, left: 20,
                width: 100, height: 14,
                background: "#ff0055", boxShadow: "0 4px 0 #aa0033",
              }}>
                <div style={{ position: "absolute", top: -4, left: 0, right: 0, height: 4, background: "#ff3377" }} />
              </div>
              {/* Right platform */}
              <div style={{
                position: "absolute", bottom: 40, right: 20,
                width: 100, height: 14,
                background: "#ff0055", boxShadow: "0 4px 0 #aa0033",
              }}>
                <div style={{ position: "absolute", top: -4, left: 0, right: 0, height: 4, background: "#ff3377" }} />
              </div>

              {/* Lyelson on left platform */}
              <div style={{ position: "absolute", bottom: 54, left: 26, animation: "bob 1.4s .2s infinite" }}>
                <Sprite src="/lyelson.png" size={72} glow="#ff0055" style={{ animation: "none" }} />
              </div>

              {/* Lorena on right platform */}
              <div style={{ position: "absolute", bottom: 54, right: 26, animation: "bob 1.4s .6s infinite" }}>
                <Sprite src="/lorena.png" size={72} glow="#ff0055" style={{ animation: "none" }} />
              </div>

              {/* Floating hearts between them */}
              {[
                { size: 14, left: "42%", bottom: 80, delay: "0s" },
                { size: 20, left: "50%", bottom: 100, delay: ".4s" },
                { size: 14, left: "58%", bottom: 80, delay: ".8s" },
              ].map((h, i) => (
                <div key={i} style={{
                  position: "absolute", left: h.left, bottom: h.bottom,
                  transform: "translateX(-50%)",
                  animation: `heartFloat 1.6s ${h.delay} infinite`,
                }}>
                  <PixelHeart color="#ff0055" size={h.size} />
                </div>
              ))}

              {/* Ground */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 40,
                background: "#ffd6e8", borderTop: "2px solid #ff005522",
              }} />
            </div>

            {/* Text */}
            <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 28px" }}>
              <p style={{ fontSize: 8.5, color: "#cc8899", lineHeight: 2, marginBottom: 5 }}>Para:</p>
              <p style={{
                fontSize: 16, color: "#ff0055", lineHeight: 1.8,
                marginBottom: 8, animation: "glow 2s infinite",
              }}>LORENA</p>
              <p style={{ fontSize: 7.5, color: "#994466", lineHeight: 2, marginBottom: 3 }}>A nossa história em 6 fases.</p>
              <p style={{ fontSize: 6.5, color: "#15a34a", lineHeight: 2, marginBottom: 24 }}>
                (ps: são 11 meses, não 9 😂)
              </p>
              <PixelBtn color="#ff0055" onClick={() => setStarted(true)} anim style={{ fontSize: 11, padding: "14px 32px", boxShadow: "0 0 24px #ff005555" }}>
                ▶ INICIAR
              </PixelBtn>
            </div>
          </div>
        )}

        {/* ── PHASES ── */}
        {started && PHASES.slice(0, cur + 1).map((ph, i) => (
          <PhaseCard key={ph.id} phase={ph} index={i} onComplete={() => phaseComplete(i)} />
        ))}

        {/* ── QUIZ ── */}
        {quiz && <Quiz onComplete={quizComplete} />}

        {/* ── VICTORY / DECLARATION ── */}
        {victory && (
          <div style={{
            padding: 28, border: "3px solid #d99a06",
            background: "#fffbee", animation: "slideIn .6s ease",
            position: "relative", boxShadow: "0 0 40px #fbbf2433",
          }}>
            <Stars color="#d99a06" n={50} />
            {["tl","tr","bl","br"].map(p => (
              <div key={p} style={{
                position: "absolute", width: 14, height: 14, background: "#d99a06",
                top: p.startsWith("t") ? -4 : undefined, bottom: p.startsWith("b") ? -4 : undefined,
                left: p.endsWith("l") ? -4 : undefined, right: p.endsWith("r") ? -4 : undefined,
              }} />
            ))}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 14, color: "#c98a06", marginBottom: 22, textAlign: "center",
                textShadow: "0 2px 8px #fbbf2455", animation: "titleGlow 1.5s infinite",
              }}>
                VOCÊ VENCEU! 👑
              </div>

              {/* Couple illustration */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <img
                  src="/casal.png"
                  alt="Lyelson e Lorena"
                  style={{
                    width: 200, height: "auto",
                    imageRendering: "pixelated",
                    filter: "drop-shadow(0 0 20px #ff0055) drop-shadow(0 0 40px #fbbf2444)",
                    animation: "bob 1.5s infinite",
                  }}
                />
              </div>

              {/* Final illustration */}
              <div style={{
                marginBottom: 28, border: "3px solid #fbbf24",
                overflow: "hidden", position: "relative",
                boxShadow: "0 0 30px #fbbf2433",
              }}>
                <img src="/fase5-final.jpg" alt="Boss Final" style={{ width: "100%", display: "block", imageRendering: "pixelated" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 55%,#fffbee99)" }} />
              </div>

              {/* Declaration */}
              <div style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 9, color: "#553344", lineHeight: 3.0,
                marginBottom: 28, textAlign: "left",
                background: "linear-gradient(135deg, #fff0f7 0%, #fffbf0 100%)",
                border: "2px solid #f9a8d4",
                borderRadius: 12,
                padding: "22px 18px",
                boxShadow: "0 4px 24px #f9a8d433",
              }}>
                {/* Abertura */}
                <p style={{ color: "#d6308a", fontSize: 11, marginBottom: 18, textShadow: "0 1px 8px #f9a8d4" }}>
                  Amor,
                </p>

                {/* Parágrafo 1 */}
                <p style={{ marginTop: 10 }}>hoje a gente faz 9 meses juntos!</p>
                <p style={{ color: "#9333ea" }}>opsss, 11 Meses Kkkk</p>
                <p style={{ marginTop: 10 }}>mas a verdade é que cada dia</p>
                <p>com você vale por um ano inteiro</p>
                <p>de tanta coisa boa</p>
                <p style={{ color: "#15a34a" }}>que a gente vive.</p>

                {/* Parágrafo 2 */}
                <p style={{ marginTop: 20, color: "#e06c0a" }}>Eu sei bem que não sou</p>
                <p style={{ color: "#e06c0a" }}>a pessoa mais perfeita do mundo,</p>
                <p style={{ marginTop: 10 }}>mas por você,</p>
                <p>e para te ver bem,</p>
                <p>eu tento ser melhor a cada dia.</p>
                <p style={{ marginTop: 10, color: "#d6308a" }}>Você desperta</p>
                <p style={{ color: "#d6308a" }}>o meu melhor lado.</p>

                {/* Parágrafo 3 */}
                <p style={{ marginTop: 20, color: "#9333ea" }}>Minha gaiata,</p>
                <p style={{ color: "#9333ea" }}>minha doidiça favorita...</p>
                <p style={{ marginTop: 10 }}>você ilumina a minha vida</p>
                <p>de um jeito que ninguém mais</p>
                <p style={{ color: "#c98a06" }}>conseguiria.</p>
                <p style={{ marginTop: 14 }}>Eu te quero sorrindo,</p>
                <p>cantando, calada ou falante.</p>
                <p style={{ marginTop: 10 }}>Te quero de mãos dadas,</p>
                <p>grudados ou separados...</p>
                <p style={{ marginTop: 14, color: "#0a8fd1" }}>te quero de todo jeito,</p>
                <p style={{ color: "#0a8fd1" }}>com cada defeito e detalhe,</p>
                <p style={{ color: "#0a8fd1" }}>sem me importar com nada.</p>
                <p style={{ marginTop: 14, color: "#d6308a", fontSize: 10 }}>
                  Eu só te quero e pronto,
                </p>
                <p style={{ color: "#d6308a", fontSize: 10 }}>isso basta.</p>

                {/* Parágrafo 4 */}
                <p style={{ marginTop: 22, color: "#553344" }}>Sem você, este ano teria sido</p>
                <p>infinitamente mais difícil.</p>
                <p style={{ marginTop: 12 }}>Obrigada por cada risada dividida,</p>
                <p>pelos momentos simples,</p>
                <p style={{ marginTop: 10 }}>pelos abraços que curam</p>
                <p>qualquer cansaço</p>
                <p style={{ marginTop: 10 }}>e por me mostrar o quanto</p>
                <p>a vida fica leve e bonita</p>
                <p style={{ color: "#15a34a" }}>quando a gente ama</p>
                <p style={{ color: "#15a34a" }}>e é amado de verdade.</p>

                {/* Fechamento */}
                <p style={{ marginTop: 28, color: "#ff0055", fontSize: 12, textShadow: "0 1px 12px #ff005566" }}>
                  Feliz 11 meses, meu amor.
                </p>
                <p style={{ marginTop: 10, color: "#ff0055", fontSize: 12 }}>
                  Eu amo você. ❤️
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {[...Array(5)].map((_, i) => <PixelHeart key={i} color="#ff0055" size={30} />)}
              </div>

              <div style={{ textAlign: "right", fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: "#994466" }}>
                — {HERO_NAME}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
      </>)}
    </>
  );
}
