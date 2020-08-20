FROM node:lts-alpine
COPY ./xywllz/ /usr/share/nginx/html/gxxy
COPY ./conf /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html
EXPOSE 8080


# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
