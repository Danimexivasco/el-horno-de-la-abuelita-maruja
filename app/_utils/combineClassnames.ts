export function combine(...classNames: (string|boolean)[]): string {
  return classNames?.filter(Boolean).join(" ");
}