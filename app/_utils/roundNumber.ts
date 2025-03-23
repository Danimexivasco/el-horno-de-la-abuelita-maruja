export const roundNumber = (number: number) => {
  if (!number) throw new Error("No se ha pasado un parametro");
  if (typeof number !== "number") throw new Error("No se ha pasado un numero");

  return Math.round(number * 100) / 100;
};