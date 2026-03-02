"use client";

const traits = [
  { label: "Creativo", icon: "\u{1F3A8}" },
  { label: "Resolutivo", icon: "\u2699\uFE0F" },
  { label: "Colaborador", icon: "\u{1F91D}" },
  { label: "Autodidacta", icon: "\u{1F4DA}" },
];

export default function AboutContent() {
  return (
    <div>
      {/* Decorative drop cap intro */}
      <h2
        style={{
          fontFamily: "var(--font-display), serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "var(--ink)",
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}
      >
        Sobre M&iacute;
      </h2>

      {/* Ornamental divider */}
      <Divider />

      <p style={pStyle}>
        <span style={dropCap}>H</span>ola! Soy un desarrollador apasionado
        que disfruta crear experiencias digitales creativas e inmersivas.
        Trabajo con tecnolog&iacute;as web modernas para dar vida a las ideas
        a trav&eacute;s del c&oacute;digo.
      </p>

      <p style={pStyle}>
        Cuando no estoy programando, me encontrar&aacute;s explorando nuevas
        tecnolog&iacute;as, contribuyendo a proyectos open source, o
        aventur&aacute;ndome al aire libre &mdash; justo como nuestro
        peque&ntilde;o amigo hamster!
      </p>

      <Divider />

      {/* Traits as medieval-style badges */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        {traits.map((trait, i) => (
          <div
            key={trait.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 0.65rem",
              borderRadius: "6px",
              background: "rgba(74,140,92,0.08)",
              border: "1px solid rgba(74,140,92,0.2)",
              animation: `waveIn 0.35s ease-out ${0.15 + i * 0.06}s both`,
            }}
          >
            <span style={{ fontSize: "1rem" }}>{trait.icon}</span>
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--ink)",
              }}
            >
              {trait.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const pStyle: React.CSSProperties = {
  lineHeight: 1.8,
  marginBottom: "0.9rem",
  color: "var(--ink-light)",
  fontSize: "0.9rem",
};

const dropCap: React.CSSProperties = {
  float: "left",
  fontFamily: "var(--font-display), serif",
  fontSize: "2.8rem",
  lineHeight: 0.8,
  fontWeight: 700,
  color: "var(--accent-about)",
  marginRight: "0.3rem",
  marginTop: "0.15rem",
};

function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        margin: "0.8rem 0",
        opacity: 0.3,
      }}
    >
      <div style={{ flex: 1, height: 1, background: "var(--ink)" }} />
      <span style={{ fontSize: "0.6rem", color: "var(--ink)" }}>\u2726</span>
      <div style={{ flex: 1, height: 1, background: "var(--ink)" }} />
    </div>
  );
}
