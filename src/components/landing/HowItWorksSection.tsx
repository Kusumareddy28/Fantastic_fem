import { motion } from "framer-motion";
import selfCareJournal from "@/assets/self-care-journal.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const steps = [
  { step: "01", title: "Set Your Profile", desc: "Tell us about your cycle, lifestyle, and goals so we can personalize your experience.", icon: "🌷" },
  { step: "02", title: "Log Daily", desc: "Track your mood, energy, sleep, symptoms, and nutrition in under a minute.", icon: "📝" },
  { step: "03", title: "Get Insights", desc: "Receive AI-powered wellness tips tailored to your unique rhythms and data.", icon: "✨" },
];

export default function HowItWorksSection() {
  return (
    <section className="py-28 bg-card/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-lavender/30 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-peach/30 blur-[100px]" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="relative">
              <div className="absolute inset-0 gradient-card-lavender rounded-[2rem] rotate-3 scale-105" />
              <img src={selfCareJournal} alt="Self care journaling" className="relative rounded-[2rem] w-full object-contain shadow-2xl shadow-primary/10" />
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={fadeUp} custom={0} className="text-sm font-medium text-primary uppercase tracking-[0.2em] mb-4">How It Works</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl md:text-4xl font-bold mb-10">
              Three Simple Steps to <span className="text-gradient">Flourish</span>
            </motion.h2>

            <div className="space-y-8">
              {steps.map((item, i) => (
                <motion.div key={item.step} variants={fadeUp} custom={i + 2} className="flex gap-5 items-start group">
                  <div className="relative flex-shrink-0">
                    <div className="h-14 w-14 rounded-2xl gradient-card-rose flex items-center justify-center text-2xl group-hover:shadow-lg group-hover:shadow-primary/10 transition-shadow duration-500">
                      {item.icon}
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1.5 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
