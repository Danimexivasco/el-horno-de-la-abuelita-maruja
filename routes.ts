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
export const CART_PATH = "/cart";
export const LEGAL_PATH = "/legal";
export const PRIVACY_PATH = "/privacy";
export const COOKIES_PATH = "/cookies";
export const SALES_CONDITIONS_PATH = "/sales-conditions";

export const COMPONENTS_PREVIEW_PATH = "/componentsPreview";

export const ROUTES: Route[] = [
  {
    path:  HOME_PATH,
    label: "Inicio"
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
    path:  CART_PATH,
    label: "Cart"
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

export const LEGAL_ROUTES: Route[] = [
  {
    path:  LEGAL_PATH,
    label: "Aviso Legal"
  },
  {
    path:  PRIVACY_PATH,
    label: "Política de Privacidad"
  },
  {
    path:  COOKIES_PATH,
    label: "Política de Cookies"
  },
  {
    path:  SALES_CONDITIONS_PATH,
    label: "Condiciones de venta, envío y devolución"
  }
];