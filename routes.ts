export type Route = {
  path: string
  label?: string
  authRoute?: boolean
  protected?: boolean
  isNavRoute?: boolean
};

export const HOME_PATH = "/";
export const SIGN_IN_PATH = "/signIn";
export const SIGN_UP_PATH = "/signUp";
export const ADMIN_DASHBOARD_PATH = "/admin/dashboard";
export const ADMIN_PRODUCTS_PATH = "/admin/dashboard/products";
export const ADMIN_NEW_PRODUCT_PATH = "/admin/dashboard/products/new";
export const ADMIN_PRODUCT_DETAIL_PATH = "/admin/dashboard/products/:id";
export const PRODUCTS_PATH = "/products";
export const PRODUCT_DETAIL_PATH = "/product/:id";
export const ABOUT_US_PATH = "/about";
export const CONTACT_PATH = "/contact";
export const COMPONENTS_PREVIEW_PATH = "/componentsPreview";

export const ROUTES: Route[] = [
  {
    path:  HOME_PATH,
    label: "Tienda"
  },
  {
    path:      SIGN_IN_PATH,
    label:     "Inicio de sesión",
    authRoute: true
  },
  {
    path:      SIGN_UP_PATH,
    label:     "Registro",
    authRoute: true
  },
  {
    path:       ADMIN_DASHBOARD_PATH,
    label:      "Panel de Control",
    protected:  true,
    isNavRoute: true
  },
  {
    path:       ADMIN_PRODUCTS_PATH,
    label:      "Administrar Productos",
    protected:  true,
    isNavRoute: true
  },
  {
    path:      ADMIN_NEW_PRODUCT_PATH,
    label:     "Nuevo Producto",
    protected: true
  },
  {
    path:      ADMIN_PRODUCT_DETAIL_PATH,
    label:     "Detalle de Producto",
    protected: true
  },
  {
    path:       PRODUCTS_PATH,
    label:      "Productos",
    isNavRoute: true
  },
  {
    path:       ABOUT_US_PATH,
    label:      "Sobre Nosotros",
    isNavRoute: true
  },
  {
    path:       CONTACT_PATH,
    label:      "Contacto",
    isNavRoute: true
  },
  {
    path: PRODUCT_DETAIL_PATH
  },
  {
    path:       COMPONENTS_PREVIEW_PATH,
    label:      "Preview Componentes",
    isNavRoute: process.env.NODE_ENV !== "production"
  }
];