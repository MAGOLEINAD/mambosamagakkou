export function BrushUnderline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox="0 0 200 6"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M2 3.6C40 2.2 90 2 130 2.6C155 3 178 3.4 198 3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
