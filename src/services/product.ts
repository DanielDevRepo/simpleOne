import { ENDPOINTS } from "../constants/endpoints";
import type { addProductType } from "../schema/product";

export const productService = {
  getAll: async () => {
    const response = await fetch(
      ENDPOINTS.PRODUCTS.GET_ALL,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      const r = await response.json();
      throw new Error(r.error ?? 'Unknown error');
    }

    return await response.json();
  },

  getId: async (id: string) => {
    const response = await fetch(
      ENDPOINTS.PRODUCTS.GET_ID(id),
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      const r = await response.json();
      throw new Error(r.error ?? 'Unknown error');
    }

    return await response.json();
  },

   addProduct: async (data: addProductType) => {
    const response = await fetch(
      ENDPOINTS.PRODUCTS.GET_ALL,
      {
        method: 'POST',
        body: JSON.stringify(data)
      },
    );

    if (!response.ok) {
      const r = await response.json();
      throw new Error(r.error ?? 'Unknown error');
    }

    return true
  },
  
};
