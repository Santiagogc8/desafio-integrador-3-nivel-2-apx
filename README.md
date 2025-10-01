# 🗿📄✂️ Desafío Integrador: Piedra, Papel o Tijera

Este desafio es una implementación moderna del juego tradicional "Piedra, Papel o Tijera", diseñado como un desafío integrador para demostrar la aplicación de arquitecturas y tecnologías de front-end escalables.

## 🚀 ¡Pruébalo Ahora!

Pon a prueba tu suerte y tu rapidez contra la máquina.

🔗 **[Jugar Piedra, Papel o Tijera](https://santiagogc8.github.io/desafio-integrador-3-nivel-2-apx/)**

---

## 💡 Sobre el Proyecto y Arquitectura

Desarrollado como un front-end modular y robusto, este proyecto utiliza una serie de técnicas clave para garantizar un código limpio y un rendimiento ágil:

### ⚙️ Componentización y Modularidad

* **Custom Elements (Web Components):** Todos los elementos interactivos del juego (botones, selecciones, contador y el indicador de resultado) son componentes reutilizables creados desde cero, como `<button-el>`, `<selection-el>` y `<counter-el>`.
* **Sistema de Enrutamiento (Routing):** Implementación de un router simple en el lado del cliente para manejar la navegación entre las vistas de `home`, `game` y `results` sin recargar la página.

### 💾 Persistencia y Lógica de Estado

* **Gestión de Estado Centralizada:** Se utiliza un **State Manager** global para manejar la lógica de la partida y el historial de puntuaciones.
* **Persistencia Local:** El historial de partidas y los marcadores se guardan en `localStorage`, asegurando que el progreso no se pierda incluso si el usuario abandona la sesión.
* **Lógica de Juego:** La función `whoWins` maneja las reglas del juego para determinar si el usuario `Ganaste`, `Perdiste` o es un `Empate`.

### 🛠️ Stack Tecnológico

| Herramienta | Uso Principal |
| :--- | :--- |
| **TypeScript** | Lenguaje principal, utilizado para añadir tipado estático y mejorar la calidad del código. |
| **Parcel** | Bundler moderno utilizado para empaquetar, compilar los módulos y generar los archivos de producción en la carpeta `dist`. |
| **pnpm** | Gestor de paquetes eficiente y rápido. |
| **gh-pages** | Utilizado para automatizar el proceso de despliegue a GitHub Pages. |

---

## 👩‍💻 Cómo ejecutar en local

Si deseas clonar el proyecto y ver el código en acción, sigue estos pasos:

```bash
# 1. Clona el repositorio
git clone https://github.com/Santiagogc8/desafio-integrador-3-nivel-2-apx.git

# 2. Entra a la carpeta del proyecto
cd desafio-integrador-3

# 3. Instala las dependencias con pnpm
pnpm install

# 4. Inicia el servidor de desarrollo
pnpm run dev