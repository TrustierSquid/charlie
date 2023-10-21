import { Client, Events, IntentsBitField, REST, ReactionUserManager, Routes } from 'discord.js'
import fetch from 'node-fetch';
import 'dotenv/config'
import { register, clientID } from "./register-commands.js";
const geoKey = process.env['GEO_KEY'];
const appID = process.env['APPLICATION_ID'];
const weathKey = process.env['WEATHER_KEY']

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

    console.log("Current Commands:")
    console.log("/forecast <postal code>")
    
    console.log("Shows the local forecast of the entered postal code \n")
    
    console.log("/servername")
    console.log("Prints the server name in the console")
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
        console.log("servername command ran in " + interaction.guild.name);


        // grabs the value of the argument (ZIPCODE)
        let userPostalCode = interaction.options.get('postalcode').value;

        let latitude;
        let longitude;
        
        // api gets called based on entered zip code
        // Reverse geolocation API URL
        let geoURL = `https://api.geoapify.com/v1/geocode/search?text=${userPostalCode}&type=postcode&format=json&apiKey=${geoKey}`
        
        
        // searching location and forecast
        let searchGeo = async ()=>{
            // All location data
            // console.log(jsonResLocation.results[0]);
            const responseLocation = await fetch(geoURL)
            const jsonResLocation = await responseLocation.json();
            latitude = jsonResLocation.results[0].lat;
            longitude = jsonResLocation.results[0].lon;
            console.log("These are the geo API results for the postal code you entered...")
            
            // Key information about the searched postalcode
            let city = jsonResLocation.results[0].city;
            let state = jsonResLocation.results[0].state;            
            
            // format for getting city info (jsonRes.results[0].city);
            
            // Weather API URL
            let weatherURL = `http://api.weatherapi.com/v1/forecast.json?key=${weathKey}&q=${city}&days=5`
            
            let searchWeather = async ()=> {
                const responseWeather = await fetch(weatherURL) 
                const jsonResWeather = await responseWeather.json();
                console.log("Here is the weather data based off of the postal code you entered")
                // Weather api response    console.log("Current Commands:")


                // The F at the end is for farenheit and C is for Celcius 
                // All of the variables for the weather api
                let output = (weatherResponse)=> {
                    const currentTempF = Math.round(weatherResponse.current.temp_f) + '°';
                    const currentTempC = Math.round(weatherResponse.current.temp_c) + '°';
                    const condition = weatherResponse.current.condition.text;
                    const windDirection = weatherResponse.current.wind_dir;
                    const humidity = Math.round(weatherResponse.current.humidity);
                    const feels_likeF = Math.round(weatherResponse.current.feelslike_f) + '°';
                    const feels_likeC = Math.round(weatherResponse.current.feelslike_c) + '°';
                    const wind_mph = Math.round(weatherResponse.current.wind_mph) + 'mph'; 
                    const wind_kph = Math.round(weatherResponse.current.wind_kph) + 'kph';
                    const weatherImg = weatherResponse.current.condition.icon;
                    
                    // All weather variables on display
                    interaction.reply(`Today in ${city}, ${state}...\nIt is currently:\n\nCurrent Temperature - ${currentTempF}\nCondition for today - ${condition}\nWind Direction - ${windDirection}\nCurrent Humidity - ${humidity}\nFeels like - ${feels_likeF}\nWind Speed - ${wind_mph}`)
                }

                output(jsonResWeather)

            }
            
            searchWeather();

        }

        searchGeo()
    }
    
    if (interaction.commandName === `servername`) {
        console.log("servername command ran in " + interaction.guild.name);
        console.log(interaction)
    }

    
})

charlie.login(clientID)
