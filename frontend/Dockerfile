# Start with the official Node.js image.
FROM node:14

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the Next.js app.
RUN npm run build

# Expose port 3000 to the outside world.
EXPOSE 3000

# Start the application.
CMD ["npm", "start"]
