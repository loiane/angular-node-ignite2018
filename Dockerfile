# Angular App
FROM loiane/angular-cli as client-app
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build --prod

# Node server
FROM node:10.10.0-alpine as server-app
WORKDIR /app/server
COPY server /app/server
RUN npm install --production --silent

# Final image
FROM node:10.10.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=server-app /app/server /usr/src/app
COPY --from=client-app /app/dist/angular-node-ignite2018 /usr/src/app/dist
EXPOSE 3001
CMD [ "node", "index.js" ]