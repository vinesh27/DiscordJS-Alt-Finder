const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
const ms = require('ms');
const config = require('./config.json');

const timeSpan = ms(`${config.days} days`);

client.on('ready', () => { console.log(`Logged in as ${client.user.tag}!`); });

client.on('guildMemberAdd', (member) => {
    let userCreationDate = new Date(member.user.createdAt).getTime();
    const difference = Date.now() - userCreationDate;
    if (difference < timeSpan) {
        member.guild.channels.cache.get(config.channelId)
            .send(`Member with ID: ${member.id} was created recently, Can be an Alt Account`);
        console.log(member.id + ' was created recently');
    }
});

client.login(config.token);