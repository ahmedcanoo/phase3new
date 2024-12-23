FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY public/ public/
COPY src/ src/
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]
EXPOSE 3000
