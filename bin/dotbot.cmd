@echo off

::start Bot

cd %~dp0\..
start cmd /k node %~dp0\.. \dotbot.js

cd %~dp0\..
start cmd /k java -jar Lavalink.jar
::if file is not found

