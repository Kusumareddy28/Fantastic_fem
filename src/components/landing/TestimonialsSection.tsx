import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const testimonials = [
  {
    name: "Sarah M.",
    role: "Yoga Instructor",
    text: "This app has completely changed how I understand my body. The cycle-aware tips are incredibly helpful!",
    rating: 5,
    avatar: "🧘‍♀️",
  },
  {
    name: "Kusuma R.",
    role: "Software Engineer",
    text: "Finally a wellness app that feels like it was made for me. Beautiful and so intuitive.",
    rating: 5,
    avatar: "💻",
  },
  {
    name: "Emily R.",
    role: "Nutritionist",
    text: "I love logging my daily wellness and seeing the patterns emerge. The insights are spot on.",
    rating: 5,
    avatar: "🥗",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-28 md:py-36 bg-card/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[100px]" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-5xl font-bold mb-5">
            Women <span className="text-gradient italic">Love</span> It
          </motion.h2>
          <motion.div variants={fadeUp} custom={2} className="w-16 h-0.5 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-7 relative group hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
            >
              <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex gap-0.5 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
