// Require the necessary discord.js classes
const { Client, Events, IntentsBitField, SlashCommandBuilder, REST, Routes } = require('discord.js');
require('dotenv').config()


let weatherURl = 'http://api.weatherapi.com/v1//forecast.json'

async function call(){

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


//Command builder
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Replies with Pong!"),
    async execute(interaction){
        await interaction.reply("Pong!")
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`)
    },
}

charlie.once(Events.ClientReady, client => {
    console.log("Charlie is Ready!")
})

charlie.on('messageCreate', message => {
    if(message.author.bot) return
})

charlie.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand()) return
    console.log(interaction.commandName)
    if (interaction.commandName === 'forecast') {
        interaction.reply(`Today's Daily forecast is..`)
    }
})

// charlie.login(process.env.CLIENT_TOKEN)
apiCall()