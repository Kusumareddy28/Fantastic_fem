import { Link, useLocation } from "react-router-dom";
import { Heart, LayoutDashboard, PenLine, Sparkles, User, Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  // { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  // { to: "/log", label: "Log Entry", icon: PenLine },
  // { to: "/insights", label: "Insights", icon: Sparkles },
  // { to: "/profile", label: "Profile", icon: User },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const isLanding = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Heart className="h-6 w-6 text-primary fill-primary transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display text-xl font-bold text-gradient">Fantastic Feminine</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                location.pathname === to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {location.pathname === to && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          {isLanding ? (
            <Button asChild size="sm" className="rounded-full px-6 shadow-lg shadow-primary/20">
              <Link to="/dashboard" className="gap-2">
                Get Started <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm" className="rounded-full px-5">
              <Link to="/">Home</Link>
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-secondary/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border/30"
          >
            <div className="flex flex-col gap-1 p-4">
              {[{ to: "/", label: "Home", icon: Heart }, ...navItems].map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    location.pathname === to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-border/30">
                <Button asChild size="sm" className="w-full rounded-xl">
                  <Link to="/dashboard" className="gap-2">
                    Get Started <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
