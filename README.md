# charlie

## Getting Started

To install all dependancies, run the following command:

```bash
npm i
```
### Setting Environment Variables
To start, create an environment variable file:
```bash
touch .env
```

Then, add the following variables to the file:
```bash
# Discord API Keys (https://discord.com/developers/applications)
APPLICATION_ID = IDHERE
CLIENT_TOKEN = TOKENHERE
# Geocoding API key: https://apidocs.geoapify.com/docs/geocoding/reverse-geocoding/#about
GEO_KEY = KEYHERE
```

### Discord bot intents
Before running the bot, you need to declare intentes in the discord developer portal. To do this, go to the [discord developer portal](https://discord.com/developers/applications) and select your application. Then, go to the bot tab and scroll down to the "Privileged Gateway Intents" section. Enable all intents.

![Alt text](documentation/images/Untitled.png)

### Running the Application

To run the application, run the following command:

```bash
npm run test
```
