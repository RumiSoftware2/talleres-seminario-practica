# 🚀 Guía Rápida de Inicio

## Instalación y Arranque

```bash
# Ya tienes todo instalado, solo ejecuta:
npm run dev
```

Abre tu navegador en: **http://localhost:5173**

---

## ¿Quieres agregar un nuevo taller en 2 minutos?

### Paso 1: Coloca tu PDF
Copia tu archivo PDF en esta carpeta:
```
public/pdfs/
```

Ejemplo: `public/pdfs/taller-06-estructura-datos.pdf`

### Paso 2: Abre el archivo de datos
Edita este archivo:
```
src/data/talleres.ts
```

### Paso 3: Agrega una línea
Dentro del array `talleres`, añade al final (antes del corchete final):

```typescript
{
  id: 'taller-06',
  nombre: 'Estructura de Datos',
  descripcion: 'Arrays, objetos y estructuras complejas',
  ruta: '/pdfs/taller-06-estructura-datos.pdf',
  unidad: 'Fundamentos',
  semana: 6,
  fechaPublicacion: '2026-03-08',
},
```

### ¡Listo! ✅
Actualiza la página en el navegador y verás tu nuevo taller.

---

## Cambiar Colores (Diseño)

Abre: `src/styles/globals.css`

Busca estas líneas y cambia los valores hex:

```css
--color-primary: #1e40af;        /* Azul principal */
--color-primary-light: #3b82f6;  /* Azul claro */
--color-primary-dark: #1e3a8a;   /* Azul oscuro */
```

---

## Cambiar Título y Subtítulo

Abre: `src/pages/Home.tsx`

Modifica estas líneas:

```typescript
titulo="Tu Nuevo Título Aquí"
subtitulo="Tu subtítulo aquí"
```

---

## Para Producción

```bash
npm run build
```

La carpeta `dist/` contiene tu sitio listo para producción.
Puedes subirla a Vercel, Netlify, o cualquier hosting.

---

## Problemas Comunes

### El PDF no se abre
- ¿Existe el archivo en `public/pdfs/`?
- ¿La ruta en `talleres.ts` coincide exactamente?
- ¿Empieza con `/pdfs/`?

### Los estilos se ven raros
- Recarga la página (Ctrl+Shift+R en el navegador)
- Limpia caché: Elimina la carpeta `.next` o `dist/`

### Errores de compilación
```bash
# Reinstala dependencias
rm -r node_modules
npm install
npm run dev
```

---

## Estructura de Carpetas Explicada

```
subir-pdf/
├── src/
│   ├── components/      ← Componentes (TallerCard, Header)
│   ├── pages/           ← Páginas (Home)
│   ├── data/            ← ⭐ EDITA AQUÍ: talleres.ts
│   ├── styles/          ← Estilos CSS Modules
│   ├── hooks/           ← Lógica reutilizable
│   ├── utils/           ← Funciones auxiliares
│   ├── App.tsx          ← Componente raíz
│   └── main.tsx         ← Punto de entrada
├── public/
│   └── pdfs/            ← ⭐ SUBE TUS PDFs AQUÍ
├── index.html
└── package.json
```

---

## Documentación Completa

Para más detalles, lee:
- **README.md** - Documentación completa
- **ESCALABILIDAD.md** - Cómo agregar backend, autenticación, etc.
- **RESUMEN.md** - Resumen del proyecto

---

## Preguntas Frecuentes

**P: ¿Necesito saber código para agregar talleres?**
R: No, solo copia y pega el objeto JSON en `talleres.ts`

**P: ¿Puedo cambiar colores sin tomar código?**
R: Sí, edita `src/styles/globals.css` - están todas las variables

**P: ¿Cómo conecto con base de datos?**
R: Lee `ESCALABILIDAD.md` para la guía completa

**P: ¿Puedo agregar más campos a los talleres?**
R: Sí, edita la interfaz `Taller` en `src/data/talleres.ts`

---

¡Bienvenido a tu plataforma académica! 🎓
