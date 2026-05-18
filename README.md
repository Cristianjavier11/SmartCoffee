# SmartCoffee

## Descripción general
SmartCoffee es una aplicación web para una cafetería que permite visualizar productos, registrar pedidos y recibir recomendaciones automáticas de bebidas mediante reglas simuladas de Inteligencia Artificial.

La aplicación cuenta con diferentes pantallas: un dashboard principal, un menú de productos, un módulo de pedidos, una sección de recomendación IA y una sección informativa sobre el proyecto. No utiliza una base de datos real, ya que los pedidos se guardan de manera local mediante LocalStorage, permitiendo conservar la información aunque se recargue la página.

El sistema está diseñado con una interfaz sencilla, moderna y fácil de usar, utilizando colores relacionados con el ambiente de una cafetería, como tonos café, beige, crema y blanco.

## Integrantes del equipo
- Cristian Javier Padilla Cornejo
- Ian Michael Castellanos Zuñiga
- Marco Antonio Martinez Guzman

## Tecnologías utilizadas
- React
- Vite
- JavaScript
- Tailwind CSS

## Funcionalidades
- **Dashboard Principal**: Vista general de las estadísticas y rendimiento del negocio.
- **Menú de Productos**: Catálogo de productos disponibles con precios y descripciones.
- **Módulo de Pedidos**: Registro y gestión de pedidos almacenados localmente.
- **Recomendación IA**: Sugerencia de bebidas de acuerdo con los gustos escritos por el usuario utilizando reglas simuladas.
- **Acerca del Proyecto**: Sección informativa con los detalles y objetivos de la aplicación.

## Instalación
Para instalar las dependencias necesarias del proyecto, asegúrate de tener Node.js instalado y ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install
# o con pnpm
pnpm install
```

## Cómo Correr el Programa
Este proyecto es un monorepo que contiene tanto el frontend como el backend. Para levantar la aplicación en entorno de desarrollo, asegúrate de estar en la raíz del proyecto.

Puedes correr ambos simultáneamente (gracias al script agregado en el package.json) con:
```bash
pnpm run dev
```

O si prefieres correrlos en terminales separadas:

**Correr el Backend (API Server):**
```bash
pnpm --filter @workspace/api-server run dev
```

**Correr el Frontend (Smart Coffee App):**
```bash
pnpm --filter @workspace/smart-coffee run dev
```
