"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, ShoppingBag, ShoppingCart, Users, Mail, Star, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-container-low">
        <div className="animate-pulse text-on-surface-variant font-body-md">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: ShoppingBag },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/messages", label: "Messages", icon: Mail },
    { href: "/admin/reviews", label: "Reviews", icon: Star },
  ];

  return (
    <div className="flex h-screen print:h-auto bg-surface-container-low text-on-surface">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-surface-container hidden md:flex print:hidden flex-col">
        <div className="p-6 border-b border-surface-container">
          <Link href="/admin" className="font-display-lg-mobile text-primary text-xl">Sahari Admin</Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 font-label-md">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary bg-primary-fixed/20"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                }`}
              >
                <item.icon className="w-5 h-5" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-surface-container">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary text-sm">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <span className="font-body-md text-on-surface-variant text-sm truncate">{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-on-surface-variant hover:bg-surface-container hover:text-primary rounded-lg transition-colors font-label-md"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen print:h-auto overflow-hidden print:overflow-visible">
        <header className="h-16 bg-background border-b border-surface-container flex print:hidden items-center justify-between px-8">
          <div className="font-headline-md text-primary">Admin Panel</div>
          <div className="flex items-center gap-4">
            <span className="font-body-md text-on-surface-variant text-sm hidden sm:block">{user?.email}</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto print:overflow-visible p-8 print:p-0 bg-white print:bg-transparent">
          {children}
        </div>
      </main>
    </div>
  );
}
