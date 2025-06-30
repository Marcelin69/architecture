FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate


FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV API_GATEWAY_URL=http://localhost:3001
ENV DATABASE_URL="mongodb+srv://marcelintingougoui3:cagKxCWdDrWqt8md@email.rpajjqv.mongodb.net/email?retryWrites=true&w=majority&appName=email"
EXPOSE 3232
CMD ["npm", "run", "start"]

