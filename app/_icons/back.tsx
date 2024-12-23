import { IconProps } from ".";

export const BackIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <g strokeWidth={0} />
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g>
      <title>{"ionicons-v5-a"}</title>
      <polyline
        points="244 400 100 256 244 112"
        style={{
          fill:           "none",
          stroke:         "currentColor",
          strokeLinecap:  "round",
          strokeLinejoin: "round",
          strokeWidth:    48
        }}
      />
      <line
        x1={120}
        y1={256}
        x2={412}
        y2={256}
        style={{
          fill:           "none",
          stroke:         "currentColor",
          strokeLinecap:  "round",
          strokeLinejoin: "round",
          strokeWidth:    48
        }}
      />
    </g>
  </svg>
);