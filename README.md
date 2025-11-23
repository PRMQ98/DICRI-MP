# DICRI Evidencias – Backend (API REST)

API REST para la gestión de expedientes e indicios del sistema DICRI.  
Incluye autenticación con JWT, autorización por roles y comunicación con SQL Server mediante stored procedures.

---

## 1. Tecnologías utilizadas
- Node.js + Express
- SQL Server (mssql)
- JSON Web Tokens (jsonwebtoken)
- bcryptjs
- dotenv
- CORS

---

## 2. Arquitectura del proyecto
src/
  config/
    db.js
    jwt.js
  controllers/
    auth.controller.js
    expedientes.controller.js
    indicios.controller.js
    reportes.controller.js
    usuarios.controller.js
  middleware/
    authMiddleware.js
  routes/
    auth.routes.js
    expedientes.routes.js
    indicios.routes.js
    reportes.routes.js
    usuarios.routes.js
  app.js
  server.js
.env
.env.docker

---

## 3. Instalación

### 1. Clonar repositorio
git clone (https://github.com/PRMQ98/DICRI-MP.git)
cd backend

### 2. Instalar dependencias
npm install

### 3. Crear archivo .env
SQL_USER=
SQL_PASSWORD=
SQL_SERVER=
SQL_DATABASE=
SQL_PORT=1433
JWT_SECRET=
PORT=3000

### 4. Iniciar servidor
npm run dev

Modo producción:
npm start

---

## 4. Endpoints principales

### Autenticación
POST /api/auth/login — Público

### Expedientes
POST /api/expedientes — técnico  
GET /api/expedientes — técnico / coordinador  
POST /api/expedientes/:id/aprobar — coordinador  
POST /api/expedientes/:id/rechazar — coordinador  

### Indicios
POST /api/indicios — técnico

### Reportes
GET /api/reportes — coordinador

### Usuarios
GET /api/usuarios — coordinador  
POST /api/usuarios — coordinador  
PUT /api/usuarios/:id — coordinador  
PATCH /api/usuarios/:id/estado — coordinador  
PATCH /api/usuarios/:id/password — coordinador  
DELETE /api/usuarios/:id — coordinador  

---

## 5. Flujo general
1. Usuario inicia sesión.  
2. Backend valida credenciales y genera token JWT.  
3. Frontend envía token en header Authorization.  
4. Middleware valida autenticación y rol.  
5. Toda interacción con BD se hace mediante stored procedures.

---

## 6. Seguridad aplicada
- Hash seguro de contraseñas  
- JWT con expiración  
- Autorización por rol  
- Uso de stored procedures para evitar SQL Injection  
