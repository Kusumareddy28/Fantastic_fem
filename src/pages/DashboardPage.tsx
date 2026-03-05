import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Heart, Moon, Zap, Droplets, Activity } from "lucide-react";
import { getLogs, getProfile, getInsights, saveInsights, type DailyLog } from "@/lib/storage";
import { generateInsights } from "@/lib/insights-generator";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import moonCycle from "@/assets/moon-cycle.png";

const moodEmojis: Record<string, string> = {
  great: "😊", good: "🙂", okay: "😐", low: "😔", stressed: "😰",
};

export default function DashboardPage() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [insights, setInsights] = useState(getInsights());
  const profile = getProfile();

  useEffect(() => { setLogs(getLogs()); }, []);

  const refreshInsights = () => {
    const newInsights = generateInsights(profile, logs);
    saveInsights(newInsights);
    setInsights(newInsights);
  };

  useEffect(() => { if (insights.length === 0) refreshInsights(); }, []);

  const latestLog = logs[0];
  const avgSleep = logs.length > 0 ? (logs.slice(0, 7).reduce((s, l) => s + l.sleepHours, 0) / Math.min(logs.length, 7)).toFixed(1) : "—";
  const avgEnergy = logs.length > 0 ? (logs.slice(0, 7).reduce((s, l) => s + l.energyLevel, 0) / Math.min(logs.length, 7)).toFixed(1) : "—";

  const statCards = [
    { label: "Today's Mood", value: latestLog ? moodEmojis[latestLog.mood] || latestLog.mood : "—", icon: Heart, bg: "gradient-card-rose" },
    { label: "Avg Sleep (7d)", value: avgSleep !== "—" ? `${avgSleep}h` : "—", icon: Moon, bg: "gradient-card-lavender" },
    { label: "Avg Energy (7d)", value: avgEnergy !== "—" ? `${avgEnergy}/10` : "—", icon: Zap, bg: "gradient-card-peach" },
    { label: "Total Logs", value: logs.length, icon: Calendar, bg: "gradient-card-sage" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with cycle illustration */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-5">
          <img src={moonCycle} alt="" className="hidden sm:block w-16 h-16 object-contain opacity-70" />
          <div>
            <h1 className="font-display text-3xl font-bold">
              Welcome{profile?.name ? `, ${profile.name}` : ""} 🌸
            </h1>
            <p className="text-muted-foreground mt-1">Here's your wellness overview</p>
          </div>
        </div>
        <Button onClick={refreshInsights} variant="outline" className="gap-2 rounded-full">
          <Sparkles className="h-4 w-4" /> Refresh Insights
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`${stat.bg} rounded-2xl p-5`}>
            <stat.icon className="h-5 w-5 text-primary mb-2" />
            <p className="text-2xl font-bold font-display">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Insights preview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> Today's Insights
          </h2>
          <Link to="/insights" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.slice(0, 4).map((insight, i) => (
            <motion.div key={insight.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{insight.icon}</span>
                <div>
                  <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">{insight.category}</span>
                  <h3 className="font-display font-semibold mt-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{insight.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent logs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" /> Recent Logs
          </h2>
          <Link to="/log" className="text-sm text-primary hover:underline">Add new →</Link>
        </div>
        {logs.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <Droplets className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No logs yet. Start tracking your wellness!</p>
            <Button asChild className="mt-4 rounded-full">
              <Link to="/log">Log Your Day</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.slice(0, 5).map((log) => (
              <div key={log.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{moodEmojis[log.mood] || "🙂"}</span>
                  <div>
                    <p className="font-medium text-sm">{new Date(log.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
                    <p className="text-xs text-muted-foreground">Energy {log.energyLevel}/10 · Sleep {log.sleepHours}h</p>
                  </div>
                </div>
                {log.symptoms.length > 0 && (
                  <div className="flex gap-1 flex-wrap justify-end">
                    {log.symptoms.slice(0, 3).map(s => (
                      <span key={s} className="text-xs bg-secondary rounded-full px-2 py-0.5">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
