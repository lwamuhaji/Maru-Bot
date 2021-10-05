const { MessageEmbed } = require('discord.js');
const COLOR = require('./colors.json');
const CONFIG = require('./config.json');

module.exports = {
    isSetting: let = false, isGaming: let = false, startChannel: let = null, 
    host: let = null, hint: let = null, answer: let = null, isHintOpened: let = false,
    try: let = 20, questionEmbed: let = null,

    quiz: async function (message) {
        const args = message.content.slice(CONFIG.PREFIX.length).trim().split(/ +/g);
        const args_nosplit = message.content.slice(CONFIG.PREFIX.length).trim();
        const command = args.shift();
        
        if(command === '스무고개하자'){

            if(this.isSetting){
                message.reply('이미 ' + message.author.username + '님이 정답을 정하고 있어요.');
                return;
            }
            await message.reply('개인 메세지를 확인해주세요!');

            const embed = new MessageEmbed()
                .setColor(COLOR.DEFAULT)
                .setTitle('스무고개의 정답을 정해주세요!')
                .addField('<예시>', '$타조', true)
            await message.author.send({embeds: [embed]});

            this.isSetting = true;
            this.startChannel = message.channel;
            this.host = message.author;
        }

        if(command === '힌트'){
            if(this.isSetting){
                message.reply('이미 ' + message.author.username + '님이 정답을 정하고 있어요.');
                return;
            }
            if(this.isGaming){
                if(message.author == this.host){
                    if(this.isHintOpened){
                        message.reply('이미 힌트를 공개했습니다.');
                    }else{
                        openHint(message, this.hint, this.startChannel);
                        this.isHintOpened = true;
                    }
                }else{
                    message.reply('게임의 주최자가 아닙니다.');
                }
            }else{
                message.reply('게임이 진행중이 아닙니다.\n`$스무고개하자`로 게임을 시작해보세요.')
            }
        }

        if(command === '정답'){
            if(!this.isGaming){ notGaming(message); return; }
            const guess = args_nosplit.slice(command.length + 1);

            if(guess === this.answer){
                const embed = new MessageEmbed()
                    .setColor(COLOR.NOTICE)
                    .setTitle('정답입니다!')
                    .setAuthor('우승자: ' + message.author.username, message.author.avatarURL())
                    .setThumbnail(message.author.avatarURL())
                    .setDescription('**```css\n[ 정답: ' + this.answer + ' ]```**')

                if(message.author === this.host){
                    embed.setDescription('근데 왜 니가 맞추세요?');
                }

                await this.startChannel.send({embeds: [embed]});
                this.isGaming = false;
            }else{
                message.reply('땡');
            }
        }

        if(command === '질문'){
            if(!this.isGaming){ notGaming(message); return; }
            const question = args_nosplit.slice(command.length + 1);
            /*          
            const questionEmbed = new MessageEmbed()
                .setColor(config.COLOR_DEFAULT)
                .setTitle('질문리스트')*/
            addQuestion();
            questionEmbed.addFields('질문 1', question, false)

        }
    },

    quiz_DM: async function (message) {
        const args = message.content.slice(CONFIG.PREFIX.length).trim();

        if(this.host === message.author && this.isSetting == true){
            if(!this.answer){
                this.answer = args;

                const hint_embed = new MessageEmbed()
                    .setColor(COLOR.NOTICE)
                    .setTitle('힌트를 정해주세요!')
                    .addField('<예시>', '$동물원 가면 볼 수 있는 것', true)
                await message.author.send({embeds: [hint_embed]});
            }else{
                this.hint = args;
                await message.reply('확인되었습니다.\n이제 스무고개를 시작합니다!');

                questionEmbed = 

                this.isSetting = false;
                this.isGaming = true;

                const embed = new MessageEmbed()
                    .setColor(COLOR.DEFAULT)
                    .setTitle('스무고개가 시작되었습니다!')
                    .setAuthor('주최자: ' + message.author.username, message.author.avatarURL())
                    .setThumbnail(message.author.avatarURL())
                    .setDescription('**```css\n[ 제한시간: 5분 ]```**')
                    .addFields(
		                { name: '\u200B', value: '\u200B' },
		                { name: '```<힌트>```', value: '주최자는 `$힌트` 를 통해 힌트를 공개할 수 있습니다.', inline: true },
		                { name: '```<정답>```', value: '참가자는 `$정답` 을 통해 정답을 제시할 수 있습니다.', inline: true },
                        { name: '```<질문>```', value: '참가자는 `$질문` 을 통해 질문할 수 있습니다.', inline: true },
                        { name: '```<대답>```', value: '참가자는 `$대답` 을 통해 질문에 네 또는 아니오로 대답할 수 있습니다.', inline: true },
                        { name: '```<남은 질문 수>```', value: '현재 남아있는 질문 가능 횟수는 `20회`입니다.', inline: true },
                        { name: '```<예시>```', value: '`$정답 고양이`\n`$질문 살아있나요?`\n`$대답 네`', inline: true },
	                )
                    .setTimestamp()
                await this.startChannel.send({embeds: [embed]});
            }
        }
    }
}

async function openHint (message, hint, startChannel){
    const embed = new MessageEmbed()
        .setColor(COLOR.NOTICE)
        .setTitle('힌트가 공개되었습니다.')
        .setAuthor('주최자: ' + message.author.username, message.author.avatarURL())
        .setThumbnail(message.author.avatarURL())
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: '```<힌트>```', value: hint, inline: true },
        )
    await startChannel.send({embeds: [embed]});
}

async function notGaming(message){
    await message.reply('현재 게임 중이 아닙니다.');
}

function startQuiz(){

}

function addQuestion(me){

}