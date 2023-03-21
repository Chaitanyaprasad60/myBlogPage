#stage 1
FROM node:16-alpine as builder

WORKDIR /ng-app 
RUN npm install -g @angular/cli
COPY ./package.json .


ENV NODE_OPTIONS "--max-old-space-size=8192"

RUN npm install --legacy-peer-deps

COPY . .

RUN ng build


#stage 2
FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default_local.conf /etc/nginx/conf.d/

COPY --from=builder /ng-app/dist/myblog /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 443