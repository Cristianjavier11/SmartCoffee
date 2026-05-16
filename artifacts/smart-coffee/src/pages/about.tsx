import { motion } from "framer-motion";
import { Coffee, Code, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
            <Coffee className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Sobre SmartCoffee
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            El futuro del café de especialidad.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-serif font-semibold mb-4">Nuestra Historia</h2>
            <div className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
              <p>
                SmartCoffee nació de una premisa simple: ¿qué pasaría si pudiéramos combinar la calidez y precisión de un barista experto con la capacidad de personalización de la inteligencia artificial?
              </p>
              <p>
                No somos solo una cafetería, somos una experiencia. Diseñamos cada aspecto de nuestro menú para ser no solo delicioso, sino adaptable a tu momento exacto del día.
              </p>
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border p-6 rounded-xl">
              <Code className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tecnología</h3>
              <p className="text-muted-foreground">
                Impulsado por un motor de recomendaciones inteligente que entiende los perfiles de sabor, la química del café y tus necesidades energéticas.
              </p>
            </div>
            <div className="bg-card border border-border p-6 rounded-xl">
              <Heart className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Artesanía</h3>
              <p className="text-muted-foreground">
                Aunque amamos la tecnología, nuestro café es 100% analógico. Granos de origen único, tostados con maestría y extraídos a la perfección.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
