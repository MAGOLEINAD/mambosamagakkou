export function DragonMotif({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox="0 0 520 260"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* sinuous body */}
      <path d="M18 210C55 230 95 232 118 205C145 172 110 140 130 108C154 70 210 78 226 112C246 154 200 176 222 208C248 244 320 246 352 214C380 186 356 156 372 126C392 88 446 84 468 118" />
      {/* dorsal spikes */}
      <path d="M108 150L120 128L134 148" />
      <path d="M150 118L160 94L174 116" />
      <path d="M280 168L292 144L306 166" />
      <path d="M330 150L344 128L358 150" />
      {/* front leg + claw */}
      <path d="M200 150C196 168 186 180 168 186" />
      <path d="M160 184L168 186L164 194" />
      {/* rear leg + claw */}
      <path d="M300 190C292 206 278 216 258 218" />
      <path d="M250 216L258 218L252 226" />
      {/* head */}
      <path d="M468 118C486 104 500 106 508 120C500 130 486 134 476 128" />
      {/* horn */}
      <path d="M486 104C488 92 484 82 474 76" />
      {/* whiskers */}
      <path d="M470 128C460 134 448 134 438 126" />
      <path d="M474 134C466 142 454 146 442 142" />
      {/* eye */}
      <circle cx="490" cy="116" r="2" fill="currentColor" stroke="none" />
      {/* tail flourish */}
      <path d="M18 210C8 202 4 192 8 180" />
    </svg>
  );
}
