import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const glassCard = "rounded-3xl border border-border/60 bg-background/55 backdrop-blur-md shadow-xl";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[520px] h-[520px] rounded-full bg-primary/5 blur-3xl animate-pulse-soft" />
        <div
          className="absolute -bottom-44 -left-24 w-[680px] h-[680px] rounded-full bg-lavender-deep/5 blur-3xl animate-pulse-soft"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full bg-peach/10 blur-[120px] animate-pulse-soft"
          style={{ animationDelay: "3s" }}
        />
        {/* subtle vignette for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-black/[0.03]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div initial="hidden" animate="visible" className="max-w-xl">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/30 px-4 py-1.5 text-sm font-medium text-foreground mb-8 backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI-guided wellness, built for real life
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight mb-6"
            >
              Every Phase, <span className="text-primary">Every Change</span>,
              <br />
              We&apos;re With You.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-md"
            >
              Track patterns, honor your energy, and get calm, personalized insights that adapt with you — not against you.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full text-base px-8 h-12 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-shadow"
              >
                <Link to="/dashboard" className="gap-2">
                  Start Your Journey <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="ghost" size="lg" className="rounded-full text-base px-8 h-12">
                <Link to="/insights">Explore Insights</Link>
              </Button>
            </motion.div>

            {/* Trust + credibility (replaces emojis/stars) */}
            <motion.div variants={fadeUp} custom={4} className="mt-10 flex flex-wrap items-center gap-3">
              {[
                { label: "Privacy-first", sub: "Your data stays yours" },
                { label: "Cycle-aware", sub: "Insights that adapt" },
                { label: "Wellness support", sub: "Not medical advice" },
              ].map((item) => (
                <div key={item.label} className={`${glassCard} px-4 py-2`}>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const, delay: 0.25 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* glow */}
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl scale-75" />

              {/* illustration */}
              <img
                src={heroIllustration}
                alt="Feminine wellness illustration"
                className="relative w-[480px] h-[480px] object-contain animate-float"
              />

              {/* product-style preview card (adds “real app” feel) */}
              <div className={`absolute -bottom-8 -left-10 w-[340px] ${glassCard} p-5`}>
                <p className="text-sm font-medium">Today’s insight</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Based on your energy + cycle phase, prioritize light movement, hydration, and earlier wind-down.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { title: "Energy", value: "Steady" },
                    { title: "Focus", value: "Medium" },
                    { title: "Mood", value: "Calm" },
                  ].map((c) => (
                    <div key={c.title} className="rounded-2xl border border-border/50 bg-background/40 px-3 py-2">
                      <p className="text-[11px] text-muted-foreground">{c.title}</p>
                      <p className="text-sm font-medium">{c.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                  <p className="text-xs text-muted-foreground">Cycle-aware recommendations</p>
                </div>
              </div>

              {/* small secondary chip */}
              <div className={`absolute top-10 -right-6 ${glassCard} px-4 py-2`}>
                <p className="text-xs text-muted-foreground">Next check-in</p>
                <p className="text-sm font-medium">Tomorrow morning</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-primary/25 flex items-start justify-center p-1"
        >
          <motion.div className="w-1 h-2 rounded-full bg-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}