import { ChartsSection } from "@/components/ChartsSection";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Page Header */}
        <section className="text-center py-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Performance Analytics</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize relationships between cognitive skills and academic performance through 
            interactive charts and statistical analysis.
          </p>
        </section>

        {/* Charts Section */}
        <section>
          <ChartsSection />
        </section>

        {/* Analysis Summary */}
        <section>
          <Card className="bg-muted/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Chart Analysis Guide</h3>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div>
                  <h4 className="font-medium mb-2 text-primary">Correlation Chart</h4>
                  <p className="text-muted-foreground">
                    Shows the statistical relationship between each cognitive skill and assessment performance. 
                    Higher values indicate stronger predictive power.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-secondary">Scatter Plot</h4>
                  <p className="text-muted-foreground">
                    Visualizes the direct relationship between attention scores and performance. 
                    Each dot represents a student's position on both metrics.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-accent">Radar Chart</h4>
                  <p className="text-muted-foreground">
                    Compares the cognitive skill profiles of top-performing students. 
                    Shows patterns in high-achiever characteristics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Analytics;