export const Categories = {
  Electronics: "Electronics",
  Clothing: "Clothing",
  Books: "Books",
  Home: "Home",
} as const;


export type Category = typeof Categories[keyof typeof Categories];

export interface Product {
  id: string;              
  name: string;
  description: string;
  price: number;
  category: Category;
  stock: number;            
  imageUrl: string;         
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};