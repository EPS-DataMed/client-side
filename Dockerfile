# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
