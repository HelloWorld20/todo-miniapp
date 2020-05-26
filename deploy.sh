#!/bin/sh
npm i && 

cd server

npm i &&

cd ../

npm run build-server && echo "build-finished!"

rm -rf ./var/server

mkdir var/server

cp -r ./server/dist/ ./var/server
cp ./server/package.json ./var/server/package.json

cd ./var/server

npm i && echo "deploy finished!"