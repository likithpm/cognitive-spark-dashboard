# Student Performance & Cognitive Skills Dashboard

Advanced educational analytics platform analyzing cognitive skills, performance correlations, and learning personas for data-driven educational excellence.

## 🎯 Project Overview

This dashboard provides comprehensive insights into student performance through:
- **Synthetic Dataset**: 150 students with realistic cognitive metrics
- **Statistical Analysis**: Real correlation calculations between skills and performance  
- **Machine Learning**: Student clustering into 6 learning personas
- **Interactive Visualizations**: Charts, scatter plots, and radar diagrams
- **Searchable Database**: Complete student profiles with sorting and filtering

## 🚀 Features

### 📊 Dashboard
- Performance overview with key metrics
- Quick access to all sections
- Latest insights summary
- Actionable recommendations

### 📈 Analytics
- **Correlation Bar Chart**: Skill-performance relationships
- **Scatter Plot**: Attention vs performance visualization
- **Radar Chart**: Top performer cognitive profiles
- Statistical significance indicators

### 🧠 Insights
- Key findings from data analysis
- Learning persona distribution
- Correlation strength analysis
- Evidence-based recommendations

### 👥 Students
- Searchable and sortable student table
- Individual performance profiles
- Learning persona classifications
- Top performer leaderboard

## 🎨 Design System

Built with a professional educational theme featuring:
- **Primary Colors**: Educational blue (#1e40af) and teal (#0f766e)
- **Semantic Tokens**: HSL-based color system for consistency
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: Smooth transitions and hover effects
- **Accessibility**: High contrast ratios and semantic HTML

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts for data visualization
- **Routing**: React Router v6
- **Build Tool**: Vite
- **State Management**: React Query for data fetching

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── MetricCard.tsx  # Metric display component
│   ├── OverviewStats.tsx
│   ├── ChartsSection.tsx
│   ├── StudentTable.tsx
│   └── InsightsSection.tsx
├── data/
│   └── studentData.ts  # Synthetic dataset & analysis functions
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── Dashboard.tsx   # Main overview
│   ├── Analytics.tsx   # Charts and visualizations
│   ├── Insights.tsx    # Key findings and personas
│   ├── Students.tsx    # Student database
│   └── NotFound.tsx    # 404 page
└── lib/
    └── utils.ts        # Utility functions
```

## 📊 Data Analysis

### Cognitive Skills Measured
- **Comprehension**: Reading and understanding ability
- **Attention**: Focus and concentration levels  
- **Focus**: Sustained attention capacity
- **Retention**: Memory and recall performance
- **Engagement Time**: Active learning duration

### Learning Personas (ML Clustering)
1. **High Achiever**: Excellent skills + high engagement
2. **Efficient Learner**: Strong skills + moderate time
3. **Engaged Learner**: Moderate skills + high motivation
4. **Steady Performer**: Consistent balanced performance
5. **Developing Learner**: Emerging skills with potential
6. **Needs Support**: Requires additional intervention

### Statistical Methods
- **Pearson Correlation**: Skill-performance relationships
- **K-means Clustering**: Student persona identification
- **Performance Distribution**: Academic achievement analysis
- **Predictive Modeling**: Assessment score prediction

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <GIT_URL>

# Navigate to project directory
cd student-performance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Deployment
```bash
# Build for production
npm run build

# Preview production build
npm run preview

---
[Deploy to Vercel](https://vercel.com) | [View Live Demo](https://your-domain.com)