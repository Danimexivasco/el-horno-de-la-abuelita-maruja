export type Route = {
  path: string
  name: string
  label?: string
  authRoute?: boolean
  protected?: boolean
  isNavRoute?: boolean
}

export const HOME_PATH = "/"
export const SIGN_IN_PATH = "/signIn"
export const SIGN_UP_PATH = "/signUp"
export const ADMIN_DASHBOARD_PATH = "/admin/dashboard"
export const ADMIN_PRODUCTS_PATH = "/admin/dashboard/products"
export const PRODUCTS_PATH = "/products"
export const PRODUCT_DETAIL_PATH = "/product/:id"
export const COMPONENTS_PREVIEW_PATH = "/componentsPreview"

export const ROUTES : Route[] = [
  {
    path: HOME_PATH,
    name: "Home",
    label: "Tienda",
  },
  {
    path: SIGN_IN_PATH,
    name: "SignIn",
    label: "Inicio de sesión",
    authRoute: true
  },
  {
    path: SIGN_UP_PATH,
    name: "SignUp",
    label: "Registro",
    authRoute: true
  },
  {
    path: ADMIN_DASHBOARD_PATH,
    name: "AdminDashboard",
    label: "Panel de Control",
    protected: true,
    isNavRoute: true
  },
  {
    path: ADMIN_PRODUCTS_PATH,
    name: "AdminProducts",
    label: "Productos",
    protected: true,
    isNavRoute: true
  },
  {
    path: PRODUCTS_PATH,
    name: "Products",
    label: "Productos",
  },
  {
    path: PRODUCT_DETAIL_PATH,
    name: "ProductDetail",
  },
  {
    path: COMPONENTS_PREVIEW_PATH,
    name: "ComponentsPreview",
    label: "Preview de los Componentes",
    isNavRoute: process.env.NODE_ENV !== "production"
  },
]