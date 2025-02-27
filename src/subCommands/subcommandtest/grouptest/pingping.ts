import type { ChatInputCommandInteraction } from 'discord.js';
import SubCommand from '../../../templates/SubCommand.js';

export default new SubCommand({
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply('PongPong!');
  },
});
