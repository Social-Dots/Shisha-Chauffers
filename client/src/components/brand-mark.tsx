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
  priority?: boolean;
}

const logoSources = {
  horizontal: "/brand/horizontal.png",
  stacked: "/brand/stacked.png",
};

export function Logo({ className, markClassName, variant = "horizontal", priority = false }: LogoProps) {
  if (variant === "icon") {
    return <HookahMark className={markClassName ?? className ?? "h-9 w-auto"} />;
  }

  return (
    <img
      src={logoSources[variant]}
      alt="Shisha Chauffeurs"
      className={markClassName ?? className ?? "h-12 w-auto"}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
    />
  );
}
