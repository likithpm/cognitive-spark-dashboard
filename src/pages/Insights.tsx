import { InsightsSection } from "@/components/InsightsSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, Target } from "lucide-react";
import { studentData, getInsights } from "@/data/studentData";

const Insights = () => {
  const insights = getInsights(studentData);

  const recommendations = [
    {
      title: "Strengthen Attention Training",
      description: "Focus on mindfulness and concentration exercises to improve the strongest performance predictor.",
      priority: "High",
      color: "bg-red-100 text-red-800"
    },
    {
      title: "Personalized Learning Paths",
      description: "Create different learning approaches for each of the 6 identified student personas.",
      priority: "Medium",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      title: "Early Intervention Program",
      description: "Identify and support students in the 'Needs Support' category before performance declines further.",
      priority: "High",
      color: "bg-red-100 text-red-800"
    },
    {
      title: "Engagement Time Optimization",
      description: "Balance study time recommendations based on individual student engagement patterns.",
      priority: "Medium",
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Page Header */}
        <section className="text-center py-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Learning Insights</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover key findings from cognitive skills analysis and explore student learning personas 
            to inform educational strategies.
          </p>
        </section>

        {/* Main Insights */}
        <section>
          <InsightsSection />
        </section>

        {/* Recommendations */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-semibold">Actionable Recommendations</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.map((rec, index) => (
              <Card key={index} className="chart-container">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      {rec.title}
                    </CardTitle>
                    <Badge className={rec.color}>
                      {rec.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{rec.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Statistical Summary */}
        <section>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Statistical Summary
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-sm">
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-primary">
                    {(Math.max(...Object.values(insights.correlations)) * 100).toFixed(1)}%
                  </div>
                  <p className="text-muted-foreground">Strongest Correlation</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-secondary">
                    {Object.keys(insights.personaCounts).length}
                  </div>
                  <p className="text-muted-foreground">Learning Personas</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-accent">
                    {((studentData.filter(s => s.assessment_score >= 80).length / studentData.length) * 100).toFixed(1)}%
                  </div>
                  <p className="text-muted-foreground">High Performers</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-emerald-600">
                    {insights.avgEngagement}min
                  </div>
                  <p className="text-muted-foreground">Avg Engagement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Insights;