"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { productsApi } from "@/lib/api";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async (query?: string) => {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: "50" };
      if (query) params.search = query;
      const result = await productsApi.list(params);
      setProducts(result.data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(search);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await productsApi.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display-lg-mobile text-primary">Products</h1>
        <Link href="/admin/products/new" className="flex items-center gap-2 bg-primary text-white px-6 py-3 font-label-md uppercase tracking-widest hover:bg-secondary transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-background border border-surface-container rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
          <form onSubmit={handleSearch} className="relative w-full max-w-sm">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-outline-variant/50 rounded-lg font-body-md focus:outline-none focus:border-muted-gold transition-colors"
            />
          </form>
        </div>

        <table className="w-full text-left font-body-md text-on-surface">
          <thead className="bg-surface-container-low font-label-sm uppercase tracking-widest text-on-surface-variant">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Inventory</th>
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
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-on-surface-variant">No products found</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-primary">{product.name}</span>
                    <span className="block text-sm text-on-surface-variant">{product.sku}</span>
                  </td>
                  <td className="p-4">{product.category?.name || "—"}</td>
                  <td className="p-4">{formatPrice(product.price)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full font-label-sm uppercase ${product.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {product.isPublished ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4">{product.stockQuantity} in stock</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/${product.id}`} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-on-surface-variant hover:text-error transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
