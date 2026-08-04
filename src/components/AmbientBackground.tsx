export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 ambient-light" />
      <div className="absolute inset-0 grain" />
      <div className="float-slow absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/10 blur-[110px]" />
      <div
        className="float-slow absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-accent/10 blur-[120px]"
        style={{ animationDelay: "1.8s" }}
      />
      <div
        className="float-slow absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/8 blur-[130px]"
        style={{ animationDelay: "3.4s" }}
      />
    </div>
  );
}
