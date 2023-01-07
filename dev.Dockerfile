FROM node:14.21-alpine

ENV LANG=C.UTF-8

RUN mkdir /app
RUN cd app
WORKDIR /app

# # install dependencies

COPY package.json package-lock.json ./
# COPY yarn.lock .
COPY . .
RUN npm install

EXPOSE 5000
ENTRYPOINT ["tail", "-f", "/dev/null"]

# RUN npx prisma generate

# CMD [ "npm", "run", "dev" ]
