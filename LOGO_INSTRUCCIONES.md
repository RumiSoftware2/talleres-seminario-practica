# 🖼️ Cómo Cambiar la Foto/Logo del Header

## Opción 1: Usar una imagen local (RECOMENDADO)

### Paso 1: Prepara tu imagen
1. Coloca tu imagen en la carpeta `public/`
   - Ejemplo: `public/mi-logo.png`
   - Formatos soportados: PNG, JPG, SVG, WebP

### Paso 2: Actualiza el Header
Edita el archivo `src/pages/Home.tsx` y cambia:

```tsx
<Header
  titulo="Plataforma de Talleres Académicos"
  subtitulo="Accede a todos tus talleres y recursos educativos en un solo lugar"
  logo="/mi-logo.png"
/>
```

**Cambiar `/vite.svg` por `/tu-imagen.png`**

---

## Opción 2: Usar una URL externa

Si prefieres usar una imagen de internet:

```tsx
<Header
  titulo="Plataforma de Talleres Académicos"
  subtitulo="Accede a todos tus talleres y recursos educativos en un solo lugar"
  logo="https://example.com/tu-logo.png"
/>
```

---

## 📐 Especificaciones de la Imagen

- **Tamaño recomendado**: 500x500px o 1000x1000px
- **Proporción**: Cuadrada (1:1) o rectangular (2:1)
- **Formatos**: PNG, JPG, SVG (sin fondo recomendado)
- **Peso**: Menos de 500KB
- **Transparencia**: Soportada (recomendada para PNG)

### Responsive:
- Desktop: máx 120px
- Tablet: máx 100px
- Móvil: máx 80px

---

## 🎨 Ubicación Visual

```
┌─────────────────────────────────────┐
│  [LOGO]  Plataforma Académica       │
│           Accede a tus talleres...  │
└─────────────────────────────────────┘
```

**En Desktop**: Logo a la izquierda + Título y subtítulo a la derecha
**En Tablet**: Logo centrado arriba, Título y subtítulo debajo
**En Móvil**: Logo centrado arriba, Título y subtítulo debajo

---

## ✨ Características del Logo

- ✅ Efecto hover (escala 1.05)
- ✅ Bordes redondeados elegantes
- ✅ Sombra suave
- ✅ Responsive en todos los dispositivos
- ✅ Transición suave al pasar el mouse

---

## 📝 Ejemplo Completo

### Con logo local:
```tsx
<Header
  titulo="Mi Universidad"
  subtitulo="Plataforma de Educación en Línea"
  logo="/logo-universidad.png"
/>
```

### Sin logo (opcional):
```tsx
<Header
  titulo="Mi Universidad"
  subtitulo="Plataforma de Educación en Línea"
/>
```

---

## 🐛 Solucionar Problemas

### "La imagen no se ve"
- ✅ Verifica que el archivo existe en `public/`
- ✅ Comprueba que la ruta es correcta
- ✅ Reinicia el servidor: `npm run dev`

### "La imagen se ve pixelada"
- ✅ Usa una imagen más grande (1000x1000px mínimo)
- ✅ Convierte a PNG o WebP para mejor calidad

### "El logo no se ve en producción"
- ✅ Asegúrate de que el archivo está en `public/`
- ✅ Usa rutas relativas: `/nombre-archivo.png`

---

¡Listo! Tu logo aparecer en el header de forma profesional. 🎉
