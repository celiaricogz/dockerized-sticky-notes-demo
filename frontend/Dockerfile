# Etapa 1: Builder (Node) - usada tanto para desarrollo como para compilar
FROM node:18 AS builder
WORKDIR /app

# Instalar dependencias primero (mejor cache)
COPY package.json package-lock.json ./
RUN npm install
RUN npm install react-router-dom

# Copiar el resto del código
COPY . .

# Este build solo se ejecuta en producción, no en desarrollo
RUN npm run build

# Etapa 2: Producción con Nginx
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Copiar build desde la etapa anterior
COPY --from=builder /app/build ./

# Copiar configuración personalizada de Nginx si tienes (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Comando por defecto (Nginx)
CMD ["nginx", "-g", "daemon off;"]