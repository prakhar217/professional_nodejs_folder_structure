# ---------- Builder stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build


# ---------- Runtime stage ----------
FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

USER app

EXPOSE 3000

CMD ["node", "dist/server.js"]
