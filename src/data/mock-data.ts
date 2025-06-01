import { Product, User } from "../models";

export const users: User[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    preferences: ["electronics", "books"],
    ratings: [
      {
        productId: "1",
        score: 5,
        comment: "Ótimo laptop, muito rápido!",
        timestamp: "2025-05-01T10:00:00Z",
      },
      {
        productId: "2",
        score: 3,
        comment: "Bom, mas a bateria poderia durar mais.",
        timestamp: "2025-05-15T14:30:00Z",
      },
      { productId: "4", score: 4, timestamp: "2025-05-20T09:00:00Z" },
    ],
    purchaseHistory: [
      { productId: "1", purchaseDate: "2025-04-20T12:00:00Z" },
      { productId: "2", purchaseDate: "2025-05-10T16:00:00Z" },
    ],
  },
  {
    id: "2",
    name: "Bruno Costa",
    email: "bruno.costa@email.com",
    preferences: ["electronics", "gaming"],
    ratings: [
      {
        productId: "2",
        score: 4,
        comment: "Excelente qualidade de som.",
        timestamp: "2025-04-25T11:00:00Z",
      },
      { productId: "3", score: 5, timestamp: "2025-05-05T15:00:00Z" },
      {
        productId: "5",
        score: 2,
        comment: "Muito caro para o que oferece.",
        timestamp: "2025-05-18T13:00:00Z",
      },
    ],
    purchaseHistory: [{ productId: "3", purchaseDate: "2025-04-30T10:00:00Z" }],
  },
  {
    id: "3",
    name: "Clara Mendes",
    email: "clara.mendes@email.com",
    preferences: ["books", "home"],
    ratings: [
      {
        productId: "4",
        score: 5,
        comment: "História envolvente!",
        timestamp: "2025-05-10T08:00:00Z",
      },
      { productId: "5", score: 4, timestamp: "2025-05-12T17:00:00Z" },
    ],
    purchaseHistory: [{ productId: "4", purchaseDate: "2025-05-01T14:00:00Z" }],
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Laptop Gamer XPro",
    category: "electronics",
    price: 4999.99,
    description: "Laptop com processador i7, 16GB RAM, e GPU RTX 3060.",
    tags: ["gaming", "laptop", "high-performance", "electronics"],
    stock: 10,
  },
  {
    id: "2",
    name: "Fone de Ouvido Bluetooth",
    category: "electronics",
    price: 299.9,
    description: "Fones sem fio com cancelamento de ruído.",
    tags: ["audio", "portable", "bluetooth", "electronics"],
    stock: 25,
  },
  {
    id: "3",
    name: "Console PlayBox 5",
    category: "gaming",
    price: 3999.0,
    description: "Console de última geração com suporte a 4K.",
    tags: ["gaming", "console", "4k"],
    stock: 8,
  },
  {
    id: "4",
    name: "Livro: Aventura Cósmica",
    category: "books",
    price: 59.9,
    description: "Um romance de ficção científica sobre exploração espacial.",
    tags: ["sci-fi", "book", "adventure", "books"],
    stock: 50,
  },
  {
    id: "5",
    name: "Smartphone Ultra 12",
    category: "electronics",
    price: 5999.0,
    description: "Smartphone com câmera de 108MP e 5G.",
    tags: ["smartphone", "5g", "camera", "electronics"],
    stock: 15,
  },
  {
    id: "6",
    name: "Conjunto de Panelas Antiaderentes",
    category: "home",
    price: 249.9,
    description: "Conjunto de 5 panelas com revestimento antiaderente.",
    tags: ["kitchen", "home", "cooking"],
    stock: 30,
  },
];
