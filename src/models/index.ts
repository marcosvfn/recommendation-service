export interface User {
  id: string;
  name: string;
  email: string;
  preferences: string[];
  ratings: {
    productId: string;
    score: number;
    comment?: string;
    timestamp: string;
  }[];
  purchaseHistory: { productId: string; purchaseDate: string }[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  stock: number;
}
