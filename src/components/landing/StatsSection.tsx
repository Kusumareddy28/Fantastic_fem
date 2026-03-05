import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 2000, suffix: "+", label: "Active Users", prefix: "" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", prefix: "" },
  { value: 50, suffix: "K+", label: "Insights Generated", prefix: "" },
  { value: 4.9, suffix: "", label: "App Store Rating", prefix: "★ " },
];

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Number(current.toFixed(value % 1 === 0 ? 0 : 1)));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold text-gradient">
      {prefix}{value % 1 === 0 ? Math.round(count) : count.toFixed(1)}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
