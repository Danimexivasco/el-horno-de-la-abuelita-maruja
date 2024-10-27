import { ROUTES } from "@/routes";

export function getPath(pageName: string) {
  if (!pageName) return "/"
  return (
    ROUTES.find((route) => route.name === pageName)?.path
  )
}