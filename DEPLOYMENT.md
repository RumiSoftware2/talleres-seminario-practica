# 📦 Guía de Deployment - Plataforma Académica

## 🚀 Opciones de Hosting

### 1. **Vercel** (Recomendado - Muy fácil)

#### Pasos:
1. Sube tu código a GitHub
2. Accede a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Vercel detecta que es Vite + React automáticamente
5. Click en Deploy ¡Listo!

**Ventajas:**
- Deploy automático en cada push a main
- SSL gratis
- CDN global
- Logs en tiempo real

#### Comando local para probar:
```bash
npm run preview  # Prueba la compilación de producción
```

---

### 2. **Netlify**

#### Pasos:
1. Crea cuenta en [netlify.com](https://netlify.com)
2. Conecta tu repositorio GitHub
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

**Ventajas:**
- Fácil de usar
- Funciones serverless incluidas
- CMS integrado

---

### 3. **GitHub Pages**

#### Configura vite.config.ts:
```typescript
export default defineConfig({
  base: '/tu-repo-name/',
  plugins: [react()],
})
```

#### Crea workflow `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

### 4. **Servidor Propio (VPS)**

#### Requisitos:
- VPS con Node.js 16+
- Nginx o Apache
- PM2 (para mantener la app viva)
- SSL (Let's Encrypt)

#### Pasos:

1. **Conéctate al servidor:**
```bash
ssh usuario@tu-servidor.com
```

2. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

3. **Instala dependencias:**
```bash
npm install --production
npm run build
```

4. **Configura Nginx:**
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    root /ruta/a/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # SSL con Let's Encrypt
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;
}
```

5. **Reinicia Nginx:**
```bash
sudo systemctl restart nginx
```

---

### 5. **Railway**

#### Pasos:
1. Crea cuenta en [railway.app](https://railway.app)
2. Conecta tu repositorio GitHub
3. Railway detecta automáticamente la configuración
4. Deploy con un click

---

## 🔄 Integración Continua (CI/CD)

### GitHub Actions Automático

Crea `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

---

## 📊 Monitoreo Post-Deployment

### Google Analytics

1. Registra tu sitio en [analytics.google.com](https://analytics.google.com)
2. Obtén tu ID de seguimiento
3. Agrega a `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Sentry para errores

1. Crea cuenta en [sentry.io](https://sentry.io)
2. Instala: `npm install @sentry/react`
3. En `main.tsx`:

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "tu-dsn-aqui",
  environment: process.env.NODE_ENV,
});
```

---

## 🔐 Variables de Entorno

### Crear `.env.production`:

```env
VITE_API_URL=https://tu-api.com
VITE_APP_VERSION=1.0.0
```

### Acceder en código:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### En Vercel/Netlify:
Establece variables en el dashboard del sitio

---

## 🎯 Checklist Pre-Deployment

- [ ] Compilación sin errores: `npm run build`
- [ ] Sin warnings importantes
- [ ] SEO correcto en `index.html`
- [ ] Robots.txt configurado
- [ ] Sitemap.xml generado
- [ ] Tests pasando (si tienes)
- [ ] Estilos responsivos en móvil
- [ ] PDFs accesibles
- [ ] Rendimiento optimizado (Lighthouse >90)
- [ ] Dominios configurados
- [ ] SSL/HTTPS habilitado
- [ ] Backups configurados

---

## 📈 Optimizaciones de Performance

### 1. **Comprime Imágenes**
```bash
npm install -D imagemin imagemin-mozjpeg imagemin-pngquant
```

### 2. **Lazy Load de PDFs**
```typescript
const openPdf = useCallback((ruta: string) => {
  // Los PDFs se cargan bajo demanda
  window.open(ruta, '_blank');
}, []);
```

### 3. **Minificación**
Vite ya lo hace automáticamente.

### 4. **Gzip Compression**
Configure en servidor (nginx):
```nginx
gzip on;
gzip_types text/plain text/css application/json;
gzip_min_length 1000;
```

---

## 🔍 Debugging en Producción

### Ver logs en Vercel:
```
Vercel Dashboard → Settings → Functions → Logs
```

### Ver logs en Netlify:
```
Netlify Dashboard → Deploys → Select Deploy → Logs
```

### Usar Sentry para errores frontend
Todos los errores se reportan automáticamente

---

## 🚨 Troubleshooting

### "404 on refresh"
**Problema**: Router no maneja las rutas dinámicas
**Solución**: Ya está configurado con `try_files $uri $uri/ /index.html;` en nginx

### PDFs no cargan
**Problema**: Rutas relativas incorrectas
**Solución**: 
- Usa rutas absolutas: `/pdfs/archivo.pdf`
- No: `pdfs/archivo.pdf`

### Estilos rotos
**Problema**: CSS rutas incorrectas
**Solución**: Los CSS Modules maneja automáticamente las rutas

### Performance lento
**Checklist:**
1. Minificación habilitada ✓
2. CDN configurado ✓
3. Caché de navegador ✓
4. Gzip compression ✓

---

## 📞 Soporte

- **Documentación Vite**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Vercel Docs**: https://vercel.com/docs

---

**Happy Deploying! 🚀**
