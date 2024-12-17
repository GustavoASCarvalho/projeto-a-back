FROM node:20.9.0

WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN npm ci

RUN npm run build

COPY .env .env

CMD ["npm", "run", "start"]

# CMD ["npm", "run", "dev"]

EXPOSE 3000