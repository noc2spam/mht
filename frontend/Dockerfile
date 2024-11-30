FROM node:18-alpine 
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY ./frontend .
COPY ./.env ./.env.local
RUN npm run build
EXPOSE 3000
ENV PORT 3000
CMD npm run start