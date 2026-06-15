# Guía del Frontend - GDL Producciones

El frontend está diseñado para ofrecer una experiencia altamente inmersiva, utilizando temáticas oscuras, fuentes atrevidas (estilo Cyberpunk), gradientes vibrantes y animaciones sutiles.

## Stack Tecnológico

*   **Librería Principal:** React 18+ (A través de Vite)
*   **Enrutamiento:** React Router DOM v6
*   **Estilado:** Tailwind CSS v4 (Generación de utilidades JIT)
*   **Iconografía:** Lucide React
*   **Integración de Contenido CMS:** SDK de Ghost CMS (`@tryghost/content-api`)

## Estructura de Componentes Clave

El directorio `src/` se divide principalmente en:

### `pages/` (Vistas completas de ruta)
*   **`Home.jsx`**: Landing page principal. Contiene secciones modulares como el Hero (Video de fondo), Géneros, Galería (Masonry layout), Sets de mezcla y Testimonios. Todas estas subsecciones están dentro de este componente.
*   **`Cotizacion.jsx`**: Formulario interactivo de reserva. Consta de un grid dividido en un lado de recolección de datos y un panel lateral fijo que muestra un "Resumen de compra" dinámico en tiempo real. Se integra con la API del backend para confirmar pagos.
*   **`Blog.jsx`**: Carga dinámicamente el contenido escrito desde un servidor de Ghost CMS.
*   **`Admin.jsx`**: Panel de control protegido por contraseña para consultar las reservaciones guardadas en Firebase.
*   **`Cabinas.jsx`**: Catálogo visual interactivo de cabinas iluminadas.
*   **`ReservaExitosa.jsx` y `ReservaFallida.jsx`**: Pantallas de redirección post-cobro enviadas por Mercado Pago.

### `components/` (UI Reutilizable)
*   **`Navbar.jsx`**: Barra de navegación superior fija (sticky).
*   **`Footer.jsx`**: Pie de página con enlaces y derechos.
*   **`InputField.jsx`**: Componente de input base que renderiza validaciones, iconos y bordes de estado estandarizados para mantener coherencia en todos los formularios de la app.
*   **`GoogleReviews.jsx`**: Componente contenedor que incrusta un widget asíncrono de Elfsight (Plataforma externa para vincular y mostrar reseñas reales de Google Maps de forma certificada).

## Pautas de Diseño y CSS (Tailwind)

Para mantener la estética visual "Cyber" de la marca:
1.  **Colores Base:** Se usa un fondo muy oscuro (ej. `bg-[#050510]`), contrastado con colores neon brillantes como `cyan-400`, `pink-500`, y `purple-600`.
2.  **Bordes y Sombras:** Fuerte dependencia de propiedades de borde semitransparente (ej. `border-white/10`) y sombras de resplandor mediante extensiones de boxShadow en Tailwind o utilizando estilos combinados `shadow-[0_0_15px_rgba(...)]`.
3.  **Tipografías:** Las clases base definidas en `index.css` y las configuraciones de fuente globales. Se debe importar la familia deseada a través de Google Fonts en el `index.html`.

## Scripts de Construcción
*   `npm run dev`: Inicia servidor con HMR super rápido para desarrollar.
*   `npm run build`: Empaqueta React y extrae/minifica el CSS de Tailwind. El resultado de producción quedará listo en la carpeta `dist/`.
