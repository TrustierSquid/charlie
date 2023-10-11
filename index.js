import { Client, Events, IntentsBitField, REST, ReactionUserManager, Routes } from 'discord.js'
import fetch from 'node-fetch';
import 'dotenv/config'
import { register, clientID } from "./register-commands.js";
const geoKey = process.env['GEO_KEY'];
const appID = process.env['APPLICATION_ID'];

register(appID);

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

        let latitude;
        let longitude;
        
        // api gets called based on entered zip code
        // Reverse geolocation API URL
        let geoURL = `https://api.geoapify.com/v1/geocode/search?text=${userPostalCode}&type=postcode&format=json&apiKey=${geoKey}`
        
        // Weather API URL
        // searching location and forecast
        let searchGeo = async ()=>{
            // All location data
            const responseLocation = await fetch(geoURL)
            const jsonResLocation = await responseLocation.json();
            latitude = jsonResLocation.results[0].latitude;
            longitude = jsonResLocation.results[0].longitude;
            console.log(jsonResLocation.results[0]);
            console.log();
            
            let weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`
            
            // format for getting city info (jsonRes.results[0].city)

            let searchWeather = async ()=> {
                const responseWeather = await fetch(weatherURL) 
                const jsonResWeather = await responseWeather.json();
                console.log(jsonResWeather) 

            }

            searchWeather();

            let city = jsonResLocation.results[0].city

            interaction.reply(`Today in ${city}...\n
            It is currently: `)
        }

        searchGeo()
    }
    
    if (interaction.commandName === `servername`) {
        console.log("servername command ran in " + interaction.guild.name);
        interaction.reply("You are currently in " + interaction.guild.name);
    }
    if (interaction.commandName === 'educate') {
        console.log(interaction.user.displayName +  " ran the educate command.")
        interaction.reply("You should not load commands in the `index.js` file with **__if statements__**. Create a method, and unforunately knowing how JS is, you may have to create a massive switch case inside that if statement. With Meloetta (shameless plug https://joshrandall.net/meloetta), we defined all the commands using functions, but that could just be how Python is vs JS.")
    }
    // Calling weather api based on what zip code the user entered.
    async function callWeather(){
        console.log('---------------------------------------')    
    }

    
})

charlie.login(clientID)
