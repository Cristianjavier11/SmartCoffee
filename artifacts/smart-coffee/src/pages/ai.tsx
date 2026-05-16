import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, BrainCircuit, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AIRecommendation } from "@/lib/data";

const preferences = {
  intensity: ["suave", "medio", "intenso"],
  base: ["espresso", "filtro", "frío"],
  leche: ["normal", "vegetal", "sin leche"],
  mood: ["energizado", "relajado", "concentrado"]
};

export default function AIBrista() {
  const [selections, setSelections] = useState({
    intensity: "",
    base: "",
    leche: "",
    mood: ""
  });
  
  const [isThinking, setIsThinking] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);

  const isComplete = Object.values(selections).every(Boolean);

  const handleRecommend = () => {
    setIsThinking(true);
    setRecommendation(null);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsThinking(false);
      setRecommendation({
        id: "ai-1",
        drink: selections.base === "frío" ? "Nitro Cold Brew con Vainilla" : "Flat White de Origen",
        reason: `Dado que buscas algo ${selections.intensity} y te sientes ${selections.mood}, esta opción con base de ${selections.base} es perfecta para equilibrar tu energía.`,
        matchScore: 98,
        tags: ["Recomendado", "Especialidad", selections.intensity]
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
          Deja que nuestro barista virtual encuentre la bebida perfecta para tu momento actual.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle>Tus Preferencias</CardTitle>
            <CardDescription>Cuéntanos cómo te sientes y qué buscas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="space-y-3">
              <Label className="text-base font-semibold">Intensidad</Label>
              <RadioGroup 
                className="flex gap-3" 
                value={selections.intensity}
                onValueChange={(val) => setSelections(s => ({...s, intensity: val}))}
              >
                {preferences.intensity.map(opt => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`int-${opt}`} />
                    <Label htmlFor={`int-${opt}`} className="capitalize">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Base preferida</Label>
              <RadioGroup 
                className="flex gap-3" 
                value={selections.base}
                onValueChange={(val) => setSelections(s => ({...s, base: val}))}
              >
                {preferences.base.map(opt => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`base-${opt}`} />
                    <Label htmlFor={`base-${opt}`} className="capitalize">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Tipo de leche</Label>
              <RadioGroup 
                className="flex gap-3" 
                value={selections.leche}
                onValueChange={(val) => setSelections(s => ({...s, leche: val}))}
              >
                {preferences.leche.map(opt => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`leche-${opt}`} />
                    <Label htmlFor={`leche-${opt}`} className="capitalize">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Estado de ánimo</Label>
              <RadioGroup 
                className="grid grid-cols-2 gap-3" 
                value={selections.mood}
                onValueChange={(val) => setSelections(s => ({...s, mood: val}))}
              >
                {preferences.mood.map(opt => (
                  <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt} id={`mood-${opt}`} />
                    <Label htmlFor={`mood-${opt}`} className="capitalize">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
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
                  El Barista está pensando...
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
                <h3 className="text-xl font-serif font-medium mb-2">Analizando perfil de sabor...</h3>
                <p className="text-muted-foreground">Cruzando tus preferencias con nuestro menú de especialidad.</p>
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
                  <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
                    {recommendation.reason}
                  </p>

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
                <p>Completa tus preferencias para recibir una recomendación personalizada.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
