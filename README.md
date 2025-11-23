# DICRI Evidencias – API y Frontend (Prueba Técnica)

Sistema de gestión de **expedientes e indicios** para la DICRI, con control de acceso por roles (**técnico** y **coordinador**), autenticación JWT y reportes básicos de estadísticas.

Pensado como una prueba técnica de **desarrollador full-stack** con énfasis en:
- Diseño de API REST limpia
- Separación de responsabilidades (controladores, rutas, middleware, config)
- Autenticación y autorización por rol
- Consumo desde un frontend en React con un diseño sencillo pero profesional

---

## 1. Tecnologías utilizadas

### Backend
- **Node.js** + **Express**
- **SQL Server** (`mssql`)
- **JWT** (`jsonwebtoken`) para autenticación
- **bcryptjs** para hash de contraseñas
- **dotenv** para configuración por variables de entorno
- **CORS** para permitir peticiones desde el frontend

### Frontend (proyecto React asociado)
- **React** + **Vite**
- **Bootstrap 5** (CDN/CSS) para layout base
- **CSS personalizado** (`styles/styles.css`) para identidad visual DICRI
- Rutas con **react-router-dom**

> ⚠️ Este README describe principalmente la API. El frontend se conecta a la API bajo `/api/...`.

---

## 2. Arquitectura general

### Flujo backend

1. El usuario inicia sesión en `/api/auth/login`.
2. El backend valida credenciales con **SQL Server** (`sp_login_usuario`) y verifica el hash de contraseña.
3. Se genera un **JWT** con `id_usuario`, `nombre` y `rol`.
4. El frontend guarda el token en `localStorage` y lo envía en el header:
   ```http
   Authorization: Bearer <token>
