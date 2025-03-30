import net from 'net';
import fs from 'fs';
import { Funko } from './classes/Funko.js';
import { FunkoTypes } from './enums/FunkoTypes.js';
import { Genre } from './enums/Genre.js';
import chalk from 'chalk';

  net.createServer((connection) => {
    console.log('A client has connected.');

    connection.on('data', (dataJSON) => {
        const message = JSON.parse(dataJSON.toString());

        if (message.command === 'add') {
            try {
                const funko: Funko = new Funko(message.args.id, message.args.name, message.args.description, message.args.type as FunkoTypes, message.args.genre as Genre, message.args.franchise, message.args.number, message.args.exclusive, message.args.properties, message.args.price)
    
                fs.mkdir(`src/users/${message.args.user}`, { recursive: true }, (err) => {
                    if (err) { 
                        console.log(chalk.red(err));
                    } else {
                        fs.open(`src/users/${message.args.user}/funkos.json`, (err) => {
                            if (err) {
                                console.log(chalk.red(err));
                            }
                        });
                        
                        fs.readFile(`src/users/${message.args.user}/funkos.json`, 'utf8', (err, data) => {
                            let funkos = [];
                    
                            if (!err && data.trim()) {
                                try {
                                    funkos = JSON.parse(data);
                                    if (!Array.isArray(funkos)) funkos = [];
                                } catch (parseError) {
                                    console.error(chalk.red("Error al leer el JSON:", parseError));
                                    funkos = [];
                                }
                            }
                    
                            const idExists = funkos.some((funk) => funk._id === message.args.id);
                    
                            if (idExists) {
                                console.log(chalk.red(`Ya existe un Funko con el ID ${message.args.id} en la colección de ${message.args.user}.`));
                                return;
                            }
                    
                            funkos.push(funko);
                    
                            fs.writeFile(`src/users/${message.args.user}/funkos.json`, JSON.stringify(funkos, null, 2), 'utf8', (writeErr) => {
                                if (writeErr) {
                                    console.error(chalk.red("Error al escribir en el archivo:", writeErr));
                                } else {
                                    console.log(chalk.green(`¡Nuevo Funko añadido a la colección de ${message.args.user}!`));
                                }
                            });
                        });
                    }
                });
            } catch {
                console.log(chalk.red("El Funko introducido no es correcto."));
                return;
            }
        }
    })

    connection.on('close', () => {
      console.log('A client has disconnected.');
    });
  }).listen(60300, () => {
    console.log('Waiting for clients to connect.');
  });
