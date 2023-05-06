FROM node:lts

WORKDIR /vartija

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]



