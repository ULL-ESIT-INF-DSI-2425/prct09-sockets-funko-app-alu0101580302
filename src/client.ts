import chalk from 'chalk';
import net, { createConnection } from 'net';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const client: any = net.connect({port: 60300});

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv))
    .command('add', 'Añade un Funko', {
        user: {
            description: 'Usuario',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'ID del Funko',
            type: 'number',
            demandOption: true
        },
        name: {
            description: 'Nombre del Funko',
            type: 'string',
            demandOption: true
        },
        description: {
            description: 'Descripción del Funko',
            type: 'string',
            demandOption: true
        },
        type: {
            description: 'Tipo de Funko',
            type: 'string',
            demandOption: true
        },
        genre: {
            description: 'Género del medio de origen del personaje del Funko',
            type: 'string',
            demandOption: true
        },
        franchise: {
            description: 'Franquicia del personaje del Funko',
            type: 'string',
            demandOption: true
        },
        number: {
            description: 'Número del Funko',
            type: 'number',
            demandOption: true
        },
        exclusive: {
            description: 'Exclusividad del Funko',
            type: 'boolean',
            demandOption: true
        },
        properties: {
            description: 'Características especiales del Funko',
            type: 'string',
            demandOption: true
        },
        price: {
            description: 'Precio del Funko',
            type: 'number',
            demandOption: true
        }
    }, (argv) => {
        client.write(JSON.stringify({ command: 'add', args: argv }))
    })
    .help()
    .argv;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv))
    .command('update', 'Modifica un Funko', {
        user: {
            description: 'Usuario',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'ID del Funko',
            type: 'number',
            demandOption: true
        },
        name: {
            description: 'Nombre del Funko',
            type: 'string',
            demandOption: false
        },
        description: {
            description: 'Descripción del Funko',
            type: 'string',
            demandOption: false
        },
        type: {
            description: 'Tipo de Funko',
            type: 'string',
            demandOption: false
        },
        genre: {
            description: 'Género del medio de origen del personaje del Funko',
            type: 'string',
            demandOption: false
        },
        franchise: {
            description: 'Franquicia del personaje del Funko',
            type: 'string',
            demandOption: false
        },
        number: {
            description: 'Número del Funko',
            type: 'number',
            demandOption: false
        },
        exclusive: {
            description: 'Exclusividad del Funko',
            type: 'boolean',
            demandOption: false
        },
        properties: {
            description: 'Características especiales del Funko',
            type: 'string',
            demandOption: false
        },
        price: {
            description: 'Precio del Funko',
            type: 'number',
            demandOption: false
        }
    }, (argv) => {
        client.write(JSON.stringify({ command: 'add', args: argv }));
    })
    .help()
    .argv;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv))
    .command('remove', 'Elimina un Funko', {
        user: {
            description: 'Usuario',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'ID del Funko',
            type: 'number',
            demandOption: true
        }
    }, (argv) => {
        client.write(JSON.stringify({ command: 'remove', args: argv }));
    })
    .help()
    .argv;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv))
    .command('list', 'Muestra la colección de Funkos', {
        user: {
            description: 'Usuario',
            type: 'string',
            demandOption: true
        }
    }, (argv) => {
        client.write(JSON.stringify({ command: 'list', args: argv }));
    })
    .help()
    .argv;

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv))
    .command('read', 'Muestra la información de un Funko', {
        user: {
            description: 'Usuario',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'ID del Funko',
            type: 'number',
            demandOption: true
        }
    }, (argv) => {
        client.write(JSON.stringify({ command: 'read', args: argv }))
        
    })
    .help()
    .argv;

client.on('data', (dataJSON: any) => {
  const message = JSON.parse(dataJSON.toString());

  if (message.type === 'error') {
    console.log(chalk.red(message.message));
  } else if (message.type === 'success') {
    console.log(chalk.green(message.message));
  }
});

client.on('end', () => {
    client.end();
})