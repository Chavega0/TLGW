export function Mark({ color = "#C4552B", size = 28 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <path
        d="M22 32 L43 46 L80 13"
        fill="none"
        stroke={color}
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="16" y="56" width="68" height="14" rx="7" fill={color} />
      <rect x="16" y="78" width="68" height="14" rx="7" fill={color} />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  const ink = dark ? "#F6EFE0" : "#2B2723";
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <Mark color="#C4552B" size={26} />
      <span
        className="text-[1.35rem] font-semibold tracking-tight leading-none"
        style={{ color: ink }}
      >
        stackt<span className="text-terracotta">ik</span>
      </span>
    </span>
  );
}
