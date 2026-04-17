FROM nginx:alpine

# Copy ONLY the web assets
COPY shm.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY scripts/ /usr/share/nginx/html/scripts/

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
