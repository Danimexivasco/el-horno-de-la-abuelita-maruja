import { describe, expect, it } from "vitest";
import { getAverage } from "@/app/_utils/getAverage";
import { Product, Review } from "@/types";
import { getFiltersFromProducts } from "@/app/_utils/getFilters";

describe.skip("getAverage", () => {

  it("should throw an error if there are no reviews", () => {
    expect(() => getAverage([])).toThrowError("No hay reviews");
  });

  it ("should return a number", () => {
    expect(getAverage(mockReviews)).toBeTypeOf("number");
  });

  it("should return the rounded average rating", () => {
    expect(getAverage(mockReviews)).toBe(4);
  });
});

describe("getFilters", () => {
  it("should return an array fo unique allergens", () => {

    const filters = getFiltersFromProducts(products);
    expect(filters.allergens).toEqual(
      expect.arrayContaining([
        "frutos secos",
        "gluten",
        "huevo",
        "lactosa",
        "sésamo",
        "soja",
        "cacahuetes"
      ]));
  });

});

const mockReviews: Review[] = [
  {
    id:       "S7azdDVyVLzR3YHgdRZg",
    reviewer: {
      id:       "reviewer-id-1",
      username: "oneUserToRuleThemAll",
      photoURL: "awesome url to your profile image"
    },
    variant:   "xs",
    rating:    5,
    comment:   "Unas galletas super ricas",
    createdAt: 1738154020874
  },
  {
    id:       "S7azdDVyVLzR3YHgdRZg",
    reviewer: {
      id:       "reviewer-id-1",
      username: "oneUserToRuleThemAll",
      photoURL: "awesome url to your profile image"
    },
    variant:   "xs",
    rating:    2,
    comment:   "Unas galletas super ricas",
    createdAt: 1738154020874
  }
];

const products: Product[] = [
  {
    "offerType":   "",
    "new":         "no",
    "description": "Un gif de fallout",
    "variants":    [],
    "reviews":     [
      {
        "rating":    5,
        "comment":   "Guapisimo el fallout!!! EDITADA",
        "createdAt": 1738231669531,
        "id":        "ix9KDS1eCbHW1lKNlrlc",
        "reviewer":  {
          "username": "Danimexivasco",
          "id":       "hpafWL1Q8gYIMLSBIQKYmQ8sOHy2",
          "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocLlkwZyrgz6WLpyZWQt5m4RNPx-rAgMYbOIGl0nlXGWrill2A=s96-c"
        }
      }
    ],
    "price":              "8",
    "category":           "bizcochos",
    "id":                 "1w0Soih5kNITQPVLHZzU",
    "multiplierAmount":   "",
    "discountPercentage": 0,
    "onOffer":            "no",
    "image":              "https://res.cloudinary.com/danimexivasco/image/upload/v1732704271/el_horno_de_la_abuelita_maruja/pf2jm4sew20nirhbvmyo.webp",
    "name":               "Gif de Fallout"
  },
  {
    "allergens": [
      "lactosa",
      "frutos secos",
      "gluten"
    ],
    "discountPercentage": 0,
    "multiPrice":         "yes",
    "price":              0,
    "onOffer":            "no",
    "image":              "https://res.cloudinary.com/danimexivasco/image/upload/v1733745605/el_horno_de_la_abuelita_maruja/ge5krixkqb6zdvceoogi.webp",
    "reviews":            [
      {
        "id":       "4YNpDe2rE0w7bFZ0czy4",
        "reviewer": {
          "username": "Danimexivasco",
          "id":       "hpafWL1Q8gYIMLSBIQKYmQ8sOHy2",
          "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocLlkwZyrgz6WLpyZWQt5m4RNPx-rAgMYbOIGl0nlXGWrill2A=s96-c"
        },
        "rating":    3,
        "comment":   "## TOP\nque decir del LG.... Una **obra maestra** EDITADO a 3 estrellas y probado el _opacity_ a 50%\nOtra línea\n\nlinea muy separada",
        "variant":   "lg",
        "createdAt": 1738223793028
      },
      {
        "reviewer": {
          "id":       "hpafWL1Q8gYIMLSBIQKYmQ8sOHy2",
          "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocLlkwZyrgz6WLpyZWQt5m4RNPx-rAgMYbOIGl0nlXGWrill2A=s96-c",
          "username": "Danimexivasco"
        },
        "variant":   "xs",
        "rating":    5,
        "comment":   "El xs me ha parecido delicioso 😛",
        "createdAt": 1738223776780,
        "id":        "mrca8s7GYMxTGmy00QfI"
      }
    ],
    "offerType": "",
    "name":      "Multiples Variantes",
    "variants":  [
      {
        "offerData": {
          "onOffer":            "no",
          "multiplierAmount":   "",
          "offerType":          "",
          "discountPercentage": 0
        },
        "value": 5,
        "name":  "xs",
        "id":    "WMFcZXcP8QGkSnPNcFWy"
      },
      {
        "name":      "md",
        "value":     8,
        "offerData": {
          "multiplierAmount":   "",
          "offerType":          "percentage",
          "onOffer":            "yes",
          "discountPercentage": "40"
        },
        "id": "fLRWjW3cj0kUK74tJXst"
      },
      {
        "name":      "lg",
        "offerData": {
          "offerType":          "percentage",
          "onOffer":            "yes",
          "discountPercentage": "25",
          "multiplierAmount":   ""
        },
        "value": 12,
        "id":    "3uc0tb1aHsMYoGeTm5Go"
      },
      {
        "name":      "xl",
        "value":     24,
        "id":        "HHL4wl5LVrzQVSEqec5v",
        "offerData": {
          "onOffer":            "yes",
          "offerType":          "multiplier",
          "discountPercentage": 0,
          "multiplierAmount":   "2x1"
        }
      }
    ],
    "category":         "galletas",
    "id":               "3tyN1N9zA1XSyL9VVE4P",
    "new":              "yes",
    "description":      "Wound along achieving stole biding Proudfoots. Lasgalen potency returning sees spends scarce test he'd melt pillaged shrink enemies? Wagers Dinner homage encouraging teatime possess. What's the Elvish word for 'friend'? Gaffer's sleep verge end success flurgaburburhobbit warriors three? Possessions Arod promised beast. Ere brooded split. Royal pieces grip Chubbs been named.\n\nUn poco más de texto",
    "multiplierAmount": ""
  },
  {
    "price":     "8",
    "category":  "galletas",
    "allergens": [
      "huevo",
      "sésamo",
      "gluten",
      "lactosa",
      "frutos secos",
      "soja",
      "cacahuetes"
    ],
    "discountPercentage": 0,
    "image":              "",
    "multiplierAmount":   "",
    "id":                 "ruZNvdaQf7ETIwc1fVWZ",
    "new":                "yes",
    "offerType":          "",
    "onOffer":            "no",
    "name":               "New prod revalidate",
    "multiPrice":         "no",
    "createdAt":          1738326490899,
    "variants":           [],
    "description":        "Un prod revalidando"
  }
];