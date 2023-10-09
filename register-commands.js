require('dotenv').config()
const {REST, Routes}= require('discord.js')


const commands = [
    {
        name: `forecast`,
        description: 'Returns your daily forecast',
    },
];

const rest = new REST({version: '10'}).setToken(process.env.CLIENT_TOKEN);

(async ()=> {
    try {
        console.log("Registering slash commands.....")
        await rest.put(
            Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.SERVER_ID),
            { body: commands }
        );

        console.log("slash commands were successfully registered")
    } catch (error) {
        console.log(`There was an error ${error}`)
    }
})();