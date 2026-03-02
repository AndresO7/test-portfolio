"use client";

import { ISLANDS, BRIDGES } from "@/lib/constants";
import FloatingIsland from "./FloatingIsland";
import Bridge from "./Bridge";
import House from "./House";
import AboutIsland from "@/components/islands/AboutIsland";
import ProjectsIsland from "@/components/islands/ProjectsIsland";
import SkillsIsland from "@/components/islands/SkillsIsland";
import ExperienceIsland from "@/components/islands/ExperienceIsland";
import ContactIsland from "@/components/islands/ContactIsland";
import { SectionId } from "@/lib/types";

const islandDecorations: Record<string, React.ComponentType> = {
  about: AboutIsland,
  projects: ProjectsIsland,
  skills: SkillsIsland,
  experience: ExperienceIsland,
  contact: ContactIsland,
};

export default function IslandLayout() {
  return (
    <group>
      {ISLANDS.map((island) => {
        const Decorations = islandDecorations[island.id];
        return (
          <FloatingIsland
            key={island.id}
            position={island.position}
            radius={island.radius}
            color={island.color}
            rockColor={island.rockColor}
          >
            <House
              sectionId={island.id as SectionId}
              label={island.name}
            />
            {Decorations && <Decorations />}
          </FloatingIsland>
        );
      })}

      {BRIDGES.map((bridge) => {
        const fromIsland = ISLANDS.find((i) => i.id === bridge.from)!;
        const toIsland = ISLANDS.find((i) => i.id === bridge.to)!;
        return (
          <Bridge
            key={`${bridge.from}-${bridge.to}`}
            from={fromIsland.position}
            to={toIsland.position}
            fromRadius={fromIsland.radius}
            toRadius={toIsland.radius}
          />
        );
      })}
    </group>
  );
}
