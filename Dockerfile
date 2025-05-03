# Build stage - use this to compile TypeScript to JavaScript
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies for building
RUN npm install

# Copy source code and .env file
COPY . .

# Build the application
RUN npm run build

# Check if the dist directory was created
RUN ls -la dist/

# Production stage - create a smaller image for running the app
FROM node:20-alpine

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built files from the build stage
COPY --from=builder /app/dist ./dist

# Copy .env file
COPY .env ./

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application with explicit .js extension
CMD ["node", "dist/main.js"]