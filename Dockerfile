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
RUN npm install -g redux --save
RUN npm install --save redux
RUN npm install react-dom
RUN npm install react-router-dom
RUN npm install axios --save
RUN npm install react-bootstrap bootstrap


COPY . /usr/src/app

#EXPOSE 3000

# start app
CMD ["npm", "start"]