"use client";

const experiences = [
  {
    role: "Senior Frontend Developer",
    company: "Tech Corp",
    period: "2023 \u2014 Presente",
    desc: "Liderando el equipo frontend construyendo aplicaciones web escalables con React y Next.js.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    role: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2021 \u2014 2023",
    desc: "Construcci\u00f3n y mantenimiento de microservicios y SPAs para una plataforma SaaS en crecimiento.",
    tags: ["Node.js", "PostgreSQL", "React"],
  },
  {
    role: "Junior Developer",
    company: "Web Agency",
    period: "2019 \u2014 2021",
    desc: "Desarrollo de sitios web para clientes y fundamentos del desarrollo web moderno.",
    tags: ["HTML/CSS", "JavaScript", "WordPress"],
  },
];

export default function ExperienceContent() {
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
        Experiencia
      </h2>

      <Divider />

      {/* Journey timeline */}
      <div style={{ position: "relative", marginTop: "1rem", paddingLeft: "1.5rem" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "7px",
            top: 4,
            bottom: 4,
            width: 2,
            background:
              "repeating-linear-gradient(180deg, var(--wood-border) 0, var(--wood-border) 4px, transparent 4px, transparent 8px)",
            opacity: 0.5,
          }}
        />

        {experiences.map((exp, i) => (
          <div
            key={exp.role}
            style={{
              position: "relative",
              paddingBottom: i < experiences.length - 1 ? "1.2rem" : 0,
              animation: `waveIn 0.4s ease-out ${0.15 + i * 0.1}s both`,
            }}
          >
            {/* Milestone marker */}
            <div
              style={{
                position: "absolute",
                left: "-1.5rem",
                top: "0.15rem",
                width: 16,
                height: 16,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--gold), var(--wood))",
                border: "2px solid var(--wood-dark)",
                boxShadow: "0 0 6px var(--gold-glow)",
              }}
            />

            <div
              style={{
                padding: "0.6rem 0.8rem",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(139,105,20,0.15)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "0.15rem",
                }}
              >
                {exp.role}
              </h3>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--ink-light)",
                  opacity: 0.6,
                  fontWeight: 600,
                  marginBottom: "0.35rem",
                }}
              >
                {exp.company} &middot; {exp.period}
              </p>
              <p
                style={{
                  fontSize: "0.84rem",
                  lineHeight: 1.65,
                  color: "var(--ink-light)",
                  marginBottom: "0.5rem",
                }}
              >
                {exp.desc}
              </p>
              <div
                style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}
              >
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "0.15rem 0.45rem",
                      borderRadius: "3px",
                      background: "rgba(123,94,167,0.1)",
                      border: "1px solid rgba(123,94,167,0.18)",
                      fontSize: "0.67rem",
                      fontWeight: 600,
                      color: "var(--ink-light)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
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
        margin: "0.5rem 0",
        opacity: 0.3,
      }}
    >
      <div style={{ flex: 1, height: 1, background: "var(--ink)" }} />
      <span style={{ fontSize: "0.6rem", color: "var(--ink)" }}>\u2726</span>
      <div style={{ flex: 1, height: 1, background: "var(--ink)" }} />
    </div>
  );
}
