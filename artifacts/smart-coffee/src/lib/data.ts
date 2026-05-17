export interface MenuItem {
  id: string;
  name: string;
  category: "Café" | "Especialidad" | "Frío" | "Postres";
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
  notes?: string;
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
  { id: "m1", name: "Café Americano", category: "Café", price: 3.0, description: "Espresso diluido en agua caliente. Suave pero con cuerpo.", imageEmoji: "☕", isPopular: true, preparationTime: 2 },
  { id: "m2", name: "Latte", category: "Café", price: 4.0, description: "Espresso con abundante leche al vapor y una fina capa de espuma.", imageEmoji: "🥛", isPopular: true, preparationTime: 3 },
  { id: "m3", name: "Cappuccino", category: "Café", price: 4.5, description: "Partes iguales de espresso, leche al vapor y espuma espesa.", imageEmoji: "☕", isPopular: false, preparationTime: 3 },
  { id: "m4", name: "Mocha", category: "Café", price: 5.0, description: "Delicioso espresso con chocolate caliente y leche al vapor.", imageEmoji: "🍫", isPopular: true, preparationTime: 4 },
  
  { id: "m5", name: "Frappé", category: "Frío", price: 5.5, description: "Bebida de café licuada con hielo, coronada con crema batida.", imageEmoji: "🥤", isPopular: true, preparationTime: 5 },
  
  { id: "m6", name: "Té chai", category: "Especialidad", price: 4.5, description: "Infusión de té negro con especias aromáticas y leche al vapor.", imageEmoji: "🍵", isPopular: false, preparationTime: 4 },
  { id: "m7", name: "Chocolate caliente", category: "Especialidad", price: 4.0, description: "Cacao premium derretido con leche entera y un toque de vainilla.", imageEmoji: "☕", isPopular: true, preparationTime: 3 },
  
  { id: "m8", name: "Pan dulce", category: "Postres", price: 2.5, description: "Variedad de pan horneado fresco del día. Suave y esponjoso.", imageEmoji: "🥐", isPopular: true, preparationTime: 1 },
  { id: "m9", name: "Cheesecake", category: "Postres", price: 6.0, description: "Rebanada de pastel de queso estilo Nueva York con frutos rojos.", imageEmoji: "🍰", isPopular: false, preparationTime: 1 },
  { id: "m10", name: "Galletas", category: "Postres", price: 2.0, description: "Galletas artesanales con chispas de chocolate recién horneadas.", imageEmoji: "🍪", isPopular: false, preparationTime: 1 },
];

export const mockOrders: Order[] = [
  { id: "ORD-001", items: [{ menuItemId: "m1", quantity: 2 }, { menuItemId: "m10", quantity: 1 }], status: "Pendiente", total: 8.0, timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), customerName: "Ana G." },
  { id: "ORD-002", items: [{ menuItemId: "m7", quantity: 1 }], status: "Preparando", total: 4.0, timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(), customerName: "Carlos M." },
  { id: "ORD-003", items: [{ menuItemId: "m9", quantity: 1 }, { menuItemId: "m5", quantity: 1 }], status: "Listo", total: 11.5, timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), customerName: "Elena R." },
  { id: "ORD-004", items: [{ menuItemId: "m2", quantity: 1 }], status: "Entregado", total: 4.0, timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), customerName: "David P." },
  { id: "ORD-005", items: [{ menuItemId: "m4", quantity: 1 }, { menuItemId: "m8", quantity: 2 }], status: "Entregado", total: 10.0, timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), customerName: "Sofía T." },
];

export const mockStats: Stats = {
  totalOrdersToday: 42,
  totalRevenue: 348.50,
  avgOrderValue: 8.30,
  popularItem: "Nitro Cold Brew"
};
