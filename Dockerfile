FROM node:16.15.0 as development

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm i

COPY . .
