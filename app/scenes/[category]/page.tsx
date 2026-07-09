import { notFound } from "next/navigation";
import { SceneStudy } from "@/components/SceneStudy";
import { getScenariosByCategory, type Category } from "@/lib/content";

type ScenePageProps = {
  params: {
    category: string;
  };
};

export function generateStaticParams() {
  return [{ category: "travel" }, { category: "work" }];
}

export const dynamicParams = false;

export default function ScenePage({ params }: ScenePageProps) {
  if (params.category !== "travel" && params.category !== "work") {
    notFound();
  }

  const category = params.category as Category;
  const scenarios = getScenariosByCategory(category);

  return <SceneStudy category={category} scenarios={scenarios} />;
}
