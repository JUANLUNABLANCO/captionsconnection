# image nginx que instalará en el server
FROM nginx:1.13.9-alpine
# pagina por defecto que nginx sirve. Ya está copiada desde el dockerfile de nodejs
COPY ./dist /usr/share/nginx/html 
# copy our file default.conf for nginx configuration in correct path-file in server
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf 
# /etc/nginx/sites-available/pruebas-docker.com
# sudo ln??? /etc/nginx/sites-enable??? /etc/nginx/sites-available   ????
CMD ["nginx", "-g", "daemon off;"]