FROM node:20.9.0

WORKDIR /usr/src/app

COPY . .

COPY .env .env

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
