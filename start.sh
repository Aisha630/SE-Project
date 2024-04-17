#! /bin/sh

sh -c "cd backend && node app.js" &
sh -c "cd frontend && npx vite build"

wait
exit $?