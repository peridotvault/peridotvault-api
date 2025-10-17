# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Build NestJS app (hasil ke folder dist/)
RUN npm run build


# Stage 2: Production
FROM node:20-alpine

WORKDIR /usr/src/app

# Hanya install production dependencies
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --omit=dev

# Salin hasil build dan source (untuk asset/static jika ada)
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Opsional: salin .env jika dibutuhkan (tapi sebaiknya inject via -e atau --env-file)
# COPY --from=builder /usr/src/app/.env ./

# Port API NestJS (cek src/main.ts — default biasanya 3000)
EXPOSE 3000

# Buat user non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Jalankan
CMD ["node", "dist/main"]