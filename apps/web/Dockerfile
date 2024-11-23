# Build stage
FROM node:20-alpine AS builder

# Add build arguments
ARG APPWRITE_KEY
ARG PUBLIC_APPWRITE_URL
ARG PUBLIC_APPWRITE_PROJECT_ID
ARG PUBLIC_SESSION_COOKIE
ARG PUBLIC_APPWRITE_DATABASE_ID
ARG PUBLIC_FQDN

# Set as environment variables for build time
ENV APPWRITE_KEY=$APPWRITE_KEY
ENV PUBLIC_APPWRITE_URL=$PUBLIC_APPWRITE_URL
ENV PUBLIC_APPWRITE_PROJECT_ID=$PUBLIC_APPWRITE_PROJECT_ID
ENV PUBLIC_SESSION_COOKIE=$PUBLIC_SESSION_COOKIE
ENV PUBLIC_APPWRITE_DATABASE_ID=$PUBLIC_APPWRITE_DATABASE_ID
ENV PUBLIC_FQDN=$PUBLIC_FQDN

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

# Add environment variables to production stage
ENV PUBLIC_APPWRITE_URL=$PUBLIC_APPWRITE_URL
ENV PUBLIC_APPWRITE_PROJECT_ID=$PUBLIC_APPWRITE_PROJECT_ID
ENV PUBLIC_SESSION_COOKIE=$PUBLIC_SESSION_COOKIE
ENV PUBLIC_APPWRITE_DATABASE_ID=$PUBLIC_APPWRITE_DATABASE_ID
ENV PUBLIC_FQDN=$PUBLIC_FQDN

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/apps/web/build ./build
COPY --from=builder /app/apps/web/package.json .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "build"]
