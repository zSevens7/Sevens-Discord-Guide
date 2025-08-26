require('dotenv').config();
const { Client, GatewayIntentBits, Partials, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, // necessário para ler o conteúdo das mensagens
    ],
    partials: [Partials.Channel]
});

const TOKEN = process.env.TOKEN;
const BEM_VINDO_CANAL_ID = process.env.CANAL_BEM_VINDO;
const INTERESSES_CANAL_ID = process.env.CANAL_INTERESSES;
const CARGO_MEMBRO_ID = process.env.CARGO_MEMBRO;
const CARGO_DEATHMAGE_ID = process.env.CARGO_DEATHMAGE;
const CARGO_GAMES_ID = process.env.CARGO_GAMES;
const ADMIN_ID = process.env.ADMIN_ID;

// Evento quando o bot está online
client.on('clientReady', () => {
    console.log(`Bot online como ${client.user.tag}`);
});

// Quando um membro entra
client.on('guildMemberAdd', async member => {
    try {
        // Dar cargo Membro
        const cargoMembro = member.guild.roles.cache.get(CARGO_MEMBRO_ID);
        if (cargoMembro) await member.roles.add(cargoMembro);

        // Mensagem no canal de boas-vindas
        const canalBemVindo = member.guild.channels.cache.get(BEM_VINDO_CANAL_ID);
        if (canalBemVindo) {
            canalBemVindo.send(`🎉 Olá ${member}, seja bem-vindo(a)! Você recebeu o cargo **Membro**.`);
        }

        // Mensagem no canal de interesses com menu
        const canalInteresses = member.guild.channels.cache.get(INTERESSES_CANAL_ID);
        if (canalInteresses) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('cargos_interesse')
                        .setPlaceholder('Escolha os cargos que deseja receber!')
                        .addOptions([
                            {
                                label: 'Death Mage',
                                description: 'Receber anúncios de O Mago da Morte',
                                value: 'deathmage',
                            },
                            {
                                label: 'Games',
                                description: 'Receber anúncios de Games',
                                value: 'games',
                            },
                        ])
                        .setMinValues(0)
                        .setMaxValues(2) // Pode escolher até 2
                );

            await canalInteresses.send({
                content: `Olá ${member}, selecione os cargos de interesse para receber notificações:`,
                components: [row],
            });
        }

        // Log privado para admin
        const admin = await client.users.fetch(ADMIN_ID);
        admin.send(`✅ Novo membro entrou: ${member.user.tag} (${member.id})`);

    } catch (err) {
        console.error(err);
    }
});

// Quando o usuário interage com o menu
client.on('interactionCreate', async interaction => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== 'cargos_interesse') return;

    const member = interaction.member;

    // Todos os cargos possíveis
    const cargosMap = {
        deathmage: CARGO_DEATHMAGE_ID,
        games: CARGO_GAMES_ID
    };

    // Remover cargos não selecionados e adicionar os selecionados
    for (const key in cargosMap) {
        const role = member.guild.roles.cache.get(cargosMap[key]);
        if (!role) continue;

        if (interaction.values.includes(key)) {
            if (!member.roles.cache.has(role.id)) await member.roles.add(role);
        } else {
            if (member.roles.cache.has(role.id)) await member.roles.remove(role);
        }
    }

    // Resposta ephemerals para usuário
    await interaction.reply({ content: '✅ Seus cargos foram atualizados!', ephemeral: true });

    // Log privado para admin
    const admin = await client.users.fetch(ADMIN_ID);
    const selectedRoles = interaction.values.map(v => v.toUpperCase()).join(', ') || 'Nenhum';
    admin.send(`🔄 ${member.user.tag} (${member.id}) atualizou seus cargos: ${selectedRoles}`);
});

// Comando !bot para reexibir o menu
client.on('messageCreate', async message => {
    if (message.author.bot) return; // Ignora mensagens de outros bots
    if (message.content.toLowerCase() === '!bot') {
        const member = message.member;

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('cargos_interesse')
                    .setPlaceholder('Escolha os cargos que deseja receber!')
                    .addOptions([
                        {
                            label: 'Death Mage',
                            description: 'Receber anúncios de O Mago da Morte',
                            value: 'deathmage',
                        },
                        {
                            label: 'Games',
                            description: 'Receber anúncios de Games',
                            value: 'games',
                        },
                    ])
                    .setMinValues(0)
                    .setMaxValues(2)
            );

        await message.channel.send({
            content: `${member}, selecione os cargos de interesse para receber notificações:`,
            components: [row],
        });
    }
});

client.login(TOKEN);
