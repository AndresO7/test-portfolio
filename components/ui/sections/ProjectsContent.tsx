"use client";

const projects = [
  {
    title: "Portafolio 3D",
    desc: "Un portafolio interactivo donde un hamster aventurero explora islas flotantes.",
    tech: ["React Three Fiber", "Next.js", "Rapier Physics"],
    accent: "var(--accent-projects)",
    ribbon: "#3a7cb8",
  },
  {
    title: "Plataforma E-Commerce",
    desc: "Soluci\u00f3n full-stack de comercio electr\u00f3nico con gesti\u00f3n de inventario en tiempo real.",
    tech: ["Next.js", "Prisma", "Stripe"],
    accent: "var(--accent-about)",
    ribbon: "#4a8c5c",
  },
  {
    title: "Asistente IA",
    desc: "Un chatbot inteligente potenciado por modelos de lenguaje con entrenamiento personalizado.",
    tech: ["Python", "FastAPI", "React"],
    accent: "var(--accent-experience)",
    ribbon: "#7b5ea7",
  },
];

export default function ProjectsContent() {
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
        Proyectos
      </h2>

      <Divider />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginTop: "0.8rem" }}>
        {projects.map((project, i) => (
          <div
            key={project.title}
            style={{
              position: "relative",
              padding: "1rem 1rem 0.9rem",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.25)",
              border: "1px solid rgba(139,105,20,0.2)",
              boxShadow: "0 2px 8px rgba(60,40,10,0.08)",
              animation: `waveIn 0.4s ease-out ${0.12 + i * 0.08}s both`,
              overflow: "hidden",
            }}
          >
            {/* Colored ribbon on left */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 4,
                background: project.ribbon,
                borderRadius: "6px 0 0 6px",
              }}
            />

            <h3
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: "0.35rem",
                paddingLeft: "0.5rem",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: "0.84rem",
                lineHeight: 1.65,
                color: "var(--ink-light)",
                marginBottom: "0.6rem",
                paddingLeft: "0.5rem",
              }}
            >
              {project.desc}
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.3rem",
                flexWrap: "wrap",
                paddingLeft: "0.5rem",
              }}
            >
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "0.2rem 0.5rem",
                    borderRadius: "4px",
                    background: "rgba(139,105,20,0.1)",
                    border: "1px solid rgba(139,105,20,0.15)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "var(--ink-light)",
                  }}
                >
                  {t}
                </span>
              ))}
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
