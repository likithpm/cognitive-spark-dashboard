import { OverviewStats } from "@/components/OverviewStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3, Brain, Users, TrendingUp, ArrowRight } from "lucide-react";
import { studentData, getInsights } from "@/data/studentData";

const Dashboard = () => {
  const insights = getInsights(studentData);

  const quickStats = [
    {
      title: "Total Students",
      value: insights.totalStudents,
      description: "Active learners in system",
      link: "/students",
      icon: Users,
    },
    {
      title: "Avg Performance",
      value: `${insights.avgScore}%`,
      description: "Overall assessment scores",
      link: "/analytics",
      icon: TrendingUp,
    },
    {
      title: "Learning Personas",
      value: Object.keys(insights.personaCounts).length,
      description: "Identified learning patterns",
      link: "/insights",
      icon: Brain,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <section className="text-center py-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Your Analytics Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor student performance, analyze cognitive skills, and discover learning patterns 
            through comprehensive data insights.
          </p>
        </section>

        {/* Overview Stats */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Performance Overview</h2>
          </div>
          <OverviewStats />
        </section>

        {/* Quick Access Cards */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Quick Access</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {quickStats.map((stat, index) => (
              <Card key={index} className="metric-card group hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <stat.icon className="h-8 w-8 text-primary" />
                    <div className="text-right">
                      <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                      <CardTitle className="text-lg">{stat.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4">{stat.description}</p>
                  <Link to={stat.link}>
                    <Button 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Insights Summary */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Latest Insights</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="chart-container">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Correlation Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Comprehension ↔ Performance</span>
                    <span className="text-sm font-bold text-primary">
                      {(insights.correlations.comprehensionToScore * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Attention ↔ Performance</span>
                    <span className="text-sm font-bold text-secondary">
                      {(insights.correlations.attentionToScore * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Retention ↔ Performance</span>
                    <span className="text-sm font-bold text-accent">
                      {(insights.correlations.retentionToScore * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <Link to="/insights" className="block mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Analysis
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="chart-container">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-secondary" />
                  Student Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">High Performers</span>
                    <span className="text-sm font-bold text-emerald-600">
                      {studentData.filter(s => s.assessment_score >= 80).length} students
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Moderate Performers</span>
                    <span className="text-sm font-bold text-blue-600">
                      {studentData.filter(s => s.assessment_score >= 60 && s.assessment_score < 80).length} students
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Need Support</span>
                    <span className="text-sm font-bold text-orange-600">
                      {studentData.filter(s => s.assessment_score < 60).length} students
                    </span>
                  </div>
                </div>
                <Link to="/students" className="block mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Student List
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Action Items */}
        <section>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Recommended Actions
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Focus on Attention Training</p>
                    <p className="text-xs text-muted-foreground">
                      Strong correlation between attention and performance suggests targeted interventions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                  <div>
                    <p className="font-medium text-sm">Support Low Performers</p>
                    <p className="text-xs text-muted-foreground">
                      {studentData.filter(s => s.assessment_score < 60).length} students need additional resources
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;