FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN ng build --configuration=production --base-href=/

FROM nginx:alpine
COPY --from=builder app/dist/abcall/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
