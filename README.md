# DrmPR

| Platform | Supported          | Version |
| ------- | ------------------ | ------- |
| Termux   | :white_check_mark: | ALPHA-0.3.5        |
| Windows   | :white_check_mark: | ALPHA-0.3.5        |
| Linux   | :white_check_mark: | ALPHA-0.3.5        |
| MacOS   | :white_check_mark: | ALPHA-0.3.5        |

## Required
- Nodejs
- Curl
- Python
- Java
- Git

## Setup automatically
1.Install
```sh
$ npm install
```
2.Setup config
```sh
$ npm run setup
```
3.Setup token bot
```sh
$ npm run tokens
```
4.Start Bot
```sh
in Linux / MacOS / Termux
$ cd bin
$ chmod +x dotbot.sh
$ ./dotbot.sh

in windows
$ cd bin
$ dotbot


Note: if you dont have Lavalink it will download it if you have, copy and paste in DotBot directory
```

## Setup config manualy
- 1.Open config directory
- 2.Open configs.example.json
- 3.Edit and save
- 4.rename to configs.json

## Setup token manualy
- 1.Open config directory
- 2.Open token.example.json
- 3.Edit and save
- 4.rename to token.json

## Download Lavalink manualy
- 1.Download Lavalink.jar from https://github.com/freyacodes/Lavalink/releases/
- 2.Move Lavalink.jar to DotBot Directory
- 3.Start Dotbot in bin/dotbot
