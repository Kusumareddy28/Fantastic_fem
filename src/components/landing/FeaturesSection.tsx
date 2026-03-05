import { motion } from "framer-motion";
import { Heart, Sparkles, Moon, Activity, Apple, Brain } from "lucide-react";
import moonCycle from "@/assets/moon-cycle.png";
import selfCareJournal from "@/assets/self-care-journal.png";
import nutritionBowl from "@/assets/nutrition-bowl.png";
import wellnessYoga from "@/assets/wellness-yoga.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const glass = "border border-border/60 bg-background/55 backdrop-blur-md shadow-lg shadow-black/5";
const hoverLift = "transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10";

const features = [
  {
    icon: Moon,
    title: "Cycle Tracking",
    desc: "Understand your rhythms, spot patterns, and plan your month with clarity.",
    image: moonCycle,
    color: "gradient-card-lavender",
    tag: "Core",
  },
  {
    icon: Activity,
    title: "Wellness Logging",
    desc: "Track mood, energy, sleep, and symptoms in under a minute a day.",
    image: selfCareJournal,
    color: "gradient-card-rose",
    tag: "Daily",
  },
  {
    icon: Brain,
    title: "AI Insights",
    desc: "Get gentle, personalized suggestions based on your trends over time.",
    image: null,
    color: "gradient-card-peach",
    tag: "Smart",
  },
  {
    icon: Apple,
    title: "Nutrition Guide",
    desc: "Cycle-aware nutrition ideas to support cravings, recovery, and balance.",
    image: nutritionBowl,
    color: "gradient-card-sage",
    tag: "Guide",
  },
  {
    icon: Sparkles,
    title: "Daily Coaching",
    desc: "Lightweight check-ins that turn intentions into consistent habits.",
    image: null,
    color: "gradient-card-lavender",
    tag: "Support",
  },
  {
    icon: Heart,
    title: "Holistic Health",
    desc: "Mind, body, and self-care — organized in one calm, beautiful space.",
    image: wellnessYoga,
    color: "gradient-card-rose",
    tag: "Whole",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* background polish */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[900px] h-[320px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[520px] h-[520px] rounded-full bg-peach/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="text-center mb-14 md:mb-18"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-[0.22em] px-4 py-2 rounded-full border border-border/60 bg-background/40 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Features
          </motion.p>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-6 font-display text-3xl md:text-5xl font-semibold tracking-tight"
          >
            Everything you need, <span className="text-primary">in one place</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Built to feel modern and trustworthy — not “cute”. Clean cards, calm motion, and clear value.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {features.map((feat, i) => (
            <motion.article
              key={feat.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={i}
              className={`${feat.color} ${glass} ${hoverLift} rounded-3xl p-6 md:p-7 relative overflow-hidden group`}
            >
              {/* soft watermark image */}
              {feat.image && (
                <img
                  src={feat.image}
                  alt=""
                  className="absolute -bottom-6 -right-6 w-28 h-28 object-contain opacity-15 group-hover:opacity-25 group-hover:scale-110 transition-all duration-700"
                  aria-hidden="true"
                />
              )}

              {/* top row: icon + tag */}
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="h-12 w-12 rounded-2xl bg-background/65 backdrop-blur-sm flex items-center justify-center border border-border/50 group-hover:bg-background/80 transition-colors">
                  <feat.icon className="h-6 w-6 text-primary" />
                </div>

                <div className="inline-flex items-center rounded-full border border-border/60 bg-background/35 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-sm">
                  {feat.tag}
                </div>
              </div>

              <div className="relative z-10 mt-5">
                <h3 className="font-display text-lg font-semibold tracking-tight">{feat.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>

                {/* subtle divider + micro CTA */}
                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                    Personalized
                  </span>
                  <span className="opacity-80 group-hover:opacity-100 transition-opacity">Learn more</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}