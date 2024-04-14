#! /bin/sh

mongod --bind_ip_all --fork --logpath /var/log/mongodb.log
sh -c "cd backend && node app.js" &
npm start --prefix frontend &

wait
exit $?