import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────

const START_DATE = new Date(2025, 5, 27);

const GALLERY = [
  { src: "/g01.png", caption: "❤️ juntos, do jeitinho que eu amo" },
  { src: "/g02.jpg", caption: "🎈 festa com você é sempre diferente" },
  { src: "/g03.jpg", caption: "😂 ela me mordeu e achou normal kkkk" },
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
  { src: "/g56.jpg", caption: "😬 ela me mordeu de novo. E eu deixo kkkk" },
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
  { src: "/g68.jpg", caption: "🎨 frente ao mural e ela ainda tentando me morder" },
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

function Petals() {
  const items = useRef(
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${(i * 7.3 + 4) % 94}%`,
      size: 12 + (i % 4) * 4,
      dur: 6 + (i % 5),
      delay: i * 0.65,
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {items.current.map(p => (
        <div key={p.id} style={{
          position: "absolute", top: "-30px", left: p.left,
          fontSize: p.size, opacity: 0.45,
          animation: `petalFall ${p.dur}s ${p.delay}s infinite linear`,
        }}>🌸</div>
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
      <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 17, color: "#a06070", marginBottom: 16, letterSpacing: 1 }}>
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
      <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 14, color: "#a06070" }}>
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
          fontFamily: "'Dancing Script', cursive",
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
          fontFamily: "'Dancing Script', cursive",
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
          fontFamily: "'Dancing Script', cursive", fontSize: 16,
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
    greeting:  { fontFamily: "'Dancing Script', cursive", fontSize: 34, color: "#8b3a52", fontWeight: "700", marginBottom: 6 },
    highlight: { fontFamily: "'Dancing Script', cursive", fontSize: 22, color: "#8b3a52", fontWeight: "700" },
    emphasis:  { fontFamily: "'Playfair Display', serif",  fontSize: 18, color: "#6b2038", fontStyle: "italic", margin: "10px 0 4px" },
    closing:   { fontFamily: "'Dancing Script', cursive", fontSize: 24, color: "#8b3a52", fontWeight: "700", marginTop: 8 },
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
                <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 24, color: "#8b3a52" }}>
                  Com amor,
                </div>
                <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 30, color: "#6b2038", fontWeight: "700" }}>
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
        background: item.special ? "linear-gradient(135deg, #fff5f7, #fffbf0)" : "transparent",
        border: item.special ? "1px solid #e8c4cc" : "none",
        padding: item.special ? "16px 18px" : "2px 0 20px",
        boxShadow: item.special ? "0 2px 16px #e8c4cc18" : "none",
      }}>
        <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 13, color: "#c9748a", marginBottom: 2, letterSpacing: 1 }}>
          {item.chapter}
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: item.special ? 18 : 16, color: "#6b2038", fontWeight: "600", marginBottom: 2 }}>
          {item.title}
        </div>
        <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 13, color: "#b07888", marginBottom: 8 }}>
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

function GallerySection() {
  const [idx, setIdx] = useState(0);
  const touchX = useRef(null);
  const total = GALLERY.length;

  const go = (n) => setIdx((n + total) % total);
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) go(idx + 1);
    else if (dx > 40) go(idx - 1);
    touchX.current = null;
  };

  const photo = GALLERY[idx];

  return (
    <section style={{ background: "#fff", padding: "70px 0 70px", borderTop: "1px solid #f0d8e0" }}>
      <FadeBlock style={{ maxWidth: 480, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#c9748a", letterSpacing: 5, textTransform: "uppercase", marginBottom: 8 }}>
            Nossas Fotos
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#6b2038", fontStyle: "italic", marginBottom: 8 }}>
            Nossa história em imagens
          </div>
          <div style={{ width: 60, height: 2, background: "linear-gradient(to right, transparent, #c9748a, transparent)", margin: "0 auto" }} />
        </div>
      </FadeBlock>

      {/* Photo */}
      <div
        style={{ position: "relative", cursor: "pointer", marginBottom: 0 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => go(idx + 1)}
      >
        <img
          key={idx}
          src={photo.src}
          alt={`foto ${idx + 1}`}
          style={{
            width: "100%", maxHeight: 420,
            objectFit: "cover", objectPosition: "center top",
            display: "block",
            animation: "fadeIn .4s ease",
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
          background: "linear-gradient(transparent, rgba(107,32,56,.75))",
          pointerEvents: "none",
        }} />
        {/* Caption */}
        <div style={{
          position: "absolute", bottom: 18, left: 20, right: 20,
          fontFamily: "'Dancing Script', cursive", fontSize: 20,
          color: "#fff", lineHeight: 1.4,
          textShadow: "0 1px 8px rgba(0,0,0,.5)",
        }}>
          {photo.caption}
        </div>
        {/* Counter */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(107,32,56,.65)",
          fontFamily: "'Lato', sans-serif", fontSize: 11,
          color: "#fde8ec", padding: "3px 9px",
        }}>
          {idx + 1} / {total}
        </div>
      </div>

      {/* Dots + nav */}
      <div style={{ maxWidth: 480, margin: "18px auto 0", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => go(idx - 1)} style={{
            background: "transparent", border: "1.5px solid #c9748a", color: "#c9748a",
            fontFamily: "'Playfair Display', serif", fontSize: 18,
            padding: "6px 16px", cursor: "pointer",
          }}>←</button>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", maxWidth: "62%" }}>
            {GALLERY.map((_, i) => (
              <div key={i} onClick={() => go(i)} style={{
                width: i === idx ? 12 : 7, height: i === idx ? 12 : 7,
                background: i === idx ? "#8b3a52" : "#e8c4cc",
                cursor: "pointer", transition: "all .25s",
                borderRadius: "50%",
              }} />
            ))}
          </div>
          <button onClick={() => go(idx + 1)} style={{
            background: "transparent", border: "1.5px solid #c9748a", color: "#c9748a",
            fontFamily: "'Playfair Display', serif", fontSize: 18,
            padding: "6px 16px", cursor: "pointer",
          }}>→</button>
        </div>
        <div style={{ textAlign: "center", fontFamily: "'Dancing Script', cursive", fontSize: 13, color: "#c9748a88", marginTop: 10 }}>
          arraste ou toque para avançar
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// FINAL SECTION
// ─────────────────────────────────────────────────────────

function FinalSection() {
  return (
    <section style={{
      background: "linear-gradient(160deg, #6b2038 0%, #8b3a52 40%, #a0566a 100%)",
      padding: "80px 28px",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>
      <Petals />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto" }}>

        <FadeBlock>
          <div style={{ fontSize: 60, marginBottom: 24, animation: "bob 2s infinite" }}>❤️</div>
        </FadeBlock>

        <FadeBlock delay={0.2}>
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 20, color: "#f9d8e4", marginBottom: 6 }}>
            Para sempre com você,
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 42, color: "#fde68a",
            fontStyle: "italic", lineHeight: 1.2,
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
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 19, color: "#f9d8e4", lineHeight: 1.9, marginBottom: 36 }}>
            Eu te amo a cada batida do meu coração,<br />
            e te amarei a cada segundo da minha vida.
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
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 22, color: "#fde68a" }}>
            Feliz 1 ano, meu amor 🎂
          </div>
        </FadeBlock>

        <FadeBlock delay={0.95}>
          <div style={{ marginTop: 32, fontFamily: "'Dancing Script', cursive", fontSize: 26, color: "#fff" }}>
            — Lyelson
          </div>
        </FadeBlock>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────

export default function App() {
  const loveTime = useLoveTime();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Lato:wght@300;400;700&family=Press+Start+2P&display=swap');

        *  { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fdf8f6; min-height: 100vh; }

        @keyframes fadeIn    { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes bob       { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes blink     { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes petalFall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: .5 }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0  }
        }

        ::-webkit-scrollbar       { width: 5px }
        ::-webkit-scrollbar-track { background: #fdf2f5 }
        ::-webkit-scrollbar-thumb { background: #c9748a }
      `}</style>

      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <HeroSection loveTime={loveTime} />
        <CartaSection />
        <TimelineSection />
        <GallerySection />
        <FinalSection />
      </div>
    </>
  );
}
