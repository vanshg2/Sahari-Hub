"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Eye } from "lucide-react";
import { ordersApi } from "@/lib/api";
import { Order } from "@/lib/types";
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchOrders = async (query?: string) => {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: "50" };
      if (query) params.search = query;
      const result = await ordersApi.list(params);
      setOrders(result.data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(search);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display-lg-mobile text-primary">Orders</h1>
      </div>

      <div className="bg-background border border-surface-container rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
          <form onSubmit={handleSearch} className="relative w-full max-w-sm">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-outline-variant/50 rounded-lg font-body-md focus:outline-none focus:border-muted-gold transition-colors"
            />
          </form>
        </div>

        <table className="w-full text-left font-body-md text-on-surface">
          <thead className="bg-surface-container-low font-label-sm uppercase tracking-widest text-on-surface-variant">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="p-4">
                    <div className="h-12 bg-surface-container-low rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-on-surface-variant">No orders yet</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-bold text-primary">#{order.orderNumber}</td>
                  <td className="p-4">{formatDate(order.createdAt)}</td>
                  <td className="p-4">{order.customer.firstName} {order.customer.lastName}</td>
                  <td className="p-4">{formatPrice(order.totalAmount)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full font-label-sm uppercase ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/orders/${order.id}`} className="inline-flex items-center justify-center p-2 text-on-surface-variant hover:text-primary transition-colors">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
