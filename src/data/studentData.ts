export interface Student {
  student_id: string;
  name: string;
  class: string;
  comprehension: number;
  attention: number;
  focus: number;
  retention: number;
  assessment_score: number;
  engagement_time: number;
}

export interface LearningPersona {
  name: string;
  description: string;
  characteristics: string[];
  color: string;
}

// Synthetic student data generation
const generateStudentData = (): Student[] => {
  const firstNames = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Oliver', 'Isabella', 'Elijah',
    'Sophia', 'Lucas', 'Charlotte', 'Mason', 'Amelia', 'Logan', 'Mia', 'Alexander',
    'Harper', 'Ethan', 'Evelyn', 'Jacob', 'Abigail', 'Michael', 'Emily', 'Benjamin',
    'Elizabeth', 'Sebastian', 'Sofia', 'Jack', 'Avery', 'Owen', 'Ella', 'Theodore',
    'Scarlett', 'Aiden', 'Grace', 'Samuel', 'Chloe', 'Joseph', 'Victoria', 'John',
    'Riley', 'David', 'Aria', 'Wyatt', 'Zoey', 'Matthew', 'Lily', 'Luke', 'Eleanor',
    'Asher', 'Hannah', 'Carter', 'Lillian', 'Julian', 'Addison', 'Grayson', 'Aubrey'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
    'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'
  ];

  const classes = ['Math', 'Science', 'English', 'History', 'Art', 'Music', 'PE'];

  const students: Student[] = [];

  for (let i = 1; i <= 150; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    // Generate correlated cognitive skills
    const basePerformance = Math.random() * 0.6 + 0.2; // 0.2 to 0.8 base
    const noise = () => (Math.random() - 0.5) * 0.3; // Add some noise
    
    const comprehension = Math.max(0, Math.min(100, (basePerformance + noise()) * 100));
    const attention = Math.max(0, Math.min(100, (basePerformance + noise()) * 100));
    const focus = Math.max(0, Math.min(100, (basePerformance + noise()) * 100));
    const retention = Math.max(0, Math.min(100, (basePerformance + noise()) * 100));
    
    // Assessment score based on cognitive skills with some randomness
    const cognitiveAvg = (comprehension + attention + focus + retention) / 4;
    const assessment_score = Math.max(0, Math.min(100, cognitiveAvg + (Math.random() - 0.5) * 20));
    
    // Engagement time somewhat correlated with performance
    const engagement_time = Math.max(10, Math.min(120, 30 + (basePerformance * 60) + (Math.random() - 0.5) * 30));

    students.push({
      student_id: `STU${i.toString().padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      class: classes[Math.floor(Math.random() * classes.length)],
      comprehension: Math.round(comprehension * 10) / 10,
      attention: Math.round(attention * 10) / 10,
      focus: Math.round(focus * 10) / 10,
      retention: Math.round(retention * 10) / 10,
      assessment_score: Math.round(assessment_score * 10) / 10,
      engagement_time: Math.round(engagement_time * 10) / 10
    });
  }

  return students;
};

export const studentData = generateStudentData();

// Calculate correlations
export const calculateCorrelation = (x: number[], y: number[]): number => {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((total, xi, i) => total + xi * y[i], 0);
  const sumX2 = x.reduce((total, xi) => total + xi * xi, 0);
  const sumY2 = y.reduce((total, yi) => total + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  return denominator === 0 ? 0 : numerator / denominator;
};

// Student clustering based on performance patterns
export const clusterStudents = (students: Student[]): { student: Student; persona: string }[] => {
  return students.map(student => {
    const cognitiveAvg = (student.comprehension + student.attention + student.focus + student.retention) / 4;
    const engagementLevel = student.engagement_time > 60 ? 'high' : student.engagement_time > 35 ? 'medium' : 'low';
    const performanceLevel = cognitiveAvg > 75 ? 'high' : cognitiveAvg > 50 ? 'medium' : 'low';

    let persona = '';
    if (performanceLevel === 'high' && engagementLevel === 'high') {
      persona = 'High Achiever';
    } else if (performanceLevel === 'high' && engagementLevel === 'medium') {
      persona = 'Efficient Learner';
    } else if (performanceLevel === 'medium' && engagementLevel === 'high') {
      persona = 'Engaged Learner';
    } else if (performanceLevel === 'medium' && engagementLevel === 'medium') {
      persona = 'Steady Performer';
    } else if (engagementLevel === 'low') {
      persona = 'Needs Support';
    } else {
      persona = 'Developing Learner';
    }

    return { student, persona };
  });
};

export const learningPersonas: LearningPersona[] = [
  {
    name: 'High Achiever',
    description: 'Students with excellent cognitive skills and high engagement',
    characteristics: ['High comprehension', 'Strong attention span', 'Excellent retention', 'High engagement time'],
    color: '#16a34a'
  },
  {
    name: 'Efficient Learner',
    description: 'High performers who learn effectively in moderate time',
    characteristics: ['Strong cognitive skills', 'Efficient study habits', 'Good time management'],
    color: '#2563eb'
  },
  {
    name: 'Engaged Learner',
    description: 'Students with moderate skills but high motivation',
    characteristics: ['High engagement', 'Good effort', 'Room for skill development'],
    color: '#7c3aed'
  },
  {
    name: 'Steady Performer',
    description: 'Consistent students with balanced performance',
    characteristics: ['Stable performance', 'Consistent engagement', 'Reliable progress'],
    color: '#0891b2'
  },
  {
    name: 'Developing Learner',
    description: 'Students showing potential with targeted support',
    characteristics: ['Emerging skills', 'Variable performance', 'Growth opportunity'],
    color: '#ea580c'
  },
  {
    name: 'Needs Support',
    description: 'Students requiring additional attention and resources',
    characteristics: ['Low engagement', 'Skill gaps', 'Requires intervention'],
    color: '#dc2626'
  }
];

export const getInsights = (students: Student[]) => {
  const correlations = {
    comprehensionToScore: calculateCorrelation(
      students.map(s => s.comprehension),
      students.map(s => s.assessment_score)
    ),
    attentionToScore: calculateCorrelation(
      students.map(s => s.attention),
      students.map(s => s.assessment_score)
    ),
    focusToScore: calculateCorrelation(
      students.map(s => s.focus),
      students.map(s => s.assessment_score)
    ),
    retentionToScore: calculateCorrelation(
      students.map(s => s.retention),
      students.map(s => s.assessment_score)
    ),
    engagementToScore: calculateCorrelation(
      students.map(s => s.engagement_time),
      students.map(s => s.assessment_score)
    )
  };

  const avgScore = students.reduce((sum, s) => sum + s.assessment_score, 0) / students.length;
  const avgEngagement = students.reduce((sum, s) => sum + s.engagement_time, 0) / students.length;

  const clusteredStudents = clusterStudents(students);
  const personaCounts = clusteredStudents.reduce((acc, { persona }) => {
    acc[persona] = (acc[persona] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    correlations,
    avgScore: Math.round(avgScore * 10) / 10,
    avgEngagement: Math.round(avgEngagement * 10) / 10,
    personaCounts,
    totalStudents: students.length
  };
};