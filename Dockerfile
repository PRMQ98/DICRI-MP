# Imagen base
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock (si lo tienes)
COPY package*.json ./

# Instalar dependencias (prod + lo necesario para arrancar)
RUN npm install

# Copiar el resto del código
COPY . .

# Variables de entorno generales
ENV NODE_ENV=production

# Exponer puerto
EXPOSE 3000

# Comando de arranque
CMD ["node", "src/server.js"]
