import { IconProps } from ".";

export const NoResultIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path
      d="M0 0h24v24H0z"
      stroke="none"
    />
    <path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0m5-2 4 4m0-4-4 4m13 9-6-6" />
  </svg>
);