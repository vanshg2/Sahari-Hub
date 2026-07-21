"use client";

import { useEffect, useState } from "react";
import { Activity, DollarSign, Package, ShoppingCart } from "lucide-react";
import { adminApi } from "@/lib/api";
import { DashboardStats } from "@/lib/types";
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.dashboard()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="h-8 w-48 bg-surface-container-low rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-background p-6 rounded-xl border border-surface-container h-32 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const stats = data?.stats;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display-lg-mobile text-primary">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-background p-6 rounded-xl border border-surface-container shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-md uppercase tracking-widest">Total Revenue</span>
            <DollarSign className="w-5 h-5 text-muted-gold" />
          </div>
          <p className="font-headline-lg text-primary">{formatPrice(stats?.totalRevenue || 0)}</p>
        </div>

        <div className="bg-background p-6 rounded-xl border border-surface-container shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-md uppercase tracking-widest">Total Orders</span>
            <ShoppingCart className="w-5 h-5 text-muted-gold" />
          </div>
          <p className="font-headline-lg text-primary">{stats?.totalOrders || 0}</p>
          {stats && stats.pendingOrders > 0 && (
            <p className="font-label-sm text-yellow-600">{stats.pendingOrders} pending</p>
          )}
        </div>

        <div className="bg-background p-6 rounded-xl border border-surface-container shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-md uppercase tracking-widest">Products</span>
            <Package className="w-5 h-5 text-muted-gold" />
          </div>
          <p className="font-headline-lg text-primary">{stats?.totalProducts || 0}</p>
        </div>

        <div className="bg-background p-6 rounded-xl border border-surface-container shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-md uppercase tracking-widest">Customers</span>
            <Activity className="w-5 h-5 text-muted-gold" />
          </div>
          <p className="font-headline-lg text-primary">{stats?.totalCustomers || 0}</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {data?.lowStockProducts && data.lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="font-headline-md text-yellow-800 mb-4">Low Stock Alert</h3>
          <div className="flex flex-col gap-2">
            {data.lowStockProducts.map((p) => (
              <div key={p.id} className="flex justify-between font-body-md text-yellow-700">
                <span>{p.name} ({p.sku})</span>
                <span className="font-bold">{p.stockQuantity} left</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-background border border-surface-container rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-surface-container">
          <h2 className="font-headline-md text-primary">Recent Orders</h2>
        </div>
        {data?.recentOrders && data.recentOrders.length > 0 ? (
          <table className="w-full text-left font-body-md text-on-surface">
            <thead className="bg-surface-container-low font-label-sm uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th className="p-4">Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {data.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-bold text-primary">#{order.orderNumber}</td>
                  <td className="p-4">{order.customer.firstName} {order.customer.lastName}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full font-label-sm uppercase ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="p-4">{formatDate(order.createdAt)}</td>
                  <td className="p-4">{formatPrice(order.totalAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center font-body-md text-on-surface-variant">No orders yet</div>
        )}
      </div>
    </div>
  );
}
