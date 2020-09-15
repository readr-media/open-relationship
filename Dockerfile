# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=12.18.2
# https://github.com/Yelp/dumb-init/releases
ARG DUMB_INIT_VERSION=1.2.2

# Build container
FROM node:${NODE_VERSION}-alpine AS build
ARG DUMB_INIT_VERSION
WORKDIR /build

RUN apk add --no-cache build-base python2 yarn && \
    wget -O dumb-init -q https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64 && \
    chmod +x dumb-init 
ADD . /build
RUN mkdir tmp_pic
RUN yarn install
RUN yarn build && yarn cache clean
RUN yarn migrate

# Runtime container
FROM node:${NODE_VERSION}-alpine
WORKDIR /app
COPY --from=build /build /app

EXPOSE 3000
CMD ["./dumb-init", "yarn", "dev"]
