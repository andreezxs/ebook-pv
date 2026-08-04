import { motion, useScroll, useSpring } from "motion/react";

/** Barra de progresso de leitura em vidro, fixa no topo do capítulo. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  return (
    <div
      aria-hidden
      className="glass-bar fixed inset-x-0 top-0 z-40 h-[3px] rounded-none border-0 p-0"
    >
      <motion.div
        style={{ scaleX: width, transformOrigin: "0% 50%" }}
        className="h-full w-full bg-linear-to-r from-primary via-primary to-accent glow-primary"
      />
    </div>
  );
}
