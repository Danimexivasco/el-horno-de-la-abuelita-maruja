export function generateId(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 20;

  return Array.from({
    length: idLength
  }, () =>
    characters[Math.floor(Math.random() * characters.length)]
  ).join("");
}