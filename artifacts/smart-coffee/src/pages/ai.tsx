import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, BrainCircuit, Sparkles, Loader2, DollarSign, MessageSquare, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AIRecommendation } from "@/lib/data";

export default function AIBrista() {
  const [preferencesText, setPreferencesText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);

  const isComplete = preferencesText.trim().length > 0;

  const handleRecommend = () => {
    setIsThinking(true);
    setRecommendation(null);
    
    // Simulate AI processing
    const text = preferencesText.toLowerCase();
    
    let drink = "Café de la casa";
    let reason = "Nuestra opción equilibrada perfecta para cualquier momento.";
    let price = 3.5;
    let message = "¡Esperamos que te guste nuestra sugerencia!";
    
    if (text.includes("frío") || text.includes("frio")) {
      drink = "Frappé";
      reason = "Buscabas algo frío y refrescante, ideal para combatir el calor.";
      price = 5.5;
      message = "¡Disfruta de esta delicia helada!";
    } else if (text.includes("fuerte")) {
      drink = "Café Americano";
      reason = "Necesitas un sabor intenso y un buen golpe de energía.";
      price = 3.0;
      message = "¡Un clásico que nunca falla para despertar!";
    } else if (text.includes("dulce")) {
      drink = "Mocha";
      reason = "Querías algo dulce, y la combinación de café y chocolate es insuperable.";
      price = 5.0;
      message = "¡Un verdadero abrazo en forma de taza!";
    } else if (text.includes("sin cafeína") || text.includes("sin cafeina")) {
      drink = "Chocolate caliente o Té chai";
      reason = "Prefieres evitar la cafeína, así que estas opciones reconfortantes son ideales.";
      price = 4.5;
      message = "¡Relájate y disfruta sin preocupaciones!";
    } else if (text.includes("cremoso")) {
      drink = "Latte o Cappuccino";
      reason = "Buscabas una textura suave y cremosa, perfecta con nuestra leche vaporizada.";
      price = 4.5;
      message = "¡Siente la suavidad en cada sorbo!";
    }

    setTimeout(() => {
      setIsThinking(false);
      setRecommendation({
        id: "ai-1",
        drink,
        reason,
        matchScore: 98,
        tags: ["Personalizado", "IA"],
        price,
        message
      });
    }, 2500);
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-3 flex items-center gap-3">
          <BrainCircuit className="text-primary" />
          Recomendación IA
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Deja que nuestro barista virtual encuentre la bebida perfecta. Escribe lo que se te antoja y haremos magia.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle>Tus Gustos</CardTitle>
            <CardDescription>Cuéntanos qué se te antoja en este momento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="space-y-3">
              <Label className="text-base font-semibold">¿Qué estás buscando?</Label>
              <Textarea 
                placeholder="Ejemplo: Quiero algo frío, Quiero algo dulce, Quiero algo fuerte..."
                className="min-h-[150px] resize-none"
                value={preferencesText}
                onChange={(e) => setPreferencesText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Prueba con palabras como: frío, fuerte, dulce, sin cafeína, cremoso.
              </p>
            </div>

            <Button 
              className="w-full mt-4" 
              size="lg" 
              disabled={!isComplete || isThinking}
              onClick={handleRecommend}
              data-testid="button-get-recommendation"
            >
              {isThinking ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Descubrir mi café
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="relative">
          <AnimatePresence mode="wait">
            {isThinking && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-card rounded-xl border border-border/50 p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <BrainCircuit className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">Procesando texto...</h3>
                <p className="text-muted-foreground">Analizando tus palabras clave para encontrar la mejor opción.</p>
              </motion.div>
            )}

            {recommendation && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary text-primary-foreground rounded-xl p-8 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Coffee size={120} />
                </div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-6">
                    {recommendation.matchScore}% Match
                  </div>
                  
                  <h2 className="text-3xl font-serif font-bold mb-4">{recommendation.drink}</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 mt-0.5 shrink-0 opacity-80" />
                      <p className="text-primary-foreground/90 text-sm leading-relaxed">
                        <span className="font-semibold block mb-1">Motivo:</span>
                        {recommendation.reason}
                      </p>
                    </div>
                    
                    {recommendation.price && (
                      <div className="flex gap-3">
                        <DollarSign className="h-5 w-5 mt-0.5 shrink-0 opacity-80" />
                        <p className="text-primary-foreground/90 text-sm leading-relaxed">
                          <span className="font-semibold block mb-1">Precio aproximado:</span>
                          ${recommendation.price.toFixed(2)}
                        </p>
                      </div>
                    )}
                    
                    {recommendation.message && (
                      <div className="flex gap-3">
                        <MessageSquare className="h-5 w-5 mt-0.5 shrink-0 opacity-80" />
                        <p className="text-primary-foreground/90 text-sm italic leading-relaxed">
                          "{recommendation.message}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {recommendation.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm capitalize">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full"
                    data-testid="button-order-recommendation"
                  >
                    Ordenar esta bebida
                  </Button>
                </div>
              </motion.div>
            )}

            {!isThinking && !recommendation && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground border-2 border-dashed border-border rounded-xl"
              >
                <Coffee className="h-16 w-16 mb-4 opacity-20" />
                <p>Escribe qué se te antoja para recibir una recomendación personalizada.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
