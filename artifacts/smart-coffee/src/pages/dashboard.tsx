import { ArrowRight, TrendingUp, Coffee, DollarSign, Activity } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { mockStats, mockMenuItems } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const popularItems = mockMenuItems.filter(i => i.isPopular).slice(0, 3);

  return (
    <div className="pb-12">
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Buenos días.</h1>
        <p className="text-muted-foreground text-lg">Aquí tienes el resumen del café de hoy.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Órdenes Hoy</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{mockStats.totalOrdersToday}</div>
              <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +12% vs ayer
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${mockStats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +8% vs ayer
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ticket Promedio</CardTitle>
              <ShoppingCart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${mockStats.avgOrderValue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Item Estrella</CardTitle>
              <Coffee className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-foreground leading-tight">{mockStats.popularItem}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-semibold">Tendencias del Menú</h2>
            <Link href="/menu" className="text-sm text-primary hover:underline flex items-center">
              Ver todo el menú <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {popularItems.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + (i * 0.1) }}>
                <Card className="flex items-center p-4 hover:border-primary/50 transition-colors">
                  <div className="h-16 w-16 bg-secondary rounded-lg flex items-center justify-center text-3xl mr-4 shrink-0">
                    {item.imageEmoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.category}</p>
                    <div className="text-primary font-medium mt-1">${item.price.toFixed(2)}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <Card className="bg-primary text-primary-foreground h-full overflow-hidden relative">
            <div className="absolute -right-8 -top-8 text-primary-foreground/10">
              <Coffee size={180} />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-serif">Recomendación IA</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 flex flex-col justify-between h-[calc(100%-5rem)]">
              <p className="text-primary-foreground/80 mb-6">
                Descubre qué beber hoy basado en tu estado de ánimo, clima y hora del día.
              </p>
              <Link href="/ai">
                <Button variant="secondary" className="w-full">
                  Consultar Barista IA
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Inline missing icon
function ShoppingCart(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
