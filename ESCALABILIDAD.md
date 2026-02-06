# 🚀 Guía de Escalabilidad - Plataforma Académica

Este documento proporciona guías y ejemplos para escalar la aplicación en el futuro.

## 📋 Tabla de Contenidos
1. [Integración con Backend](#integración-con-backend)
2. [Sistema de Autenticación](#sistema-de-autenticación)
3. [Gestión de Roles](#gestión-de-roles)
4. [Panel Administrativo](#panel-administrativo)
5. [Contexto Global](#contexto-global)
6. [Mejora de Performance](#mejora-de-performance)

---

## Integración con Backend

### Estructura recomendada

```typescript
// src/api/talleresApi.ts
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const talleresApi = {
  obtenerTodos: async () => {
    const res = await fetch(`${API_BASE}/talleres`);
    return res.json();
  },
  
  obtenerPorId: async (id: string) => {
    const res = await fetch(`${API_BASE}/talleres/${id}`);
    return res.json();
  },
  
  crear: async (taller: Taller) => {
    const res = await fetch(`${API_BASE}/talleres`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taller),
    });
    return res.json();
  },
  
  actualizar: async (id: string, taller: Partial<Taller>) => {
    const res = await fetch(`${API_BASE}/talleres/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taller),
    });
    return res.json();
  },
  
  eliminar: async (id: string) => {
    await fetch(`${API_BASE}/talleres/${id}`, {
      method: 'DELETE',
    });
  },
};
```

### Hook para obtener talleres del backend

```typescript
// src/hooks/useTalleres.ts
import { useState, useEffect } from 'react';
import { Taller } from '../data/talleres';
import { talleresApi } from '../api/talleresApi';

export const useTalleres = () => {
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    talleresApi
      .obtenerTodos()
      .then(data => {
        setTalleres(data);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  return { talleres, cargando, error };
};
```

### Actualizar Home.tsx

```typescript
// src/pages/Home.tsx
import { useTalleres } from '../hooks/useTalleres';

const Home: React.FC = () => {
  const { talleres, cargando, error } = useTalleres();
  
  if (cargando) return <div>Cargando talleres...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <>
      <Header />
      <TallerList talleres={talleres} onOpenPdf={handleOpenPdf} />
    </>
  );
};
```

---

## Sistema de Autenticación

### Crear contexto de autenticación

```typescript
// src/context/AuthContext.tsx
import React, { createContext, useState, useCallback } from 'react';

export interface User {
  id: string;
  nombre: string;
  email: string;
  role: 'admin' | 'docente' | 'estudiante';
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Hook para usar autenticación

```typescript
// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
```

### Envolver la aplicación

```typescript
// src/App.tsx
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}
```

---

## Gestión de Roles

### Extender interfaz Taller

```typescript
// src/data/talleres.ts
export interface Taller {
  // ... campos existentes
  
  // Nuevos campos para roles
  visiblePara: ('admin' | 'docente' | 'estudiante')[];
  requiereAutenticacion: boolean;
  nivelesAceso: {
    docente: boolean;
    estudiante: boolean;
    publico: boolean;
  };
}
```

### Componente ProtegidoRol

```typescript
// src/components/ProtegidoRol.tsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface ProtegidoRolProps {
  rolesPermitidos: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtegidoRol: React.FC<ProtegidoRolProps> = ({
  rolesPermitidos,
  children,
  fallback = <p>No tienes acceso a este contenido</p>,
}) => {
  const { user } = useAuth();
  
  if (!user) return fallback;
  if (!rolesPermitidos.includes(user.role)) return fallback;
  
  return <>{children}</>;
};

export default ProtegidoRol;
```

---

## Panel Administrativo

### Estructura básica

```typescript
// src/pages/AdminPanel.tsx
import React, { useState } from 'react';
import { useTalleres } from '../hooks/useTalleres';
import { talleresApi } from '../api/talleresApi';
import styles from '../styles/AdminPanel.module.css';

const AdminPanel: React.FC = () => {
  const { talleres } = useTalleres();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);

  const handleSubir = async () => {
    if (!archivo) return;
    
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('archivo', archivo);
    
    await fetch('/api/talleres/subir', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div className={styles.panel}>
      <h1>Panel Administrativo</h1>
      
      <section className={styles.formulario}>
        <h2>Agregar Nuevo Taller</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setArchivo(e.target.files?.[0] || null)}
        />
        <button onClick={handleSubir}>Subir Taller</button>
      </section>
      
      <section className={styles.lista}>
        <h2>Talleres Registrados ({talleres.length})</h2>
        {/* Tabla con opciones de editar/eliminar */}
      </section>
    </div>
  );
};

export default AdminPanel;
```

---

## Contexto Global

### Crear contexto para estado global

```typescript
// src/context/AppContext.tsx
import React, { createContext, useState } from 'react';

interface AppContextType {
  tema: 'light' | 'dark';
  cambiarTema: (tema: 'light' | 'dark') => void;
  notificaciones: string[];
  agregarNotificacion: (msg: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tema, setTema] = useState<'light' | 'dark'>('light');
  const [notificaciones, setNotificaciones] = useState<string[]>([]);

  const cambiarTema = (nuevoTema: 'light' | 'dark') => {
    setTema(nuevoTema);
    localStorage.setItem('tema', nuevoTema);
  };

  const agregarNotificacion = (msg: string) => {
    setNotificaciones([...notificaciones, msg]);
    setTimeout(() => {
      setNotificaciones(prev => prev.filter(n => n !== msg));
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ tema, cambiarTema, notificaciones, agregarNotificacion }}>
      {children}
    </AppContext.Provider>
  );
};
```

---

## Mejora de Performance

### Lazy Loading de Componentes

```typescript
// src/pages/Home.tsx
import React, { lazy, Suspense } from 'react';

const AdminPanel = lazy(() => import('./AdminPanel'));
const TallerDetail = lazy(() => import('./TallerDetail'));

const Home: React.FC = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <AdminPanel />
    </Suspense>
  );
};
```

### Memoización de Componentes

```typescript
// src/components/TallerCard.tsx
import React, { memo } from 'react';

const TallerCard = memo(({ taller, onOpen }: Props) => {
  return (
    // Contenido del componente
  );
}, (prevProps, nextProps) => {
  // Comparación personalizada si es necesaria
  return prevProps.taller.id === nextProps.taller.id;
});

export default TallerCard;
```

### useMemo para cálculos costosos

```typescript
const talleresAgrupados = useMemo(() => {
  return agruparPor(talleres, 'unidad');
}, [talleres]);
```

---

## Variables de Entorno

Crear archivo `.env`:

```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Plataforma Académica
VITE_APP_VERSION=1.0.0
```

Acceder en código:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Próximos Pasos Recomendados

1. ✅ **Base de datos**: MongoDB, PostgreSQL o Firebase
2. ✅ **Backend API**: Node.js/Express, Django, o similar
3. ✅ **Autenticación**: JWT, OAuth2, o servicio como Auth0
4. ✅ **Hosting**: Vercel, Netlify, o servidor dedicado
5. ✅ **CDN**: Para servir PDFs más rápido
6. ✅ **Testing**: Vitest, Jest para pruebas unitarias
7. ✅ **CI/CD**: GitHub Actions, GitLab CI

---

**Última actualización**: Febrero 2026
