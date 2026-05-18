export interface LoadingIndicatorProps {
  /** @default 'spinner' */
  variant?: 'spinner' | 'dots' | 'pulse';
  /** Size in px. @default 32 */
  size?: number;
  /** Tailwind color class or CSS color. @default 'var(--color-mrbd-text)' */
  color?: string;
  /** Accessible label. @default 'Loading' */
  label?: string;
  className?: string;
}

function Spinner({ size, color }: { size: number; color: string }) {
  const strokeWidth = Math.max(2, size / 12);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashLength = circumference * 0.7;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ animation: 'mrbd-spin 0.8s linear infinite' }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${dashLength} ${circumference - dashLength}`}
        opacity={0.9}
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
            borderRadius: '50%',
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
        borderRadius: '50%',
        backgroundColor: color,
        animation: 'mrbd-pulse 1.5s ease-in-out infinite',
      }}
    />
  );
}

export function LoadingIndicator({
  variant = 'spinner',
  size = 32,
  color = 'var(--color-mrbd-text)',
  label = 'Loading',
  className,
}: LoadingIndicatorProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className ?? ''}`.trim()}
    >
      {variant === 'spinner' && <Spinner size={size} color={color} />}
      {variant === 'dots' && <Dots size={size} color={color} />}
      {variant === 'pulse' && <Pulse size={size} color={color} />}
    </div>
  );
}
