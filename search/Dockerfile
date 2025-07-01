FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY ./prisma ./prisma
RUN npx prisma generate

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

ENV API_GATEWAY_URL=http://localhost:3001
ENV DATABASE_URL="mysql://root:NbDQKegGMSNiDcBucWbxfCpxdXVorfhi@nozomi.proxy.rlwy.net:43408/railway"
EXPOSE 3000
CMD ["npm", "run", "start"]

