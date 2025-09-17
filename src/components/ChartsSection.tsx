import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { studentData, getInsights } from "../data/studentData";

export const ChartsSection = () => {
  const insights = getInsights(studentData);

  // Skills vs Score data for bar chart
  const skillsData = [
    { skill: 'Comprehension', correlation: insights.correlations.comprehensionToScore },
    { skill: 'Attention', correlation: insights.correlations.attentionToScore },
    { skill: 'Focus', correlation: insights.correlations.focusToScore },
    { skill: 'Retention', correlation: insights.correlations.retentionToScore },
    { skill: 'Engagement', correlation: insights.correlations.engagementToScore },
  ];

  // Attention vs Performance scatter data
  const scatterData = studentData.map(student => ({
    attention: student.attention,
    performance: student.assessment_score,
    name: student.name.split(' ')[0],
  }));

  // Sample student radar data (top 5 performers)
  const topStudents = studentData
    .sort((a, b) => b.assessment_score - a.assessment_score)
    .slice(0, 5);

  const radarData = [
    { skill: 'Comprehension', ...Object.fromEntries(topStudents.map((s, i) => [`student${i}`, s.comprehension])) },
    { skill: 'Attention', ...Object.fromEntries(topStudents.map((s, i) => [`student${i}`, s.attention])) },
    { skill: 'Focus', ...Object.fromEntries(topStudents.map((s, i) => [`student${i}`, s.focus])) },
    { skill: 'Retention', ...Object.fromEntries(topStudents.map((s, i) => [`student${i}`, s.retention])) },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Skills Correlation Bar Chart */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Skill-Performance Correlations</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillsData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="skill" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis fontSize={12} />
              <Tooltip 
                formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Correlation']}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="correlation" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Attention vs Performance Scatter */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Attention vs Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={scatterData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="attention" 
                name="Attention Score"
                fontSize={12}
              />
              <YAxis 
                dataKey="performance" 
                name="Assessment Score"
                fontSize={12}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value: number, name: string) => [
                  `${value.toFixed(1)}`, 
                  name === 'performance' ? 'Assessment Score' : 'Attention Score'
                ]}
                labelFormatter={(label, payload) => payload?.[0]?.payload?.name ? `Student: ${payload[0].payload.name}` : ''}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Scatter 
                dataKey="performance" 
                fill="hsl(var(--chart-2))"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Students Radar Chart */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Top 5 Students Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid className="opacity-30" />
              <PolarAngleAxis dataKey="skill" fontSize={12} />
              <PolarRadiusAxis 
                domain={[0, 100]} 
                fontSize={10}
                tickCount={5}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              {topStudents.map((student, index) => (
                <Radar
                  key={student.student_id}
                  name={student.name.split(' ')[0]}
                  dataKey={`student${index}`}
                  stroke={`hsl(var(--chart-${(index % 5) + 1}))`}
                  fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};