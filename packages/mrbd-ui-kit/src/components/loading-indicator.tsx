import { cn } from "../lib/cn";

export interface LoadingIndicatorProps {
  /** @default 'spinner' */
  variant?: "spinner" | "dots" | "pulse";
  /** Size in px. @default 32 */
  size?: number;
  /** Tailwind color class or CSS color. @default 'var(--color-mrbd-text)' */
  color?: string;
  /** Accessible label. @default 'Loading' */
  label?: string;
  className?: string;
}

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 100 100"
      fill="none"
      className={cn("animate-spin", className)}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="33"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        strokeDasharray="52 155"
        strokeDashoffset="0"
        className="spinner-dash"
      />
    </svg>
  );
}

function Dots({ size, color }: { size: number; color: string }) {
  const dotSize = Math.max(4, size / 4);
  const gap = dotSize * 0.8;
  const totalWidth = dotSize * 3 + gap * 2;

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: totalWidth, height: size, gap }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            backgroundColor: color,
            animation: `mrbd-dot-bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Pulse({ size, color }: { size: number; color: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        animation: "mrbd-pulse 1.5s ease-in-out infinite",
      }}
    />
  );
}

export function LoadingIndicator({
  variant = "spinner",
  size = 32,
  color = "var(--color-mrbd-text)",
  label = "Loading",
  className,
}: LoadingIndicatorProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className ?? ""}`.trim()}
    >
      {variant === "spinner" && <Spinner color={color} />}
      {variant === "dots" && <Dots size={size} color={color} />}
      {variant === "pulse" && <Pulse size={size} color={color} />}
    </div>
  );
}
