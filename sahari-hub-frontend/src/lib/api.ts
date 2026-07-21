import { PaginatedResponse, Product, Category, Order, Customer, DashboardStats, CartItem, ContactMessage, Review } from "./types";

const API_BASE = "/api";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...((options?.headers as Record<string, string>) || {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }
    throw new ApiError(body.message || "Request failed", res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// Products
export const productsApi = {
  list: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return fetchApi<PaginatedResponse<Product>>(`/products${query}`);
  },
  get: (id: string) => fetchApi<Product>(`/products/${id}`),
  getBySlug: (slug: string) => fetchApi<Product>(`/products/slug/${slug}`),
  featured: (limit = 8) => fetchApi<Product[]>(`/products/featured?limit=${limit}`),
  related: (id: string, limit = 4) => fetchApi<Product[]>(`/products/${id}/related?limit=${limit}`),
  create: (data: Record<string, unknown>) => fetchApi<Product>("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Record<string, unknown>) => fetchApi<Product>(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (id: string) => fetchApi<void>(`/products/${id}`, { method: "DELETE" }),
};

// Categories
export const categoriesApi = {
  list: () => fetchApi<Category[]>("/categories"),
  get: (id: string) => fetchApi<Category>(`/categories/${id}`),
  getBySlug: (slug: string) => fetchApi<Category>(`/categories/slug/${slug}`),
  create: (data: Record<string, unknown>) => fetchApi<Category>("/categories", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Record<string, unknown>) => fetchApi<Category>(`/categories/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (id: string) => fetchApi<void>(`/categories/${id}`, { method: "DELETE" }),
};

// Orders
export const ordersApi = {
  list: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return fetchApi<PaginatedResponse<Order>>(`/orders${query}`);
  },
  get: (id: string) => fetchApi<Order>(`/orders/${id}`),
  getByNumber: (orderNumber: string) => fetchApi<Order>(`/orders/number/${orderNumber}`),
  create: (data: Record<string, unknown>) => fetchApi<Order>("/orders", { method: "POST", body: JSON.stringify(data) }),
  updateStatus: (id: string, status: string) =>
    fetchApi<Order>(`/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  stats: () => fetchApi<{ totalOrders: number; totalRevenue: number; recentOrders: Order[]; ordersByStatus: Record<string, unknown>[] }>("/orders/stats"),
  byCustomer: (customerId: string) => fetchApi<Order[]>(`/orders/customer/${customerId}`),
};

// Customers
export const customersApi = {
  list: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return fetchApi<PaginatedResponse<Customer>>(`/customers${query}`);
  },
  get: (id: string) => fetchApi<Customer>(`/customers/${id}`),
  getByPhone: (phone: string) => fetchApi<Customer | null>(`/customers/phone/${phone}`),
  update: (id: string, data: Record<string, unknown>) => fetchApi<Customer>(`/customers/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  stats: () => fetchApi<{ totalCustomers: number; newThisMonth: number; topSpenders: Customer[] }>("/customers/stats"),
};

// Admin
export const adminApi = {
  dashboard: () => fetchApi<DashboardStats>("/admin/dashboard"),
};

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    fetchApi<{ access_token: string; user: { id: string; email: string; role: string } }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  profile: () => fetchApi<{ id: string; email: string; role: string; createdAt: string }>("/auth/profile"),
};

// Contact
export const contactApi = {
  submit: (data: { name: string; email: string; message: string }) =>
    fetchApi<unknown>("/contact", { method: "POST", body: JSON.stringify(data) }),
  list: () => fetchApi<ContactMessage[]>("/contact"),
  markAsRead: (id: string) => fetchApi<unknown>(`/contact/${id}/read`, { method: "PATCH" }),
};

// Reviews
export const reviewsApi = {
  active: () => fetchApi<Review[]>("/reviews"),
  list: () => fetchApi<Review[]>("/reviews/all"),
  create: (data: Record<string, unknown>) => fetchApi<unknown>("/reviews", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Record<string, unknown>) => fetchApi<unknown>(`/reviews/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (id: string) => fetchApi<void>(`/reviews/${id}`, { method: "DELETE" }),
};

// Upload
export const uploadApi = {
  single: async (file: File): Promise<{ url: string; filename: string }> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_BASE}/upload/image`, {
      method: "POST",
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(body.message || "Upload failed");
    }
    return res.json();
  },
  multiple: async (files: File[]): Promise<{ url: string; filename: string }[]> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const res = await fetch(`${API_BASE}/upload/images`, {
      method: "POST",
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(body.message || "Upload failed");
    }
    return res.json();
  },
};

// Cart helper (localStorage)
export const cartStorage = {
  get: (): CartItem[] => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("sahari_cart") || "[]");
    } catch {
      return [];
    }
  },
  set: (items: CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sahari_cart", JSON.stringify(items));
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sahari_cart");
    }
  },
};
