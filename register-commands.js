import 'dotenv/config'
import {REST, Routes} from 'discord.js'
// const {REST, Routes}= require('discord.js')

let postalCode;

const commands = [
    {
        name: `forecast`,
        description: 'Returns your daily forecast',
        options: [
            {
                type: 4,
                name: 'postalcode',
                required: true,
                description: 'Enter a zip code',
                max_length: 5,
            },
        ],
    },
    
    {
        name: 'servername',
        description: 'displays server name',
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