import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            <span className="font-display text-lg font-bold text-gradient">Fantastic Feminine</span>
          </div>
          <p className="text-xs text-muted-foreground text-center max-w-md leading-relaxed">
            ⚕️ Provides wellness guidance only. Not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p className="text-xs text-muted-foreground">© 2026 Fantastic Feminine</p>
        </div>
      </div>
    </footer>
  );
}
