import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import { getInsights, saveInsights, getLogs, getProfile, type WellnessInsight } from "@/lib/storage";
import { generateInsights } from "@/lib/insights-generator";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";

const categoryColors: Record<string, string> = {
  Nutrition: "gradient-card-sage",
  Fitness: "gradient-card-peach",
  "Stress Management": "gradient-card-lavender",
  "Cycle Awareness": "gradient-card-rose",
  Energy: "gradient-card-peach",
  Sleep: "gradient-card-lavender",
};

export default function InsightsPage() {
  const [insights, setInsights] = useState<WellnessInsight[]>(getInsights());

  const refresh = () => {
    const newInsights = generateInsights(getProfile(), getLogs());
    saveInsights(newInsights);
    setInsights(newInsights);
  };

  useEffect(() => { if (insights.length === 0) refresh(); }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div className="flex items-center gap-5">
          <img src={heroIllustration} alt="" className="hidden sm:block w-20 h-20 object-contain opacity-60" />
          <div>
            <h1 className="font-display text-3xl font-bold flex items-center gap-2">
              <Sparkles className="h-7 w-7 text-primary" /> Wellness Insights
            </h1>
            <p className="text-muted-foreground mt-1">Personalized guidance based on your data</p>
          </div>
        </div>
        <Button onClick={refresh} variant="outline" className="gap-2 rounded-full">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`${categoryColors[insight.category] || "gradient-card-rose"} rounded-2xl p-6`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{insight.icon}</span>
              <div className="flex-1">
                <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">{insight.category}</span>
                <h3 className="font-display text-lg font-semibold mt-2">{insight.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{insight.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          ⚕️ These insights are for wellness guidance only and do not constitute medical advice. Consult a healthcare provider for any medical concerns.
        </p>
      </div>
    </div>
  );
}
