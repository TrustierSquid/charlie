
import { Client, Events, IntentsBitField, REST, Routes } from 'discord.js'
import fetch from 'node-fetch';
import 'dotenv/config'


let city = "ypsilanti"
// Weather API URL
let weatherURL = 'https://api.open-meteo.com/v1/forecast?latitude=42.2411&longitude=-83.613&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto'

// Reverse geolocation API URL
let geoURL = `https://api.geoapify.com/v1/geocode/search?text=48185&type=postcode&format=json&apiKey=${process.env.GEO_KEY}`

async function callWeather(){
    const response = await fetch(weatherURL) 
    const jsonRes = await response.json();
    console.log(jsonRes)    
    console.log('---------------------------------------')    
}

async function callGeo(){
    const response = await fetch(geoURL)
    const jsonRes = await response.json();
    console.log(jsonRes);
}


callGeo()
callWeather()

// DISCORD BOT INITIATION

const charlie = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});


charlie.once(Events.ClientReady, client => {
    console.log("Charlie is Ready!")
})

charlie.on('messageCreate', message => {
    if(message.author.bot) return
    console.log(message)

})

charlie.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand()) return
    console.log(interaction.commandName)
    if (interaction.commandName === `forecast`) {
        interaction.reply(`What city?`)
    }

    async function call(){
        const response = await fetch(weatherURL) 
        const jsonRes = await response.json();
        console.log(jsonRes)    
        console.log('---------------------------------------')    
    }

    let findLoction = ()=> {
        
    }

    
})

charlie.login(process.env.CLIENT_TOKEN)
