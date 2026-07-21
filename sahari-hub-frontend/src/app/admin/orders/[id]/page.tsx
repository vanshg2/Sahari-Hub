"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Printer, Truck } from "lucide-react";
import { ordersApi } from "@/lib/api";
import { Order } from "@/lib/types";
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";

export default function AdminOrderDetails() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    ordersApi.get(params.id as string)
      .then(setOrder)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order) return;
    setUpdating(true);
    try {
      const updated = await ordersApi.updateStatus(order.id, newStatus);
      setOrder(updated);
    } catch {
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <div className="h-10 w-64 bg-surface-container-low rounded animate-pulse" />
        <div className="h-64 bg-surface-container-low rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <h1 className="font-display-lg-mobile text-primary">Order Not Found</h1>
        <Link href="/admin/orders" className="text-muted-gold underline">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="font-display-lg-mobile text-primary flex items-center gap-4">
            Order #{order.orderNumber}
            <span className={`px-3 py-1 rounded-full font-label-sm uppercase text-base ${getStatusColor(order.status)}`}>
              {getStatusLabel(order.status)}
            </span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Order Items */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8">
            <h2 className="font-headline-md text-primary border-b border-surface-container pb-4 mb-4">Items Ordered</h2>
            <div className="flex flex-col gap-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center pb-4 border-b border-surface-container last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-label-md text-primary">{item.name}</p>
                      <p className="font-label-sm text-on-surface-variant mt-1">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-body-md text-primary">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Link
                href={`/admin/orders/${order.id}/invoice`}
                className="flex items-center gap-2 border border-outline-variant/30 text-primary px-6 py-3 font-label-md uppercase tracking-widest hover:bg-surface-container-low transition-colors"
              >
                <Printer className="w-4 h-4" /> View Invoice
              </Link>
              {order.status === "PAID" && (
                <button
                  onClick={() => handleStatusUpdate("SHIPPED")}
                  disabled={updating}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 font-label-md uppercase tracking-widest hover:bg-secondary transition-colors shadow-sm disabled:opacity-50"
                >
                  <Truck className="w-4 h-4" /> Mark as Shipped
                </button>
              )}
              {order.status === "SHIPPED" && (
                <button
                  onClick={() => handleStatusUpdate("DELIVERED")}
                  disabled={updating}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 font-label-md uppercase tracking-widest hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  Mark as Delivered
                </button>
              )}
              {(order.status === "PENDING_PAYMENT" || order.status === "PAID") && (
                <button
                  onClick={() => handleStatusUpdate("CANCELLED")}
                  disabled={updating}
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 font-label-md uppercase tracking-widest hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
          
          <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8">
            <h2 className="font-headline-md text-primary border-b border-surface-container pb-4 mb-4">Payment Summary</h2>
            <div className="flex justify-between mb-2"><span className="text-on-surface-variant">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            <div className="flex justify-between mb-2"><span className="text-on-surface-variant">Shipping</span><span>{order.shippingCost === 0 ? "Free" : formatPrice(order.shippingCost)}</span></div>
            <div className="flex justify-between mb-2"><span className="text-on-surface-variant">Tax</span><span>{formatPrice(order.tax)}</span></div>
            <div className="flex justify-between mt-4 pt-4 border-t border-surface-container font-headline-md text-primary"><span>Total</span><span>{formatPrice(order.totalAmount)}</span></div>
          </div>
        </div>

        {/* Right Col: Customer Details */}
        <div className="flex flex-col gap-8">
          <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8">
            <h2 className="font-headline-md text-primary border-b border-surface-container pb-4 mb-4">Customer Details</h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-label-md text-primary mb-1">{order.customer.firstName} {order.customer.lastName}</p>
                {order.customer.email && <p className="font-body-md text-secondary">{order.customer.email}</p>}
                <p className="font-body-md text-on-surface-variant mt-1">{order.customer.phone}</p>
              </div>
              <div className="pt-4 border-t border-surface-container">
                <h3 className="font-label-md uppercase tracking-widest text-on-surface-variant mb-2">Shipping Address</h3>
                <p className="font-body-md text-primary">
                  {order.shippingName}<br />
                  {order.shippingAddress}
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container">
                <h3 className="font-label-md uppercase tracking-widest text-on-surface-variant mb-2">Order Info</h3>
                <p className="font-body-md text-on-surface-variant">Placed: {formatDate(order.createdAt)}</p>
                <p className="font-body-md text-on-surface-variant">Payment: {getStatusLabel(order.paymentStatus)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
