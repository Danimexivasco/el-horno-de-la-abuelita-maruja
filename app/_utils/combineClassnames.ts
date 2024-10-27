export function combine(...classNames: string[]): string {
  return classNames?.filter(Boolean).join(" ");
}