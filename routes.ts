

export type Route = {
  path: string
  name: string
  authRoute?: boolean
  protected?: boolean
  isNavRoute?: boolean
}

export const ROUTES : Route[] = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/signIn",
    name: "SignIn",
    authRoute: true
  },
  {
    path: "/signUp",
    name: "SignUp",
    authRoute: true
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    protected: true,
    isNavRoute: true
  },
  {
    path: "/admin/dashboard/products",
    name: "AdminProducts",
    protected: true,
    isNavRoute: true
  },
  {
    path: "/products",
    name: "Products",
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
  },
  {
    path: "/componentsPreview",
    name: "ComponentsPreview",
  },
]