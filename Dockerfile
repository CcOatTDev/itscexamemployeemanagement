

# base image
FROM node:12.14.1

# set working directory
RUN mkdir  -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install 
RUN npm install react-scripts -g --silent

COPY . /usr/src/app

#EXPOSE 3000

# start app
CMD ["npm", "start"]