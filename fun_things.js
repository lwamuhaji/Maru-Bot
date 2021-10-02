const config = require('./config.json');

module.exports = {
    fun_things: async function (message){
        const args = message.content.slice(config.PREFIX.length).trim().split(/ +/g);
        const command = args.shift();

        if(command === '짖어!'){
            await message.reply('왈왈!');
        }
    }
}