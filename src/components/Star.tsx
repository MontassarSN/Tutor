"use client";
interface StarProps {
  onClick: () => void;
  full: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
export default function Star({
  onClick,
  full,
  onMouseEnter,
  onMouseLeave,
}: StarProps) {
  return (
    <span
      className="text-3xl text-customText"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {full ? "★" : "☆"}
    </span>
  );
}
