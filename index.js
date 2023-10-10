
import { Client, Events, IntentsBitField, REST, ReactionUserManager, Routes } from 'discord.js'
import fetch from 'node-fetch';
import 'dotenv/config'

const GEO_KEY = process.env.GEO_KEY;
const CLIENT_TOKEN = process.env.CLIENT_TOKEN;
const SERVER_ID = process.env.SERVER_ID;
const APPLICATION_ID = process.env.APPLICATION_ID;

// Weather API URL
let weatherURL = 'https://api.open-meteo.com/v1/forecast?latitude=42.2411&longitude=-83.613&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto'



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
    console.log("Charlie has logged in and waiting....");
})

charlie.on('messageCreate', message => {
    if(message.author.bot) return

})



// interactions
charlie.on('interactionCreate', interaction => {
    // if the message is not a slash command, do nothing
    if (!interaction.isChatInputCommand()) return
    
    // forecast command displays weather forecast based on zipcode
    if (interaction.commandName === `forecast`) {
        // grabs the value of the argument (ZIPCODE)
        let userPostalCode = interaction.options.get('postalcode').value;

        // Reverse geolocation API URL
        // api gets called based on entered zip code
        let geoURL = `https://api.geoapify.com/v1/geocode/search?text=${userPostalCode}&type=postcode&format=json&apiKey=${GEO_KEY}`
        let callGeo = async ()=>{
            const response = await fetch(geoURL)
            const jsonRes = await response.json();
            // All location data
            // console.log(jsonRes);

            console.log(jsonRes.results[0].city)
        }

        callGeo()
    }
    
    // Calling weather api based on what zip code the user entered.
    async function callWeather(){
        const response = await fetch(weatherURL) 
        const jsonRes = await response.json();
        console.log(jsonRes)    
        console.log('---------------------------------------')    
    }

    
})

charlie.login(CLIENT_TOKEN)
// callWeather()