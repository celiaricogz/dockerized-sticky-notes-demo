# Etapa 1: Builder/Development
FROM node:18 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Etapa 2: Producción (solo dependencias necesarias)
FROM node:18-slim AS production
WORKDIR /app

# Copiar solo las dependencias de producción
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copiar el código desde la etapa builder
COPY --from=builder /app ./

EXPOSE 4000
CMD ["npm", "start"]
