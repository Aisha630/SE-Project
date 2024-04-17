FROM node:latest

WORKDIR /app

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