# 📚 Plataforma Académica - Landing Page

Una landing page moderna, profesional y escalable para gestionar talleres académicos en PDF.

## 🎯 Características

- ✅ **Diseño Moderno y Profesional**: Paleta de colores azul y gris, tipografía clara
- ✅ **Componentes Reutilizables**: Arquitectura modular y escalable
- ✅ **Gestión Centralizada de Datos**: Sistema simple de configuración JSON
- ✅ **PDFs en Nueva Pestaña**: Click para abrir cada taller
- ✅ **Totalmente Responsivo**: Mobile-first design
- ✅ **Preparado para Escalar**: Listo para integración con backend
- ✅ **Animaciones Suaves**: Transiciones y hover effects
- ✅ **Accesibilidad**: Soporte para navegación por teclado

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.tsx      # Encabezado de la página
│   ├── TallerCard.tsx  # Tarjeta individual de taller
│   └── TallerList.tsx  # Listado de talleres
├── pages/              # Páginas
│   └── Home.tsx        # Página principal/landing
├── data/               # Configuración de datos
│   └── talleres.ts     # Base de datos de talleres
├── styles/             # Estilos CSS Modules
│   ├── globals.css     # Estilos globales y variables
│   ├── Header.module.css
│   ├── TallerCard.module.css
│   ├── TallerList.module.css
│   └── Home.module.css
├── App.tsx             # Componente principal
└── main.tsx            # Punto de entrada

public/
└── pdfs/               # Carpeta de PDFs
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Ver preview de producción
npm run preview
```

## 📝 Cómo Agregar Nuevos Talleres

Es muy simple. Solo necesitas:

### 1. Subir el PDF
Coloca tu archivo PDF en la carpeta `public/pdfs/`

Ejemplo: `public/pdfs/taller-06-ruteo.pdf`

### 2. Agregar entrada en la configuración
Edita `src/data/talleres.ts` y agrega un nuevo objeto:

```typescript
{
  id: 'taller-06',
  nombre: 'Ruteo con React Router',
  descripcion: 'Navegación profesional en aplicaciones React',
  ruta: '/pdfs/taller-06-ruteo.pdf',
  unidad: 'Avanzado',
  semana: 6,
  fechaPublicacion: '2026-03-08',
}
```

### Campos disponibles:
- **id**: Identificador único (requerido)
- **nombre**: Título del taller (requerido)
- **descripcion**: Descripción breve (requerido)
- **ruta**: Ruta del PDF en public/ (requerido)
- **unidad**: Categoría o unidad (opcional)
- **semana**: Número de semana (opcional)
- **fechaPublicacion**: Fecha en formato ISO (opcional)

¡Eso es todo! El taller aparecerá automáticamente en la página.

## 🎨 Personalización

### Variables de Diseño
Todas las variables están centralizadas en `src/styles/globals.css`:

```css
:root {
  /* Colores */
  --color-primary: #1e40af;        /* Azul principal */
  --color-primary-light: #3b82f6;  /* Azul claro */
  --color-primary-dark: #1e3a8a;   /* Azul oscuro */
  
  /* Espaciado */
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Tipografía */
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Y muchas más... */
}
```

### Cambiar Paleta de Colores
Modifica las variables en `:root` en `src/styles/globals.css`:

```css
--color-primary: #0066cc;        /* Tu nuevo azul */
--color-primary-light: #0080ff;
--color-primary-dark: #0052a3;
```

### Cambiar Tipografía
Actualiza `--font-family-primary`:

```css
--font-family-primary: 'Poppins', 'Inter', sans-serif;
```

## 🔧 Stack Tecnológico

- **React 19**: Librería UI moderna
- **TypeScript**: Type-safety
- **Vite**: Herramienta de build ultra-rápida
- **CSS Modules**: Estilos escalables y mantenibles
- **ESLint**: Linting automático

## 📱 Responsividad

El diseño es **mobile-first** y funciona perfecto en:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 🖥️ Desktops (1024px+)
- 🖥️ Ultra-wide (1400px+)

## 🔐 Seguridad

Los PDFs se abren en nueva pestaña con:
- `noopener`: Previene acceso a `window.opener`
- `noreferrer`: No envía información de referencia

## 📈 Escalabilidad Futura

El proyecto está preparado para:

### ✓ Backend Integration
```typescript
// Ejemplo futura integración
const [talleres, setTalleres] = useState<Taller[]>([]);

useEffect(() => {
  fetch('/api/talleres')
    .then(res => res.json())
    .then(data => setTalleres(data));
}, []);
```

### ✓ Autenticación
```typescript
// Agregar en Home.tsx
const [user, setUser] = useState<User | null>(null);
const isStudent = user?.role === 'student';
const isTeacher = user?.role === 'teacher';
```

### ✓ Gestión de Roles
```typescript
interface Taller extends BaseTaller {
  visiblePara: ['docente' | 'estudiante' | 'todos'][];
}
```

### ✓ Panel Administrativo
Crear carpeta `src/pages/AdminPanel.tsx` para:
- Subir PDFs
- Gestionar talleres
- Control de usuarios

## 🎯 Mejores Prácticas

✅ **Componentes Puros**: Sin efectos secundarios innecesarios
✅ **TypeScript Strict**: Type-safety completo
✅ **Lazy Loading**: Carga de PDFs bajo demanda
✅ **Semánticamente HTML**: Estructura correcta
✅ **Performance**: CSS Modules para estilos optimizados
✅ **Accesibilidad**: ARIA labels y navegación por teclado

## 📚 Archivo de Ejemplo

Se incluye un PDF de ejemplo en `public/pdfs/ejemplo.pdf`. Puedes:
1. Reemplazarlo con tus PDFs reales
2. Agregar más PDFs en esa carpeta
3. Actualizar `talleres.ts` con las referencias

## 🐛 Troubleshooting

### Los PDFs no se abren
- Verifica que el archivo existe en `public/pdfs/`
- Comprueba la ruta en `talleres.ts` coincide exactamente
- Asegúrate de que la ruta comienza con `/pdfs/`

### Estilos no se aplican
- Limpia la caché: `npm run build` y `npm run dev`
- Verifica que importas los CSS Modules correctamente

### TypeScript errors
- Ejecuta `npm install` de nuevo
- Limpia `node_modules` y vuelve a instalar

## 📞 Soporte

Para agregar funcionalidades:
1. Crea nuevos componentes en `src/components/`
2. Agrega estilos en `src/styles/`
3. Importa y usa en `src/pages/Home.tsx`

## 📄 Licencia

Este proyecto es de uso libre para propósitos académicos.

---

**Hecho con ❤️ para educadores y estudiantes**

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
