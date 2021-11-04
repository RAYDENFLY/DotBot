#!/bin/sh
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. )"
if [ -f "$FILE" ]; then
    open -a Terminal node $DIR/index.js
    open -a Terminal java -jar $DIR/lavalink.jar
else 
    echo "Lavalink doest exist"
    #download file
    curl -L -o Lavalink.jar https://github.com/freyacodes/Lavalink/releases/download/3.4/Lavalink.jar
    echo "Lavalink downloaded start it"

    open -a Terminal node $DIR/index.js
    open -a Terminal java -jar $DIR/lavalink.jar
fi



