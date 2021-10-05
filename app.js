const { Client, Intents, MessageEmbed } = require('discord.js');
const { RepeatMode } = require('discord-music-player');
const { Player } = require("discord-music-player");

const Quiz = require('./quiz.js');
const Music = require('./music.js')
const Fun_things = require('./fun_things.js')
const CONFIG = require("./config.json");

const requiredIntents = {intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_VOICE_STATES, 
    Intents.FLAGS.DIRECT_MESSAGES, 
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, 
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
]};
const client = new Client(requiredIntents);
const player = new Player(client);
client.player = player;

client.on("ready", () => { console.log("Bot Ready"); })

//client.login(CONFIG.BOT_TOKEN);
client.login(process.env.TOKEN);

// Emitted when channel was empty.
client.player.on('channelEmpty',  (queue) => console.log(`Everyone left the Voice Channel, queue ended.`));
// Emitted when a song was added to the queue.
client.player.on('songAdd',  (queue, song) => console.log(`Song ${song} was added to the queue.`));
// Emitted when a playlist was added to the queue.
client.player.on('playlistAdd',  (queue, playlist) => console.log(`Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`));
// Emitted when there was no more music to play.
client.player.on('queueEnd',  (queue) => console.log(`The queue has ended.`));
// Emitted when a song changed.
client.player.on('songChanged', (queue, newSong, oldSong) => console.log(`${newSong} is now playing.`));
// Emitted when a first song in the queue started playing.
client.player.on('songFirst',  (queue, song) => console.log(`Started playing ${song}.`));
// Emitted when someone disconnected the bot from the channel.
client.player.on('clientDisconnect', (queue) => console.log(`I was kicked from the Voice Channel, queue ended.`));
// Emitted when deafenOnJoin is true and the bot was undeafened
client.player.on('clientUndeafen', (queue) => console.log(`I got undefeanded.`));
// Emitted when there was an error in runtime
client.player.on('error', (error, queue) => { console.log(`Error: ${error} in ${queue.guild.name}`);});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(CONFIG.PREFIX)) return;

    if(message.channel.type === 'DM') {
        Quiz.quiz_DM(message);
    }
    else
    {
        Music.music(message, client);
        Quiz.quiz(message);
        Fun_things.fun_things(message);
    }
});
