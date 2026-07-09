import { SceneStudy } from "@/components/SceneStudy";
import { getScenariosByCategory } from "@/lib/content";

export default function TravelScenePage() {
  return <SceneStudy category="travel" scenarios={getScenariosByCategory("travel")} />;
}
