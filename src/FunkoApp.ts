/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import yargs from "yargs";
import chalk from "chalk";
import { hideBin } from 'yargs/helpers';
import { FunkoTypes } from "./enums/FunkoTypes.js";
import { Genre } from "./enums/Genre.js";
import { Funko } from "./classes/Funko.js";

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
        try {
            const funko: Funko = new Funko(argv.id, argv.name, argv.description, argv.type as FunkoTypes, argv.genre as Genre, argv.franchise, argv.number, argv.exclusive, argv.properties, argv.price)

            fs.mkdir(`src/users/${argv.user}`, { recursive: true }, (err) => {
                if (err) { 
                    console.log(chalk.red(err));
                } else {
                    fs.open(`src/users/${argv.user}/funkos.json`, (err) => {
                        if (err) {
                            console.log(chalk.red(err));
                        }
                    });
                    
                    fs.readFile(`src/users/${argv.user}/funkos.json`, 'utf8', (err, data) => {
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
                
                        const idExists = funkos.some((funk) => funk._id === argv.id);
                
                        if (idExists) {
                            console.log(chalk.red(`Ya existe un Funko con el ID ${argv.id} en la colección de ${argv.user}.`));
                            return;
                        }
                
                        funkos.push(funko);
                
                        fs.writeFile(`src/users/${argv.user}/funkos.json`, JSON.stringify(funkos, null, 2), 'utf8', (writeErr) => {
                            if (writeErr) {
                                console.error(chalk.red("Error al escribir en el archivo:", writeErr));
                            } else {
                                console.log(chalk.green(`¡Nuevo Funko añadido a la colección de ${argv.user}!`));
                            }
                        });
                    });
                }
            });
        } catch {
            console.log(chalk.red("El Funko introducido no es correcto."));
            return;
        }
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
        try {
            fs.mkdir(`src/users/${argv.user}`, { recursive: true }, (err) => {
                if (err) { 
                    console.log(chalk.red(err));
                } else {
                    fs.open(`src/users/${argv.user}/funkos.json`, (err) => {
                        if (err) {
                            console.log(chalk.red(err));
                        }
                    });
                    
                    fs.readFile(`src/users/${argv.user}/funkos.json`, 'utf8', (err, data) => {
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
                
                        const index = funkos.findIndex((funk) => funk._id === argv.id);
                
                        if (index === -1) {
                            console.log(chalk.red(`No existe un Funko con el ID ${argv.id} en la colección de ${argv.user}.`));
                            return;
                        } else {
                            if (argv.name) {
                                if (argv.name === "") {
                                    throw new Error("Nombre no válido.");
                                }

                                funkos[index]._name = argv.name;
                            }
                            if (argv.description) {
                                if (argv.description === "") {
                                    throw new Error("Descripción no válida.");
                                }

                                funkos[index]._description = argv.description;
                            }
                            if (argv.type) {
                                if (argv.type !== FunkoTypes.Pop && argv.type !== FunkoTypes.PopRides && 
                                    argv.type !== FunkoTypes.VynilGold && argv.type !== FunkoTypes.VynilSoda) {
                                    throw new Error("Tipo no válido.");
                                }
                                
                                funkos[index]._type = argv.type as FunkoTypes;
                            }
                            if (argv.genre) {
                                if (argv.genre !== Genre.Animation && argv.genre !== Genre.Videogames && argv.genre !== Genre.Music &&
                                    argv.genre !== Genre.Sports && argv.genre !== Genre.Anime && argv.genre !== Genre.MoviesTV) {
                                    throw new Error("Género no válido.");
                                }

                                funkos[index]._genre = argv.genre as Genre;
                            }
                            if (argv.franchise) {
                                if (argv.franchise === "") {
                                    throw new Error("Franquicia no válido.");
                                }

                                funkos[index]._franchise = argv.franchise;
                            }
                            if (argv.number) {
                                if (argv.number <= 0) {
                                    throw new Error("Número no válido.");
                                }

                                funkos[index]._number = argv.number;
                            }
                            if (argv.exclusive) {
                                funkos[index]._exclusive = argv.exclusive;
                            }
                            if (argv.properties) {
                                funkos[index]._properties = argv.properties;
                            }
                            if (argv.price) {
                                if (argv.price <= 0) {
                                    throw new Error("Precio no válido.");
                                }

                                funkos[index]._price = argv.price;
                            }

                            fs.writeFile(`src/users/${argv.user}/funkos.json`, JSON.stringify(funkos, null, 2), 'utf8', (writeErr) => {
                                if (writeErr) {
                                    console.error(chalk.red("Error al escribir en el archivo:", writeErr));
                                } else {
                                    console.log(chalk.green(`¡Modificado el Funko de id ${argv.id} a la colección de ${argv.user}!`));
                                }
                            });
                        }
                    });
                }
            });
        } catch (error) {
            console.log(chalk.red(error));
            return;
        }
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
            fs.mkdir(`src/users/${argv.user}`, { recursive: true }, (err) => {
                if (err) { 
                    console.log(chalk.red(err));
                } else {
                    fs.open(`src/users/${argv.user}/funkos.json`, (err) => {
                        if (err) {
                            console.log(chalk.red(err));
                        }
                    });
                    
                    fs.readFile(`src/users/${argv.user}/funkos.json`, 'utf8', (err, data) => {
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
                
                        const index = funkos.findIndex((funk) => funk._id === argv.id);
                
                        if (index === -1) {
                            console.log(chalk.red(`No existe un Funko con el ID ${argv.id} en la colección de ${argv.user}.`));
                            return;
                        } else {
                            funkos.splice(index, 1);

                            fs.writeFile(`src/users/${argv.user}/funkos.json`, JSON.stringify(funkos, null, 2), 'utf8', (writeErr) => {
                                if (writeErr) {
                                    console.error(chalk.red("Error al escribir en el archivo:", writeErr));
                                } else {
                                    console.log(chalk.green(`¡Eliminado el Funko de ID ${argv.id} de la colección de ${argv.user}!`));
                                }
                            });
                        }
                    });
                }
            });
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
            fs.mkdir(`src/users/${argv.user}`, { recursive: true }, (err) => {
                if (err) { 
                    console.log(chalk.red(err));
                } else {
                    fs.open(`src/users/${argv.user}/funkos.json`, (err) => {
                        if (err) {
                            console.log(chalk.red(err));
                        }
                    });
                    
                    fs.readFile(`src/users/${argv.user}/funkos.json`, 'utf8', (err, data) => {
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
                            
                        console.log(chalk.green("-------------------------------------------------------"));
                        funkos.forEach((funko) => {
                            printFunkos(funko);
                        })
                    });
                }
            });
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
            description: 'Usuario',
            type: 'number',
            demandOption: true
        }
    }, (argv) => {
            fs.mkdir(`src/users/${argv.user}`, { recursive: true }, (err) => {
                if (err) { 
                    console.log(chalk.red(err));
                } else {
                    fs.open(`src/users/${argv.user}/funkos.json`, (err) => {
                        if (err) {
                            console.log(chalk.red(err));
                        }
                    });
                    
                    fs.readFile(`src/users/${argv.user}/funkos.json`, 'utf8', (err, data) => {
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

                        {const index = funkos.findIndex((funk) => funk._id === argv.id);
                
                            if (index === -1) {
                                console.log(chalk.red(`No existe un Funko con el ID ${argv.id} en la colección de ${argv.user}.`));
                                return;
                            } else {
                                console.log(chalk.green("-------------------------------------------------------"));
                                printFunkos(funkos[index]);
                            }
                        }
                    });
                }
            });
        
    })
    .help()
    .argv;

/**
 * Imprime la información de un Funko
 * @param funko - Funko a imprimir
 * @returns La información del Funko
 */
function printFunkos(funko: any): void {
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

    console.log(chalk.green(rslt));
}