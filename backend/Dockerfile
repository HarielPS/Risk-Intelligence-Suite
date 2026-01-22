# backend/Dockerfile
FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la app Nest
RUN npm run build

# Exponer el puerto interno (el de Nest dentro del contenedor)
EXPOSE 5000

# Comando por defecto: ejecutar en modo producción
CMD ["npm", "run", "start:prod"]
