"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";
import { ordersApi } from "@/lib/api";
import { Order } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function CustomerInvoicePage({ params }: { params: Promise<{ id: string }> }) {
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

  const downloadPDF = () => window.print();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-on-surface-variant font-body-md">Loading invoice...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-error font-body-md">{error || "Order not found"}</p>
        <Link href="/" className="text-muted-gold hover:underline font-label-md">Return to Store</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface p-4 print:p-0 print:min-h-0 print:bg-white">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { margin: 0mm; size: a4 portrait; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}} />

      {/* Controls (Hidden in PDF) */}
      <div className="print:hidden bg-surface-container-low border border-surface-variant p-4 flex justify-between items-center max-w-5xl mx-auto rounded-lg mb-8 shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md">
          <ArrowLeft className="w-4 h-4" /> Return to Store
        </Link>
        <button onClick={downloadPDF}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-label-md uppercase tracking-widest hover:bg-muted-gold hover:text-primary transition-all shadow-md">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      {/* Invoice Content */}
      <div className="max-w-4xl mx-auto bg-white p-12 print:p-10 shadow-sm print:shadow-none border border-outline-variant/20 print:border-none rounded-sm print:rounded-none">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-primary mb-8 print:mb-6 gap-8 print:gap-4 bg-[#FDF9EA] print:bg-[#FDF9EA] p-8 print:p-6 rounded-t-sm">
          <div className="flex flex-col gap-2 print:gap-1">
            <h1 className="font-display-lg text-primary tracking-widest uppercase text-4xl print:text-3xl">Sahari Hub</h1>
            <p className="text-on-surface-variant font-body-sm tracking-widest uppercase">Luxury Fashion &amp; Accessories</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <h2 className="font-headline-lg text-primary mb-2 print:mb-1 tracking-[0.2em]">INVOICE</h2>
            <div className="flex gap-4">
              <span className="font-label-sm text-primary uppercase">Invoice No:</span>
              <span className="font-body-sm font-medium">INV-{order.orderNumber}</span>
            </div>
            <div className="flex gap-4">
              <span className="font-label-sm text-primary uppercase">Date:</span>
              <span className="font-body-sm font-medium">{new Date(order.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
            </div>
            <div className="flex gap-4">
              <span className="font-label-sm text-primary uppercase">Order ID:</span>
              <span className="font-body-sm font-medium">{order.orderNumber}</span>
            </div>
          </div>
        </header>

        {/* Addresses */}
        <section className="grid grid-cols-2 gap-12 print:gap-8 mb-12 print:mb-8">
          <div>
            <h2 className="font-label-md text-primary mb-4 print:mb-2 border-b border-surface-variant pb-2 uppercase tracking-widest">Bill To</h2>
            <div className="text-on-surface font-body-sm flex flex-col gap-1 text-on-surface-variant">
              <p className="font-bold text-primary mb-1 text-base">{order.shippingName}</p>
              <p>{order.shippingAddress}</p>
              <p className="mt-2">{order.shippingPhone}</p>
            </div>
          </div>
          <div>
            <h2 className="font-label-md text-primary mb-4 print:mb-2 border-b border-surface-variant pb-2 uppercase tracking-widest">Ship To</h2>
            <div className="text-on-surface font-body-sm flex flex-col gap-1 text-on-surface-variant">
              <p className="font-bold text-primary mb-1 text-base">{order.shippingName}</p>
              <p>{order.shippingAddress}</p>
              <p className="mt-2 text-primary font-medium">Standard Delivery</p>
            </div>
          </div>
        </section>

        {/* Line Items */}
        <section className="mb-12 print:mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-primary text-primary font-label-sm uppercase tracking-widest">
                <th className="py-3 print:py-2 px-2">Item Description</th>
                <th className="py-3 print:py-2 px-2 text-center w-20">Qty</th>
                <th className="py-3 print:py-2 px-2 text-right w-32">Unit Price</th>
                <th className="py-3 print:py-2 px-2 text-right w-32">Total</th>
              </tr>
            </thead>
            <tbody className="font-body-sm">
              {order.items.map((item) => (
                <tr key={item.id} className="border-b border-surface-variant">
                  <td className="py-4 print:py-3 px-2">
                    <p className="font-bold text-primary mb-1">{item.name}</p>
                    {item.product?.sku && <p className="text-xs text-on-surface-variant">SKU: {item.product.sku}</p>}
                  </td>
                  <td className="py-4 print:py-3 px-2 text-center text-on-surface-variant">{item.quantity}</td>
                  <td className="py-4 print:py-3 px-2 text-right text-on-surface-variant">{formatPrice(item.price)}</td>
                  <td className="py-4 print:py-3 px-2 text-right text-primary font-bold">{formatPrice(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Summary */}
        <section className="flex justify-between items-end mb-16 print:mb-8 gap-12 print:gap-8">
          <div className="w-1/2 text-on-surface-variant">
            <h3 className="font-label-sm text-primary uppercase mb-2 tracking-widest">Payment Terms &amp; Notes</h3>
            <p className="text-xs leading-relaxed">Thank you for your purchase. Returns accepted within 7 days of delivery with tags intact. For support, please reference your invoice number.</p>
          </div>
          <div className="w-64">
            <div className="flex justify-between py-2 border-b border-surface-variant text-on-surface-variant text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-surface-variant text-on-surface-variant text-sm">
              <span>Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-surface-variant text-on-surface-variant text-sm">
              <span>Shipping</span>
              <span>{order.shippingCost > 0 ? formatPrice(order.shippingCost) : "Free"}</span>
            </div>
            <div className="flex justify-between py-4 mt-2 border-t-2 border-primary text-primary font-bold text-xl print:text-lg">
              <span>Total</span>
              <span>{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-8 print:p-6 border-t border-surface-variant text-center bg-[#FDF9EA] print:bg-[#FDF9EA] rounded-b-sm">
          <p className="font-headline-sm text-primary italic">Thank you for your patronage.</p>
          <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-widest">saharihub.com</p>
        </footer>
      </div>
    </div>
  );
}
