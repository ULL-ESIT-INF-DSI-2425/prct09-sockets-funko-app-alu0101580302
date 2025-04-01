import net from 'net';
import fs from 'fs';
import { Funko } from './classes/Funko.js';
import { FunkoTypes } from './enums/FunkoTypes.js';
import { Genre } from './enums/Genre.js';
import chalk from 'chalk';

  net.createServer({ allowHalfOpen: true }, (connection) => {
    console.log('A client has connected.');

    let wholeData = '';
    let message;

    connection.on('data', (chunk) => {
        wholeData += chunk;

            try {
                message = JSON.parse(wholeData);
                wholeData = '';
                connection.emit('request', message);
            } catch {
                connection.write(JSON.stringify({type: 'error', message: 'Error al leer la petición.'}));
            }
    });

    connection.on('request', (message) => {
        try {
            const funko: Funko = new Funko(message.args.id, message.args.name, message.args.description, message.args.type as FunkoTypes, message.args.genre as Genre, message.args.franchise, message.args.number, message.args.exclusive, message.args.properties, message.args.price)

            fs.mkdir(`src/users/${message.args.user}`, { recursive: true }, (err) => {
                if (err) { 
                    connection.write(JSON.stringify({type: 'error', message: err.message}));
                    connection.end();
                } else {
                    fs.open(`src/users/${message.args.user}/funkos.json`, (err) => {
                        if (err) {
                            connection.write(JSON.stringify({type: 'error', message: err.message}));
                            connection.end();
                        }
                    });
                    
                    fs.readFile(`src/users/${message.args.user}/funkos.json`, 'utf8', (err, data) => {
                        let funkos = [];
                
                        if (!err && data.trim()) {
                            try {
                                funkos = JSON.parse(data);
                                if (!Array.isArray(funkos)) funkos = [];
                            } catch (parseError) {
                                connection.write(JSON.stringify({type: 'error', message: 'Error al leer el JSON.'}));
                                connection.end();
                                funkos = [];
                            }
                        }

                        if (message.command === 'add') {
                            const idExists = funkos.some((funk) => funk._id === message.args.id);
                
                            if (idExists) {
                                connection.write(JSON.stringify({type: 'error', message: `Ya existe un Funko con el ID ${message.args.id} en la colección de ${message.args.user}.`}));
                                connection.end();
                            }
                    
                            funkos.push(funko);
                    
                            fs.writeFile(`src/users/${message.args.user}/funkos.json`, JSON.stringify(funkos, null, 2), 'utf8', (writeErr) => {
                                if (writeErr) {
                                    connection.write(JSON.stringify({type: 'error', message: "Error al escribir en el archivo."}));
                                } else {
                                    connection.write(JSON.stringify({type: 'success', message: `¡Nuevo Funko añadido a la colección de ${message.args.user}!`}));
                                }
                            });

                        } else if (message.command === 'update') {
                            const index = funkos.findIndex((funk) => funk._id === message.args.id);
                
                            if (index === -1) {
                                connection.write(JSON.stringify({type: 'error', message: `No existe un Funko con el ID ${message.args.id} en la colección de ${message.args.user}.`}));
                                connection.end();
                            } else {
                                if (message.args.name) {
                                    if (message.args.name === "") {
                                        throw new Error("Nombre no válido.");
                                    }
    
                                    funkos[index]._name = message.args.name;
                                }
                                if (message.args.description) {
                                    if (message.args.description === "") {
                                        throw new Error("Descripción no válida.");
                                    }
    
                                    funkos[index]._description = message.args.description;
                                }
                                if (message.args.type) {
                                    if (message.args.type !== FunkoTypes.Pop && message.args.type !== FunkoTypes.PopRides && 
                                        message.args.type !== FunkoTypes.VynilGold && message.args.type !== FunkoTypes.VynilSoda) {
                                        throw new Error("Tipo no válido.");
                                    }
                                    
                                    funkos[index]._type = message.args.type as FunkoTypes;
                                }
                                if (message.args.genre) {
                                    if (message.args.genre !== Genre.Animation && message.args.genre !== Genre.Videogames && message.args.genre !== Genre.Music &&
                                        message.args.genre !== Genre.Sports && message.args.genre !== Genre.Anime && message.args.genre !== Genre.MoviesTV) {
                                        throw new Error("Género no válido.");
                                    }
    
                                    funkos[index]._genre = message.args.genre as Genre;
                                }
                                if (message.args.franchise) {
                                    if (message.args.franchise === "") {
                                        throw new Error("Franquicia no válido.");
                                    }
    
                                    funkos[index]._franchise = message.args.franchise;
                                }
                                if (message.args.number) {
                                    if (message.args.number <= 0) {
                                        throw new Error("Número no válido.");
                                    }
    
                                    funkos[index]._number = message.args.number;
                                }
                                if (message.args.exclusive) {
                                    funkos[index]._exclusive = message.args.exclusive;
                                }
                                if (message.args.properties) {
                                    funkos[index]._properties = message.args.properties;
                                }
                                if (message.args.price) {
                                    if (message.args.price <= 0) {
                                        throw new Error("Precio no válido.");
                                    }
    
                                    funkos[index]._price = message.args.price;
                                }
    
                                fs.writeFile(`src/users/${message.args.user}/funkos.json`, JSON.stringify(funkos, null, 2), 'utf8', (writeErr) => {
                                    if (writeErr) {
                                        connection.write(JSON.stringify({type: 'error', message: "Error al escribir en el archivo."}));
                                    } else {
                                        connection.write(JSON.stringify({type: 'success', message: `¡Modificado el Funko de id ${message.args.id} a la colección de ${message.args.user}!`}));
                                    }
                                });
                            }    
                        } else if (message.command === 'remove') {
                            const index = funkos.findIndex((funk) => funk._id === message.args.id);
            
                            if (index === -1) {
                                connection.write(JSON.stringify({type: 'error', message: `No existe un Funko con el ID ${message.args.id} en la colección de ${message.args.user}.`}));
                                connection.end();
                            } else {
                                funkos.splice(index, 1);

                                fs.writeFile(`src/users/${message.args.user}/funkos.json`, JSON.stringify(funkos, null, 2), 'utf8', (writeErr) => {
                                    if (writeErr) {
                                        connection.write(JSON.stringify({type: 'error', message: "Error al escribir en el archivo."}));
                                    } else {
                                        connection.write(JSON.stringify({type: 'success', message: `¡Eliminado el Funko de ID ${message.args.id} de la colección de ${message.args.user}!`}));
                                    }
                                });
                            }
                        } else if (message.command === 'list') {
                            let str: string = '';
                            str += "-------------------------------------------------------\n";
                            funkos.forEach((funko) => {
                                str += printFunkos(funko);
                            });
                            connection.write(JSON.stringify({type: 'success', message: str}));
                            
                        } else if (message.command === 'read') {
                            const index = funkos.findIndex((funk) => funk._id === message.args.id);
            
                            if (index === -1) {
                                connection.write(JSON.stringify({type: 'error', message: `No existe un Funko con el ID ${message.args.id} en la colección de ${message.args.user}.`}));
                                connection.end();
                            } else {
                                let str: string = '';
                                str += "-------------------------------------------------------\n";
                                str += printFunkos(funkos[index]);
                                connection.write(JSON.stringify({type: 'success', message: str}));
                            }
                        }
                
                        connection.end();
                    });
                }
            });
        } catch {
            console.log(chalk.red("El Funko introducido no es correcto."));
            return;
        }
    });

    connection.on('end', () => {

    });

    connection.on('close', () => {
      console.log('A client has disconnected.');
    });
  }).listen(60300, () => {
    console.log('Waiting for clients to connect.');
  });

/**
 * Imprime la información de un Funko
 * @param funko - Funko a imprimir
 * @returns La información del Funko
 */
function printFunkos(funko: any): string {
    let rslt: string = `ID: ${funko._id}\n`;
    rslt += `Nombre: ${funko._name}\n`;
    rslt += `Descripción: ${funko._description}\n`;
    rslt += `Tipo: ${funko._type}\n`;
    rslt += `Género: ${funko._genre}\n`;
    rslt += `Franquicia: ${funko._franchise}\n`;
    rslt += `Número: ${funko._number}\n`;
    rslt += `Exclusividad: ${funko._exclusive}\n`;
    rslt += `Características: ${funko._properties}\n`;
    rslt += `Precio: ${funko._price}\n`;
    rslt += '-------------------------------------------------------\n';

    return rslt;
}
