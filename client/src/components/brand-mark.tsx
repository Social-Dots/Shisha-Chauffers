interface HookahMarkProps {
  className?: string;
}

/** Standalone hookah + bow-tie icon from the brand lockup. */
export function HookahMark({ className }: HookahMarkProps) {
  return (
    <img
      src="/brand/icon.png"
      alt=""
      className={className}
      aria-hidden="true"
    />
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
  variant?: "horizontal" | "stacked" | "icon";
}

export function Logo({ className, markClassName, variant = "horizontal" }: LogoProps) {
  if (variant === "icon") {
    return <HookahMark className={markClassName ?? className ?? "h-9 w-auto"} />;
  }

  return (
    <img
      src="/logo.jpeg"
      alt="Shisha Chauffeurs"
      className={markClassName ?? className ?? "h-9 w-auto"}
    />
  );
}
