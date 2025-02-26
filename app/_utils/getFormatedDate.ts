import { Timestamp } from "firebase/firestore";

export const getFormatedDate = (createdAt: any): string => {
  if (!createdAt) return "Fecha desconocida";

  try {
    let date: Date;

    if (createdAt instanceof Timestamp) {
      date = createdAt.toDate();
    } else if (typeof createdAt === "number") {
      date = new Date(createdAt);
    } else if (createdAt.seconds) {
      date = new Date(createdAt.seconds * 1000);
    } else {
      return "Fecha no válida";
    }

    return date.toLocaleDateString();
  } catch (error) {
    console.error("Date conversion error:", error);
    return "Fecha no válida";
  }
};