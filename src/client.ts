import net, { createConnection } from 'net';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

let client: any;

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
        client = net.createConnection({port: 60300}, () => {
            client.write(JSON.stringify({ command: 'add', args: argv }))
        })
    })
    .help()
    .argv;

client.on('data', (dataJSON: any) => {
  const message = JSON.parse(dataJSON.toString());

  if (message.type === 'watch') {
    console.log(`Connection established: watching file ${message.file}`);
  } else if (message.type === 'change') {
    console.log('File has been modified.');
    console.log(`Previous size: ${message.prevSize}`);
    console.log(`Current size: ${message.currSize}`);
  } else {
    console.log(`Message type ${message.type} is not valid`);
  }
});