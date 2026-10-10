export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export type ButtonVariant = "gold" | "forest" | "outline-light" | "outline-dark" | "ghost";

// Pill buttons: violet-to-blue primary, quiet outline secondary, soft press feedback.
const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 text-[0.95rem] font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-gradient-to-r from-violet to-royal text-white shadow-[0_12px_30px_-12px_rgba(53,36,244,0.6)] hover:shadow-[0_16px_36px_-12px_rgba(53,36,244,0.7)]",
  forest: "bg-gradient-to-r from-violet to-royal text-white shadow-[0_12px_30px_-12px_rgba(53,36,244,0.6)] hover:shadow-[0_16px_36px_-12px_rgba(53,36,244,0.7)]",
  "outline-light": "border border-line bg-white text-navy hover:border-violet hover:text-violet",
  "outline-dark": "border border-line bg-white text-navy hover:border-violet hover:text-violet",
  ghost: "px-0 min-h-10 text-violet hover:text-royal",
};

export function buttonClasses(variant: ButtonVariant = "gold", extra?: string) {
  return cn(base, variants[variant], extra);
}
