# Etapa 1: Build de Angular
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos los archivos necesarios para instalar dependencias y construir
COPY package*.json ./
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Compilamos la app en modo producción
RUN npm run build --configuration=production

# Etapa 2: Servidor web con NGINX
FROM nginx:alpine

# Copiamos los archivos compilados desde el contenedor builder
COPY --from=builder /app/dist/articles-meli/browser /usr/share/nginx/html

# (Opcional) Redirección de rutas a index.html para Angular Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
