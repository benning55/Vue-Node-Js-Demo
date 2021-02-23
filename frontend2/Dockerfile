FROM node:15.4.0-alpine
MAINTAINER Benning

WORKDIR /frontend
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm install