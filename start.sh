#! /bin/sh

sh -c "cd backend && node app.js" &
npm start --prefix frontend &

wait
exit $?