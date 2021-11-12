FROM node:17.1.0
# install python and make
RUN apt-get update && \
    apt-get install -y python3 build-essential && \
    apt-get purge -y --auto-remove && \
    apt-get install oracle-java17-installer
WORKDIR /dotbot
EXPOSE 3000-8080
ENV DOCKER true
COPY package.json /dotbot
RUN npm install
COPY . /dotbot
CMD ["npm", "run", "docker"]