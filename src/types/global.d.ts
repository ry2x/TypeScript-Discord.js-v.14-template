import { type Client, type Collection } from 'discord.js';
import type ApplicationCommand from '../templates/ApplicationCommand.ts';
import type ButtonCommand from '../templates/ButtonCommands.ts';
import type MessageCommand from '../templates/MessageCommand.ts';

interface DiscordClient extends Client {
  commands: Collection<string, ApplicationCommand>;
  msgCommands: Collection<string, MessageCommand>;
  contextCommands: Collection<string, ContextCommand>;
  buttonCommands: Collection<string, ButtonCommand>;
}

declare global {
  // eslint-disable-next-line no-var
  var client: DiscordClient;

  type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
}

export {};
