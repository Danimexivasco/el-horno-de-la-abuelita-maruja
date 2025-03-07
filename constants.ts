import { FiltersState } from "./app/_components/filters";
import { Product } from "./types";

export const SESSION_COOKIE_NAME = "user_session";
export const ONE_DAY = 60 * 60 * 24;
export const DEFAULT_THEME = "light";
export const MAXIMUM_PRODUCTS_PURCHASE = 100;

export const SIGN_IN_FORM_INPUTS = [
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

export const SIGN_UP_FORM_INPUTS = [
  {
    name:        "username",
    type:        "username",
    label:       "Username",
    placeholder: "Introduce tu username",
    required:    true
  },
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

export const SIGN_IN_FORM_INITIAL_STATE = {
  username: "",
  email:    "",
  password: ""
};

export const SIGN_UP_FORM_INITIAL_STATE = {
  email:    "",
  password: ""
};

export const CATEGORY_OPTIONS = [
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

export const ALLERGENS_OPTIONS = [
  {
    value: "gluten",
    label: "Gluten"
  },
  {
    value: "lactosa",
    label: "Lactosa"
  },
  {
    value: "frutos secos",
    label: "Frutos secos"
  },
  {
    value: "cacahuetes",
    label: "Cacahuetes"
  },
  {
    value: "huevo",
    label: "Huevo"
  },
  {
    value: "soja",
    label: "Soja"
  },
  {
    value: "sésamo",
    label: "Sésamo"
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
    name:    "allergens",
    type:    "checkbox",
    label:   "Alérgenos",
    options: ALLERGENS_OPTIONS
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
  multiplierAmount:   "",
  allergens:          []
};

export const FILTERS_INITIAL_STATE: FiltersState = {
  category:  [],
  allergens: [],
  priceFrom: 0,
  priceTo:   0,
  onOffer:   false
};

export const FILTER_PARAMS = ["search", "category", "allergens", "priceFrom", "priceTo", "onOffer"];

export const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];