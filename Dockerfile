# Template: Node.js dockerfile
# Description: Include this file in the root of the application to build a docker image.

# Enter which node build should be used. E.g.: node:argon 
FROM node:latest

# Create app directory for the docker image
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies from package.json. If modules are not included in the package.json file enter a RUN command. E.g. RUN npm install <module-name>
#COPY package.json /usr/src/app/
#RUN     npm install
#RUN     npm install tsc -g
#RUN     tsc

# Bundle app source
#COPY . /usr/src/app

# Enter the command which should be used when the image starts up. E.g. CMD ["node", "app.js"]
#CMD [ "node", "server.js"]
