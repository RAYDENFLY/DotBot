#!/bin/sh
#get current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#enter current directory
cd $DIR

if [ -f "Lavalink.jar" ]; then
    terminal -e node $DIR/index.js
    terminal -e java -jar $DIR/Lavalink.jar
else 
    echo "Lavalink doest exist"
    #download file
    cd .. && curl -L -o Lavalink.jar https://github.com/freyacodes/Lavalink/releases/download/3.4/Lavalink.jar
    echo "Lavalink downloaded start it"

    terminal -e node $DIR/index.js
    terminal -e java -jar $DIR/Lavalink.jar
fi



