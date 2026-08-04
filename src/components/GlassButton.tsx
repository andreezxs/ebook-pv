import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-400 overflow-hidden";

const variants = {
  primary: "bg-primary text-primary-foreground glow-primary hover:brightness-110",
  glass: "glass text-foreground hover:border-primary/40",
  accent: "bg-accent text-accent-foreground glow-accent hover:brightness-110",
} as const;

type Variant = keyof typeof variants;

export function GlassButton({
  children,
  variant = "primary",
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <motion.button
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}

export function GlassLink({
  children,
  variant = "primary",
  className = "",
  to,
  params,
  ariaLabel,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  to: string;
  params?: Record<string, string>;
  ariaLabel?: string;
}) {
  return (
    <motion.span
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        to={to as any}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params={params as any}
        aria-label={ariaLabel}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    </motion.span>
  );
}
