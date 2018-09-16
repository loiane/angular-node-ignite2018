# Angular App
FROM loiane/angular-cli as client-app
WORKDIR /app
COPY . .
RUN npm install --silent
RUN ls
COPY . .
RUN npm run build

# Node server
FROM node:10.10.0-alpine as server-app
WORKDIR /app/server
COPY server /app/server
RUN npm install --production --silent

# Final image
FROM node:9.11.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY --from=server-app /app/server /usr/src/app
COPY --from=client-app /app/dist /usr/src/app/dist
EXPOSE 3001
CMD [ "node", "index.js" ]