export const SESSION_COOKIE_NAME = "user_session";
export const USER_CHECKED_COOKIE_NAME = "user_c";
export const ONE_DAY = 60 * 60 * 24;
export const DEFAULT_THEME = "dark";

export const AUTHENTICATION_FORM_INPUTS = [
  {
    name:        "email",
    type:        "email",
    label:       "Email",
    placeholder: "Introduce tu email",
    required:    true
  },
  {
    name:        "password",
    type:        "password",
    label:       "Contraseña",
    placeholder: "Introduce tu contraseña",
    required:    true
  }
];

export const AUTHENTICATION_FORM_INITIAL_STATE = {
  email:    "",
  password: ""
};

const CATEGORY_OPTIONS = [
  {
    value: "",
    label: "Elige una categoria"
  },
  {
    value: "tartas",
    label: "Tartas"
  },
  {
    value: "galletas",
    label: "Galletas"
  },
  {
    value: "bizcochos",
    label: "Bizcochos"
  }
];

export const NEW_PRODUCT_FORM_INPUTS = [
  {
    name:        "name",
    type:        "text",
    label:       "Nombre",
    placeholder: "Inserta un nombre para tu producto",
    required:    true
  },
  {
    name:        "description",
    type:        "text",
    label:       "Descripción",
    placeholder: "Inserta una descripción que haga babear a tus clientes",
    required:    true
  },
  {
    name:     "category",
    type:     "select",
    label:    "Categoria",
    options:  CATEGORY_OPTIONS,
    required: true
  },
  {
    name:        "price",
    type:        "number",
    label:       "Precio",
    placeholder: "Inserta un precio para tu producto Ej: 9.99",
    required:    true
  },
  {
    name:        "image",
    type:        "file",
    label:       "Image",
    placeholder: "Elige tu imagen"
  }
];

export const NEW_PRODUCT_FORM_INITIAL_STATE = {
  name:        "",
  description: "",
  category:    "",
  price:       "",
  image:       ""
};