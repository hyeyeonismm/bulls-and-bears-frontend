FROM node:18.18.2 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json

RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

COPY . /usr/src/app
RUN npm run build

FROM nginx:latest

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]