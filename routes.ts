

export type Route = {
  path: string
  name: string
  label?: string
  authRoute?: boolean
  protected?: boolean
  isNavRoute?: boolean
}

export const ROUTES : Route[] = [
  {
    path: "/",
    name: "Home",
    label: "Home",
  },
  {
    path: "/signIn",
    name: "SignIn",
    label: "Sign In",
    authRoute: true
  },
  {
    path: "/signUp",
    name: "SignUp",
    label: "Sign Up",
    authRoute: true
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    label: "Dashboard",
    protected: true,
    isNavRoute: true
  },
  {
    path: "/admin/dashboard/products",
    name: "AdminProducts",
    label: "Products",
    protected: true,
    isNavRoute: true
  },
  {
    path: "/products",
    name: "Products",
    label: "Products",
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
  },
  {
    path: "/componentsPreview",
    name: "ComponentsPreview",
    label: "Components Preview",
  },
]