export type Route = {
  path: string
  label?: string
  authRoute?: boolean
  protected?: boolean
  isNavRoute?: boolean
};

export const HOME_PATH = "/";
export const PRODUCTS_PATH = "/products";
export const PRODUCT_DETAIL_PATH = "/products/:id";
export const ABOUT_US_PATH = "/about";
export const CONTACT_PATH = "/contact";
export const CART_PATH = "/cart";
export const USER_PROFILE_PATH = "/user-profile";
export const ORDERS_PATH = "/orders";

export const SIGN_IN_PATH = "/signIn";
export const SIGN_UP_PATH = "/signUp";
export const RESET_PASSWORD_PATH = "/reset-password";
export const VERIFY_EMAIL_PATH = "/verify-email";

export const ADMIN_DASHBOARD_PATH = "/admin/dashboard";
export const ADMIN_PRODUCTS_PATH = "/admin/dashboard/products";
export const ADMIN_NEW_PRODUCT_PATH = "/admin/dashboard/products/new";
export const ADMIN_PRODUCT_DETAIL_PATH = "/admin/dashboard/products/:id";
export const ADMIN_ORDERS_PATH = "/admin/dashboard/orders";
export const ADMIN_USERS_PATH = "/admin/dashboard/users";
export const ADMIN_SALES_PATH = "/admin/dashboard/sales";

export const FAQS_PATH = "/faqs";
export const CHECKOUT_PATH = "/checkout";
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
    path:  RESET_PASSWORD_PATH,
    label: "Cambiar contraseña"
  },
  {
    path:  VERIFY_EMAIL_PATH,
    label: "Verificar email"
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
    path:       ADMIN_ORDERS_PATH,
    label:      "Pedidos",
    protected:  true,
    isNavRoute: true
  },
  {
    path:       ADMIN_USERS_PATH,
    label:      "Usuarios",
    protected:  true,
    isNavRoute: true
  },
  {
    path:       ADMIN_SALES_PATH,
    label:      "Ventas",
    protected:  true,
    isNavRoute: true
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
    path:  USER_PROFILE_PATH,
    label: "Perfil de usuario"
  },
  {
    path:       FAQS_PATH,
    label:      "Preguntas Precuentes",
    isNavRoute: true
  },
  {
    path: PRODUCT_DETAIL_PATH
  },
  {
    path:  COMPONENTS_PREVIEW_PATH,
    label: "Preview Componentes"
    // isNavRoute: process.env.NODE_ENV !== "production"
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

export const REVALIDATION_ROUTES: string[] = [
  ADMIN_PRODUCTS_PATH,
  PRODUCTS_PATH
];