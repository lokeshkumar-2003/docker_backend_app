FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Install all deps including devDependencies
RUN npm install

# Install nodemon globally as a fallback
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]