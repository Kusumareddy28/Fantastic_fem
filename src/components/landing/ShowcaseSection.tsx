import { motion } from "framer-motion";
import wellnessYoga from "@/assets/wellness-yoga.png";
import nutritionBowl from "@/assets/nutrition-bowl.png";
import moonCycle from "@/assets/moon-cycle.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const items = [
  { img: wellnessYoga, title: "Move with Intention", desc: "Exercises tailored to your cycle phase and energy levels", color: "gradient-card-lavender" },
  { img: nutritionBowl, title: "Eat with Awareness", desc: "Nutrition guidance that works with your body's natural rhythms", color: "gradient-card-rose" },
  { img: moonCycle, title: "Honor Your Cycle", desc: "Deep cycle tracking with phase-specific wellness tips", color: "gradient-card-peach" },
];

export default function ShowcaseSection() {
  return (
    <section className="py-28 md:py-36">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-20">
          <motion.p variants={fadeUp} custom={0} className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4">Your Wellness Companion</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold mb-5">
            Nourish Every Part of <span className="text-gradient italic">You</span>
          </motion.h2>
          <motion.div variants={fadeUp} custom={2} className="w-16 h-0.5 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="text-center group cursor-pointer"
            >
              <div className={`relative mb-6 rounded-3xl overflow-hidden ${item.color} p-8 aspect-square flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-700`}>
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="w-4/5 h-4/5 object-contain"
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
