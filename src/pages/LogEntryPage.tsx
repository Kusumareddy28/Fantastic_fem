import { useState } from "react";
import { motion } from "framer-motion";
import { PenLine, Check } from "lucide-react";
import { saveLog, type DailyLog } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const moods = [
  { value: "great", emoji: "😊", label: "Great" },
  { value: "good", emoji: "🙂", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "low", emoji: "😔", label: "Low" },
  { value: "stressed", emoji: "😰", label: "Stressed" },
];

const symptomOptions = ["Cramps", "Headache", "Bloating", "Fatigue", "Backache", "Nausea", "Acne", "Cravings", "Insomnia", "Anxiety"];

export default function LogEntryPage() {
  const navigate = useNavigate();
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState(5);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [activity, setActivity] = useState("");
  const [food, setFood] = useState("");
  const [sleep, setSleep] = useState(7);
  const [saved, setSaved] = useState(false);

  const toggleSymptom = (s: string) => {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleSubmit = () => {
    if (!mood) {
      toast.error("Please select your mood");
      return;
    }
    const log: DailyLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString(),
      mood,
      energyLevel: energy,
      symptoms,
      physicalActivity: activity,
      foodIntake: food,
      sleepHours: sleep,
    };
    saveLog(log);
    setSaved(true);
    toast.success("Daily log saved!");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  if (saved) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-sage mx-auto mb-4">
          <Check className="h-10 w-10 text-sage-deep" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold">Logged!</h2>
        <p className="text-muted-foreground mt-2">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold flex items-center gap-2">
          <PenLine className="h-7 w-7 text-primary" /> Daily Log
        </h1>
        <p className="text-muted-foreground mt-1">How are you feeling today?</p>
      </div>

      <div className="space-y-8">
        {/* Mood */}
        <section>
          <label className="font-display font-semibold text-lg block mb-3">Mood</label>
          <div className="flex gap-3 flex-wrap">
            {moods.map(m => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className={`flex flex-col items-center gap-1 rounded-2xl px-5 py-3 transition-all border-2 ${
                  mood === m.value ? "border-primary bg-primary/10 scale-105" : "border-border hover:border-primary/30"
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-xs font-medium">{m.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Energy */}
        <section>
          <label className="font-display font-semibold text-lg block mb-3">Energy Level: {energy}/10</label>
          <input
            type="range"
            min={1}
            max={10}
            value={energy}
            onChange={e => setEnergy(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Exhausted</span><span>Energized</span>
          </div>
        </section>

        {/* Sleep */}
        <section>
          <label className="font-display font-semibold text-lg block mb-3">Sleep: {sleep} hours</label>
          <input
            type="range"
            min={0}
            max={14}
            step={0.5}
            value={sleep}
            onChange={e => setSleep(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0h</span><span>14h</span>
          </div>
        </section>

        {/* Symptoms */}
        <section>
          <label className="font-display font-semibold text-lg block mb-3">Symptoms</label>
          <div className="flex flex-wrap gap-2">
            {symptomOptions.map(s => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all border ${
                  symptoms.includes(s) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/30 text-muted-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Activity */}
        <section>
          <label className="font-display font-semibold text-lg block mb-3">Physical Activity</label>
          <textarea
            value={activity}
            onChange={e => setActivity(e.target.value)}
            placeholder="e.g., 30 min yoga, walking, strength training..."
            className="w-full rounded-xl border border-border bg-card p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            rows={2}
          />
        </section>

        {/* Food */}
        <section>
          <label className="font-display font-semibold text-lg block mb-3">Food Intake</label>
          <textarea
            value={food}
            onChange={e => setFood(e.target.value)}
            placeholder="e.g., Oatmeal with berries, grilled chicken salad..."
            className="w-full rounded-xl border border-border bg-card p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            rows={2}
          />
        </section>

        <Button onClick={handleSubmit} size="lg" className="w-full rounded-full text-base">
          Save Daily Log
        </Button>
      </div>
    </div>
  );
}
