# This file uses a multi-stage build strategy. The build stage sets up the nvm environment and builds configurator, while the second stage copies this into a clean container without any build tools.

## First Stage- Build
FROM nginx as build
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

# Pre-reqs
COPY conf/yarn.list /tmp
RUN apt update && \
    apt install --no-install-recommends -y \
        ca-certificates \
        curl \
        gnupg \
        nodejs && \
    mv /tmp/yarn.list /etc/apt/sources.list.d/yarn.list && \
    curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    apt update -o Dir::Etc::sourcelist=/etc/apt/sources.list.d/yarn.list && \
    apt install --no-install-recommends -y \
        yarn && \
    rm -rf /var/lib/apt/lists/*
RUN curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash

# Copy files into place
COPY . /qmk_configurator/

# Build configurator
RUN /bin/bash /qmk_configurator/bin/docker_build.sh

## Second Stage- Run
FROM nginx as run
EXPOSE 80/tcp

COPY --from=build /qmk_configurator/dist /qmk_configurator/dist
COPY conf/nginx.conf.in /etc/nginx/nginx.conf.in
COPY bin/docker_run.sh /qmk_configurator/bin/docker_run.sh

CMD /bin/bash -i /qmk_configurator/bin/docker_run.sh
