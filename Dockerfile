FROM node:16.13.0
# install python and make
RUN apt-get update && \
    apt-get install -y python3 build-essential && \
    apt-get purge -y --auto-remove && \
    apt-get install oracle-java17-installer
WORKDIR /dotbot
COPY package.json /dotbot
RUN npm install
COPY . /dotbot
CMD [“node”, index.js”]
EXPOSE 3000-8080