FROM node:lts AS dependencies
WORKDIR /app
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm ci


FROM node:lts AS builder
WORKDIR /app
COPY ./backend .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build
RUN npx prisma generate
FROM node:lts AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
EXPOSE 3001
ENV PORT 3001

CMD ["npm", "start"]