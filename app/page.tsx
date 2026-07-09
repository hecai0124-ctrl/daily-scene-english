import { HomeDashboard } from "@/components/HomeDashboard";
import { getTodayPlan } from "@/lib/content";

export default function Home() {
  return <HomeDashboard today={getTodayPlan()} />;
}
