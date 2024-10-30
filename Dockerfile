FROM node:18 AS frontend-build

WORKDIR /app/frontend
COPY frontend/ .

RUN npm install
RUN npx vite build

FROM node:18 AS backend-build
WORKDIR /app/backend

COPY backend/ .
COPY --from=frontend-build /app/frontend/dist ./public
RUN npm install

FROM node:18

WORKDIR /app
COPY --from=backend-build /app/backend .

EXPOSE 5003
CMD ["node", "app.js"]
