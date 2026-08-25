# VIGÍA — Brief de construcción para Claude Code

> Documento para pegar en Claude Code. Contiene toda la especificación del proyecto:
> stack, diseño, catálogo, enfoque 3D y estructura. Al final está el **prompt inicial exacto**
> para arrancar la sesión.

---

## 1. Resumen del proyecto

Tienda e-commerce de seguridad inteligente para el hogar, mercado República Dominicana.
**Solo venta de productos — sin servicio de instalación.** Todos los productos son DIY
(el cliente los instala en minutos). Sin pasarela de pago todavía: el flujo termina en
"Reservar / Solicitar pedido" que captura los datos del cliente.

- **Marca (placeholder):** VIGÍA
- **Idioma:** Español (RD)
- **Moneda:** RD$ (peso dominicano)
- **Tono:** premium, confiable, "producto del futuro"

## 2. Dirección visual — Holográfica / Apple Vision Pro

- Fondos oscuros muy profundos con degradados radiales sutiles (nunca negro plano).
- **Glassmorphism real:** superficies de vidrio traslúcido (backdrop-blur, transparencias,
  bordes con brillo de 1px). Tarjetas, nav, modales — todo "flota".
- Luz suave que reacciona al mouse (glow que sigue el cursor en el hero).
- Transiciones lentas y elegantes (300–600ms, easing suave). Nada brusco.
- Tipografía limpia y espaciada. Mucho aire. Jerarquía por tamaño y peso, no por adorno.
- Menos "sensor militar / HUD", más "objeto de lujo de otro planeta".

### Tokens de diseño
```
Color
  --bg-deep:    #0A0E14   (fondo base)
  --bg-grad:    radial-gradient(120% 90% at 50% -10%, #16202e 0%, #0d131c 55%, #080b11 100%)
  --glass:      rgba(255,255,255,0.06)  (relleno de vidrio)
  --glass-brd:  rgba(255,255,255,0.12)  (borde de vidrio)
  --text:       #EEF2F7
  --text-mute:  #93A3B8
  --accent:     #6EE7FF   (cian holográfico — brillo/acento)
  --accent-2:   #A78BFA   (violeta — degradados y luz secundaria)
  --warn:       #F5A94E   (ámbar — alertas / estados)

Tipografía
  Display: "Space Grotesk" o "Clash Display"  (titulares)
  Body:    "Inter"                             (texto)
  Mono:    "IBM Plex Mono"                     (specs, datos, etiquetas técnicas)

Radios: 20–28px en tarjetas grandes. Sombras suaves + glow de acento, nunca sombra dura.
```

## 3. Stack técnico

- **Next.js 14+** (App Router) + **TypeScript**
- **Tailwind CSS** para estilos
- **React Three Fiber** (`@react-three/fiber`) + **Drei** (`@react-three/drei`) para 3D
- **Framer Motion** para animaciones de UI y transiciones de scroll
- **Zustand** para el estado del carrito (ligero)
- Deploy pensado para **Vercel**

### Rendimiento (obligatorio)
- El 3D es pesado. En **móvil**, cada visor 3D debe caer a una **imagen/render estático**
  (o un modelo de muy bajo detalle) con `Suspense` + detección de ancho de pantalla.
- `lazy load` de los canvas 3D: solo montar cuando entran al viewport (IntersectionObserver).
- Respetar `prefers-reduced-motion`: desactivar autorotación y parallax.
- Objetivo: LCP < 2.5s en 4G.

## 4. Enfoque 3D (importante)

Los modelos 3D son **conceptuales**, construidos con geometría de Three.js/Drei
(no son GLTF de un producto físico real todavía). Formas limpias inspiradas en las
categorías reales. Cuando el cliente cierre con un proveedor OEM, se reemplazan por los
`.glb` reales — dejar el componente `<ProductModel>` con una interfaz que acepte
`modelUrl?: string` para ese cambio futuro.

- Cada producto tiene un **visor 3D interactivo**: el usuario **arrasta para rotar**
  (`OrbitControls`, sin zoom, con auto-rotación lenta que se pausa al interactuar).
- Iluminación tipo estudio: `Environment preset="city"` de Drei + luz de acento cian/violeta.
- Material: superficies tipo vidrio esmerilado / metal suave con reflejos (`meshPhysicalMaterial`,
  algo de `transmission`/`roughness`).
- En el hero: un modelo destacado grande con el glow que sigue el mouse.

## 5. Catálogo de productos (7)

Estos son los productos. Modelo de negocio: marca blanca sobre plataforma **Tuya**
(el cliente controla todo con una sola app). Precios en RD$ son placeholders — ajustables.

### Timbres — línea "Centinela"
1. **Centinela** — Video-timbre con batería recargable (dura 3–6 meses), 1080p,
   visión nocturna IR, audio bidireccional, detección de movimiento PIR. Sin cables, DIY.
   `RD$ 4,900` · tag: "Más vendido"
2. **Centinela AI** — Igual + detección con IA que distingue personas / animales / vehículos.
   `RD$ 7,200` · tag: "Nuevo"

### Cámaras — línea "Ojo"
3. **Ojo 360** — Cámara interior motorizada PTZ, giro 360°, 2K, audio, alertas en tiempo real.
   `RD$ 3,800`
4. **Ojo Exterior** — Cámara bala exterior IP66, resistente a intemperie, visión nocturna.
   `RD$ 5,500`
5. **Ojo Solar 4G** — Cámara exterior con panel solar y SIM 4G. No necesita WiFi ni cable.
   Ideal para casas de campo / zonas sin buena red. `RD$ 9,900` · tag: "Sin cables"

### Sistemas — línea "Escudo"
6. **Escudo Kit** — Hub central + sensores de puerta/ventana + sensor de movimiento PIR +
   sirena. Respaldo de batería. Todo se maneja desde la app. `RD$ 8,900` · tag: "Recomendado"
7. **Escudo Lock** — Cerradura inteligente: huella + app + tarjeta RFID + código.
   Registro de entradas/salidas. `RD$ 12,500`

**Historia de marca / narrativa transversal:** "Un ecosistema, una app, tú al control."
Todo se conecta entre sí y se maneja desde un solo lugar, desde cualquier país.
(Gancho para la diáspora: cuida la casa de la familia en RD desde el extranjero.)

## 6. Estructura del sitio

Una sola página larga (landing tipo store) + páginas de detalle por producto.

**Home (`/`)**
1. **Nav** de vidrio flotante, sticky. Logo, links (Productos, Tecnología, Confianza,
   Preguntas), buscador, ícono de carrito con contador.
2. **Hero** — titular grande ("Cuida tu casa, aunque tú no estés."), subtítulo, 2 CTAs,
   y a la derecha el **modelo 3D destacado** con glow que sigue el mouse. Barra de estado
   estilo "EN LÍNEA · MONITOREO 24/7".
3. **Barra de confianza** — envío nacional, garantía 12 meses, datos cifrados, DIY en minutos.
4. **Grid de productos** con filtros por línea (Todos / Centinela / Ojo / Escudo) + buscador
   funcional. Cada tarjeta de vidrio con un **mini-visor 3D** o render, nombre, spec, precio,
   botón "Agregar" y "Ver en 3D".
5. **Sección "Tecnología / cómo se ve el futuro"** — 2–3 bloques con scroll-reveal
   (Framer Motion): app unificada, cifrado, alertas con IA. Visual holográfico.
6. **Confianza** — cifrado extremo a extremo, soporte en español, garantía, ítems con íconos.
   Testimonios (marcar claramente como PLACEHOLDER para reemplazar antes de lanzar).
7. **FAQ** acordeón (seguridad de datos, funciona sin luz, monitoreo desde otro país,
   instalación DIY, qué pasa al activarse un sensor).
8. **Footer** de vidrio con contacto y redes.

**Detalle de producto (`/producto/[id]`)**
- Visor 3D grande a pantalla dividida + specs, precio, selector de cantidad, "Agregar al carrito".
- Sección de características con íconos. Productos relacionados.

**Carrito** — panel lateral (drawer) de vidrio. Cantidades, subtotal, botón
"Reservar pedido".

**Reserva (modal)** — formulario: nombre, dirección, ciudad, teléfono, correo.
**SIN campos de tarjeta.** Nota: "Te contactaremos para confirmar el pedido y el pago."
Al enviar: pantalla de confirmación. (Guardar el pedido en estado; dejar comentario
`// TODO: enviar a backend / correo` donde iría la integración.)

## 7. Calidad / "listo para lanzar"

- Responsive impecable hasta 360px de ancho.
- Foco de teclado visible; navegable sin mouse.
- `prefers-reduced-motion` respetado.
- Sin dependencias de `localStorage` para el carrito (usar estado en memoria / Zustand;
  si se quiere persistencia, usar cookies del lado servidor más adelante).
- Copy en español natural de RD, sin relleno.
- Los testimonios y el teléfono/correo del footer van marcados como placeholder.

## 8. Lo que NO se incluye todavía (dejar preparado)

- Pasarela de pago (dejar el punto de integración comentado en el modal de reserva).
- Backend real / base de datos de pedidos (comentar dónde engancharía).
- Modelos `.glb` reales de producto (el componente 3D acepta `modelUrl` para el futuro).
- Autenticación de usuarios.

---

## 9. PROMPT INICIAL PARA CLAUDE CODE

> Copia y pega esto como primer mensaje en Claude Code, en una carpeta vacía.
> Ten este archivo (`BRIEF-vigia-claude-code.md`) en la carpeta para que pueda leerlo.

```
Vamos a construir una tienda e-commerce llamada VIGÍA. Lee el archivo
BRIEF-vigia-claude-code.md en esta carpeta: contiene la especificación completa
(stack, diseño holográfico estilo Apple Vision Pro, catálogo de 7 productos,
enfoque 3D con React Three Fiber, estructura de páginas y criterios de calidad).

Empieza así:
1. Inicializa un proyecto Next.js 14 (App Router) + TypeScript + Tailwind.
2. Instala react-three-fiber, drei, framer-motion y zustand.
3. Crea el sistema de diseño (tokens de color/tipografía del brief) en Tailwind
   y una capa base de estilos.
4. Construye primero el layout base + nav de vidrio + hero con UN modelo 3D
   conceptual interactivo (arrastrar para rotar) y el glow que sigue el mouse.
   Muéstramelo antes de seguir.

Después seguimos con el grid de productos (con los 7 del brief), el carrito,
y el resto de secciones. NO incluyas pasarela de pago: el flujo termina en
"Reservar pedido" con formulario de datos, sin campos de tarjeta.

Prioriza rendimiento: los canvas 3D deben cargar de forma diferida y caer a
imagen estática en móvil. Respeta prefers-reduced-motion.

Trabaja por pasos y enséñame el resultado en cada hito para dar feedback.
```

---

### Nota sobre cómo trabajar con Claude Code
- Ve por hitos, no todo de una: hero primero, aprueba, luego productos, luego carrito.
- Pídele capturas o que corra el dev server para revisar en cada paso.
- Cuando tengas proveedor OEM, súbele las fotos/modelos reales y pídele reemplazar
  los modelos conceptuales.
