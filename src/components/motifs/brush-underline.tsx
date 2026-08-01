export function BrushUnderline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox="0 0 200 10"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M2 6.5C30 3 80 2 100 3.5C120 5 160 3.5 198 5.5C190 7.5 160 8.5 100 7.5C55 6.8 20 7 2 6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
