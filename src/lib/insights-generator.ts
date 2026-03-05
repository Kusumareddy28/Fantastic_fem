import { UserProfile, DailyLog, WellnessInsight } from "./storage";

const nutritionTips = [
  { title: "Boost Iron Intake", content: "During your cycle, your body loses iron. Include spinach, lentils, and dark chocolate in your meals to replenish iron stores naturally.", icon: "🥬" },
  { title: "Hydration Reminder", content: "Aim for 8-10 glasses of water today. Proper hydration helps reduce bloating and supports your body's natural detox processes.", icon: "💧" },
  { title: "Anti-Inflammatory Foods", content: "Try adding turmeric, ginger, and omega-3 rich foods like salmon to reduce inflammation and ease menstrual discomfort.", icon: "🍊" },
  { title: "Magnesium-Rich Snacks", content: "Almonds, dark chocolate, and bananas are great sources of magnesium — helping with cramps and improving sleep quality.", icon: "🍫" },
];

const exerciseTips = [
  { title: "Gentle Movement Day", content: "Your body may benefit from low-impact exercises today. Try a 20-minute yoga flow or a gentle walk in nature.", icon: "🧘" },
  { title: "Strength Training Window", content: "Your energy levels suggest it's a great time for strength training. Focus on compound movements for maximum benefit.", icon: "💪" },
  { title: "Stretching & Recovery", content: "Dedicate 15 minutes to deep stretching today. Focus on hip openers and hamstring stretches to release tension.", icon: "🌸" },
  { title: "Cardio Boost", content: "A moderate cardio session of 30 minutes can help elevate mood and energy. Try dancing, cycling, or brisk walking.", icon: "🏃‍♀️" },
];

const stressTips = [
  { title: "Breathing Exercise", content: "Try the 4-7-8 technique: Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 4 times to activate your calm response.", icon: "🌬️" },
  { title: "Digital Detox Hour", content: "Schedule one hour today without screens. Read a book, journal, or spend time in nature to reset your nervous system.", icon: "📵" },
  { title: "Gratitude Practice", content: "Write down 3 things you're grateful for today. This simple practice rewires your brain for positivity and reduces cortisol.", icon: "✨" },
  { title: "Body Scan Meditation", content: "Spend 10 minutes doing a body scan meditation before bed. Notice areas of tension and consciously release them.", icon: "🧠" },
];

const cycleTips = [
  { title: "Follicular Phase Energy", content: "You may be entering your follicular phase — a great time to start new projects, socialize, and try new workouts!", icon: "🌱" },
  { title: "Luteal Phase Self-Care", content: "During the luteal phase, prioritize rest and nourishing foods. Your body is doing important work behind the scenes.", icon: "🌙" },
  { title: "Cycle Tracking Insight", content: "Consistent tracking helps identify patterns. Notice how your mood, energy, and cravings shift throughout your cycle.", icon: "📊" },
  { title: "Hormonal Balance", content: "Support hormonal balance with seeds: flax and pumpkin in the first half, sunflower and sesame in the second half of your cycle.", icon: "🌻" },
];

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateInsights(profile: UserProfile | null, logs: DailyLog[]): WellnessInsight[] {
  const now = new Date().toISOString();
  const allTips = [
    ...pickRandom(nutritionTips, 1).map(t => ({ ...t, category: "Nutrition" })),
    ...pickRandom(exerciseTips, 1).map(t => ({ ...t, category: "Fitness" })),
    ...pickRandom(stressTips, 1).map(t => ({ ...t, category: "Stress Management" })),
    ...pickRandom(cycleTips, 1).map(t => ({ ...t, category: "Cycle Awareness" })),
  ];

  // Personalize based on latest log
  const latestLog = logs[0];
  if (latestLog) {
    if (latestLog.energyLevel <= 3) {
      allTips.push({
        category: "Energy",
        title: "Low Energy Support",
        content: "Your energy has been low. Try a B-vitamin rich breakfast with eggs and whole grains, and consider a short afternoon nap (20 min max).",
        icon: "⚡",
      });
    }
    if (latestLog.sleepHours < 7) {
      allTips.push({
        category: "Sleep",
        title: "Sleep Improvement",
        content: `You logged ${latestLog.sleepHours} hours of sleep. Try a warm chamomile tea and put devices away 1 hour before bedtime for better rest.`,
        icon: "😴",
      });
    }
  }

  if (profile && profile.stressLevel === "high") {
    allTips.push({
      category: "Stress Management",
      title: "High Stress Alert",
      content: "Your stress levels are elevated. Consider scheduling a self-care activity today — even 10 minutes of mindfulness can make a difference.",
      icon: "🫶",
    });
  }

  return allTips.map((tip, i) => ({
    id: `insight-${Date.now()}-${i}`,
    date: now,
    ...tip,
  }));
}
