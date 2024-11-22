# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm and basic build dependencies
RUN apk add --no-cache libc6-compat
RUN corepack enable
RUN corepack prepare pnpm --activate

# Copy package files
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/web/package.json ./apps/web/

# Copy workspace packages if they exist
COPY packages/ ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/web/ ./apps/web/

# Build the application
WORKDIR /app/apps/web
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/apps/web/build ./build
COPY --from=builder /app/apps/web/package.json .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "build"]
