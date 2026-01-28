FROM node:20-alpine

WORKDIR /app
COPY package*.json ./

RUN mkdir -p ~/.numeri-core/
RUN touch ~/.numeri-core/app.log

RUN --mount=type=secret,id=npm_token \
    NPM_TOKEN=$(cat /run/secrets/npm_token) && \
    echo "@manuelbent:registry=https://npm.pkg.github.com" > .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc && \
    npm cache clean --force && \
    npm ci && \
    rm -f .npmrc

COPY .env ./
COPY tsconfig.json ./
COPY src ./src

RUN npm run build
RUN mkdir -p /app/data

EXPOSE 3000

CMD ["sh", "-c", "mkdir -p /app/data && npm run migrate:up && npm start"]
