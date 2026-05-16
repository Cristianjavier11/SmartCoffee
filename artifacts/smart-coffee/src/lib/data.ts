export interface MenuItem {
  id: string;
  name: string;
  category: "Espresso" | "Specialty" | "Cold Brew" | "Food";
  price: number;
  description: string;
  imageEmoji: string;
  isPopular: boolean;
  preparationTime: number; // in minutes
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
}

export type OrderStatus = "Pendiente" | "Preparando" | "Listo" | "Entregado";

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  timestamp: string;
  customerName: string;
}

export interface Stats {
  totalOrdersToday: number;
  totalRevenue: number;
  avgOrderValue: number;
  popularItem: string;
}

export interface AIRecommendation {
  id: string;
  drink: string;
  reason: string;
  matchScore: number;
  tags: string[];
}

export const mockMenuItems: MenuItem[] = [
  { id: "m1", name: "Espresso Doble", category: "Espresso", price: 3.5, description: "Un shot doble de nuestra mezcla de la casa. Intenso y con notas a chocolate.", imageEmoji: "☕", isPopular: true, preparationTime: 2 },
  { id: "m2", name: "Americano", category: "Espresso", price: 3.0, description: "Espresso diluido en agua caliente. Suave pero con cuerpo.", imageEmoji: "☕", isPopular: false, preparationTime: 3 },
  { id: "m3", name: "Flat White", category: "Espresso", price: 3.5, description: "Perfecta armonía de espresso y agua. Simple y directo.", imageEmoji: "☕", isPopular: false, preparationTime: 3 },
  
  { id: "m4", name: "Pour Over de Especialidad", category: "Specialty", price: 5.0, description: "Café filtrado preparado a mano, resaltando notas florales y cítricas.", imageEmoji: "🏺", isPopular: false, preparationTime: 5 },
  { id: "m5", name: "Matcha Latte Caliente", category: "Specialty", price: 4.5, description: "Té matcha ceremonial con leche texturizada.", imageEmoji: "🍵", isPopular: true, preparationTime: 4 },
  { id: "m6", name: "Golden Milk Latte", category: "Specialty", price: 4.5, description: "Bebida reconfortante a base de cúrcuma, especias y leche vegetal.", imageEmoji: "💛", isPopular: false, preparationTime: 4 },
  
  { id: "m7", name: "Nitro Cold Brew", category: "Cold Brew", price: 4.5, description: "Cold brew infundido con nitrógeno. Cremoso, suave y muy refrescante.", imageEmoji: "🧊", isPopular: true, preparationTime: 1 },
  { id: "m8", name: "Cold Brew Tradicional", category: "Cold Brew", price: 4.0, description: "Infusión en frío durante 24 horas. Cero acidez.", imageEmoji: "🥤", isPopular: false, preparationTime: 1 },
  { id: "m9", name: "Cold Brew Tonic", category: "Cold Brew", price: 4.8, description: "Cold brew con agua tónica y un toque de cítricos.", imageEmoji: "🍹", isPopular: false, preparationTime: 2 },

  { id: "m10", name: "Croissant de Almendra", category: "Food", price: 3.8, description: "Masa hojaldrada crujiente rellena de crema de almendras.", imageEmoji: "🥐", isPopular: true, preparationTime: 1 },
  { id: "m11", name: "Avocado Toast", category: "Food", price: 6.5, description: "Pan de masa madre, aguacate triturado, rábano picante y microbrotes.", imageEmoji: "🥑", isPopular: true, preparationTime: 5 },
  { id: "m12", name: "Galleta de Chispas de Chocolate", category: "Food", price: 2.5, description: "Galleta artesanal con chocolate semiamargo y sal marina.", imageEmoji: "🍪", isPopular: false, preparationTime: 1 },
];

export const mockOrders: Order[] = [
  { id: "ORD-001", items: [{ menuItemId: "m1", quantity: 2 }, { menuItemId: "m10", quantity: 1 }], status: "Pendiente", total: 10.8, timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), customerName: "Ana G." },
  { id: "ORD-002", items: [{ menuItemId: "m7", quantity: 1 }], status: "Preparando", total: 4.5, timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(), customerName: "Carlos M." },
  { id: "ORD-003", items: [{ menuItemId: "m11", quantity: 1 }, { menuItemId: "m5", quantity: 1 }], status: "Listo", total: 11.0, timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), customerName: "Elena R." },
  { id: "ORD-004", items: [{ menuItemId: "m2", quantity: 1 }], status: "Entregado", total: 3.0, timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), customerName: "David P." },
  { id: "ORD-005", items: [{ menuItemId: "m4", quantity: 1 }, { menuItemId: "m12", quantity: 2 }], status: "Entregado", total: 10.0, timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), customerName: "Sofía T." },
];

export const mockStats: Stats = {
  totalOrdersToday: 42,
  totalRevenue: 348.50,
  avgOrderValue: 8.30,
  popularItem: "Nitro Cold Brew"
};
