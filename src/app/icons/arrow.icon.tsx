import { IconProps } from "./_types";

interface ArrowIconProps extends IconProps {
  direction?: "up" | "down" | "left" | "right";
}

export function ArrowIcon({
  size = 24,
  color = "currentColor",
  direction = "right",
  "aria-label": ariaLabel,
}: ArrowIconProps) {
  const rotation = {
    up: "-90deg",
    down: "90deg",
    left: "180deg",
    right: "0deg",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotation[direction]})` }}
      aria-label={ariaLabel}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
