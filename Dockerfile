# Stage 1: Build the frontend
FROM node:14 as frontend

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend package.json and yarn.lock files
COPY frontend/package*.json ./
COPY frontend/yarn.lock ./

# Install frontend dependencies
RUN yarn install

# Copy the rest of the frontend files
COPY frontend/ ./

# Build the frontend
RUN yarn build

# Stage 2: Build the backend
FROM node:14 as backend

# Set the working directory for the backend
WORKDIR /app/backend

# Copy the backend package.json and package-lock.json files
COPY backend/package*.json ./
COPY backend/package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files
COPY backend/ ./

# Expose the backend port (if needed)
EXPOSE 4040

# Run the backend server
CMD ["nodemon", "index.js"]

# Final stage: Combine frontend and backend
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the built frontend files from the frontend stage
COPY --from=frontend /app/frontend/build ./frontend/build

# Copy the built backend files from the backend stage
COPY --from=backend /app/backend ./backend

# Expose the port (if needed)
EXPOSE 4040

# Command to run the application (you may need to adjust this based on your setup)
CMD ["node", "backend/index.js"]
