#!/bin/bash

name="rqirc"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -n $1 ] && [ -f "$DIR/config/$1" ]; then
  echo "User config - $1"
  NODE_CONFIG=$(cat "$DIR/config/$1")
else
  echo "User config - production.json"
  NODE_CONFIG=$(cat "$DIR/config/production.json")
fi

docker rm -f name
docker pull rqirc-mqtt
docker run -d --name="rqirc-mqtt" -e NODE_CONFIG="$NODE_CONFIG" itsamenathan/$name
