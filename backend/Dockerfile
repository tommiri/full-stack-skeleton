FROM node:18-alpine
COPY . /opt/app
RUN cd /opt/app && npm install --production
WORKDIR /opt/app
CMD ["npm", "run", "start"]