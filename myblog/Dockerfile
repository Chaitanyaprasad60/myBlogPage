#stage 1
FROM node:16-alpine as builder
RUN mkdir /ng-app
COPY package.json ./ng-app/
WORKDIR /ng-app

ENV NODE_OPTIONS "--max-old-space-size=8192"

RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli


COPY . /ng-app

RUN npm run build --prod


#stage 2
FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/

COPY --from=builder /ng-app/dist/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]