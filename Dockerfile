FROM node:latest

WORKDIR /app

RUN curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
RUN echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

RUN apt-get update
RUN apt-get install -y mongodb-org

COPY frontend /app/frontend
COPY backend /app/backend
COPY start.sh /app

RUN cd frontend && npm install
RUN cd backend && npm install
RUN chmod +x start.sh
RUN mkdir -p /data/db

EXPOSE 3000
EXPOSE 5003

CMD ["sh", "start.sh"]