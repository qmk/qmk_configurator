# This file uses a multi-stage build strategy. The build stage sets up the nvm environment and builds configurator, while the second stage copies this into a clean container without any build tools.

## First Stage- Build
FROM node:20 as build
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

# Copy files into place
COPY . /qmk_configurator/
WORKDIR /qmk_configurator/

# Build configurator
RUN yarn install
ENV VITE_API_URL=/api
RUN yarn run build

## Second Stage- Run
FROM nginx as run
EXPOSE 80/tcp

COPY --from=build /qmk_configurator/dist /qmk_configurator/dist
COPY conf/nginx.conf.in /etc/nginx/nginx.conf.in
COPY bin/docker_run.sh /qmk_configurator/bin/docker_run.sh

CMD /bin/bash -i /qmk_configurator/bin/docker_run.sh
