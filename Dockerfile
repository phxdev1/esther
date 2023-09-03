FROM kasmweb/terminal:x86_64-1.14.0-rolling
USER root
RUN sudo apt-get install nodejs
RUN npm install && npm install nodemon