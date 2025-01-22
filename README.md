# Typescript-Discord.js-v14-Template with yarn!

A quick-start template for Discord.js v14 in Typescript with yarn that contains handling for commands, events, and interactions!

I added Button interaction and Context interaction to this, and I will add more features like select list in the future.

> This project is a fork of [TSLARoadster/TypeScript-Discord.js-v14-Template](https://github.com/TSLARoadster/TypeScript-Discord.js-v14-Template)

And you can find another features on my [another discord bot repo](https://github.com/ry2x/mofumofu-discord-bot)!

## Installation

1. Clone this project with
   ```bash
   $git clone https://github.com/ry2x/TypeScript-Discord.js-v.14-yarn-template.git
   ```
2. Install dependencies with
   ```bash
   $yarn install
   $yarn
   ```
3. Install hasky [[?]](https://www.npmjs.com/package/husky)_What is hasky_
   ```bash
   $yarn run prepare
   ```

## Configuration
1. Edit `./src/RENAME.env`


   You'll need `client_id`, `TOKEN` and `guild_id`  [[?]](https://discord.com/developers/applications) _You can get them at [here](https://discord.com/developers/applications)._

2. Rename `RENAME.env` to `.env`
3. Edit `./src/config.json`
   
   Change "!" to configure your prefix
   ```json
   {
    "prefix": "!"  
   }
   ```
## Scripts
> run lint
 ```bash
$yarn run lint
```
> format
```bash
$yarn run prettier
```
> test (without compile)
```bash
$yarn run test
```
> compile files
```bash
$yarn run build
```
> run compiled files
```bash
$yarn run start
```
