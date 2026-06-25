import { useState, useEffect, useRef } from "react";

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
        background: item.special ? "linear-gradient(135deg, #fff5f7, #fffbf0)" : "transparent",
        border: item.special ? "1px solid #e8c4cc" : "none",
        padding: item.special ? "16px 18px" : "2px 0 20px",
        boxShadow: item.special ? "0 2px 16px #e8c4cc18" : "none",
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
        boxShadow: "2px 6px 18px rgba(0,0,0,.22)",
        transform: `rotate(${rotation}deg)`,
        width,
        borderRadius: 2,
        userSelect: "none",
      }}>
        <img
          src={photo.src}
          alt=""
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
        background: "linear-gradient(180deg, #fff5f7 0%, #fef0ea 100%)",
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
            background: "rgba(0,0,0,.88)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, padding: 20,
          }}
        >
          <div style={{ maxWidth: 400, width: "100%" }}>
            <div style={{
              background: "#fff",
              padding: "12px 12px 36px",
              boxShadow: "0 8px 40px rgba(0,0,0,.5)",
            }}>
              <img src={lightbox.src} alt="" style={{ width: "100%", display: "block" }} />
              <p style={{
                textAlign: "center", margin: "10px 0 0",
                fontFamily: "'Lato', sans-serif",
                fontSize: 17, color: "#7a4050",
              }}>{lightbox.caption}</p>
            </div>
            <p style={{
              color: "rgba(255,255,255,.5)",
              textAlign: "center", fontSize: 12, marginTop: 10,
              fontFamily: "'Lato', sans-serif",
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
  { type: "body",      text: "Há um ano, você me fez o pedido de namoro. Eu disse sim sem pensar duas vezes — e foi a melhor decisão que eu já tomei na vida." },
  { type: "body",      text: "Hoje a gente divide tudo. Os planos, as bobeiras, os medos, as conquistas. A gente se cuida, se respeita, e se impulsiona um ao outro a voar cada vez mais alto." },
  { type: "body",      text: "Você é minha namorada, minha melhor amiga e minha parceira em absolutamente tudo. Eu não canso de te dizer o quanto você é incrível — porque é a mais pura verdade." },
  { type: "body",      text: "Essa leveza que a gente tem, esse jeito de ser amigos antes de tudo, é o maior presente que eu já recebeu na vida." },
  { type: "emphasis",  text: "Que venham muitos e muitos anos de muito amor, Doidiça." },
  { type: "body",      text: "Eu te amo a cada batida do meu coração, e vou te amar a cada segundo da minha vida." },
  { type: "signature", text: "Com amor eterno,\nLyelson ❤️" },
];

function BtnRomantic({ children, onClick, block, gold }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Playfair Display', serif", fontSize: 16, letterSpacing: 1,
        color: gold ? "#6b2038" : "#fff",
        background: gold
          ? "linear-gradient(135deg,#fde68a,#f6c453)"
          : "linear-gradient(135deg,#c9748a,#8b3a52)",
        border: "none", borderRadius: 40,
        padding: "13px 30px", cursor: "pointer",
        width: block ? "100%" : "auto", maxWidth: 320,
        boxShadow: "0 4px 16px rgba(139,58,82,.3)",
        transition: "transform .15s",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.96)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
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

function InteractiveDeclaration({ loveTime, onDone }) {
  const [i, setI] = useState(0);
  const [reply, setReply] = useState(null);
  const step = STEPS[i];

  const advance = () => {
    setReply(null);
    if (i >= STEPS.length - 1) { onDone(); return; }
    setI(i + 1);
  };
  const pick = (a) => { if (a.reply) setReply(a.reply); else advance(); };

  return (
    <section style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fdf2f5 0%, #fce8ef 45%, #fdf5ec 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "60px 24px 40px",
    }}>
      <Petals />
      <FallingPhotos />

      {/* progresso */}
      <div style={{ position: "absolute", top: 26, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 5, padding: "0 24px", flexWrap: "wrap", zIndex: 2 }}>
        {STEPS.map((_, k) => (
          <div key={k} style={{
            width: k === i ? 18 : 6, height: 6, borderRadius: 3,
            background: k <= i ? "#c9748a" : "#e8c4cc",
            transition: "all .3s",
          }} />
        ))}
      </div>

      <div key={`${i}-${reply ? "r" : "q"}`} style={{
        position: "relative", zIndex: 1, maxWidth: 440, width: "100%",
        textAlign: "center", animation: "fadeSlide .5s ease",
      }}>
        {reply ? (
          <>
            <div style={{ fontSize: 46, marginBottom: 22, animation: "bob 2s infinite" }}>💕</div>
            <p style={{
              fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              fontSize: 24, color: "#6b2038", lineHeight: 1.6, marginBottom: 36,
            }}>
              {reply}
            </p>
            <BtnRomantic onClick={advance}>continuar</BtnRomantic>
          </>
        ) : step.type === "ask" ? (
          <>
            <div style={{ fontSize: 40, marginBottom: 20 }}>💬</div>
            <p style={{
              fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              fontSize: 24, color: "#6b2038", lineHeight: 1.6, marginBottom: 34,
            }}>
              {step.q}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
              {step.answers.map((a, k) => (
                <BtnRomantic key={k} onClick={() => pick(a)} block>{a.label}</BtnRomantic>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 50, marginBottom: 22, animation: "bob 2s infinite" }}>{step.emoji}</div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: step.type === "final" ? 32 : 26,
              fontWeight: step.type === "final" ? 600 : 400,
              color: "#6b2038", lineHeight: 1.65, marginBottom: 32,
            }}>
              {step.lines.map((l, k) => <div key={k}>{l}</div>)}
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
  const W = 300, H = 200;
  return (
    <div
      onClick={phase === "sealed" ? onClick : undefined}
      style={{
        position: "relative", width: W, height: H + 60,
        cursor: phase === "sealed" ? "pointer" : "default",
        animation: phase === "sealed" ? "bob 2.5s ease-in-out infinite" : "none",
      }}
    >
      {/* Body with diamond-fold gradients */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: W, height: H,
        background: `
          linear-gradient(to bottom right, #f5dde8 50%, transparent 50%) top left    / 50% 50% no-repeat,
          linear-gradient(to bottom left,  #f5dde8 50%, transparent 50%) top right   / 50% 50% no-repeat,
          linear-gradient(to top right,    #ede0e9 50%, transparent 50%) bottom left / 50% 50% no-repeat,
          linear-gradient(to top left,     #ede0e9 50%, transparent 50%) bottom right/ 50% 50% no-repeat,
          #fef5f8`,
        border: "1.5px solid #d4a0b0",
        boxShadow: "0 14px 48px rgba(139,58,82,.2), 0 2px 8px rgba(0,0,0,.06)",
      }}>
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          flexDirection: "column", alignItems: "center", justifyContent: "center",
          opacity: phase === "peek" ? 0 : 1, transition: "opacity .3s",
        }}>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, letterSpacing: 5, color: "#b07080", textTransform: "uppercase", marginBottom: 6 }}>Para</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 36, color: "#8b3a52" }}>Lorena</div>
          <div style={{ fontSize: 18, marginTop: 8 }}>💌</div>
        </div>
      </div>

      {/* Letter peeking */}
      {phase === "peek" && (
        <div style={{
          position: "absolute", left: "8%", right: "8%", top: -50,
          height: H * 0.9,
          background: "#fffef9", border: "1px solid #e8d8c0",
          boxShadow: "0 -6px 20px rgba(0,0,0,.1)", zIndex: 3,
          animation: "letterRise .8s ease-out forwards",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 15, color: "#a07060" }}>Amor,</span>
        </div>
      )}

      {/* SVG flap that rotates open */}
      <svg viewBox={`0 0 ${W} ${H / 2 + 10}`} width={W} height={H / 2 + 10}
        style={{
          position: "absolute", top: 0, left: 0,
          transformOrigin: "top center",
          transform: phase !== "sealed" ? "rotateX(-175deg)" : "rotateX(0deg)",
          transition: "transform .65s cubic-bezier(.4,0,.2,1)",
          zIndex: 10, display: "block",
        }}
      >
        <polygon points={`0,0 ${W},0 ${W / 2},${H / 2 + 10}`} fill="#f9e0eb" stroke="#d4a0b0" strokeWidth="1.5" />
        <text x={W / 2} y={H / 4 + 2} textAnchor="middle" fontSize="18" dy=".35em">❤️</text>
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
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "40px 24px",
    }}>
      <Petals />
      <FallingPhotos />
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
          72 momentos, um coração
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
              <img src={photo.src} alt="" style={{
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
      <audio ref={audioRef} src="/musica.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label="música"
        style={{
          position: "fixed", bottom: 18, right: 18, zIndex: 9998,
          width: 46, height: 46, borderRadius: "50%",
          border: "none", cursor: "pointer",
          background: "rgba(139,58,82,.85)", color: "#fde68a",
          fontSize: 18, boxShadow: "0 3px 14px rgba(0,0,0,.3)",
          backdropFilter: "blur(4px)",
        }}
      >
        {on ? "🔊" : "🎵"}
      </button>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────

export default function App() {
  const loveTime = useLoveTime();
  const [step, setStep] = useState(0);
  // step 0 = interactive declaration
  // step 1 = envelope + letter
  // step 2 = gallery, mosaic, film, final

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

      <MusicPlayer />

      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        {step === 0 && <InteractiveDeclaration loveTime={loveTime} onDone={() => setStep(1)} />}
        {step === 1 && <EnvelopeSection onNext={() => setStep(2)} />}
        {step >= 2 && (
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
