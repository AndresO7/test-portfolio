"use client";

const skillCategories = [
  {
    category: "Frontend",
    icon: "\u{1F5BC}\uFE0F",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "Three.js", level: 75 },
      { name: "Tailwind CSS", level: 92 },
    ],
    accent: "var(--accent-projects)",
    bar: "#3a7cb8",
  },
  {
    category: "Backend",
    icon: "\u2699\uFE0F",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 78 },
      { name: "Redis", level: 70 },
      { name: "GraphQL", level: 72 },
    ],
    accent: "var(--accent-about)",
    bar: "#4a8c5c",
  },
  {
    category: "Herramientas",
    icon: "\u{1F6E0}\uFE0F",
    skills: [
      { name: "Git", level: 92 },
      { name: "Docker", level: 78 },
      { name: "AWS", level: 72 },
      { name: "CI/CD", level: 80 },
      { name: "Figma", level: 70 },
    ],
    accent: "var(--accent-experience)",
    bar: "#7b5ea7",
  },
];

export default function SkillsContent() {
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
        Habilidades
      </h2>

      <Divider />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          marginTop: "0.8rem",
        }}
      >
        {skillCategories.map((cat, ci) => (
          <div
            key={cat.category}
            style={{
              animation: `waveIn 0.4s ease-out ${0.12 + ci * 0.08}s both`,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: "0.55rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span>{cat.icon}</span>
              {cat.category}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {cat.skills.map((skill) => (
                <div key={skill.name}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.15rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        color: "var(--ink-light)",
                      }}
                    >
                      {skill.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--ink-light)",
                        opacity: 0.6,
                      }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  {/* Progress bar styled as enchanted meter */}
                  <div
                    style={{
                      height: 6,
                      borderRadius: 999,
                      background: "rgba(139,105,20,0.12)",
                      overflow: "hidden",
                      border: "1px solid rgba(139,105,20,0.15)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${skill.level}%`,
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${cat.bar}, ${cat.bar}cc)`,
                        transition: "width 0.8s ease-out",
                      }}
                    />
                  </div>
                </div>
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
