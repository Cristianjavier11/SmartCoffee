import { motion } from "framer-motion";
import { Coffee, Info, Target, Users, Wrench, BrainCircuit, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
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
            SmartCoffee
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acerca del proyecto
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                <Info className="h-6 w-6 text-primary" />
                Descripción general
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-lg leading-relaxed">
              <p>
                SmartCoffee es una aplicación web para una cafetería que permite visualizar productos, registrar pedidos y recibir recomendaciones automáticas de bebidas mediante reglas simuladas de Inteligencia Artificial.
              </p>
              <p className="mt-4">
                La aplicación cuenta con diferentes pantallas: un dashboard principal, un menú de productos, un módulo de pedidos, una sección de recomendación IA y una sección informativa sobre el proyecto. No utiliza una base de datos real, ya que los pedidos se guardan de manera local mediante LocalStorage, permitiendo conservar la información aunque se recargue la página.
              </p>
              <p className="mt-4">
                El sistema está diseñado con una interfaz sencilla, moderna y fácil de usar, utilizando colores relacionados con el ambiente de una cafetería, como tonos café, beige, crema y blanco.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                <Target className="h-6 w-6 text-primary" />
                Objetivo del sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-lg leading-relaxed">
              <p>
                El objetivo principal de SmartCoffee es desarrollar una aplicación web que permita a una cafetería gestionar productos y pedidos de forma sencilla, además de ofrecer recomendaciones personalizadas mediante una función de Inteligencia Artificial simulada.
              </p>
              <p className="mt-4">
                También busca demostrar el uso de tecnologías web modernas y el trabajo colaborativo mediante GitHub, donde cada integrante del equipo participa en el desarrollo de diferentes módulos del sistema.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                  <Users className="h-6 w-6 text-primary" />
                  Integrantes del equipo
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-lg leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Cristian Javier Padilla Cornejo</li>
                  <li>Ian Michael Castellanos Zuñiga</li>
                  <li>Marco Antonio Martinez Guzman</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                  <Wrench className="h-6 w-6 text-primary" />
                  Tecnologías utilizadas
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-lg leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>React</li>
                  <li>Vite</li>
                  <li>JavaScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                <BrainCircuit className="h-6 w-6 text-primary" />
                Explicación del uso de IA
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-lg leading-relaxed">
              <p>
                El proyecto integra una función de recomendación con Inteligencia Artificial simulada, la cual permite sugerir bebidas de acuerdo con los gustos escritos por el usuario. De esta manera, la aplicación no solo funciona como un sistema de pedidos, sino también como una herramienta interactiva que mejora la experiencia del cliente.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                <CheckCircle className="h-6 w-6 text-primary" />
                Conclusión general
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-lg leading-relaxed">
              <p>
                SmartCoffee ha sido desarrollado como un proyecto integral que demuestra la capacidad de crear aplicaciones web funcionales y atractivas sin depender de un backend complejo, apoyándose en el almacenamiento local y en una experiencia de usuario fluida, interactiva y enriquecida con componentes modernos y lógica simulada.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
