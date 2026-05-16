import { ArrowRight, TrendingUp, Coffee, DollarSign, ShoppingBag, Star, Package, BarChart3, Clock } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { mockStats, mockMenuItems, mockOrders } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4, ease: "easeOut" },
});

export default function Dashboard() {
  const totalProducts = mockMenuItems.length;
  const totalOrders = mockOrders.length;
  const totalSales = mockStats.totalRevenue;
  const bestSeller = mockStats.popularItem;
  const popularItems = mockMenuItems.filter((i) => i.isPopular).slice(0, 4);
  const activeOrders = mockOrders.filter(
    (o) => o.status === "Pendiente" || o.status === "Preparando"
  );

  const statusColor: Record<string, string> = {
    Pendiente: "bg-amber-100 text-amber-700 border-amber-200",
    Preparando: "bg-blue-100 text-blue-700 border-blue-200",
    Listo: "bg-green-100 text-green-700 border-green-200",
    Entregado: "bg-stone-100 text-stone-600 border-stone-200",
  };

  return (
    <div className="pb-16 space-y-10">

      {/* ── Bienvenida ── */}
      <motion.div {...fadeUp(0)}>
        <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-primary-foreground/10 pointer-events-none">
            <Coffee size={180} />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-medium text-primary-foreground/70 uppercase tracking-widest mb-1">
              Bienvenido al sistema
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              SmartCoffee
            </h1>
            <p className="mt-2 text-primary-foreground/80 max-w-md">
              Panel de control de tu cafetería inteligente. Aquí puedes ver el
              resumen del día, el menú, los pedidos y las recomendaciones de IA.
            </p>
          </div>
          <Link href="/ai" className="relative z-10 shrink-0">
            <Button
              variant="secondary"
              className="gap-2"
              data-testid="btn-go-ai"
            >
              Consultar Barista IA
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* ── Tarjetas de resumen ── */}
      <section>
        <h2 className="text-xl font-serif font-semibold text-foreground mb-4">
          Resumen del día
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Total Productos */}
          <motion.div {...fadeUp(0.1)}>
            <Card className="border border-border hover:shadow-md transition-shadow" data-testid="card-total-products">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Productos
                </CardTitle>
                <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <Package size={18} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground">{totalProducts}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  productos en el menú
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Pedidos */}
          <motion.div {...fadeUp(0.2)}>
            <Card className="border border-border hover:shadow-md transition-shadow" data-testid="card-total-orders">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Pedidos
                </CardTitle>
                <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                  <ShoppingBag size={18} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground">{mockStats.totalOrdersToday}</div>
                <p className="text-xs text-green-600 font-medium flex items-center mt-1 gap-1">
                  <TrendingUp size={12} />
                  +12% vs ayer
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ventas Simuladas */}
          <motion.div {...fadeUp(0.3)}>
            <Card className="border border-border hover:shadow-md transition-shadow" data-testid="card-total-sales">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Ventas Simuladas
                </CardTitle>
                <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <DollarSign size={18} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground">
                  ${totalSales.toFixed(2)}
                </div>
                <p className="text-xs text-green-600 font-medium flex items-center mt-1 gap-1">
                  <TrendingUp size={12} />
                  +8% vs ayer
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Producto más vendido */}
          <motion.div {...fadeUp(0.4)}>
            <Card className="border border-border hover:shadow-md transition-shadow" data-testid="card-best-seller">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Producto + Vendido
                </CardTitle>
                <div className="h-9 w-9 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
                  <Star size={18} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-foreground leading-snug">
                  {bestSeller}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  favorito del día
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── Sección inferior ── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Productos populares */}
        <motion.section {...fadeUp(0.5)} className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-semibold text-foreground">
              Productos Populares
            </h2>
            <Link
              href="/menu"
              className="text-sm text-primary hover:underline flex items-center gap-1"
              data-testid="link-ver-menu"
            >
              Ver menú completo <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {popularItems.map((item, i) => (
              <motion.div key={item.id} {...fadeUp(0.55 + i * 0.07)}>
                <Card className="flex items-center gap-4 p-4 hover:border-primary/60 transition-colors" data-testid={`card-popular-${item.id}`}>
                  <div className="h-14 w-14 bg-secondary rounded-xl flex items-center justify-center text-2xl shrink-0">
                    {item.imageEmoji}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <p className="text-primary font-bold text-sm mt-0.5">${item.price.toFixed(2)}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pedidos activos */}
        <motion.section {...fadeUp(0.6)} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-semibold text-foreground">
              Pedidos Activos
            </h2>
            <Link
              href="/orders"
              className="text-sm text-primary hover:underline flex items-center gap-1"
              data-testid="link-ver-pedidos"
            >
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          {activeOrders.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground text-sm">
              No hay pedidos activos en este momento.
            </Card>
          ) : (
            <div className="space-y-3">
              {activeOrders.map((order) => (
                <Card key={order.id} className="p-4 space-y-2" data-testid={`card-order-${order.id}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground">{order.id}</span>
                    <Badge className={`text-xs border ${statusColor[order.status]}`}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{order.customerName}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock size={12} />
                      {order.items.length} {order.items.length === 1 ? "ítem" : "ítems"}
                    </span>
                    <span className="font-bold text-foreground">${order.total.toFixed(2)}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Mini gráfico de categorías */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <BarChart3 size={16} className="text-primary" />
              Productos por categoría
            </div>
            {(["Espresso", "Specialty", "Cold Brew", "Food"] as const).map((cat) => {
              const count = mockMenuItems.filter((m) => m.category === cat).length;
              const pct = Math.round((count / totalProducts) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{cat}</span>
                    <span>{count} productos</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
