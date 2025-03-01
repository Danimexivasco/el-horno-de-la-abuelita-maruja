export function combine(...classNames: (string | boolean | undefined)[]): string {
  return classNames?.filter(Boolean).join(" ");
}