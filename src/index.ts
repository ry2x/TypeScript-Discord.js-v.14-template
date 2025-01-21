import 'dotenv/config';

import { readdirSync } from 'fs';
import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js';
import deployGlobalCommands from './deployGlobalCommands.js';
import logger from './logger.js';
import type ApplicationCommand from './templates/ApplicationCommand.js';
import type ButtonCommand from './templates/ButtonCommands.js';
import type ContextCommand from './templates/ContextCommands.js';
import type Event from './templates/Event.js';
import type MessageCommand from './templates/MessageCommand.js';
import type { commandModule } from './types/interface.js';

const { TOKEN } = process.env;

logger.info('----Starting bot----');

await deployGlobalCommands();

logger.info('----finish deploy global commands----');

// Discord client object
logger.info('Create Discord Client...');
global.client = Object.assign(
  new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel],
  }),
  {
    commands: new Collection<string, ApplicationCommand>(),
    msgCommands: new Collection<string, MessageCommand>(),
    contextCommands: new Collection<string, ContextCommand>(),
    buttonCommands: new Collection<string, ButtonCommand>(),
  },
);

// Set each command in the commands folder as a command in the client.commands collection
logger.info(
  'Set each command in the commands folder as a command in the client.commands collection',
);

const commandFiles: string[] = readdirSync('./interactions/commands').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts'),
);
for (const file of commandFiles) {
  const module = (await import(
    `./interactions/commands/${file}`
  )) as commandModule<ApplicationCommand>;
  const command: ApplicationCommand = module.default;
  client.commands.set(command.data.name, command);
}

const contextCommandFiles: string[] = readdirSync('./interactions/contextCommands').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts'),
);
for (const file of contextCommandFiles) {
  const module = (await import(`./interactions/commands/${file}`)) as commandModule<ContextCommand>;
  const command: ContextCommand = module.default;
  client.contextCommands.set(command.data.name, command);
}

const buttonCommandFiles: string[] = readdirSync('./interactions/buttonCommands').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts'),
);
for (const file of buttonCommandFiles) {
  const module = (await import(
    `./interactions/buttonCommands/${file}`
  )) as commandModule<ButtonCommand>;
  const command: ButtonCommand = module.default;
  client.buttonCommands.set(command.data.name, command);
}

const msgCommandFiles: string[] = readdirSync('./messageCommands').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts'),
);
for (const file of msgCommandFiles) {
  const module = (await import(`./messageCommands/${file}`)) as commandModule<MessageCommand>;
  const command: MessageCommand = module.default;
  client.msgCommands.set(command.name, command);
}

// Event handling
logger.info('Create Event Handler...');
const eventFiles: string[] = readdirSync('./events').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts'),
);

for (const file of eventFiles) {
  const module = (await import(`./events/${file}`)) as commandModule<Event>;
  const event: Event = module.default;
  if (event.once) {
    client.once(event.name, (...args) => {
      void (async () => await event.execute(...args))();
    });
  } else {
    client.on(event.name, (...args) => {
      void (async () => await event.execute(...args))();
    });
  }
}

await client.login(TOKEN);
logger.info('Bot logged in!');
