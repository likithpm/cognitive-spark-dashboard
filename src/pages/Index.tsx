import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, BarChart3, Brain, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // Auto-redirect to dashboard after a brief moment
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const features = [
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Interactive charts showing cognitive skill correlations"
    },
    {
      icon: Brain,
      title: "Learning Insights",
      description: "Data-driven findings and student personas"
    },
    {
      icon: Users,
      title: "Student Database",
      description: "Searchable table with detailed student profiles"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo and Welcome */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GraduationCap className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Student Performance Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive cognitive skills analysis and learning analytics platform 
            for educational excellence and data-driven insights.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid gap-6 md:grid-cols-3 my-12">
          {features.map((feature, index) => (
            <Card key={index} className="metric-card">
              <CardContent className="p-6 text-center">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            Enter Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate("/students")}
          >
            Browse Students
          </Button>
        </div>

        {/* Auto-redirect notice */}
        <div className="text-sm text-muted-foreground">
          Automatically redirecting to dashboard in 3 seconds...
        </div>
      </div>
    </div>
  );
};

export default Index;