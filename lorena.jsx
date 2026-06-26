import { useState, useEffect, useRef, memo } from "react";

// ─────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────

const START_DATE = new Date(2025, 5, 27);

const GALLERY = [
  { src: "/g01.png", caption: "❤️ juntos, do jeitinho que eu amo" },
  { src: "/g02.jpg", caption: "🎈 festa com você é sempre diferente" },
  { src: "/g03.jpg", caption: "😂 eu mordendo ela e acho completamente normal" },
  { src: "/g04.jpg", caption: "🤪 a gente é exatamente assim... loucos" },
  { src: "/g05.png", caption: "🍽️ até na cantina somos dupla perfeita" },
  { src: "/g06.jpg", caption: "💨 você e o ventilador... lindo demais" },
  { src: "/g07.png", caption: "📱 mesmo de longe, você preenche tudo" },
  { src: "/g08.jpg", caption: "🌳 qualquer lugar fica bonito do seu lado" },
  { src: "/g09.jpg", caption: "😷 mesmo de máscara, te reconheceria em qualquer lugar" },
  { src: "/g10.jpg", caption: "😊 esse sorriso é meu favorito no mundo inteiro" },
  { src: "/g11.jpg", caption: "😄 a touca, o riso... você perfeita" },
  { src: "/g12.jpg", caption: "🐸 artista, doidiça e ainda linda demais" },
  { src: "/g13.jpg", caption: "👁️ esses olhos verdes que me derretem todo dia" },
  { src: "/g14.jpg", caption: "👁️ te olhei e fui, Doidiça" },
  { src: "/g15.jpg", caption: "🌴 aventura ao ar livre, juntos como sempre" },
  { src: "/g16.jpg", caption: "😂 ele sempre fazendo gracinha... amo isso" },
  { src: "/g17.jpg", caption: "🌆 qualquer rua fica mais bonita assim" },
  { src: "/g18.jpg", caption: "☀️ o azul dela e o céu combinando perfeitamente" },
  { src: "/g19.jpg", caption: "🌅 por do sol com você... impossível não se apaixonar" },
  { src: "/g20.jpg", caption: "🌊 às margens do rio, felizes como sempre" },
  { src: "/g21.jpg", caption: "😊 esse sorriso ilumina absolutamente tudo" },
  { src: "/g22.jpg", caption: "🌅 dois, o sol, e a melhor sensação do mundo" },
  { src: "/g23.jpg", caption: "❤️ o coração que a gente faz junto, literalmente" },
  { src: "/g24.jpg", caption: "🌊 juntos vendo o dia terminar... perfeito" },
  { src: "/g25.jpg", caption: "🌙 nem precisa fazer nada, estar junto já é tudo" },
  { src: "/g26.jpg", caption: "🤫 o segredinho que ela me contou na praça..." },
  { src: "/g27.jpg", caption: "💙 ela olha pro horizonte e eu só olho pra ela" },
  { src: "/g28.jpg", caption: "😝 ele perturbando e ela linda como sempre" },
  { src: "/g29.jpg", caption: "💜 combinamos roupa sem combinar... a gente é assim" },
  { src: "/g30.jpg", caption: "🌌 Eu te amo, até as estrelas sabem disso" },
  { src: "/g31.jpg", caption: "🧸 ela colocou meu cabelo no bichinho... kkkkk" },
  { src: "/g32.jpg", caption: "🎭 a gente sempre inventando uma bagunça" },
  { src: "/g33.jpg", caption: "😊 o sorriso dela ilumina mais que as luzes do lugar" },
  { src: "/g34.jpg", caption: "🌅 ela e o pôr do sol... como escolher o mais lindo?" },
  { src: "/g35.jpg", caption: "💜 a gente e o horizonte... combina tudo" },
  { src: "/g36.jpg", caption: "☀️ esse sorriso... meu lugar favorito no mundo" },
  { src: "/g37.jpg", caption: "🌊 sentados juntos no fim do cais, sem pressa" },
  { src: "/g38.jpg", caption: "💙 a paz que sinto quando estou do seu lado" },
  { src: "/g39.jpg", caption: "🌇 dois contra o mundo, pôr do sol como testemunha" },
  { src: "/g40.jpg", caption: "🌿 na mata, na cachoeira, em qualquer lugar — juntos" },
  { src: "/g41.jpg", caption: "💚 a natureza ao redor e a gente no centro" },
  { src: "/g42.jpg", caption: "🌳 embaixo da árvore, onde o tempo para" },
  { src: "/g43.jpg", caption: "😄 ela sorri assim e eu esqueço de tudo" },
  { src: "/g44.jpg", caption: "🌊 o rio e o pôr do sol como pano de fundo da gente" },
  { src: "/g45.jpg", caption: "🌱 ela, ele e a natureza toda feliz por eles" },
  { src: "/g46.jpg", caption: "🌴 a gente e o horizonte, sempre" },
  { src: "/g47.jpg", caption: "🌲 caminhando juntos por trilhas novas" },
  { src: "/g48.jpg", caption: "❤️ esse abraço que é meu lar" },
  { src: "/g49.jpg", caption: "🌳 a praça que virou o nosso cantinho" },
  { src: "/g50.jpg", caption: "👁️ esses olhos verdes... de perto ainda mais impossíveis" },
  { src: "/g51.jpg", caption: "🍂 ela do lado e o mundo fica mais bonito" },
  { src: "/g52.jpg", caption: "💛 combinamos sem combinar, como sempre" },
  { src: "/g53.jpg", caption: "💌 ela escreveu pra mim... e eu fiquei sem chão" },
  { src: "/g54.jpg", caption: "😏 dois malucos apaixonados, né?" },
  { src: "/g55.jpg", caption: "👶 ela com bebê... meu coração literalmente não aguenta" },
  { src: "/g56.jpg", caption: "😬 eu mordendo ela de novo, não resisto kkk" },
  { src: "/g57.jpg", caption: "🤭 dizem que amor dói... ela leva a sério kkkk" },
  { src: "/g58.jpg", caption: "🎉 festa com ela é sempre a melhor parte" },
  { src: "/g59.jpg", caption: "💙 ela de vestido azul... impecável como sempre" },
  { src: "/g60.jpg", caption: "🌸 ela sozinha já rouba a cena toda" },
  { src: "/g61.jpg", caption: "🌿 ela olhando pro alto... sempre sonhando grande" },
  { src: "/g62.jpg", caption: "☀️ a gente e o horizonte de novo... perfeito" },
  { src: "/g63.jpg", caption: "🌳 qualquer lugar vira cenário perfeito com ela" },
  { src: "/g64.jpg", caption: "💫 até quando ela fecha os olhos, eu fico olhando" },
  { src: "/g65.jpg", caption: "🌇 ela de rosinha e aquele pôr do sol... perfeito" },
  { src: "/g66.jpg", caption: "🦒 ela e a girafa... ambas esplêndidas kkkk" },
  { src: "/g67.jpg", caption: "😂 esse riso... nem precisa fazer nada, me apaixona" },
  { src: "/g68.jpg", caption: "🎨 frente ao mural e eu querendo morder kkk" },
  { src: "/g69.jpg", caption: "🦕 ela domando dinossauro... acredito plenamente" },
  { src: "/g70.jpg", caption: "😊 esse sorriso maroto me derruba sempre" },
  { src: "/g71.jpg", caption: "🌈 a gente na frente do mural mais bonito do mundo" },
  { src: "/g72.jpg", caption: "🌸 ela de rosinha... literalmente a coisa mais linda" },
];

const TIMELINE = [
  {
    icon: "🧪", chapter: "Capítulo 1",
    title: "O Encontro",
    place: "Laboratório de Química",
    desc: "Você chegou com aquele sorriso e me pediu pra ser sua dupla. Eu não sabia que naquele momento simples, minha vida inteira ia mudar.",
  },
  {
    icon: "😂", chapter: "Capítulo 2",
    title: "A Queda",
    place: "Rua Grande",
    desc: "Você caiu na minha frente, do nada. Eu tentei não rir... não consegui. Mas depois segurei a sua mão. (Perdão! 😂)",
  },
  {
    icon: "🌊", chapter: "Capítulo 3",
    title: "A Viagem",
    place: "Praia do Bacaba",
    desc: "O Bacaba, o sol, e você do meu lado. Foi ali que algo muito maior começou a tomar forma entre a gente.",
  },
  {
    icon: "💬", chapter: "Capítulo 4",
    title: "A Declaração",
    place: "Com o coração na mão",
    desc: "Você falou primeiro. Declarou seu amor. Eu fiquei em silêncio — não era frieza. Era eu tentando entender como alguém tão incrível podia querer alguém como eu.",
  },
  {
    icon: "🌙", chapter: "Capítulo 5",
    title: "A Madrugada",
    place: "Uma noite até o sol nascer",
    desc: "Conversamos até o amanhecer. Eu te conheci de verdade naquela noite. E percebi: você não chegou por acaso — você veio me salvar.",
  },
  {
    icon: "❤️", chapter: "27 de Junho de 2025",
    title: "O Começo Oficial",
    place: "O dia que mudou tudo",
    desc: "A gente começou. E o mundo ganhou cor.",
    special: true,
  },
  {
    icon: "✈️", chapter: "Uma aventura juntos",
    title: "Alcântara",
    place: "Memória pra vida toda",
    desc: "Cada viagem contigo é o capítulo novo favorito da minha vida.",
  },
  {
    icon: "🌳", chapter: "Os momentos simples",
    title: "A Praça, a APA...",
    place: "Lugares que viraram nossos",
    desc: "Passeios longos, sem pressa, conversas que não acabam. Os momentos simples com você valem mais do que tudo.",
  },
  {
    icon: "🎂", chapter: "27 de Junho de 2026",
    title: "1 ANO DE AMOR",
    place: "Hoje",
    desc: "Um ano inteiro de cumplicidade, amor e leveza. Que venha muito mais.",
    special: true,
  },
];

const CARTA = [
  { text: "Amor,", type: "greeting" },
  { text: "a 1 ano atrás eu estava aceitando o seu pedido de namoro,", type: "normal" },
  { text: "hoje estamos compartilhando a vida com muita cumplicidade, amor e leveza.", type: "normal" },
  { text: "Eu amo muito você,", type: "highlight" },
  { text: "e o tanto que a gente se cuida e se respeita,", type: "normal" },
  { text: "o jeito como nos impulsionamos um ao outro a voar mais alto,", type: "normal" },
  { text: "o quanto falamos um pro outro o quanto cada um é foda,", type: "normal" },
  { text: "o quanto somos amigos,", type: "normal" },
  { text: "o quanto somos parceiros em absolutamente tudo que enfrentamos juntos.", type: "normal" },
  { text: "Que venha muitos anos de muito amor.", type: "emphasis" },
  { text: "Eu te amo a cada batida do meu coração,", type: "normal" },
  { text: "e te amarei a cada segundo da minha vida.", type: "closing" },
];

// ─────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useLoveTime() {
  const [t, setT] = useState(null);
  useEffect(() => {
    const calc = () => {
      const diff = new Date() - START_DATE;
      if (diff < 0) { setT(null); return; }
      setT({
        years:  Math.floor(diff / (365.25 * 86400000)),
        months: Math.floor((diff % (365.25 * 86400000)) / (30.44 * 86400000)),
        days:   Math.floor((diff % (30.44 * 86400000)) / 86400000),
        hrs:    Math.floor((diff % 86400000) / 3600000),
        mins:   Math.floor((diff % 3600000) / 60000),
        secs:   Math.floor((diff % 60000) / 1000),
        total:  Math.floor(diff / 86400000),
      });
    };
    calc();
    const iv = setInterval(calc, 1000);
    return () => clearInterval(iv);
  }, []);
  return t;
}

// ─────────────────────────────────────────────────────────
// SMALL COMPONENTS
// ─────────────────────────────────────────────────────────

const PETAL_EMOJIS = ["🌸", "🌺", "🌹", "💮", "🌷", "✿"];
function Petals() {
  const items = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 5.7 + 3) % 96}%`,
      size: 13 + (i % 5) * 4,
      dur: 7 + (i % 6) * 1.2,
      delay: i * 0.55,
      e: PETAL_EMOJIS[i % PETAL_EMOJIS.length],
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {items.current.map(p => (
        <div key={p.id} style={{
          position: "absolute", top: "-36px", left: p.left,
          fontSize: p.size, opacity: 0.42,
          animation: `petalFall ${p.dur}s ${p.delay}s infinite linear`,
          willChange: "transform",
        }}>{p.e}</div>
      ))}
    </div>
  );
}

function Divider({ color = "#d4a8b8" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "28px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${color})` }} />
      <div style={{ fontSize: 18, opacity: 0.7 }}>❤️</div>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  );
}

function FadeBlock({ children, delay = 0, style: s = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity .7s ${delay}s ease, transform .7s ${delay}s ease`,
      ...s,
    }}>
      {children}
    </div>
  );
}

// Ambient twinkling sparkles — adds a refined "alive" backdrop
function Sparkles({ count = 16, color = "#fff" }) {
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 37 + 9) % 97}%`,
      top: `${(i * 53 + 13) % 92}%`,
      size: 4 + (i % 4) * 3,
      dur: 2.4 + (i % 5) * 0.6,
      delay: (i % 7) * 0.5,
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {items.current.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: p.left, top: p.top,
          width: p.size, height: p.size, borderRadius: "50%",
          background: color,
          boxShadow: `0 0 ${p.size * 1.6}px ${color}`,
          animation: `twinkle ${p.dur}s ${p.delay}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

// Slow-floating hearts that drift gently — depth layer for romantic sections
function FloatingHearts({ count = 8, opacity = 0.22 }) {
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 13 + 5) % 94}%`,
      size: 14 + (i % 4) * 7,
      dur: 5.5 + (i % 5),
      delay: i * 0.8,
      rot: (i % 2 ? 1 : -1) * (4 + (i % 5) * 3),
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {items.current.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: p.left, bottom: `${(p.id * 11) % 70}%`,
          fontSize: p.size, opacity,
          "--rot": `${p.rot}deg`,
          animation: `floatY ${p.dur}s ${p.delay}s ease-in-out infinite`,
        }}>{["💗", "💕", "🤍", "💖"][p.id % 4]}</div>
      ))}
    </div>
  );
}

// Global heart/sparkle trail that follows taps & clicks — makes the whole site feel alive
function HeartTrail() {
  const [bits, setBits] = useState([]);
  const seq = useRef(0);
  useEffect(() => {
    const spawn = (e) => {
      const x = e.clientX, y = e.clientY;
      if (x == null) return;
      const id = ++seq.current;
      const emoji = ["❤️", "💕", "✨", "💗", "🌸"][id % 5];
      const dx = (id % 2 ? 1 : -1) * (10 + (id % 4) * 8);
      setBits(b => [...b.slice(-14), { id, x, y, emoji, dx, spin: (id % 2 ? 1 : -1) * 24 }]);
      setTimeout(() => setBits(b => b.filter(p => p.id !== id)), 1100);
    };
    window.addEventListener("pointerdown", spawn);
    return () => window.removeEventListener("pointerdown", spawn);
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997, overflow: "hidden" }}>
      {bits.map(p => (
        <span key={p.id} style={{
          position: "fixed", left: p.x, top: p.y,
          fontSize: 18, transform: "translate(-50%,-50%)",
          "--dx": `${p.dx}px`, "--spin": `${p.spin}deg`,
          animation: "heartRise 1.05s ease-out forwards",
        }}>{p.emoji}</span>
      ))}
    </div>
  );
}

// Burst of falling hearts/confetti for emotional peaks
function ConfettiHearts({ count = 28 }) {
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 100) / count + ((i * 17) % 7)}%`,
      size: 12 + (i % 5) * 6,
      dur: 3.4 + (i % 6) * 0.5,
      delay: (i % 9) * 0.22,
      dx: ((i % 2 ? 1 : -1) * (10 + (i % 6) * 14)),
      cr: 360 + (i % 4) * 180,
      e: ["❤️", "💕", "💖", "🌸", "✨", "💗"][i % 6],
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 5 }}>
      {items.current.map(p => (
        <div key={p.id} style={{
          position: "absolute", top: 0, left: p.left, fontSize: p.size,
          "--dx": `${p.dx}px`, "--cr": `${p.cr}deg`,
          animation: `confettiFall ${p.dur}s ${p.delay}s ease-in both`,
        }}>{p.e}</div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// COUNTER
// ─────────────────────────────────────────────────────────

function Counter({ t }) {
  if (!t) return null;
  const boxes = [
    { v: t.years,  l: "ANOS"  },
    { v: t.months, l: "MESES" },
    { v: t.days,   l: "DIAS"  },
  ];
  const clock = [
    { v: String(t.hrs).padStart(2,"0"),  l: "HRS" },
    { v: String(t.mins).padStart(2,"0"), l: "MIN" },
    { v: String(t.secs).padStart(2,"0"), l: "SEG" },
  ];
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 17, color: "#a06070", marginBottom: 16, letterSpacing: 1 }}>
        juntos há...
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 14 }}>
        {boxes.map(({ v, l }) => (
          <div key={l} style={{
            background: "#fff",
            border: "1.5px solid #e8c4cc",
            padding: "12px 10px",
            minWidth: 72, textAlign: "center",
            boxShadow: "0 2px 12px #e8c4cc33",
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#8b3a52", lineHeight: 1 }}>{v}</div>
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 9, color: "#b07080", marginTop: 6, letterSpacing: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginBottom: 20 }}>
        {clock.map(({ v, l }, i) => (
          <>
            {i > 0 && <span key={`sep${i}`} style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#c9748a", marginBottom: 12, animation: "blink 1s infinite" }}>:</span>}
            <div key={l} style={{
              background: "#6b2038",
              padding: "6px 8px", minWidth: 48, textAlign: "center",
              boxShadow: "0 0 14px #6b203830",
            }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 15, color: "#fde68a", lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 7, color: "#f9a8d4", marginTop: 5, letterSpacing: 1 }}>{l}</div>
            </div>
          </>
        ))}
      </div>
      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: "#a06070" }}>
        {t.total.toLocaleString("pt-BR")} dias · {(t.total * 24 + t.hrs).toLocaleString("pt-BR")} horas de amor
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────

function HeroSection({ loveTime }) {
  return (
    <section style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fdf2f5 0%, #fce8ef 40%, #fdf5ec 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "60px 24px 40px",
      textAlign: "center",
    }}>
      <Petals />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480 }}>

        {/* Para: */}
        <div style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: 22, color: "#b07888",
          marginBottom: 6, letterSpacing: 1,
          animation: "fadeSlide .8s ease both",
        }}>
          Para:
        </div>

        {/* LORENA */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 64, color: "#7a2840",
          fontStyle: "italic", lineHeight: 1.1,
          letterSpacing: 2,
          textShadow: "0 2px 24px #c9748a22",
          marginBottom: 10,
          animation: "fadeSlide .9s .15s ease both",
        }}>
          Lorena
        </div>

        {/* 1 ANO DE NÓS */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 15, color: "#c9748a",
          letterSpacing: 6, textTransform: "uppercase",
          marginBottom: 6,
          animation: "fadeSlide .9s .3s ease both",
        }}>
          1 Ano de Nós
        </div>

        {/* Date */}
        <div style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: 17, color: "#b09088",
          marginBottom: 44,
          animation: "fadeSlide .9s .45s ease both",
        }}>
          27 de Junho de 2025 — 27 de Junho de 2026
        </div>

        {/* Counter */}
        <div style={{ animation: "fadeSlide 1s .6s ease both" }}>
          <Counter t={loveTime} />
        </div>

        {/* Scroll hint */}
        <div style={{
          marginTop: 50, color: "#c9748a88",
          fontFamily: "'Lato', sans-serif", fontSize: 16,
          animation: "bob 2.5s 1.2s infinite",
        }}>
          ↓ role para ler ↓
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// CARTA SECTION
// ─────────────────────────────────────────────────────────

function CartaSection() {
  const [sectionRef, sectionVisible] = useInView(0.1);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!sectionVisible) return;
    if (shown >= CARTA.length) return;
    const t = setTimeout(() => setShown(n => n + 1), 420);
    return () => clearTimeout(t);
  }, [sectionVisible, shown]);

  const typeStyle = {
    greeting:  { fontFamily: "'Lato', sans-serif", fontSize: 34, color: "#8b3a52", fontWeight: "700", marginBottom: 6 },
    highlight: { fontFamily: "'Lato', sans-serif", fontSize: 22, color: "#8b3a52", fontWeight: "700" },
    emphasis:  { fontFamily: "'Playfair Display', serif",  fontSize: 18, color: "#6b2038", fontStyle: "italic", margin: "10px 0 4px" },
    closing:   { fontFamily: "'Lato', sans-serif", fontSize: 24, color: "#8b3a52", fontWeight: "700", marginTop: 8 },
    normal:    { fontFamily: "'Lato', sans-serif", fontSize: 15, color: "#4a2030", lineHeight: 1.8 },
  };

  return (
    <section style={{
      background: "#fffbf8",
      padding: "70px 28px",
      position: "relative",
      borderTop: "1px solid #f0d8e0",
      borderBottom: "1px solid #f0d8e0",
    }}>
      {/* Decorative top corners */}
      <div style={{ position: "absolute", top: 24, left: 24, fontSize: 28, opacity: 0.18 }}>✦</div>
      <div style={{ position: "absolute", top: 24, right: 24, fontSize: 28, opacity: 0.18 }}>✦</div>

      <div ref={sectionRef} style={{ maxWidth: 480, margin: "0 auto" }}>

        <FadeBlock>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#c9748a", letterSpacing: 5, textTransform: "uppercase", marginBottom: 8 }}>
              Uma Carta Para Você
            </div>
            <div style={{ width: 60, height: 2, background: "linear-gradient(to right, transparent, #c9748a, transparent)", margin: "0 auto" }} />
          </div>
        </FadeBlock>

        {/* Envelope top decoration */}
        <FadeBlock delay={0.1}>
          <div style={{ textAlign: "center", fontSize: 36, marginBottom: 28, opacity: 0.6 }}>💌</div>
        </FadeBlock>

        {/* Carta lines — sequential reveal */}
        <div style={{
          background: "#fff",
          border: "1px solid #f0d8e0",
          padding: "32px 28px 28px",
          boxShadow: "0 4px 32px #e8c4cc18",
          position: "relative",
        }}>
          {/* Paper lines decoration */}
          {[120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560].map(top => (
            <div key={top} style={{
              position: "absolute", left: 28, right: 28,
              top, height: 1,
              background: "#f9e8ec",
              pointerEvents: "none",
            }} />
          ))}

          <div style={{ position: "relative", zIndex: 1 }}>
            {CARTA.map((line, i) => (
              <div key={i} style={{
                opacity: i < shown ? 1 : 0,
                transform: i < shown ? "translateY(0)" : "translateY(8px)",
                transition: "opacity .6s ease, transform .6s ease",
                marginBottom: line.type === "greeting" ? 20 : line.type === "emphasis" || line.type === "closing" ? 0 : 6,
                ...typeStyle[line.type],
              }}>
                {line.text}
              </div>
            ))}

            {/* Signature */}
            {shown >= CARTA.length && (
              <div style={{
                marginTop: 32, textAlign: "right",
                opacity: 1, transition: "opacity .8s .2s",
              }}>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 24, color: "#8b3a52" }}>
                  Com amor,
                </div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 30, color: "#6b2038", fontWeight: "700" }}>
                  Lyelson ❤️
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// TIMELINE SECTION
// ─────────────────────────────────────────────────────────

function TimelineItem({ item, idx }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-18px)",
      transition: `opacity .7s ${idx * 0.08}s ease, transform .7s ${idx * 0.08}s ease`,
      display: "flex", gap: 18, marginBottom: item.special ? 36 : 28,
    }}>
      {/* Left: icon + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 46, height: 46, borderRadius: "50%",
          background: item.special ? "#8b3a52" : "#fff",
          border: `2px solid ${item.special ? "#8b3a52" : "#e8c4cc"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
          boxShadow: item.special ? "0 0 20px #c9748a44" : "0 2px 8px #e8c4cc22",
          flexShrink: 0,
        }}>
          {item.icon}
        </div>
        {!item.last && (
          <div style={{ width: 2, flex: 1, minHeight: 24, background: "linear-gradient(to bottom, #e8c4cc, #f9e8ec)", marginTop: 4 }} />
        )}
      </div>

      {/* Right: content */}
      <div style={{
        flex: 1, paddingBottom: 20,
        background: item.special
          ? "linear-gradient(135deg, #fff5f7, #fffbf0, #fff5f7)"
          : "transparent",
        backgroundSize: item.special ? "300% 300%" : "auto",
        border: item.special ? "1px solid #e8c4cc" : "none",
        padding: item.special ? "16px 18px" : "2px 0 20px",
        boxShadow: item.special ? "0 4px 24px rgba(201,116,138,.22), 0 1px 6px rgba(0,0,0,.06)" : "none",
        animation: item.special ? "gradientShift 8s ease infinite" : "none",
      }}>
        <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, color: "#c9748a", marginBottom: 2, letterSpacing: 1 }}>
          {item.chapter}
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: item.special ? 18 : 16, color: "#6b2038", fontWeight: "600", marginBottom: 2 }}>
          {item.title}
        </div>
        <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, color: "#b07888", marginBottom: 8 }}>
          📍 {item.place}
        </div>
        <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: "#5a3040", lineHeight: 1.75 }}>
          {item.desc}
        </div>
      </div>
    </div>
  );
}

function TimelineSection() {
  return (
    <section style={{ background: "#fdf8f6", padding: "70px 24px", borderTop: "1px solid #f0d8e0" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <FadeBlock>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#c9748a", letterSpacing: 5, textTransform: "uppercase", marginBottom: 8 }}>
              Nossa Jornada
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#6b2038", fontStyle: "italic", marginBottom: 8 }}>
              Um ano em capítulos
            </div>
            <div style={{ width: 60, height: 2, background: "linear-gradient(to right, transparent, #c9748a, transparent)", margin: "0 auto" }} />
          </div>
        </FadeBlock>

        {TIMELINE.map((item, idx) => (
          <TimelineItem key={idx} item={item} idx={idx} />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// GALLERY SECTION
// ─────────────────────────────────────────────────────────

function FallingPolaroid({ startIdx, left, duration, delay, rotation, width, onPhotoClick }) {
  const [step, setStep] = useState(0);
  const photo = GALLERY[(startIdx + step) % GALLERY.length];

  return (
    <div
      style={{
        position: "absolute",
        left,
        top: 0,
        animation: `polaroidFall ${duration}s linear ${delay}s infinite`,
        willChange: "transform, opacity",
        cursor: "pointer",
      }}
      onAnimationIteration={() => setStep(s => s + 1)}
      onClick={(e) => { e.stopPropagation(); onPhotoClick(photo); }}
    >
      <div style={{
        background: "#fff",
        padding: "7px 7px 26px",
        boxShadow: "2px 8px 24px rgba(0,0,0,.26), 0 1px 4px rgba(0,0,0,.1)",
        transform: `rotate(${rotation}deg)`,
        width,
        borderRadius: 3,
        userSelect: "none",
        transition: "box-shadow .2s, transform .2s",
      }}>
        <img
          src={photo.src}
          alt=""
          loading="lazy"
          style={{ width: "100%", height: Math.round(width * 0.9), objectFit: "cover", display: "block" }}
          draggable={false}
        />
        <p style={{
          fontSize: 9, textAlign: "center", margin: "5px 0 0",
          color: "#7a4050", fontFamily: "'Lato', sans-serif",
          lineHeight: 1.3, padding: "0 2px",
          overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
        }}>{photo.caption}</p>
      </div>
    </div>
  );
}

function GallerySection() {
  const [lightbox, setLightbox] = useState(null);
  const [ref, visible] = useInView(0.05);

  const SLOTS = [
    { left:  "1%", duration:  9, delay:    0, rotation: -14, width: 115, startIdx:  0 },
    { left: "14%", duration:  7, delay:   -4, rotation:   8, width: 130, startIdx:  8 },
    { left: "27%", duration: 11, delay: -1.5, rotation:  -6, width: 105, startIdx: 16 },
    { left: "39%", duration:  8, delay:   -7, rotation:  17, width: 125, startIdx: 24 },
    { left: "52%", duration: 13, delay: -2.5, rotation: -11, width: 108, startIdx: 32 },
    { left: "63%", duration: 10, delay:   -5, rotation:   5, width: 135, startIdx: 40 },
    { left: "74%", duration:  7, delay:   -9, rotation: -19, width: 110, startIdx: 48 },
    { left: "84%", duration: 12, delay:   -3, rotation:  12, width: 118, startIdx: 56 },
    { left: "44%", duration:  9, delay:  -11, rotation:  -3, width: 140, startIdx: 64 },
  ];

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "92vh",
        overflow: "hidden",
        background: "linear-gradient(180deg, #fff5f7 0%, #fef0ea 50%, #fff5f7 100%)",
        backgroundSize: "100% 300%",
        animation: "gradientShift 12s ease infinite",
      }}
    >
      {/* Header */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        zIndex: 10, padding: "28px 0 0",
        textAlign: "center",
        pointerEvents: "none",
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 12, color: "#c9748a",
          letterSpacing: 5, textTransform: "uppercase", marginBottom: 6,
        }}>Nossas Fotos</div>
        <div style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: 30, color: "#6b2038",
        }}>cada momento nosso ✨</div>
        <div style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: 11, color: "#a07080", marginTop: 4,
        }}>toque em uma foto para ver</div>
      </div>

      {/* Falling polaroids */}
      {visible && SLOTS.map((slot, i) => (
        <FallingPolaroid key={i} {...slot} onPhotoClick={setLightbox} />
      ))}

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(10,2,8,.92)",
            backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, padding: 20,
          }}
        >
          <div style={{ maxWidth: 400, width: "100%", animation: "popIn .35s ease both" }}>
            <div style={{
              background: "#fff",
              padding: "12px 12px 36px",
              boxShadow: "0 20px 60px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.08)",
              borderRadius: 2,
            }}>
              <img src={lightbox.src} alt="" style={{ width: "100%", display: "block", borderRadius: 1 }} />
              <p style={{
                textAlign: "center", margin: "12px 6px 0",
                fontFamily: "'Playfair Display', serif", fontStyle: "italic",
                fontSize: 16, color: "#7a4050", lineHeight: 1.5,
              }}>{lightbox.caption}</p>
            </div>
            <p style={{
              color: "rgba(255,255,255,.38)",
              textAlign: "center", fontSize: 11, marginTop: 14,
              fontFamily: "'Lato', sans-serif", letterSpacing: 2,
            }}>toque fora para fechar</p>
          </div>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// FINAL SECTION
// ─────────────────────────────────────────────────────────

function FinalSection() {
  return (
    <section style={{
      background: "linear-gradient(150deg, #2a0a16, #6b2038, #8b3a52, #a0566a, #6b2038, #2a0a16)",
      backgroundSize: "400% 400%",
      animation: "gradientShift 20s ease infinite",
      padding: "90px 28px 100px",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>
      <Petals />
      <Sparkles count={28} color="#fde68a" />
      <FloatingHearts count={12} opacity={0.28} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto" }}>

        <FadeBlock>
          <div style={{ fontSize: 72, marginBottom: 24, animation: "glowPulse 2.2s ease-in-out infinite" }}>❤️</div>
        </FadeBlock>

        <FadeBlock delay={0.2}>
          <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: 16, color: "#f9d8e4", marginBottom: 8, letterSpacing: 3, textTransform: "uppercase" }}>
            Para sempre com você,
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 52, color: "#fde68a",
            fontStyle: "italic", lineHeight: 1.1,
            textShadow: "0 2px 20px rgba(0,0,0,.3)",
            marginBottom: 28,
          }}>
            Lorena
          </div>
        </FadeBlock>

        <FadeBlock delay={0.35}>
          <Divider color="#f9d8e444" />
        </FadeBlock>

        <FadeBlock delay={0.5}>
          <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: 16, color: "#fbe4ec", lineHeight: 2, marginBottom: 36, textAlign: "left" }}>
            <p style={{ marginBottom: 18 }}>
              Há um ano eu aceitei o seu pedido de namoro sem saber que estava
              dizendo sim pra melhor fase da minha vida.
            </p>
            <p style={{ marginBottom: 18 }}>
              Hoje a gente divide tudo — os planos, as bobeiras, os medos,
              as conquistas. A gente se cuida, se respeita e empurra um ao
              outro pra voar cada vez mais alto.
            </p>
            <p style={{ marginBottom: 18 }}>
              Você é minha namorada, minha melhor amiga e minha parceira em
              absolutamente tudo. E eu não canso de dizer o quanto você é foda,
              porque é a mais pura verdade.
            </p>
            <p style={{ marginBottom: 18 }}>
              Que venham muitos e muitos anos de muito amor. Eu te amo a cada
              batida do meu coração, e vou te amar a cada segundo da minha vida.
            </p>
            <p style={{
              fontFamily: "'Lato', sans-serif", fontSize: 24,
              color: "#fde68a", textAlign: "center", marginTop: 8,
            }}>
              Pra sempre seu. ❤️
            </p>
          </div>
        </FadeBlock>

        <FadeBlock delay={0.65}>
          <img
            src="/casal.png"
            alt="Lyelson e Lorena"
            style={{
              width: 160, imageRendering: "pixelated",
              filter: "drop-shadow(0 0 20px rgba(253,230,138,.4))",
              animation: "bob 2s infinite",
              marginBottom: 28,
            }}
          />
        </FadeBlock>

        <FadeBlock delay={0.8}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 13, color: "#f9d8e499",
            letterSpacing: 5, textTransform: "uppercase",
            marginBottom: 8,
          }}>
            27 · 06 · 2025 — 27 · 06 · 2026
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, color: "#fde68a" }}>
            Feliz 1 ano, meu amor 🎂
          </div>
        </FadeBlock>

        <FadeBlock delay={0.95}>
          <div style={{ marginTop: 32, fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, color: "#fde68a99", letterSpacing: 2 }}>
            — Lyelson
          </div>
        </FadeBlock>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// INTERACTIVE DECLARATION (página por página)
// ─────────────────────────────────────────────────────────

const STEPS = [
  { type: "say", emoji: "🌸", lines: ["Oi, amor.", "Senta aí, respira fundo...", "eu pensei em cada palavra disso", "só pra você."], btn: "começar 💌" },

  { type: "ask", q: "Você sabe que dia especial é hoje?", answers: [
      { label: "Nosso 1 aninho 🥹", reply: "Isso. Hoje faz exatamente 1 ano que a minha vida inteira ganhou cor." },
      { label: "Me lembra? 🙈",     reply: "1 ano da gente, Doidiça. O melhor ano que eu já vivi até hoje." },
  ]},

  { type: "say", emoji: "🧪", lines: ["Tudo começou simples.", "Você só queria uma dupla.", "Eu não fazia ideia de que ia", "ganhar uma vida inteira."], btn: "continuar" },

  { type: "say", emoji: "💍", lines: ["Há 1 ano, eu aceitei", "o seu pedido de namoro.", "E foi o 'sim' mais fácil", "que eu já dei na vida."], btn: "continuar" },

  { type: "say", emoji: "🏡", lines: ["Hoje a gente não só namora.", "A gente divide a vida.", "Com cumplicidade, com amor,", "com uma leveza que eu nunca tinha sentido."], btn: "continuar" },

  { type: "ask", q: "Você é feliz comigo?", answers: [
      { label: "Muito ❤️",  reply: "Eu também. Mais do que eu sei colocar em palavras." },
      { label: "Demais 🥹", reply: "Eu também. Mais do que eu sei colocar em palavras." },
  ]},

  { type: "say", emoji: "🤍", lines: ["Eu amo o tanto que a gente se cuida.", "O tanto que a gente se respeita.", "O jeito perfeito", "que um cabe no outro."], btn: "continuar" },

  { type: "say", emoji: "🕊️", lines: ["Eu amo como a gente se impulsiona.", "Como você me faz querer", "voar mais alto.", "E voa junto comigo, sempre."], btn: "continuar" },

  { type: "say", emoji: "😏", lines: ["E a gente vive falando", "o quanto cada um é foda.", "(porque é verdade, né?", "olha pra você. 😏)"], btn: "continuar" },

  { type: "say", emoji: "🫂", lines: ["Você é minha namorada,", "mas antes disso é minha amiga.", "Minha parceira em absolutamente", "tudo que a gente enfrenta."], btn: "continuar" },

  { type: "ask", q: "E aquela minha mania de te morder? 😂", answers: [
      { label: "Kkkk deixa ele 😂", reply: "Eu sei que tu deixa. É assim que eu sei que você me ama kkk 🥹" },
      { label: "Eu deixo 🥰",       reply: "Tem que deixar mesmo. É amor, Doidiça. kkk" },
  ]},

  { type: "say", emoji: "👁️", lines: ["Eu me perco nesses", "seus olhos verdes.", "Todo santo dia.", "E não quero me achar nunca."], btn: "continuar" },

  { type: "ask", q: "Topa passar muitos e muitos anos assim, do meu lado?", answers: [
      { label: "Topo ❤️",      reply: "Então tá selado. 🤝✨" },
      { label: "Pra sempre 🥹", reply: "Pra sempre ainda é pouco perto do que eu quero contigo." },
  ]},

  { type: "say", emoji: "🌹", lines: ["Que venham muitos anos.", "De muito amor, briga boba,", "risada sem motivo e gente perguntando", "qual é o nosso segredo."], btn: "continuar" },

  { type: "say", emoji: "✨", lines: ["E o segredo é simples:", "é você.", "Sempre foi você."], btn: "continuar" },

  { type: "say", emoji: "💗", lines: ["Eu te amo", "a cada batida", "do meu coração."], btn: "continuar" },

  { type: "say", emoji: "♾️", lines: ["E vou te amar", "a cada segundo", "da minha vida."], btn: "continuar", showCounter: true },

  { type: "say", emoji: "🥹", lines: ["Olha quanto tempo", "já é nosso.", "E isso aqui", "é só o começo."], btn: "continuar" },

  { type: "final", emoji: "🎂", lines: ["Feliz 1 ano, Lorena.", "Minha Doidiça, meu amor,", "minha vida inteira."], btn: "ver nossas fotos 📸" },
];

const LETTER_PARAGRAPHS = [
  { type: "greeting",  text: "Amor," },
  { type: "body",      text: "Há um ano, você me fez o pedido de namoro. Eu disse “vamos tentar” e foi a melhor decisão que eu já tomei na vida." },
  { type: "body",      text: "Hoje a gente divide tudo. Os planos, as bobeiras, os medos, as conquistas. A gente se cuida, se respeita, e se impulsiona um ao outro a voar cada vez mais alto." },
  { type: "body",      text: "Você é minha namorada, minha melhor amiga e minha parceira em absolutamente tudo. Eu não canso de te dizer o quanto você é incrível — porque é a mais pura verdade." },
  { type: "body",      text: "Essa leveza que a gente tem, esse jeito de ser amigos antes de tudo, é o maior presente que eu já recebeu na vida." },
  { type: "emphasis",  text: "Que venham muitos e muitos anos de muito amor, Doidiça." },
  { type: "body",      text: "Eu te amo a cada batida do meu coração, e vou te amar a cada segundo da minha vida." },
  { type: "signature", text: "Com amor eterno,\nLyelson ❤️" },
];

// ─────────────────────────────────────────────────────────
// MONTHS JOURNEY DATA
// ─────────────────────────────────────────────────────────

const MONTHS = [
  {
    n: 1, label: "Julho", year: "2025",
    emoji: "🌱",
    title: "O primeiro mês",
    text: "A gente ainda tava descobrindo o que era aquilo. Cada mensagem parecia um presente. Cada encontro, um coração acelerado. O início de algo que a gente não sabia ainda como ia ser gigante.",
    photo: GALLERY[0],
    from: "#fff5f0", to: "#ffe8d6", accent: "#c9748a", numColor: "#c9748a",
  },
  {
    n: 2, label: "Agosto", year: "2025",
    emoji: "☀️",
    title: "O mês que começou a virar rotina",
    text: "Rotina boa. Do tipo que você sente falta quando falta. A gente foi construindo um jeitinho de ser — de falar, de rir, de existir junto. Dois meses e já parecia que não dava mais pra imaginar sem.",
    photo: GALLERY[7],
    from: "#fffbec", to: "#fff3c4", accent: "#c9a020", numColor: "#c9a020",
  },
  {
    n: 3, label: "Setembro", year: "2025",
    emoji: "🍂",
    title: "O mês da cumplicidade",
    text: "Três meses e a gente já tinha os nossos cantinhos, as nossas piadas, os nossos segredos. Você deixou de ser a pessoa que eu gosto e virou a pessoa que me entende de um jeito que ninguém mais entende.",
    photo: GALLERY[13],
    from: "#fff8ec", to: "#ffe8c0", accent: "#b07030", numColor: "#b07030",
  },
  {
    n: 4, label: "Outubro", year: "2025",
    emoji: "🌙",
    title: "O mês dos planos",
    text: "Quatro meses e a gente começou a falar de futuro sem medo. Não de um futuro distante e abstrato — de um futuro que inclui você do meu lado, simples assim. Esse mês foi o mês que eu soube que era sério.",
    photo: GALLERY[19],
    from: "#f5f0ff", to: "#e8d8ff", accent: "#7a40b8", numColor: "#7a40b8",
  },
  {
    n: 5, label: "Novembro", year: "2025",
    emoji: "💜",
    title: "O mês da leveza",
    text: "Cinco meses e a gente descobriu que amor também é leveza. É rir sem motivo, é ficar em silêncio sem precisar preencher nada, é estar junto sem cobrar, sem precisar provar. Só estar — e ser suficiente.",
    photo: GALLERY[24],
    from: "#f8f0ff", to: "#e8d0f5", accent: "#9b50c0", numColor: "#9b50c0",
  },
  {
    n: 6, label: "Dezembro", year: "2025",
    emoji: "🎄",
    title: "O primeiro Natal juntos",
    text: "Seis meses e chegou o Natal. O primeiro de muitos com você. Descobri que quero cada final de ano do meu lado do seu. Com aquele sorriso, com aquela energia. Você deixa qualquer data especial ficar mais especial.",
    photo: GALLERY[30],
    from: "#f0fff4", to: "#c8f5da", accent: "#2a8a50", numColor: "#2a8a50",
  },
  {
    n: 7, label: "Janeiro", year: "2026",
    emoji: "🎆",
    title: "Ano novo, nós dois",
    text: "Sete meses e a gente virou o ano juntos. Que começo de 2026. A contagem regressiva com você do lado foi um dos momentos que eu mais vou guardar. Pedi ao tempo que nos desse muitos e muitos anos assim.",
    photo: GALLERY[36],
    from: "#ecf8ff", to: "#c8e8ff", accent: "#1a78c2", numColor: "#1a78c2",
  },
  {
    n: 8, label: "Fevereiro", year: "2026",
    emoji: "💌",
    title: "O mês do amor (ainda mais)",
    text: "Oito meses e fevereiro chegou só confirmando o que a gente já sabia. Não precisa de data pra eu te amar — mas se tem uma, fica ainda mais bonito. Esse mês foi suave, quentinho e muito nosso.",
    photo: GALLERY[42],
    from: "#fff0f5", to: "#ffd8e8", accent: "#c9748a", numColor: "#c9748a",
  },
  {
    n: 9, label: "Março", year: "2026",
    emoji: "🌿",
    title: "O mês que a gente cresceu",
    text: "Nove meses. A gente passou por muita coisa e saiu mais forte de cada uma. Aprendi que crescer junto não é fácil, mas é o mais bonito que existe. Você me faz querer ser melhor — todo mês, todo dia.",
    photo: GALLERY[48],
    from: "#f0fff8", to: "#c8f0dc", accent: "#1a9060", numColor: "#1a9060",
  },
  {
    n: 10, label: "Abril", year: "2026",
    emoji: "🌸",
    title: "Dez meses de tudo",
    text: "Dez meses de risos, de conversas até tarde, de planos, de bagunça, de cuidado. Dez meses que me ensinaram o que é ter alguém de verdade do meu lado. Você virou parte de mim de um jeito que não tem volta.",
    photo: GALLERY[54],
    from: "#fff5fb", to: "#ffd8f0", accent: "#c040a0", numColor: "#c040a0",
  },
  {
    n: 11, label: "Maio", year: "2026",
    emoji: "🔥",
    title: "Onze meses e contando",
    text: "Onze meses. A gente tá quase lá. E ao invés de diminuir, só aumentou — o amor, a cumplicidade, a vontade de estar junto. Você é a melhor parte de todos os meses que passaram e de todos que vão vir.",
    photo: GALLERY[60],
    from: "#fff8ec", to: "#ffe0b0", accent: "#d06000", numColor: "#d06000",
  },
  {
    n: 12, label: "Junho", year: "2026",
    emoji: "🎂",
    title: "UM ANO, LORENA!",
    text: "12 meses. 365 dias. Uma vida que começou a fazer mais sentido. Obrigado por cada momento, cada risada, cada abraço, cada olhar. Feliz 1 ano, Doidiça. Você é o amor da minha vida.",
    photo: GALLERY[71],
    from: "#2a0a16", to: "#6b2038", accent: "#fde68a", numColor: "#fde68a",
    special: true,
  },
];

// ─────────────────────────────────────────────────────────
// MONTHS JOURNEY COMPONENT
// ─────────────────────────────────────────────────────────

function MonthsJourney({ onDone }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState("right");
  const m = MONTHS[idx];
  const isLast = idx === MONTHS.length - 1;

  const next = () => {
    setDir("right");
    if (isLast) { onDone(); return; }
    setIdx(i => i + 1);
  };

  return (
    <section style={{
      minHeight: "100vh",
      background: m.special
        ? "linear-gradient(150deg, #2a0a16, #6b2038, #8b3a52)"
        : `linear-gradient(150deg, ${m.from} 0%, ${m.to} 100%)`,
      backgroundSize: "300% 300%",
      animation: "gradientShift 18s ease infinite",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "50px 24px 44px",
      transition: "background 0.8s ease",
    }}>
      {m.special && <><Sparkles count={22} color="#fde68a" /><FloatingHearts count={10} opacity={0.3} /></>}
      {!m.special && <Petals />}
      {m.special && <ConfettiHearts count={36} />}

      {/* Progress strip */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 4,
        background: `linear-gradient(to right, ${m.accent} ${((idx + 1) / 12) * 100}%, rgba(0,0,0,.12) 0%)`,
        transition: "all .6s ease",
      }} />

      {/* Month counter pill */}
      <div style={{
        position: "absolute", top: 18, left: 0, right: 0,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 22px", zIndex: 2,
      }}>
        <div style={{
          fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: 3,
          color: m.special ? "#fde68a88" : `${m.accent}99`,
          textTransform: "uppercase",
        }}>
          nossa jornada
        </div>
        <div style={{
          fontFamily: "'Lato', sans-serif", fontSize: 12, letterSpacing: 2,
          color: m.special ? "#fde68aaa" : `${m.accent}bb`,
          background: m.special ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.55)",
          padding: "4px 12px", borderRadius: 20,
          border: `1px solid ${m.special ? "rgba(253,230,138,.2)" : `${m.accent}33`}`,
        }}>
          {idx + 1} / 12
        </div>
      </div>

      {/* Content card */}
      <div
        key={idx}
        style={{
          position: "relative", zIndex: 1, width: "100%", maxWidth: 460,
          animation: "slideInRight .42s cubic-bezier(.22,1,.36,1) both",
          textAlign: "center",
        }}
      >
        {/* Big month number */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: m.special ? 110 : 96,
          fontWeight: 700,
          lineHeight: 1,
          color: m.special ? "#fde68a" : m.numColor,
          animation: "countUp .5s .05s ease both, numberGlow 3s 1s ease-in-out infinite",
          marginBottom: 2,
          opacity: 0.92,
        }}>
          {m.n}
        </div>

        {/* Month name + year */}
        <div style={{
          fontFamily: "'Lato', sans-serif", fontWeight: 300,
          fontSize: 15, letterSpacing: 5, textTransform: "uppercase",
          color: m.special ? "#f9d8e4cc" : `${m.accent}cc`,
          marginBottom: 4, animation: "fadeSlide .5s .12s ease both",
        }}>
          {m.label} · {m.year}
        </div>

        {/* Emoji */}
        <div style={{
          fontSize: 40, marginBottom: 18,
          animation: m.special ? "glowPulse 2s ease-in-out infinite" : "bob 2.2s ease-in-out infinite",
        }}>
          {m.emoji}
        </div>

        {/* Photo */}
        <div style={{
          width: 200, height: 200, margin: "0 auto 22px",
          borderRadius: "50%",
          overflow: "hidden",
          border: `4px solid ${m.special ? "rgba(253,230,138,.5)" : `${m.accent}55`}`,
          boxShadow: `0 8px 32px ${m.special ? "rgba(253,230,138,.25)" : `${m.accent}33`}, 0 2px 8px rgba(0,0,0,.12)`,
          animation: "popIn .55s .08s ease both",
          flexShrink: 0,
        }}>
          <img
            src={m.photo.src} alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Title */}
        <div style={{
          fontFamily: "'Playfair Display', serif", fontStyle: "italic",
          fontSize: m.special ? 26 : 22,
          color: m.special ? "#fde68a" : m.accent,
          marginBottom: 14, fontWeight: m.special ? 600 : 400,
          animation: "fadeSlide .5s .18s ease both",
        }}>
          {m.title}
        </div>

        {/* Body text */}
        <p style={{
          fontFamily: "'Lato', sans-serif", fontWeight: 300,
          fontSize: 15, lineHeight: 1.85,
          color: m.special ? "#fbe4ec" : "#3a1a28",
          marginBottom: 32,
          animation: "fadeSlide .5s .26s ease both",
          maxWidth: 380, margin: "0 auto 32px",
        }}>
          {m.text}
        </p>

        {/* Button */}
        <div style={{ animation: "fadeSlide .5s .36s ease both" }}>
          <BtnRomantic onClick={next} gold={m.special}>
            {isLast ? "ver nossas fotos 📸" : `mês ${m.n + 1} →`}
          </BtnRomantic>
        </div>
      </div>
    </section>
  );
}

function BtnRomantic({ children, onClick, block, gold }) {
  const reset = (e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = gold
      ? "0 6px 20px rgba(246,196,83,.4)"
      : "0 6px 20px rgba(139,58,82,.32)";
  };
  return (
    <button
      onClick={onClick}
      style={{
        position: "relative", overflow: "hidden",
        fontFamily: "'Playfair Display', serif", fontSize: 16, letterSpacing: 1,
        color: gold ? "#6b2038" : "#fff",
        background: gold
          ? "linear-gradient(135deg,#fef0b5,#fde68a,#f6c453)"
          : "linear-gradient(135deg,#d98aa0,#c9748a,#8b3a52)",
        border: "none", borderRadius: 40,
        padding: "14px 32px", cursor: "pointer",
        width: block ? "100%" : "auto", maxWidth: 320,
        boxShadow: gold ? "0 6px 20px rgba(246,196,83,.4)" : "0 6px 20px rgba(139,58,82,.32)",
        transition: "transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .25s",
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
        e.currentTarget.style.boxShadow = gold
          ? "0 10px 28px rgba(246,196,83,.5)"
          : "0 10px 28px rgba(139,58,82,.45)";
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(0) scale(.96)")}
      onMouseUp={reset}
      onMouseLeave={reset}
    >
      {/* shimmer sweep */}
      <span style={{
        position: "absolute", top: 0, left: 0, width: "45%", height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent)",
        animation: "shimmerSweep 3.2s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </button>
  );
}

const PHOTO_SLOTS = [
  { left:  "2%", dur: 13, delay:  0,   size: 54, idx:  3 },
  { left: "16%", dur:  9, delay: -3.5, size: 44, idx: 11 },
  { left: "32%", dur: 15, delay: -7,   size: 60, idx: 19 },
  { left: "56%", dur: 11, delay: -1.5, size: 48, idx: 27 },
  { left: "72%", dur: 14, delay: -9,   size: 52, idx: 35 },
  { left: "87%", dur:  9, delay: -5,   size: 46, idx: 43 },
];

function FallingPhotos() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {PHOTO_SLOTS.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: s.left, top: 0,
          animation: `polaroidFall ${s.dur}s linear ${s.delay}s infinite`,
          opacity: 0.28,
        }}>
          <img
            src={GALLERY[s.idx % GALLERY.length].src}
            alt=""
            style={{
              width: s.size, height: s.size,
              objectFit: "cover", borderRadius: "50%",
              border: "2.5px solid rgba(255,255,255,0.7)",
              display: "block",
              boxShadow: "0 2px 10px rgba(107,32,56,.2)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// React.memo prevents re-render every second when loveTime updates,
// which would cause the browser to restart CSS animations on the spans.
const WordReveal = memo(function WordReveal({ text, baseDelay = 0 }) {
  const words = text.split(" ");
  return (
    <span>
      {words.map((w, k) => (
        <span key={k} style={{
          display: "inline-block",
          animation: `wordIn .45s ${(baseDelay + k * 0.07).toFixed(2)}s ease both`,
          marginRight: "0.28em",
        }}>
          {w}
        </span>
      ))}
    </span>
  );
});

const BG_PAIRS = [
  ["#fdf2f5","#fce8ef"],["#f5ecff","#ffe8f5"],["#e8f5ff","#f0f8ff"],
  ["#fff5ec","#ffeee8"],["#f0fff4","#f5fef5"],
];

function InteractiveDeclaration({ loveTime, onDone }) {
  const [i, setI] = useState(0);
  const [reply, setReply] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const step = STEPS[i];

  const advance = () => {
    setReply(null);
    setShowConfetti(false);
    if (i >= STEPS.length - 1) { onDone(); return; }
    setI(i + 1);
  };
  const pick = (a) => {
    if (a.reply) { setReply(a.reply); setShowConfetti(true); }
    else advance();
  };

  const [bg1, bg2] = BG_PAIRS[i % BG_PAIRS.length];

  return (
    <section style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${bg1} 0%, ${bg2} 60%, #fdf5ec 100%)`,
      backgroundSize: "200% 200%",
      animation: "gradientShift 18s ease infinite",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "60px 24px 40px",
      transition: "background .8s ease",
    }}>
      <Petals />
      <FallingPhotos />
      <FloatingHearts count={6} opacity={0.18} />

      {showConfetti && <ConfettiHearts count={32} />}

      {/* progress dots */}
      <div style={{
        position: "absolute", top: 22, left: 0, right: 0,
        display: "flex", justifyContent: "center", gap: 5,
        padding: "0 24px", flexWrap: "wrap", zIndex: 2,
      }}>
        {STEPS.map((_, k) => (
          <div key={k} style={{
            width: k === i ? 22 : 6, height: 6, borderRadius: 3,
            background: k < i ? "#8b3a52" : k === i ? "#c9748a" : "#e8c4cc",
            transition: "all .35s cubic-bezier(.34,1.56,.64,1)",
            boxShadow: k === i ? "0 0 8px #c9748a88" : "none",
          }} />
        ))}
      </div>

      <div key={`${i}-${reply ? "r" : "q"}`} style={{
        position: "relative", zIndex: 1, maxWidth: 440, width: "100%",
        textAlign: "center", animation: "fadeSlide .45s ease",
      }}>
        {reply ? (
          <>
            <div style={{ fontSize: 52, marginBottom: 22, animation: "glowPulse 2s infinite" }}>💕</div>
            <p style={{
              fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              fontSize: 24, color: "#6b2038", lineHeight: 1.65, marginBottom: 36,
            }}>
              <WordReveal text={reply} baseDelay={0.1} size={24} />
            </p>
            <BtnRomantic onClick={advance}>continuar</BtnRomantic>
          </>
        ) : step.type === "ask" ? (
          <>
            <div style={{ fontSize: 46, marginBottom: 20, animation: "bob 2s infinite" }}>💬</div>
            <p style={{
              fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              fontSize: 24, color: "#6b2038", lineHeight: 1.6, marginBottom: 34,
            }}>
              <WordReveal text={step.q} baseDelay={0.05} />
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
              {step.answers.map((a, k) => (
                <BtnRomantic key={k} onClick={() => pick(a)} block>{a.label}</BtnRomantic>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{
              fontSize: step.type === "final" ? 64 : 52,
              marginBottom: 20,
              animation: step.type === "final" ? "glowPulse 2.2s ease-in-out infinite" : "bob 2s ease-in-out infinite",
            }}>
              {step.emoji}
            </div>

            {step.type === "final" && <ConfettiHearts count={24} />}

            <div style={{
              fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              fontSize: step.type === "final" ? 30 : 26,
              fontWeight: step.type === "final" ? 600 : 400,
              color: "#6b2038", lineHeight: 1.72, marginBottom: 32,
            }}>
              {step.lines.map((l, k) => (
                <div key={k} style={{ marginBottom: 2 }}>
                  <WordReveal text={l} baseDelay={k * 0.22} />
                </div>
              ))}
            </div>

            {step.showCounter && <div style={{ marginBottom: 32 }}><Counter t={loveTime} /></div>}
            <BtnRomantic onClick={advance} gold={step.type === "final"}>{step.btn}</BtnRomantic>
          </>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// MUSIC PLAYER
// ─────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────
// 1. ENVELOPE SECTION
// ─────────────────────────────────────────────────────────

function EnvelopeVisual({ phase, onClick }) {
  const W = 300, H = 190;
  const W2 = W / 2;
  const FH = 108; // flap triangle height
  const BOTTOM_Y = Math.round(H * 0.5); // bottom fold apex from top of body

  const isOpen = phase !== "sealed";

  return (
    <div
      onClick={phase === "sealed" ? onClick : undefined}
      style={{
        position: "relative",
        width: W, height: H + 80,
        cursor: phase === "sealed" ? "pointer" : "default",
        perspective: 1100,
        perspectiveOrigin: "50% 8%",
        animation: phase === "sealed" ? "bob 2.5s ease-in-out infinite" : "none",
        userSelect: "none",
      }}
    >
      {/* ── Letter peek ── */}
      {isOpen && (
        <div style={{
          position: "absolute",
          left: W * 0.1, width: W * 0.8,
          top: 6, height: 82,
          background: "linear-gradient(180deg, #fffef7 0%, #fff8ef 100%)",
          border: "1px solid #e8d5c8",
          borderBottom: "none",
          boxShadow: "0 -8px 22px rgba(0,0,0,.1)",
          zIndex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 4,
          animation: "letterRise .75s cubic-bezier(.22,1,.36,1) both",
        }}>
          {/* Letterhead decoration */}
          <div style={{ fontSize: 8, letterSpacing: 4, color: "#c9748a88", fontFamily: "'Lato', sans-serif", textTransform: "uppercase" }}>
            — com amor —
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 15, color: "#8b5a50" }}>
            Amor,
          </div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>🌹</div>
        </div>
      )}

      {/* ── Envelope body ── */}
      <div style={{
        position: "absolute",
        top: 80, left: 0,
        width: W, height: H,
        background: "#fef5f8",
        border: "1.5px solid #d4a0b0",
        boxShadow: "0 16px 50px rgba(139,58,82,.22), 0 2px 10px rgba(0,0,0,.08)",
        zIndex: 2,
        overflow: "hidden",
      }}>
        {/* Left fold triangle */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #f2d8e6 60%, transparent 100%)",
          clipPath: `polygon(0 0, ${W2}px ${H/2}px, 0 ${H}px)`,
        }} />
        {/* Right fold triangle */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(225deg, #e8d0e4 60%, transparent 100%)",
          clipPath: `polygon(${W}px 0, ${W2}px ${H/2}px, ${W}px ${H}px)`,
        }} />
        {/* Bottom fold triangle */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(0deg, #f0d5e5 50%, transparent 100%)",
          clipPath: `polygon(0 ${H}px, ${W2}px ${BOTTOM_Y}px, ${W}px ${H}px)`,
        }} />

        {/* Content: Para Lorena + stamp */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 4,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          opacity: isOpen ? 0 : 1,
          transition: "opacity .3s .15s",
        }}>
          {/* Decorative corner stamp */}
          <div style={{
            position: "absolute", top: 10, right: 12,
            width: 36, height: 36,
            border: "1.5px solid #d4a0b088",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>❤️</div>

          <div style={{
            fontFamily: "'Lato', sans-serif", fontSize: 9,
            letterSpacing: 5, color: "#b07080",
            textTransform: "uppercase", marginBottom: 6,
          }}>
            Para
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic", fontSize: 34,
            color: "#8b3a52",
            textShadow: "0 1px 8px rgba(139,58,82,.15)",
          }}>
            Lorena
          </div>
          <div style={{
            fontFamily: "'Lato', sans-serif", fontSize: 9,
            letterSpacing: 4, color: "#c9748a88",
            textTransform: "uppercase", marginTop: 8,
          }}>
            27 · 06 · 2026
          </div>
        </div>
      </div>

      {/* ── Top flap (SVG) — rotates open ── */}
      <svg
        viewBox={`0 0 ${W} ${FH}`}
        width={W} height={FH}
        style={{
          position: "absolute",
          top: 80, left: 0,
          transformOrigin: "50% 0%",
          transform: isOpen ? "rotateX(-175deg)" : "rotateX(0deg)",
          transition: "transform .68s cubic-bezier(.4,0,.2,1)",
          zIndex: isOpen ? 1 : 6,
          display: "block",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <defs>
          <linearGradient id="flapGrad" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fce8f0" />
            <stop offset="100%" stopColor="#f4c8da" />
          </linearGradient>
          <filter id="flapDrop">
            <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#c9748a" floodOpacity="0.18" />
          </filter>
        </defs>
        {/* Flap triangle */}
        <polygon
          points={`1,1 ${W-1},1 ${W2},${FH-1}`}
          fill="url(#flapGrad)"
          stroke="#d4a0b0"
          strokeWidth="1.5"
          strokeLinejoin="round"
          filter="url(#flapDrop)"
        />
        {/* Wax seal / heart */}
        <circle cx={W2} cy={FH * 0.42} r="18" fill="#c9748a" opacity="0.92" />
        <circle cx={W2} cy={FH * 0.42} r="18" fill="none" stroke="#a05070" strokeWidth="1.5" opacity="0.6" />
        <text x={W2} y={FH * 0.42} textAnchor="middle" fontSize="16" dy=".38em">❤️</text>
      </svg>
    </div>
  );
}

function LetterSheet({ onNext }) {
  const [shown, setShown] = useState(1);
  const done = shown >= LETTER_PARAGRAPHS.length;
  return (
    <div style={{
      maxWidth: 460, width: "100%", margin: "0 auto",
      background: "#fffef9",
      border: "1px solid #e8d5c0",
      boxShadow: "0 16px 60px rgba(139,58,82,.18)",
      padding: "36px 28px 32px",
      position: "relative",
      animation: "letterExpand .6s ease-out",
      backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #f0e4ea 31px, #f0e4ea 32px)",
      backgroundPositionY: "52px",
    }}>
      {/* Corner fold */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 0, height: 0, borderLeft: "22px solid transparent", borderBottom: "22px solid #f9f0f5", borderTop: "22px solid #fde4ed" }} />
      <div style={{ textAlign: "right", fontFamily: "'Lato', sans-serif", fontSize: 11, color: "#c9748a88", letterSpacing: 2, marginBottom: 24 }}>27 · 06 · 2026</div>
      <div style={{ minHeight: 260 }}>
        {LETTER_PARAGRAPHS.slice(0, shown).map((p, i) => (
          <div key={i} style={{ animation: i === shown - 1 ? "fadeSlide .5s ease" : "none", marginBottom: 16 }}>
            {p.type === "greeting"  && <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, color: "#6b2038", marginBottom: 20 }}>{p.text}</p>}
            {p.type === "body"      && <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: 15, color: "#3a1a28", lineHeight: 1.9 }}>{p.text}</p>}
            {p.type === "emphasis"  && <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 17, color: "#8b3a52", lineHeight: 1.6, margin: "20px 0", borderLeft: "3px solid #c9748a", paddingLeft: 14 }}>{p.text}</p>}
            {p.type === "signature" && <div style={{ marginTop: 24, textAlign: "right" }}><p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "#6b2038", lineHeight: 1.8, whiteSpace: "pre-line" }}>{p.text}</p></div>}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        {!done
          ? <BtnRomantic onClick={() => setShown(s => s + 1)}>continuar a ler ↓</BtnRomantic>
          : <BtnRomantic onClick={onNext} gold>continuar ↓</BtnRomantic>
        }
      </div>
    </div>
  );
}

function EnvelopeSection({ onNext }) {
  const [phase, setPhase] = useState("sealed");
  const open = () => {
    if (phase !== "sealed") return;
    setPhase("opening");
    setTimeout(() => setPhase("peek"), 700);
    setTimeout(() => setPhase("open"), 1500);
  };
  return (
    <section style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fdf2f5 0%, #fce8ef 45%, #fdf5ec 100%)",
      backgroundSize: "200% 200%",
      animation: "gradientShift 22s ease infinite",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "40px 24px",
    }}>
      <Petals />
      <FallingPhotos />
      <FloatingHearts count={7} opacity={0.15} />
      {phase !== "open" ? (
        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, color: "#c9748a", letterSpacing: 5, textTransform: "uppercase", marginBottom: 32, animation: "fadeIn 1.2s ease" }}>
            uma carta para você
          </p>
          <EnvelopeVisual phase={phase} onClick={open} />
          {phase === "sealed" && (
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 13, color: "#c9748a88", marginTop: 24, animation: "blink 2.5s infinite" }}>
              toque para abrir ✉️
            </p>
          )}
        </div>
      ) : (
        <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <LetterSheet onNext={onNext} />
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 2. HEART MOSAIC SECTION
// ─────────────────────────────────────────────────────────

function HeartMosaicSection() {
  const [ref, visible] = useInView(0.05);
  const wrapRef = useRef(null);
  const COLS = 13, ROWS = 12, SIZE = 36;
  const HEART_W = COLS * SIZE;
  const HEART_H = ROWS * SIZE;

  const [scale, setScale] = useState(() =>
    typeof window !== "undefined"
      ? Math.min(1, (Math.min(window.innerWidth, 520) - 48) / (13 * 36))
      : 1
  );

  useEffect(() => {
    const update = () => {
      if (!wrapRef.current) return;
      setScale(Math.min(1, wrapRef.current.offsetWidth / HEART_W));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [HEART_W]);

  const cells = (() => {
    const result = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = ((c / (COLS - 1)) - 0.5) * 2.4;
        const y = (0.52 - (r / (ROWS - 1))) * 2.2;
        if (Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y <= 0.04) {
          result.push({ r, c, idx: result.length % GALLERY.length });
        }
      }
    }
    return result;
  })();

  return (
    <section ref={ref} style={{
      padding: "80px 24px 60px",
      background: "linear-gradient(180deg, #fff5f7, #fef0f0)",
      textAlign: "center", overflow: "hidden",
    }}>
      <FadeBlock>
        <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, color: "#c9748a", letterSpacing: 5, textTransform: "uppercase", marginBottom: 8 }}>
          Nossas memórias
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 28, color: "#6b2038", marginBottom: 36 }}>
          infinitos momentos, um coração
        </div>
      </FadeBlock>

      <div ref={wrapRef} style={{ width: "100%", textAlign: "center" }}>
        <div style={{ display: "inline-block", animation: "heartbeat 2.2s ease-in-out infinite" }}>
          <div style={{ position: "relative", width: HEART_W, height: HEART_H, zoom: scale }}>
            {cells.map(({ r, c, idx }, i) => (
              <div key={i} style={{
                position: "absolute", left: c * SIZE, top: r * SIZE,
                width: SIZE - 1, height: SIZE - 1, overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.3)",
                transition: `opacity .45s ${(i * 0.012).toFixed(2)}s ease, transform .45s ${(i * 0.012).toFixed(2)}s ease`,
              }}>
                <img src={GALLERY[idx].src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <FadeBlock delay={0.6}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "#c9748a", marginTop: 28 }}>
          cada foto, uma memória nossa ❤️
        </div>
      </FadeBlock>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 3. FILM STRIP SECTION
// ─────────────────────────────────────────────────────────

function FilmStripSection() {
  const [ref, visible] = useInView(0.1);
  const frames = [...GALLERY, ...GALLERY]; // duplicate for seamless loop
  const duration = GALLERY.length * 3.5;  // ~4s per photo

  return (
    <section ref={ref} style={{ background: "#0d0d0d", padding: "52px 0", overflow: "hidden" }}>
      <FadeBlock>
        <div style={{
          textAlign: "center", fontFamily: "'Playfair Display', serif",
          fontStyle: "italic", fontSize: 22, color: "#fde68a",
          marginBottom: 28, letterSpacing: 1,
        }}>
          nossa película ✨
        </div>
      </FadeBlock>

      {/* Sprocket holes top */}
      <div style={{ height: 22, backgroundImage: "radial-gradient(circle, #2a2a2a 7px, transparent 7px)", backgroundSize: "28px 22px", backgroundRepeat: "repeat-x", backgroundPosition: "14px center" }} />

      {/* Film frames */}
      <div style={{ overflow: "hidden", padding: "4px 0" }}>
        <div style={{
          display: "flex", width: "max-content",
          animation: visible ? `filmScroll ${duration}s linear infinite` : "none",
        }}>
          {frames.map((photo, i) => (
            <div key={i} style={{
              width: 145, height: 145, flexShrink: 0, marginRight: 5,
              border: "3px solid #1e1e1e", overflow: "hidden", position: "relative",
              background: "#111",
            }}>
              <img src={photo.src} alt="" loading="lazy" style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: "sepia(0.3) contrast(1.08) brightness(0.92)",
                display: "block",
              }} />
              <div style={{
                position: "absolute", bottom: 3, right: 5,
                fontFamily: "monospace", fontSize: 9, color: "rgba(253,230,138,.55)",
              }}>
                {String((i % GALLERY.length) + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sprocket holes bottom */}
      <div style={{ height: 22, backgroundImage: "radial-gradient(circle, #2a2a2a 7px, transparent 7px)", backgroundSize: "28px 22px", backgroundRepeat: "repeat-x", backgroundPosition: "14px center" }} />
    </section>
  );
}

// ─────────────────────────────────────────────────────────
function MusicPlayer() {
  const audioRef = useRef(null);
  const startedRef = useRef(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const tryStart = () => {
      if (startedRef.current) return;
      const a = audioRef.current;
      if (!a) return;
      a.volume = 0.45;
      a.play().then(() => { startedRef.current = true; setOn(true); }).catch(() => {});
    };
    document.addEventListener("pointerdown", tryStart);
    return () => document.removeEventListener("pointerdown", tryStart);
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) { a.pause(); setOn(false); }
    else { a.play().then(() => setOn(true)).catch(() => {}); }
  };

  return (
    <>
      <audio ref={audioRef} src="/musica.mp3" loop preload="metadata" />
      <button
        onClick={toggle}
        aria-label="música"
        style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 9998,
          width: 50, height: 50, borderRadius: "50%",
          border: "2px solid rgba(253,230,138,.4)", cursor: "pointer",
          background: "linear-gradient(135deg, rgba(139,58,82,.9), rgba(107,32,56,.9))",
          color: "#fde68a", fontSize: 19,
          boxShadow: on
            ? "0 0 0 5px rgba(201,116,138,.25), 0 4px 18px rgba(0,0,0,.35)"
            : "0 4px 14px rgba(0,0,0,.28)",
          backdropFilter: "blur(6px)",
          animation: on ? "glowPulse 2.4s ease-in-out infinite" : "none",
          transition: "box-shadow .4s",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {on ? "🔊" : "🎵"}
      </button>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// INTRO CURTAIN
// ─────────────────────────────────────────────────────────

function IntroCurtain({ onStart }) {
  const [leaving, setLeaving] = useState(false);
  const go = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onStart, 650);
  };
  return (
    <div
      onClick={go}
      style={{
        position: "fixed", inset: 0, zIndex: 9990,
        background: "linear-gradient(150deg, #2a0a16, #6b2038, #8b3a52, #2a0a16)",
        backgroundSize: "300% 300%",
        animation: `gradientShift 14s ease infinite${leaving ? ", curtainOut .65s ease forwards" : ""}`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "40px 28px", cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <Sparkles count={26} color="#fde68a" />
      <FloatingHearts count={10} opacity={0.3} />

      <div style={{ position: "relative", zIndex: 1, animation: "popIn .9s ease both" }}>
        <div style={{ fontSize: 76, animation: "glowPulse 2.4s ease-in-out infinite", lineHeight: 1 }}>❤️</div>

        <div style={{
          fontFamily: "'Lato', sans-serif", fontWeight: 300,
          fontSize: 13, letterSpacing: 6, textTransform: "uppercase",
          color: "#f9d8e4", marginTop: 30, marginBottom: 10,
          animation: "fadeSlide 1s .3s ease both",
        }}>
          Para
        </div>
        <div style={{
          fontFamily: "'Playfair Display', serif", fontStyle: "italic",
          fontSize: 58, color: "#fde68a", lineHeight: 1.05,
          textShadow: "0 4px 30px rgba(0,0,0,.4)",
          animation: "fadeSlide 1s .45s ease both",
        }}>
          Lorena
        </div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 13, color: "#f9d8e4cc", letterSpacing: 5,
          textTransform: "uppercase", marginTop: 16,
          animation: "fadeSlide 1s .6s ease both",
        }}>
          1 ano de nós · 27 · 06 · 2026
        </div>

        <div style={{ marginTop: 44, animation: "fadeSlide 1s .9s ease both" }}>
          <BtnRomantic onClick={go} gold>tocar para começar 💌</BtnRomantic>
        </div>
        <div style={{
          marginTop: 22, fontFamily: "'Lato', sans-serif", fontSize: 11,
          color: "#f9d8e477", letterSpacing: 2,
          animation: "blink 2.6s 1.2s infinite",
        }}>
          🔊 com som — ajuste o volume
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// LOADING SCREEN
// ─────────────────────────────────────────────────────────

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const MIN_MS = 2600;
    const start = Date.now();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setFading(true);
      setTimeout(() => onDoneRef.current(), 750);
    };

    const iv = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - start) / MIN_MS) * 100));
      setProgress(p);
      if (p >= 100) {
        clearInterval(iv);
        finish();
      }
    }, 40);

    // safety net: always finish even if the interval is throttled
    const safety = setTimeout(finish, MIN_MS + 1500);

    return () => { clearInterval(iv); clearTimeout(safety); };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "linear-gradient(150deg, #160008, #4a1028, #6b2038, #4a1028, #160008)",
      backgroundSize: "300% 300%",
      animation: "gradientShift 8s ease infinite",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: fading ? 0 : 1,
      transition: "opacity .75s ease",
      pointerEvents: fading ? "none" : "all",
    }}>
      <Sparkles count={14} color="#fde68a" />
      <FloatingHearts count={6} opacity={0.18} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: 68, animation: "glowPulse 1.5s ease-in-out infinite", marginBottom: 28, lineHeight: 1 }}>
          ❤️
        </div>

        <div style={{
          fontFamily: "'Playfair Display', serif", fontStyle: "italic",
          fontSize: 46, color: "#fde68a", lineHeight: 1,
          textShadow: "0 4px 30px rgba(0,0,0,.5)",
          marginBottom: 6,
        }}>
          Lorena
        </div>

        <div style={{
          fontFamily: "'Lato', sans-serif", fontWeight: 300,
          fontSize: 11, color: "#f9d8e466",
          letterSpacing: 4, textTransform: "uppercase",
          marginBottom: 44,
        }}>
          preparando algo especial
        </div>

        <div style={{
          width: 210, height: 3,
          background: "rgba(255,255,255,.1)",
          borderRadius: 99, overflow: "hidden",
          margin: "0 auto",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #c9748a, #fde68a, #c9748a)",
            backgroundSize: "200% 100%",
            animation: "gradientShift 1.8s linear infinite",
            borderRadius: 99,
            width: `${progress}%`,
            transition: "width .08s linear",
          }} />
        </div>

        <div style={{
          fontFamily: "'Lato', sans-serif", fontSize: 10,
          color: "#f9d8e444", letterSpacing: 2,
          marginTop: 10,
        }}>
          {progress}%
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────

export default function App() {
  const loveTime = useLoveTime();
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  // step 0 = interactive declaration
  // step 1 = envelope + letter
  // step 2 = months journey (12 pages)
  // step 3 = mosaic, film strip, gallery, final

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Lato:wght@300;400;700&family=Press+Start+2P&display=swap');

        *  { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fdf8f6; min-height: 100vh; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }

        @keyframes fadeIn    { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes bob       { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes blink     { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes petalFall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: .5 }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0  }
        }

        /* ── professional polish keyframes ── */
        @keyframes gradientShift {
          0%   { background-position:   0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position:   0% 50%; }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0)    rotate(var(--rot,0deg)); }
          50%     { transform: translateY(-22px) rotate(var(--rot,0deg)); }
        }
        @keyframes heartRise {
          0%   { transform: translateY(0)     scale(.6) rotate(0deg);   opacity: 0;   }
          12%  { opacity: .9; }
          100% { transform: translateY(-120px) scale(1.15) rotate(var(--spin,18deg)); opacity: 0; }
        }
        @keyframes twinkle {
          0%,100% { opacity: .15; transform: scale(.7); }
          50%     { opacity: .9;  transform: scale(1.25); }
        }
        @keyframes popIn {
          0%   { transform: scale(.4); opacity: 0; }
          70%  { transform: scale(1.12); }
          100% { transform: scale(1);  opacity: 1; }
        }
        @keyframes glowPulse {
          0%,100% { transform: scale(1);    filter: drop-shadow(0 0 16px rgba(201,116,138,.55)); }
          50%     { transform: scale(1.07); filter: drop-shadow(0 0 38px rgba(201,116,138,.85)); }
        }
        @keyframes shimmerSweep {
          0%   { transform: translateX(-130%) skewX(-18deg); }
          100% { transform: translateX(230%)  skewX(-18deg); }
        }
        @keyframes wordIn {
          from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
        }
        @keyframes confettiFall {
          0%   { transform: translate(0,-10px) rotate(0deg);    opacity: 1; }
          100% { transform: translate(var(--dx,0),104vh) rotate(var(--cr,540deg)); opacity: 0; }
        }
        @keyframes curtainOut {
          to { opacity: 0; transform: scale(1.08); pointer-events: none; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px) scale(.97); }
          to   { opacity: 1; transform: translateX(0)    scale(1);   }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(28px) scale(.8); }
          to   { opacity: 1; transform: translateY(0)    scale(1);  }
        }
        @keyframes numberGlow {
          0%,100% { text-shadow: 0 0 20px currentColor, 0 0 60px currentColor; }
          50%     { text-shadow: 0 0 40px currentColor, 0 0 100px currentColor, 0 0 6px #fff; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }
        }

        @keyframes polaroidFall {
          0%   { transform: translateY(-220px) translateX(0px);    opacity: 0; }
          6%   { opacity: 1; }
          25%  { transform: translateY(22vh)   translateX(18px);  }
          50%  { transform: translateY(52vh)   translateX(-12px); }
          75%  { transform: translateY(78vh)   translateX(22px);  }
          94%  { opacity: 1; }
          100% { transform: translateY(112vh)  translateX(-8px);   opacity: 0; }
        }

        @keyframes letterRise {
          from { transform: translateY(55px) scale(.96); opacity: 0; }
          to   { transform: translateY(0)    scale(1);   opacity: 1; }
        }
        @keyframes letterExpand {
          from { transform: scale(.93) translateY(18px); opacity: 0; }
          to   { transform: scale(1)   translateY(0);    opacity: 1; }
        }
        @keyframes filmScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          14%     { transform: scale(1.08); }
          28%     { transform: scale(1); }
          42%     { transform: scale(1.05); }
          56%     { transform: scale(1); }
        }

        ::-webkit-scrollbar       { width: 5px }
        ::-webkit-scrollbar-track { background: #fdf2f5 }
        ::-webkit-scrollbar-thumb { background: #c9748a }
      `}</style>

      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      <MusicPlayer />
      <HeartTrail />

      {!loading && !started && <IntroCurtain onStart={() => setStarted(true)} />}

      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        {step === 0 && <InteractiveDeclaration loveTime={loveTime} onDone={() => setStep(1)} />}
        {step === 1 && <EnvelopeSection onNext={() => setStep(2)} />}
        {step === 2 && <MonthsJourney onDone={() => setStep(3)} />}
        {step >= 3 && (
          <>
            <HeartMosaicSection />
            <FilmStripSection />
            <GallerySection />
            <FinalSection />
          </>
        )}
      </div>
    </>
  );
}
