import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { type RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js';
import config from '../config.json' with { type: 'json' };
import logger from '../logger.js';
import type ApplicationCommand from '../templates/ApplicationCommand.js';
import MessageCommand from '../templates/MessageCommand.js';
import type { commandModule } from '../types/interface.js';
const { TOKEN, CLIENT_ID } = process.env as {
  TOKEN: string;
  CLIENT_ID: string;
};

export default new MessageCommand({
  name: 'deploy',
  description: 'Deploys the slash commands',
  async execute(message, args): Promise<void> {
    if (message.author.id !== client.application?.owner?.id) return;

    if (!args[0]) {
      await message.reply(
        `Incorrect number of arguments! The correct format is \`${config.prefix}deploy <guild/global>\``,
      );
      return;
    }

    if (args[0].toLowerCase() === 'global') {
      // global deployment

      const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
      const commandFiles: string[] = readdirSync('./commands').filter(
        (file) => file.endsWith('.js') || file.endsWith('.ts'),
      );

      for (const file of commandFiles) {
        const module = (await import(`./commands/${file}`)) as commandModule<ApplicationCommand>;
        const command: ApplicationCommand = module.default;
        const commandData = command.data.toJSON();
        commands.push(commandData);
      }

      const rest = new REST({ version: '10' }).setToken(TOKEN);

      try {
        logger.info('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });

        logger.info('Successfully reloaded application (/) commands.');
      } catch (error) {
        logger.error(error);
      }

      await message.reply('Deploying!');
    } else if (args[0].toLowerCase() === 'guild') {
      // guild deployment

      const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
      const commandFiles: string[] = readdirSync('./commands').filter(
        (file) => file.endsWith('.js') || file.endsWith('.ts'),
      );

      for (const file of commandFiles) {
        const module = (await import(`./commands/${file}`)) as commandModule<ApplicationCommand>;
        const command: ApplicationCommand = module.default;
        const commandData = command.data.toJSON();
        commands.push(commandData);
      }

      const rest = new REST({ version: '10' }).setToken(TOKEN);

      try {
        logger.info('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, message.guild?.id as string), {
          body: commands,
        });

        logger.info('Successfully reloaded application (/) commands.');
      } catch (error) {
        logger.error(error);
      }

      await message.reply('Deploying!');
    }
  },
});
