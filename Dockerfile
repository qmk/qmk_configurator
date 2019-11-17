FROM qmkfm/base_container
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
EXPOSE 80/tcp
CMD /bin/bash -i /qmk_configurator/docker_run.sh

# Pre-reqs
RUN apt-get update && apt-get install --no-install-recommends -y \
    curl \
    gnupg \
    nginx \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

# Copy files into place
COPY nvm-exec /root/.nvm/nvm-exec
COPY nvm.sh /root/.nvm/nvm.sh
COPY yarn.list /etc/apt/sources.list.d/yarn.list
COPY nginx.conf /etc/nginx/nginx.conf

# Build configurator
COPY * /qmk_configurator/
RUN /bin/bash -i /qmk_configurator/docker_build.sh
