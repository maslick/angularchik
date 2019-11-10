FROM node:12 as builder
LABEL stage=intermediate
COPY . /tmp
WORKDIR /tmp
RUN npm install && npm run build


FROM nginx:stable

RUN adduser www-data root
WORKDIR /var/www

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/site.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /tmp/dist/angularchik ./
COPY --from=builder /tmp/substitute_env_variables.sh ./entrypoint.sh

RUN touch /var/run/nginx.pid && \
    chown -R www-data:root /var/run/nginx.pid && \
    chown -R www-data:root /var/cache/nginx && \
    chown -R www-data:root /var/www && \
    chmod -R 775 /var/run/nginx.pid && \
    chmod -R 775 /var/cache/nginx && \
    chmod -R 775 /var/www

USER www-data
EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh", "/var/www/index.html"]
CMD ["nginx", "-g", "daemon off;"]
