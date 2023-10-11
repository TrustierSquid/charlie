import 'dotenv/config'
import {REST, Routes} from 'discord.js'
// const {REST, Routes}= require('discord.js')

let postalCode;

export const clientID = process.env['CLIENT_TOKEN'];
// const guildId = process.env['testguildid']

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
        name: `servername`,
        description: 'displays server name',
    },

    {
        name: `educate`,
        description: 'Correctly educates you on how to handle discord commands in JavaScript',
    }
];

const rest = new REST({version: '10'}).setToken(clientID);

export async function register(appID){
    {
        try {
            console.log("Registering slash commands.....")
            await rest.put(
                Routes.applicationCommands(appID),
                { body: commands }
            );
    
            console.log("slash commands were successfully registered")
        } catch (error) {
            console.log(`There was an error ${error}`)
        }
}
}