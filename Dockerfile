FROM node:12-slim
# Env variables
ENV WDR=/app
# working directory in container
WORKDIR ${WDR}
# copy the package.json into the container
COPY package.json ${WDR}
COPY . ${WDR}
# install all dependencies
RUN npm install
# run the start command
CMD ["npm", "start"]