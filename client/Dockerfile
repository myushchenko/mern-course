# This image is based on the popular Alpine Linux project, available in the alpine official image. 
# Alpine Linux is much smaller than most distribution base images (~5MB), and thus leads to much slimmer images in general.
FROM node:12-alpine

# Create "app" directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .