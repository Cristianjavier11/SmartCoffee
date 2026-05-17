import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Plus } from "lucide-react";
import { mockMenuItems, MenuItem } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = ["Todos", "Café", "Especialidad", "Frío", "Postres"];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<MenuItem[]>([]);

  const filteredItems = mockMenuItems.filter(item => {
    const matchesCategory = activeCategory === "Todos" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item]);
  };

  return (
    <div className="pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Menú</h1>
          <p className="text-muted-foreground">Explora nuestra selección de cafés y acompañamientos.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar..." 
            className="pl-9 bg-card border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "secondary"}
            onClick={() => setActiveCategory(cat)}
            className="rounded-full px-6"
            data-testid={`filter-${cat.toLowerCase()}`}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors bg-card group overflow-hidden">
              <div className="h-40 bg-secondary/50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                {item.imageEmoji}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-serif">{item.name}</CardTitle>
                  <span className="font-semibold text-primary">${item.price.toFixed(2)}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {item.isPopular && <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-transparent">Popular</Badge>}
                  <Badge variant="outline" className="text-muted-foreground">{item.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => addToCart(item)}
                  data-testid={`add-to-cart-${item.id}`}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No encontramos productos con esa búsqueda.</p>
        </div>
      )}

      {/* Floating Cart Summary */}
      {cart.length > 0 && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 ml-32 bg-primary text-primary-foreground px-6 py-4 rounded-full shadow-2xl flex items-center gap-6 z-50"
        >
          <div className="flex items-center gap-2 font-medium">
            <ShoppingCart className="h-5 w-5" />
            <span>{cart.length} items</span>
          </div>
          <div className="w-px h-6 bg-primary-foreground/20"></div>
          <div className="font-semibold">
            ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </div>
          <Button variant="secondary" size="sm" className="rounded-full px-6 ml-2">
            Ver Carrito
          </Button>
        </motion.div>
      )}
    </div>
  );
}
