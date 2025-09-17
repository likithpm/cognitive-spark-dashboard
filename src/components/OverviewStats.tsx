import { MetricCard } from "./MetricCard";
import { GraduationCap, Users, Clock, TrendingUp } from "lucide-react";
import { studentData, getInsights } from "../data/studentData";

export const OverviewStats = () => {
  const insights = getInsights(studentData);
  
  const topPerformers = studentData.filter(s => s.assessment_score > 80).length;
  const avgCognitiveSkills = studentData.reduce((sum, s) => 
    sum + (s.comprehension + s.attention + s.focus + s.retention) / 4, 0) / studentData.length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Students"
        value={insights.totalStudents}
        subtitle="Active learners"
        icon={Users}
      />
      <MetricCard
        title="Average Score"
        value={`${insights.avgScore}%`}
        subtitle="Assessment performance"
        icon={GraduationCap}
        trend={{ value: 5.2, isPositive: true }}
      />
      <MetricCard
        title="Avg Engagement"
        value={`${insights.avgEngagement}min`}
        subtitle="Time per session"
        icon={Clock}
        trend={{ value: 2.1, isPositive: true }}
      />
      <MetricCard
        title="Top Performers"
        value={topPerformers}
        subtitle="Score > 80%"
        icon={TrendingUp}
      />
    </div>
  );
};