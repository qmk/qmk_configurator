FROM qmkfm/base_container
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
EXPOSE 80/tcp
CMD /bin/bash -i /qmk_configurator/bin/docker_run.sh

# Pre-reqs
COPY conf/yarn.list /tmp
RUN apt update && \
    apt install --no-install-recommends -y \
        curl \
        gnupg \
        nginx \
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
COPY conf/nginx.conf.in /etc/nginx/nginx.conf.in

# Build configurator
RUN /bin/bash -i /qmk_configurator/bin/docker_build.sh
