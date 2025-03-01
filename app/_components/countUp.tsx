"use client";

import { useEffect, useState } from "react";

type CountUpProps = {
  start?: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

const easeInOutCubic = (t: number) => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const CountUp = ({
  start = 0,
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className
}: CountUpProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      const easedProgress = easeInOutCubic(progress);

      setCount(start + (end - start) * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [start, end, duration]);

  return (
    <span className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default CountUp;
