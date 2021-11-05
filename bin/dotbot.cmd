@echo off

::start Bot

cd %~dp0 && cd ..

if exist Lavalink.jar (
    rem Lavalink found start its
    start cmd /k node index.js
    start cmd /k java -jar Lavalink.jar
) else (
    rem download Lavalink
    echo Downloading Lavalink
    curl -L -o Lavalink.jar https://github.com/freyacodes/Lavalink/releases/download/3.4/Lavalink.jar
    rem Lavalink downloaded start it

    start cmd /k node index.js
    start cmd /k java -jar Lavalink.jar
)

