#!/bin/sh
#get current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#enter current directory
cd $DIR

if [ -f "Lavalink.jar" ]; then
    #start new process
    node $DIR/index.js
else 
    echo "Lavalink doest exist"
    #download file
    cd .. && curl -L -o Lavalink.jar https://github.com/freyacodes/Lavalink/releases/download/3.4/Lavalink.jar
    echo "Lavalink downloaded start it in new tab"
    node $DIR/index.js
fi



