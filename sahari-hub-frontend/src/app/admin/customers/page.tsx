"use client";

import { useEffect, useState } from "react";
import { Search, Mail } from "lucide-react";
import { customersApi } from "@/lib/api";
import { Customer } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCustomers = async (query?: string) => {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: "50" };
      if (query) params.search = query;
      const result = await customersApi.list(params);
      setCustomers(result.data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCustomers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCustomers(search);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display-lg-mobile text-primary">Customers</h1>
      </div>

      <div className="bg-background border border-surface-container rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
          <form onSubmit={handleSearch} className="relative w-full max-w-sm">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-outline-variant/50 rounded-lg font-body-md focus:outline-none focus:border-muted-gold transition-colors"
            />
          </form>
        </div>

        <table className="w-full text-left font-body-md text-on-surface">
          <thead className="bg-surface-container-low font-label-sm uppercase tracking-widest text-on-surface-variant">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Total Spent</th>
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
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-on-surface-variant">No customers yet</td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed/30 text-primary flex items-center justify-center font-bold">
                      {customer.firstName.charAt(0)}
                    </div>
                    <span className="font-bold text-primary">{customer.firstName} {customer.lastName}</span>
                  </td>
                  <td className="p-4 text-on-surface-variant">{customer.phone}</td>
                  <td className="p-4 text-on-surface-variant">{customer.email || "—"}</td>
                  <td className="p-4">{customer._count?.orders || 0}</td>
                  <td className="p-4">{formatPrice(customer.lifetimeSpend)}</td>
                  <td className="p-4 text-right">
                    {customer.email && (
                      <a href={`mailto:${customer.email}`} className="p-2 text-on-surface-variant hover:text-primary transition-colors inline-flex">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
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
