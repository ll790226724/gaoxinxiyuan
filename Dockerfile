# production stage
FROM nginx
COPY ./conf /etc/nginx/conf.d
COPY ./xywllz /usr/share/nginx/html/xywllz
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
