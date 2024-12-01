FROM node:22.5-alpine

WORKDIR /app
COPY *.json ./
COPY *.js ./
RUN npm install

EXPOSE 4000

CMD ["node", "index.js"]
