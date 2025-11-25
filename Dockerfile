FROM node:20-alpine

WORKDIR /app
COPY package*.json ./

# Create log directory and file for numeri-core (tmp)
RUN mkdir -p ~/.numeri-core/
RUN touch ~/.numeri-core/app.log

RUN --mount=type=secret,id=npm_token \
    NPM_TOKEN=$(cat /run/secrets/npm_token) && \
    echo "@manuelbent:registry=https://npm.pkg.github.com" > .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc && \
    npm ci && \
    rm -f .npmrc

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
