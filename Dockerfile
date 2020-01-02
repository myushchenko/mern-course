##############################
# Setup and build the Client #
##############################
FROM node:12-alpine as client
# Create "client" directory
WORKDIR /usr/src/app/client/
# Install dependencies
COPY client/package*.json ./
RUN npm install
# Copy "client" source to container
COPY client/ ./
# Build client
RUN npm run build


##############################
#        Setup Server        #
##############################
FROM node:12-alpine
# Create work directory
WORKDIR /usr/src/app/
# Copy app source from Client container
COPY --from=client /usr/src/app/client/build/ ./client/build/
# Create "server" directory
WORKDIR /usr/src/app/server/
# Install dependencies
COPY server/package*.json ./
RUN npm install
# Copy "server" source to container
COPY server/ ./