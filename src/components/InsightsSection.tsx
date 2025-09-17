import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Brain, Clock } from "lucide-react";
import { studentData, getInsights, learningPersonas } from "../data/studentData";

export const InsightsSection = () => {
  const insights = getInsights(studentData);

  const keyFindings = [
    {
      title: "Strongest Predictor",
      value: Object.entries(insights.correlations)
        .reduce((a, b) => Math.abs(a[1]) > Math.abs(b[1]) ? a : b)[0]
        .replace('ToScore', '')
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .replace(/^\w/, c => c.toUpperCase()),
      correlation: Math.max(...Object.values(insights.correlations)),
      icon: Brain
    },
    {
      title: "Most Common Persona",
      value: Object.entries(insights.personaCounts)
        .reduce((a, b) => a[1] > b[1] ? a : b)[0],
      count: Math.max(...Object.values(insights.personaCounts)),
      icon: Users
    },
    {
      title: "Performance Range",
      value: `${Math.min(...studentData.map(s => s.assessment_score)).toFixed(1)}% - ${Math.max(...studentData.map(s => s.assessment_score)).toFixed(1)}%`,
      spread: Math.max(...studentData.map(s => s.assessment_score)) - Math.min(...studentData.map(s => s.assessment_score)),
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      {/* Key Insights */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {keyFindings.map((finding, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <finding.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">{finding.title}</p>
                  <p className="text-sm text-muted-foreground">{finding.value}</p>
                </div>
              </div>
              <div className="text-right">
                {finding.correlation && (
                  <Badge variant="secondary">
                    {(finding.correlation * 100).toFixed(1)}% correlation
                  </Badge>
                )}
                {finding.count && (
                  <Badge variant="secondary">
                    {finding.count} students
                  </Badge>
                )}
                {finding.spread && (
                  <Badge variant="secondary">
                    {finding.spread.toFixed(1)}% range
                  </Badge>
                )}
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="font-semibold text-sm mb-2 text-primary">
              Performance Distribution Analysis
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • <strong>{studentData.filter(s => s.assessment_score >= 80).length}</strong> students (
                {((studentData.filter(s => s.assessment_score >= 80).length / studentData.length) * 100).toFixed(1)}%
                ) are high performers (≥80%)
              </p>
              <p>
                • <strong>{studentData.filter(s => s.assessment_score >= 60 && s.assessment_score < 80).length}</strong> students (
                {((studentData.filter(s => s.assessment_score >= 60 && s.assessment_score < 80).length / studentData.length) * 100).toFixed(1)}%
                ) are moderate performers (60-79%)
              </p>
              <p>
                • <strong>{studentData.filter(s => s.assessment_score < 60).length}</strong> students (
                {((studentData.filter(s => s.assessment_score < 60).length / studentData.length) * 100).toFixed(1)}%
                ) need additional support (&lt;60%)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Personas Distribution */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-secondary" />
            Learning Personas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {learningPersonas.map((persona) => {
            const count = insights.personaCounts[persona.name] || 0;
            const percentage = (count / insights.totalStudents) * 100;
            
            return (
              <div key={persona.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: persona.color }}
                    />
                    <span className="font-medium text-sm">{persona.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">{persona.description}</p>
              </div>
            );
          })}
          
          <div className="mt-6 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
            <h4 className="font-semibold text-sm mb-2 text-secondary">
              Correlation Strengths
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="font-medium">Comprehension:</span> 
                <span>{(insights.correlations.comprehensionToScore * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Attention:</span>
                <span>{(insights.correlations.attentionToScore * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Focus:</span>
                <span>{(insights.correlations.focusToScore * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Retention:</span>
                <span>{(insights.correlations.retentionToScore * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};