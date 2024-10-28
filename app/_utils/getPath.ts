import { ROUTES } from "@/routes";

export function getPath(pageName: string): string {
  return (
    ROUTES.find((route) => route.name === pageName)?.path ?? "/"
  )
}