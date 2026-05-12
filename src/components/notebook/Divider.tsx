type DividerProps = {
  d: string;
  extra?: string;
};

export function Divider({ d, extra }: DividerProps) {
  return (
    <svg
      className="divider"
      viewBox="0 0 760 22"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={d}
        stroke="#2c1810"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      {extra && (
        <path
          d={extra}
          stroke="#2c1810"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
          opacity="0.45"
        />
      )}
    </svg>
  );
}
