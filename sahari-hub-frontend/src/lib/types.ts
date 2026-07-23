export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  badge?: string | null;
  stockQuantity: number;
  isPublished: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: ProductImage[];
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string | null;
  isPrimary: boolean;
  order: number;
  productId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  _count?: { products: number };
  products?: Product[];
}

export interface Customer {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  totalOrders: number;
  lifetimeSpend: number;
  addresses?: Address[];
  orders?: Order[];
  _count?: { orders: number };
  createdAt: string;
}

export interface Address {
  id: string;
  customerId: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  status: string;
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  paymentStatus: string;
  paymentId?: string | null;
  razorpayOrderId?: string | null;
  items: OrderItem[];
  customer: Customer;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  product: Product;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  sku: string;
  stockQuantity: number;
}

export interface DashboardStats {
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalCustomers: number;
    totalRevenue: number;
    pendingOrders: number;
    unreadMessages: number;
  };
  lowStockProducts: { id: string; name: string; sku: string; stockQuantity: number }[];
  recentOrders: Order[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  text: string;
  product: string | null;
  isActive: boolean;
  createdAt: string;
}
