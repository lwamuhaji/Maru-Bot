const config = require('./config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    music: async function(message, client){
        const args = message.content.slice(config.PREFIX.length).trim().split(/ +/g);
        const command = args.shift();
        let guildQueue = client.player.getQueue(message.guild.id);

        if(command === '재생') {
            let queue = client.player.createQueue(message.guild.id);
            await queue.join(message.member.voice.channel);
            let song = await queue.play(args.join(' ')).catch(_ => {
                if(!guildQueue)
                    queue.stop();
            });
    
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(song.name)
                .setURL(song.url)
                .setAuthor(song.author, song.thumbnail)
                .setDescription("Play time: " + song.duration)
                .setThumbnail(song.thumbnail)
                .setTimestamp()
    
            await message.channel.send({ embeds: [embed] });
        }
    
        if(command === '스킵') {
            guildQueue.skip();
        }
    
        if(command === 'stop') {
            guildQueue.stop();
        }
    
        if(command === 'removeLoop') {
            guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
        }
    
        if(command === 'toggleLoop') {
            guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
        }
    
        if(command === 'toggleQueueLoop') {
            guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
        }
    
        if(command === 'setVolume') {
            guildQueue.setVolume(parseInt(args[0]));
        }
    
        if(command === 'seek') {
            guildQueue.seek(parseInt(args[0]) * 1000);
        }
    
        if(command === 'clearQueue') {
            guildQueue.clearQueue();
        }
    
        if(command === 'shuffle') {
            guildQueue.shuffle();
        }
    
        if(command === 'getQueue') {
            console.log(guildQueue);
        }
    
        if(command === 'getVolume') {
            console.log(guildQueue.volume)
        }
    
        if(command === 'nowPlaying') {
            console.log(`Now playing: ${guildQueue.nowPlaying}`);
        }
    
        if(command === 'pause') {
            guildQueue.setPaused(true);
        }
    
        if(command === 'resume') {
            guildQueue.setPaused(false);
        }
    
        if(command === 'remove') {
            guildQueue.remove(parseInt(args[0]));
        }
    
        if(command === 'createProgressBar') {
            const ProgressBar = guildQueue.createProgressBar();
            
            // [======>              ][00:35/2:20]
            console.log(ProgressBar.prettier);
        }
    }
}