import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import wellnessYoga from "@/assets/wellness-yoga.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function CTASection() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="gradient-hero rounded-[2rem] p-12 md:p-16 max-w-5xl mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-lavender-deep/10 blur-3xl" />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl md:text-4xl font-bold mb-4">
                Embrace the Power Within You
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Your body has a story to tell. Start listening today.
              </motion.p>
              <motion.div variants={fadeUp} custom={2}>
                <Button asChild size="lg" className="rounded-full text-base px-10 h-13 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                  <Link to="/dashboard" className="gap-2">
                    Get Started Free <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            <div className="hidden md:flex justify-center">
              <motion.img
                src={wellnessYoga}
                alt="Yoga wellness"
                className="w-64 h-64 object-contain opacity-80"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
