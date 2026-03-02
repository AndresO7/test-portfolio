"use client";

const links = [
  { label: "Email", value: "hello@example.com", icon: "\u2709\uFE0F" },
  { label: "GitHub", value: "github.com/yourusername", icon: "\u{1F4BB}" },
  { label: "LinkedIn", value: "linkedin.com/in/yourusername", icon: "\u{1F517}" },
];

export default function ContactContent() {
  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display), serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "var(--ink)",
          marginBottom: "1rem",
        }}
      >
        Contacto
      </h2>

      <Divider />

      <p
        style={{
          lineHeight: 1.8,
          marginBottom: "1.2rem",
          color: "var(--ink-light)",
          fontSize: "0.9rem",
        }}
      >
        Me encantar&iacute;a saber de ti. Ya sea que tengas una idea de
        proyecto, una pregunta, o simplemente quieras saludar &mdash;
        conectemos!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
        {links.map((item, i) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "0.7rem 0.9rem",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.22)",
              border: "1px solid rgba(139,105,20,0.18)",
              cursor: "pointer",
              transition: "all 0.2s",
              animation: `waveIn 0.4s ease-out ${0.15 + i * 0.08}s both`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(200,169,81,0.12)";
              e.currentTarget.style.borderColor = "rgba(200,169,81,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.22)";
              e.currentTarget.style.borderColor = "rgba(139,105,20,0.18)";
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
            <div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "var(--ink-light)",
                  opacity: 0.55,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "0.1rem",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  color: "var(--ink)",
                }}
              >
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <p
        style={{
          textAlign: "center",
          fontSize: "0.78rem",
          color: "var(--ink-light)",
          opacity: 0.5,
          fontStyle: "italic",
          marginTop: "0.5rem",
        }}
      >
        &ldquo;Toda gran aventura comienza con un mensaje&rdquo;
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        margin: "0.6rem 0",
        opacity: 0.3,
      }}
    >
      <div style={{ flex: 1, height: 1, background: "var(--ink)" }} />
      <span style={{ fontSize: "0.6rem", color: "var(--ink)" }}>\u2726</span>
      <div style={{ flex: 1, height: 1, background: "var(--ink)" }} />
    </div>
  );
}
