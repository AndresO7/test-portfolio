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

function getBridgeAngles(islandId: string): number[] {
  const island = ISLANDS.find((i) => i.id === islandId)!;
  return BRIDGES.filter((b) => b.from === islandId || b.to === islandId).map(
    (b) => {
      const otherId = b.from === islandId ? b.to : b.from;
      const other = ISLANDS.find((i) => i.id === otherId)!;
      const dx = other.position[0] - island.position[0];
      const dz = other.position[2] - island.position[2];
      const a = Math.atan2(dz, dx);
      return a < 0 ? a + 2 * Math.PI : a;
    },
  );
}

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
            bridgeAngles={getBridgeAngles(island.id)}
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
