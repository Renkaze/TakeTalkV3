FROM kadirahq/meteord
RUN apt-get update
RUN apt-get install nodejs
RUN apt-get install nodejs-legacy
RUN apt-get install npm
RUN npm install -g express-generator
RUN git clone https://github.com/franckforet/summernote.git


