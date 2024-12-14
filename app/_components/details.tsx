"use client";

type DetailsProps = {
    headline: string
    children: React.ReactNode
};

export default function Details({ headline, children }: DetailsProps) {
  return (
    <details
      onClick={e => e.stopPropagation()}
    >
      <summary className="italic">{headline}</summary>
      {children}
    </details>
  );
}