import { Product } from "./types";

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
    type:        "textarea",
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
    name:        "image",
    type:        "file",
    label:       "Imagen",
    placeholder: "Sube una imagen"
  },
  {
    name:    "new",
    type:    "radio",
    label:   "Nuevo?",
    options: [
      {
        value:   "yes",
        label:   "Si",
        checked: true
      },
      {
        value:   "no",
        label:   "No",
        checked: false
      }
    ]
  }
];

export const NEW_PRODUCT_FORM_INITIAL_STATE: Product = {
  id:                 "",
  name:               "",
  description:        "",
  category:           "",
  multiPrice:         "no",
  variants:           [],
  price:              0,
  image:              "",
  new:                "yes",
  onOffer:            "no",
  offerType:          "",
  discountPercentage: 0,
  multiplierAmount:   ""
};