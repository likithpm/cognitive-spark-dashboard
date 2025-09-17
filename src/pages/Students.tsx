import { StudentTable } from "@/components/StudentTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Clock, Award } from "lucide-react";
import { studentData, clusterStudents, learningPersonas } from "@/data/studentData";

const Students = () => {
  const clusteredStudents = clusterStudents(studentData);
  
  const topPerformers = studentData
    .sort((a, b) => b.assessment_score - a.assessment_score)
    .slice(0, 5);

  const personaStats = learningPersonas.map(persona => ({
    ...persona,
    count: clusteredStudents.filter(cs => cs.persona === persona.name).length,
    avgScore: clusteredStudents
      .filter(cs => cs.persona === persona.name)
      .reduce((sum, cs) => sum + cs.student.assessment_score, 0) / 
      Math.max(1, clusteredStudents.filter(cs => cs.persona === persona.name).length)
  }));

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Page Header */}
        <section className="text-center py-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Student Database</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore individual student profiles, search by name or class, and analyze 
            performance patterns across the entire student population.
          </p>
        </section>

        {/* Quick Stats */}
        <section>
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card className="metric-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Total Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentData.length}</div>
              </CardContent>
            </Card>
            
            <Card className="metric-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Top Performer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{topPerformers[0]?.name.split(' ')[0]}</div>
                <div className="text-sm text-muted-foreground">{topPerformers[0]?.assessment_score}%</div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Avg Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(studentData.reduce((sum, s) => sum + s.assessment_score, 0) / studentData.length).toFixed(1)}%
                </div>
              </CardContent>
            </Card>

            <Card className="metric-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Avg Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(studentData.reduce((sum, s) => sum + s.engagement_time, 0) / studentData.length).toFixed(0)}min
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Student Table */}
        <section>
          <StudentTable />
        </section>

        {/* Learning Personas Summary */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-6 w-6 text-secondary" />
            <h2 className="text-2xl font-semibold">Learning Personas Overview</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {personaStats.map((persona) => (
              <Card key={persona.name} className="chart-container">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: persona.color }}
                      />
                      {persona.name}
                    </CardTitle>
                    <Badge variant="secondary">
                      {persona.count} students
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{persona.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Avg Score:</span>
                    <span className="font-bold text-primary">
                      {persona.count > 0 ? persona.avgScore.toFixed(1) : '0'}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-muted-foreground">
                      {((persona.count / studentData.length) * 100).toFixed(1)}% of total students
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Performers */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-semibold">Top Performers</h2>
          </div>
          <Card className="chart-container">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-5">
                {topPerformers.map((student, index) => (
                  <div key={student.student_id} className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-lg font-bold text-accent">#{index + 1}</div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.class}</div>
                    <div className="text-lg font-bold text-primary mt-2">
                      {student.assessment_score}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {student.engagement_time.toFixed(0)}min engagement
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Students;