# 🎯 Instrucciones: Enlaces Destacados para Talleres

## ¿Cómo funciona?

Ahora puedes generar enlaces a talleres específicos que, cuando alguien haga click, los llevarán a la página HOME con la tarjeta del taller **destacada y animada**.

## Uso

### Formato del enlace:
```
https://tu-dominio.com?taller=TALLER_ID
```

### Ejemplo:
```
https://tu-dominio.com?taller=taller-01
```

Este enlace llevará al usuario a Home y destacará automáticamente la tarjeta **"1. Taller Experiencia Tatiana"**

## IDs disponibles de talleres

Consulta el archivo `src/data/talleres.ts` para ver todos los IDs:

- `taller-01` → 1. Taller Experiencia Tatiana
- `taller-02` → 2. Taller Syllabus
- ... (agrega más según tus talleres)

## Características de la animación

✨ La tarjeta destacada incluye:

1. **Borde brillante** - Borde azul prominente que diferencia la tarjeta
2. **Animación de pulso** - Un efecto de expansión sutil que atrae la atención
3. **Subrayado brillante** - Una línea azul en la base que aparece con animación suave
4. **Fondo mejorado** - Gradiente sutil que resalta el fondo
5. **Elevación visual** - La tarjeta aparece ligeramente elevada
6. **Scroll automático** - La página automáticamente hace scroll a la tarjeta destacada cuando carga

## Casos de uso

- 📧 Enviar un enlace directo a un taller específico por email
- 📱 Compartir un taller en redes sociales
- 📱 Crear un sistema de notificaciones donde cada notificación incluye el enlace del taller
- 📚 Crear catálogos o listas de referencia que vinculan a talleres específicos

## Ejemplo de uso completo

```html
<a href="https://portafoliosmendo.netlify.app?taller=taller-02">
  Ver taller de Syllabus destacado
</a>
```

Cuando el usuario haga click, verá:
- La página Home cargada ✅
- La tarjeta del Taller Syllabus resaltada con animación ✨
- La página hace scroll automático a esa tarjeta 👀
- Sin abrir ningún PDF automáticamente 📄

## Cambiar la animación

Si quieres personalizar la animación, edita el archivo:
```
src/styles/TallerCard.module.css
```

Busca la sección `.cardActive` y modifica los efectos según tu preferencia.
