# Usamos una imagen base de Node.js
FROM node:18

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el contenido de la carpeta actual al contenedor
COPY . .

# Exponemos los puertos necesarios
EXPOSE 3001 3002 3003

# El comando predeterminado lo cambiaremos a lo que queramos desde el docker-compose
CMD ["node", "app.js"]