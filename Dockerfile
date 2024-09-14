# base
FROM node:20 AS base

WORKDIR /usr/src/app

COPY package*.json ./
    
RUN npm install

# for build

FROM base AS builder

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /usr/src/app
COPY . .
RUN npm run build


# for production

FROM node:20-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./
# RUN cp -R prisma dist/prisma
COPY --from=builder /usr/src/app/prisma ./prisma

ARG DATABASE_URL
ARG SECRET
ARG PORT

ENV DATABASE_URL=${DATABASE_URL}
ENV SECRET=${SECRET}
ENV PORT=${PORT}

ENTRYPOINT ["node", "index.js"]