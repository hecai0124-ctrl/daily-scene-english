import { SceneStudy } from "@/components/SceneStudy";
import { getScenariosByCategory } from "@/lib/content";

export default function WorkScenePage() {
  return <SceneStudy category="work" scenarios={getScenariosByCategory("work")} />;
}
