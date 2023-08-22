# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application for production
RUN npm run build

# Serve the application using a production-ready server (e.g., serve)
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5000

# Command to start the application
CMD ["serve", "-s", "dist"]
