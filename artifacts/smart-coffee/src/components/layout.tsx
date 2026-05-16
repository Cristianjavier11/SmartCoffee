import { Link, useLocation } from "wouter";
import { Coffee, Menu as MenuIcon, ShoppingBag, BrainCircuit, Info, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Menu", path: "/menu", icon: Coffee },
  { name: "Pedidos", path: "/orders", icon: ShoppingBag },
  { name: "Smart AI", path: "/ai", icon: BrainCircuit },
  { name: "About", path: "/about", icon: Info },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex min-h-[100dvh] w-full bg-background font-sans text-foreground">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-border bg-card flex flex-col items-stretch sticky top-0 h-[100dvh]">
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <Coffee size={18} />
          </div>
          <span className="font-serif font-semibold text-xl tracking-tight">SmartCoffee</span>
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-2 mt-4">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all cursor-pointer font-medium text-sm",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  <Icon size={18} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <div className="text-xs text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Barista Status</p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
