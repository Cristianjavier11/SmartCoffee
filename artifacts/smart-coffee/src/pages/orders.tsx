import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, ChevronRight, CupSoda, PackageCheck, Trash2, Plus } from "lucide-react";
import { mockOrders, mockMenuItems, Order, OrderStatus, OrderItem } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  
  // Local storage logic for orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("smartcoffee_orders");
    return saved ? JSON.parse(saved) : mockOrders;
  });

  useEffect(() => {
    localStorage.setItem("smartcoffee_orders", JSON.stringify(orders));
  }, [orders]);

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [draftItems, setDraftItems] = useState<OrderItem[]>([]);

  const filteredOrders = orders.filter(order => 
    filter === "All" ? true : order.status === filter
  );

  const addDraftItem = () => {
    if (!selectedProduct || quantity < 1) return;
    
    // Check if product is already in draft, then just increase quantity
    const existingIndex = draftItems.findIndex(i => i.menuItemId === selectedProduct);
    if (existingIndex >= 0) {
      const newItems = [...draftItems];
      newItems[existingIndex].quantity += quantity;
      setDraftItems(newItems);
    } else {
      setDraftItems([...draftItems, { menuItemId: selectedProduct, quantity }]);
    }
    
    // Reset product selection
    setSelectedProduct("");
    setQuantity(1);
  };

  const removeDraftItem = (index: number) => {
    setDraftItems(draftItems.filter((_, i) => i !== index));
  };

  const saveOrder = () => {
    if (!customerName.trim() || draftItems.length === 0) return;

    let total = 0;
    draftItems.forEach(item => {
      const product = mockMenuItems.find(m => m.id === item.menuItemId);
      if (product) {
        total += product.price * item.quantity;
      }
    });

    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customerName: customerName.trim(),
      items: draftItems,
      status: "Pendiente",
      total,
      timestamp: new Date().toISOString(),
      notes: notes.trim() || undefined
    };

    setOrders([newOrder, ...orders]);
    
    // Reset form
    setCustomerName("");
    setNotes("");
    setDraftItems([]);
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <div className="pb-12 space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Pedidos</h1>
        <p className="text-muted-foreground">Gestiona y monitorea el estado de las órdenes.</p>
      </div>

      {/* CREATE ORDER FORM */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Nuevo Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre del cliente</label>
              <Input 
                placeholder="Ej. María García" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Observaciones (Opcional)</label>
              <Input 
                placeholder="Ej. Para llevar, extra caliente..." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="p-4 bg-secondary/20 rounded-xl space-y-4 border border-border">
            <h3 className="font-semibold text-sm">Agregar Productos</h3>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMenuItems.map(item => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.imageEmoji} {item.name} - ${item.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-32">
                <Input 
                  type="number" 
                  min="1" 
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="bg-background"
                />
              </div>
              <Button onClick={addDraftItem} disabled={!selectedProduct} variant="secondary">
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </div>

            {/* DRAFT ITEMS LIST */}
            {draftItems.length > 0 && (
              <div className="mt-4 bg-background rounded-lg border border-border divide-y divide-border">
                {draftItems.map((item, index) => {
                  const product = mockMenuItems.find(m => m.id === item.menuItemId);
                  return (
                    <div key={index} className="flex justify-between items-center p-3">
                      <div>
                        <span className="font-medium">{item.quantity}x</span> {product?.name}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">${((product?.price || 0) * item.quantity).toFixed(2)}</span>
                        <Button variant="ghost" size="icon" onClick={() => removeDraftItem(index)} className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <div className="p-3 bg-secondary/10 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>
                    ${draftItems.reduce((sum, item) => {
                      const product = mockMenuItems.find(m => m.id === item.menuItemId);
                      return sum + (product?.price || 0) * item.quantity;
                    }, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button 
              size="lg" 
              onClick={saveOrder} 
              disabled={!customerName.trim() || draftItems.length === 0}
              className="w-full md:w-auto"
            >
              Guardar Pedido Completo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ORDERS LIST */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-serif font-bold">Historial de Pedidos</h2>
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
                <Card className="hover:border-primary/30 transition-colors group">
                  <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-[200px]">
                      <div className={`p-3 rounded-full ${statusColors[order.status]} bg-opacity-20`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-lg">{order.customerName}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground font-mono">{order.id}</span>
                          <span className="text-xs text-muted-foreground border-l pl-2 border-border">
                            {formatDistanceToNow(new Date(order.timestamp), { addSuffix: true, locale: es })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 max-w-md">
                      <div className="text-sm space-y-1">
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
                      {order.notes && (
                        <div className="mt-3 text-sm bg-secondary/30 p-2 rounded-md border border-border">
                          <span className="font-semibold">Notas:</span> {order.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3 min-w-[120px]">
                      <div className="text-lg font-bold">${order.total.toFixed(2)}</div>
                      <Badge className={`${statusColors[order.status]} hover:${statusColors[order.status]}`}>
                        {order.status}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteOrder(order.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-xl">
              <p className="text-lg">No hay pedidos registrados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
