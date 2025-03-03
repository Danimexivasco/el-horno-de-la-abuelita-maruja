import { User } from "@/types";

export const standardizeUsersDates = (users: User[]) => {
  return users.map((user) => {
    let standardizedDate;

    if (user.createdAt) {
      if (user.createdAt.seconds || user.createdAt.nanoseconds) {
        console.log("user", user, user.createdAt.seconds);
        standardizedDate = new Date(user.createdAt.seconds * 1000);
      } else if (typeof user.createdAt === "string") {
        standardizedDate = new Date(user.createdAt);
      } else if (typeof user.createdAt === "number") {
        standardizedDate = new Date(user.createdAt);
      } else {
        console.warn("Unknown date format:", user.createdAt);
      }
    }

    return {
      ...user,
      createdAt: standardizedDate ? standardizedDate.getTime() : null
    };
  });
};