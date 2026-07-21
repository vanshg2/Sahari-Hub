"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";
import { ordersApi } from "@/lib/api";
import { Order } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function AdminInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    ordersApi.get(id)
      .then(setOrder)
      .catch(() => setError("Order not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-pulse text-on-surface-variant font-body-md">Loading invoice...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <p className="text-error font-body-md">{error || "Order not found"}</p>
        <Link href="/admin/orders" className="text-muted-gold hover:underline font-label-md">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-on-surface">
      {/* Print Controls */}
      <div className="print:hidden bg-surface-container-low border-b border-surface-variant p-4 flex justify-between items-center max-w-5xl mx-auto">
        <Link href={`/admin/orders/${id}`} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md">
          <ArrowLeft className="w-4 h-4" /> Back to Order
        </Link>
        <button onClick={() => window.print()}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-label-md uppercase tracking-widest hover:bg-secondary transition-colors">
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>

      {/* Invoice Content */}
      <div className="max-w-5xl mx-auto p-8 md:p-16">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-surface-variant pb-12 mb-12 gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="font-display-lg text-primary tracking-widest uppercase">Sahari Hub</h1>
            <p className="text-on-surface-variant font-body-md">Luxury Fashion &amp; Accessories</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <h2 className="font-headline-md text-primary mb-2">INVOICE</h2>
            <div className="flex gap-4">
              <span className="font-label-md text-primary uppercase">Invoice No:</span>
              <span className="font-body-md">INV-{order.orderNumber}</span>
            </div>
            <div className="flex gap-4">
              <span className="font-label-md text-primary uppercase">Date:</span>
              <span className="font-body-md">{new Date(order.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
            </div>
            <div className="flex gap-4">
              <span className="font-label-md text-primary uppercase">Payment:</span>
              <span className="font-body-md">{order.paymentStatus === "PAID" ? "Paid" : "Pending"}</span>
            </div>
          </div>
        </header>

        {/* Addresses */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="p-8 bg-surface rounded-xl border border-surface-variant">
            <h2 className="font-headline-md text-primary mb-4 border-b border-surface-variant pb-2">Bill To</h2>
            <div className="text-on-surface font-body-md flex flex-col gap-1">
              <p className="font-label-md text-primary mb-1 text-base">{order.shippingName}</p>
              <p>{order.shippingAddress}</p>
              <p className="mt-2 text-on-surface-variant">{order.shippingPhone}</p>
            </div>
          </div>
          <div className="p-8 bg-surface rounded-xl border border-surface-variant">
            <h2 className="font-headline-md text-primary mb-4 border-b border-surface-variant pb-2">Ship To</h2>
            <div className="text-on-surface font-body-md flex flex-col gap-1">
              <p className="font-label-md text-primary mb-1 text-base">{order.shippingName}</p>
              <p>{order.shippingAddress}</p>
              <p className="mt-2 text-on-surface-variant">Standard Delivery</p>
            </div>
          </div>
        </section>

        {/* Line Items */}
        <section className="mb-16 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-primary text-primary font-label-md uppercase tracking-wider">
                <th className="py-4 px-2">Item Description</th>
                <th className="py-4 px-2 text-center w-24">Qty</th>
                <th className="py-4 px-2 text-right w-40">Unit Price</th>
                <th className="py-4 px-2 text-right w-40">Total</th>
              </tr>
            </thead>
            <tbody className="font-body-md divide-y divide-surface-variant">
              {order.items.map((item) => (
                <tr key={item.id} className="group hover:bg-surface transition-colors duration-200">
                  <td className="py-6 px-2">
                    <p className="font-label-md text-primary mb-1">{item.name}</p>
                    {item.product?.sku && <p className="text-sm text-on-surface-variant">SKU: {item.product.sku}</p>}
                  </td>
                  <td className="py-6 px-2 text-center text-on-surface-variant">{item.quantity}</td>
                  <td className="py-6 px-2 text-right text-on-surface-variant">{formatPrice(item.price)}</td>
                  <td className="py-6 px-2 text-right text-primary font-label-md">{formatPrice(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Summary */}
        <section className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="w-full md:w-1/2 text-on-surface-variant p-6 bg-surface-container-low rounded-xl">
            <h3 className="font-label-md text-primary uppercase mb-2">Payment Terms &amp; Notes</h3>
            <p className="text-sm leading-relaxed">Thank you for your purchase. Returns accepted within 7 days of delivery with tags intact. For support, please reference your invoice number.</p>
          </div>
          <div className="w-full md:w-[400px]">
            <div className="flex justify-between py-3 border-b border-surface-variant text-on-surface-variant">
              <span className="font-body-md">Subtotal</span>
              <span className="font-body-md">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-surface-variant text-on-surface-variant">
              <span className="font-body-md">Tax</span>
              <span className="font-body-md">{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-surface-variant text-on-surface-variant">
              <span className="font-body-md">Shipping</span>
              <span className="font-body-md">{order.shippingCost > 0 ? formatPrice(order.shippingCost) : "Free"}</span>
            </div>
            <div className="flex justify-between py-6 mt-2 border-t-2 border-primary text-primary">
              <span className="font-headline-md">Total</span>
              <span className="font-headline-md">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-surface-variant pt-12 text-center flex flex-col items-center gap-6">
          <h2 className="font-headline-md text-primary italic">Thank you for your patronage.</h2>
        </footer>
      </div>
    </div>
  );
}
