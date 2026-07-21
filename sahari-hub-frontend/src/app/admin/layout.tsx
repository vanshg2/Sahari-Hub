"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, ShoppingBag, ShoppingCart, Users, Mail, Star, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const isLoginPage = pathname === "/admin/login";
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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
      {/* Desktop Sidebar */}
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
                    ? "text-primary bg-primary-fixed/20 font-semibold"
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

      {/* Mobile Drawer Overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-background h-full shadow-2xl flex flex-col z-10">
            <div className="p-5 border-b border-surface-container flex items-center justify-between">
              <Link href="/admin" onClick={() => setIsMobileNavOpen(false)} className="font-display-lg-mobile text-primary text-lg">
                Sahari Admin
              </Link>
              <button 
                onClick={() => setIsMobileNavOpen(false)}
                className="p-2 text-on-surface-variant rounded-full hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1 font-label-md overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "text-primary bg-primary-fixed/20 font-semibold"
                        : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                    }`}
                  >
                    <item.icon className="w-5 h-5" /> {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-surface-container">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors font-label-md"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen print:h-auto overflow-hidden print:overflow-visible">
        {/* Header */}
        <header className="h-16 bg-background border-b border-surface-container flex print:hidden items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="p-2 text-primary hover:bg-surface-container rounded-lg md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="font-headline-md text-primary text-lg md:text-xl font-semibold">Admin Panel</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body-md text-on-surface-variant text-xs md:text-sm truncate max-w-[150px] sm:max-w-none">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="p-2 text-on-surface-variant hover:text-red-600 rounded-lg md:hidden"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Mobile Horizontal Quick Navigation Tabs */}
        <div className="flex md:hidden bg-background border-b border-surface-container overflow-x-auto shrink-0 scrollbar-none px-2 py-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-md whitespace-nowrap transition-colors shrink-0 ${
                  isActive
                    ? "bg-[#3A2C27] text-white font-medium shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex-1 overflow-auto print:overflow-visible p-4 md:p-8 print:p-0 bg-white print:bg-transparent">
          {children}
        </div>
      </main>
    </div>
  );
}
