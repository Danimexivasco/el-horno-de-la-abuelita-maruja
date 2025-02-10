import { describe, expect, it } from "vitest";
import { getAverage } from "@/app/_utils/getAverage";
import { Cart, Product, Review } from "@/types";
import { getFiltersFromProducts } from "@/app/_utils/getFilters";
import { formatNumber } from "@/app/_utils/formatNumber";
import { getPrices } from "@/app/_utils/getPrices";
import { getTotals } from "@/app/_utils/getTotals";

describe("getAverage", () => {

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

describe("getPrices", () => {

  it("should throw error if no product is provided", () => {
    expect(() => getPrices()).toThrowError("No se ha pasado un producto");
  });

  it("should return base price if the product is not on offer or multiprice", () => {
    expect(getPrices({
      price:            9,
      multiPrice:       "no",
      onOffer:          "no",
      multiplierAmount: ""
    })).toEqual({
      base:  9,
      offer: null
    });
  });

  it("should return base and offer price if the product is on offer", () => {
    expect(getPrices(productOnOffer)).toEqual({
      base:     5,
      offer:    4.25,
      discount: {
        type:  "percentage",
        label: formatNumber(15, "percent")
      }
    });
  });

  it("should return correct prices if discount is multiplier", () => {
    expect(getPrices(productWithAmountOffer, 3)).toEqual({
      base:     6,
      offer:    4,
      discount: {
        type:  "multiplier",
        label: "3x2"
      }
    });
  });

  it("should return variant base price if it's not on offer", () => {
    expect(getPrices(productWithVariants, 1, {
      "offerData": {
        "onOffer":            "no",
        "multiplierAmount":   "",
        "offerType":          "",
        "discountPercentage": 0
      },
      "value": 5,
      "name":  "xs",
      "id":    "WMFcZXcP8QGkSnPNcFWy"
    })).toEqual({
      base: 5
    });
  });

  it("should return variant prices if it's on offer type percentage", () => {
    expect(getPrices(productWithVariants, 1, {
      "name":      "md",
      "value":     8,
      "offerData": {
        "multiplierAmount":   "",
        "offerType":          "percentage",
        "onOffer":            "yes",
        "discountPercentage": 40
      }
    })).toEqual({
      base:     8,
      offer:    4.8,
      discount: {
        type:  "percentage",
        label: formatNumber(40, "percent")
      }
    });
  });

  it("should return variant prices if it's on offer type multiplier", () => {
    expect(getPrices(productWithVariants, 3, {
      "name":      "xl",
      "value":     24,
      "offerData": {
        "onOffer":            "yes",
        "offerType":          "multiplier",
        "discountPercentage": 0,
        "multiplierAmount":   "2x1"
      }
    })).toEqual({
      base:     24,
      offer:    16,
      discount: {
        type:  "multiplier",
        label: "2x1"
      }
    });
  });
});

describe("getTotals", () => {
  it("should return 0 units and 0 price as default", () => {
    expect(getTotals([])).toEqual({
      units: 0,
      price: 0
    });
  });

  it("should return correct units and price", () => {
    expect(getTotals(mockCart)).toEqual({
      units: 2,
      price: 59.8
    });
  });

  it("should never have a price 0", () => {
    const hasInvalidOfferPrice = mockCart.some(item => item.price.offer === 0 || item?.price.base === 0);

    expect(hasInvalidOfferPrice).toBe(false);
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

const productOnOffer: Partial<Product> = {
  "offerType":          "percentage",
  "discountPercentage": 15,
  "price":              5,
  "multiPrice":         "no",
  "onOffer":            "yes",
  "multiplierAmount":   ""
};

const productWithAmountOffer = {
  "offerType":          "multiplier",
  "discountPercentage": 0,
  "onOffer":            "yes",
  "multiplierAmount":   "3x2",
  "price":              "6"
};

const productWithVariants: Product = {
  "discountPercentage": 0,
  "multiPrice":         "yes",
  "price":              0,
  "onOffer":            "no",
  "offerType":          "",
  "variants":           [
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
        "discountPercentage": 40
      },
      "id": "fLRWjW3cj0kUK74tJXst"
    },
    {
      "name":      "lg",
      "offerData": {
        "offerType":          "percentage",
        "onOffer":            "yes",
        "discountPercentage": 25,
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
  "multiplierAmount": ""
};

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
          "discountPercentage": 40
        },
        "id": "fLRWjW3cj0kUK74tJXst"
      },
      {
        "name":      "lg",
        "offerData": {
          "offerType":          "percentage",
          "onOffer":            "yes",
          "discountPercentage": 25,
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
    "price":     8,
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

const mockCart: Partial<Cart> = [
  {
    "variant":  "md",
    "addedAt":  1739010087571,
    "id":       "fLRWjW3cj0kUK74tJXst",
    "quantity": 1,
    "price":    {
      "offer":    4.8,
      "discount": {
        "label": "40 %",
        "type":  "percentage"
      },
      "base": 8
    }
  },
  {
    "id":       "4UV6qXL7r2mlho8t5i4s",
    "quantity": 1,
    "variant":  null,
    "price":    {
      "base": 55
    },
    "addedAt": 1739013859862
  }
];