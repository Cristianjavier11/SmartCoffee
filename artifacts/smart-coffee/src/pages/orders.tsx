import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, ChevronRight, CupSoda, PackageCheck } from "lucide-react";
import { mockOrders, mockMenuItems, Order, OrderStatus } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const statusColors: Record<OrderStatus, string> = {
  "Pendiente": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Preparando": "bg-blue-100 text-blue-800 border-blue-200",
  "Listo": "bg-green-100 text-green-800 border-green-200",
  "Entregado": "bg-gray-100 text-gray-800 border-gray-200"
};

const statusIcons: Record<OrderStatus, React.ElementType> = {
  "Pendiente": Clock,
  "Preparando": CupSoda,
  "Listo": CheckCircle2,
  "Entregado": PackageCheck
};

export default function Orders() {
  const [filter, setFilter] = useState<string>("All");

  const filteredOrders = mockOrders.filter(order => 
    filter === "All" ? true : order.status === filter
  );

  return (
    <div className="pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Pedidos</h1>
          <p className="text-muted-foreground">Gestiona y monitorea el estado de las órdenes.</p>
        </div>
        
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px] bg-card">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Todos los estados</SelectItem>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="Preparando">Preparando</SelectItem>
            <SelectItem value="Listo">Listo</SelectItem>
            <SelectItem value="Entregado">Entregado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const Icon = statusIcons[order.status];
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:border-primary/30 transition-colors cursor-pointer group">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${statusColors[order.status]} bg-opacity-20`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg">{order.customerName}</h3>
                        <span className="text-sm text-muted-foreground font-mono">{order.id}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(order.timestamp), { addSuffix: true, locale: es })}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 max-w-md">
                    <div className="text-sm">
                      {order.items.map(item => {
                        const menuItem = mockMenuItems.find(m => m.id === item.menuItemId);
                        return (
                          <div key={item.menuItemId} className="flex justify-between py-1 border-b border-border/50 last:border-0">
                            <span>{item.quantity}x {menuItem?.name}</span>
                            <span className="text-muted-foreground">${((menuItem?.price || 0) * item.quantity).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-3 min-w-[120px]">
                    <div className="text-lg font-bold">${order.total.toFixed(2)}</div>
                    <Badge className={`${statusColors[order.status]} hover:${statusColors[order.status]}`}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="hidden md:flex text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            <p className="text-lg">No hay pedidos que coincidan con el filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
