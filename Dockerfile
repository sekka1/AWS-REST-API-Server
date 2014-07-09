# Pull base image.
FROM dockerfile/ubuntu

# System update and install
RUN apt-get -y --force-yes update
RUN apt-get -y --force-yes install nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

# Copy application to container
ADD . /opt/app

WORKDIR /opt/app

RUN npm install
RUN npm install forever -g

# Start API monitoring server
CMD ["forever", "app.js"]