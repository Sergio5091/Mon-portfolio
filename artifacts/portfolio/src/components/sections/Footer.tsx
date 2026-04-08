export default function Footer() {
  return (
    <footer className="py-8 border-t border-border/30 bg-background relative">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-bold text-lg text-white">
            SERGIO<span className="text-primary">.DEV</span>
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Sergio Ahouangonou.
          </span>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/30 border border-border/50">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            Disponible pour freelance
          </span>
        </div>

      </div>
    </footer>
  );
}
