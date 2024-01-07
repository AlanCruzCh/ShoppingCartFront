FROM node:18.16.0-alpine AS build

RUN mkdir -p /app/front

WORKDIR /app/front

COPY package*.json /app/front/

RUN npm install

COPY . /app/front/

RUN npm run build --prod

FROM nginx:1.17.1-alpine

COPY --from=build /app/front/dist/shopping-cart-front /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d

EXPOSE 80
