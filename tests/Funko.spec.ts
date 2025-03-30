import { describe, test, expect } from "vitest";
import { Funko } from "../src/classes/Funko";
import { FunkoTypes } from "../src/enums/FunkoTypes";
import { Genre } from "../src/enums/Genre";

describe("Pruebas de Funko", () => {
    describe("Pruebas del constructor", () => {
        test("", () => {
            expect(() => new Funko(0, "Nombre", "Descripción", FunkoTypes.Pop, Genre.Animation, "Franquicia", 1, false, "", 10)).toThrowError("El ID tiene que ser positivo.");
        });
        
        test("", () => {
            expect(() => new Funko(1, "", "Descripción", FunkoTypes.Pop, Genre.Animation, "Franquicia", 1, false, "", 10)).toThrowError("El nombre no puede estar vacío.");
        });

        test("", () => {
            expect(() => new Funko(1, "Nombre", "", FunkoTypes.Pop, Genre.Animation, "Franquicia", 1, false, "", 10)).toThrowError("La descripción no puede estar vacía.");
        });

        test("", () => {
            expect(() => new Funko(1, "Nombre", "Descripción", FunkoTypes.Pop, Genre.Animation, "", 1, false, "", 10)).toThrowError("El Funko debe de pertenecer a alguna franquicia.");
        });

        test("", () => {
            expect(() => new Funko(1, "Nombre", "Descripción", FunkoTypes.Pop, Genre.Animation, "Franquicia", 0, false, "", 10)).toThrowError("El número del Funko debe de ser positivo.");
        });

        test("", () => {
            expect(() => new Funko(1, "Nombre", "Descripción", FunkoTypes.Pop, Genre.Animation, "Franquicia", 1, false, "", 0)).toThrowError("El precio tiene que ser positivo.");
        });
    });

    const funko: Funko = new Funko(1, "Sonic", "Figura de Sonic", FunkoTypes.Pop, Genre.Videogames, "Sonic The Hedgehog", 1, false, "", 10);

    describe("Pruebas de los getter", () => {
        test("", () => {
            expect(funko.id).toStrictEqual(1);
        });
        
        test("", () => {
            expect(funko.name).toStrictEqual("Sonic");
        });

        test("", () => {
            expect(funko.description).toStrictEqual("Figura de Sonic");
        });

        test("", () => {
            expect(funko.type).toStrictEqual(FunkoTypes.Pop);
        });

        test("", () => {
            expect(funko.genre).toStrictEqual(Genre.Videogames);
        });

        test("", () => {
            expect(funko.franchise).toStrictEqual("Sonic The Hedgehog");
        });

        test("", () => {
            expect(funko.number).toStrictEqual(1);
        });

        test("", () => {
            expect(funko.exclusive).toStrictEqual(false);
        });

        test("", () => {
            expect(funko.properties).toStrictEqual("");
        });

        test("", () => {
            expect(funko.price).toStrictEqual(10);
        });
    });

    describe("Pruebas de los setter", () => {
        describe("Pruebas fallidas", () => {
            test("", () => {
                expect(() => funko.name = "").toThrowError("El nombre no puede estar vacío.");
            });
    
            test("", () => {
                expect(() => funko.description = "").toThrowError("La descripción no puede estar vacía.");
            });
    
            test("", () => {
                expect(() => funko.franchise = "").toThrowError("El Funko debe de pertenecer a alguna franquicia.");
            });
    
            test("", () => {
                expect(() => funko.number = 0).toThrowError("El número del Funko debe de ser positivo.");
            });
    
            test("", () => {
                expect(() => funko.price = 0).toThrowError("El precio tiene que ser positivo.");
            });
        });

        describe("Pruebas bien", () => {
            test("", () => {
                funko.name = "Tails";
                expect(funko.name).toStrictEqual("Tails");
            });
    
            test("", () => {
                funko.description = "Figura de Miles 'Tails' Prower"
                expect(funko.description).toStrictEqual("Figura de Miles 'Tails' Prower");
            });
    
            test("", () => {
                funko.type = FunkoTypes.PopRides
                expect(funko.type).toStrictEqual(FunkoTypes.PopRides);
            });
    
            test("", () => {
                funko.genre = Genre.Animation;
                expect(funko.genre).toStrictEqual(Genre.Animation);
            });
    
            test("", () => {
                funko.franchise = "Sonic Prime"
                expect(funko.franchise).toStrictEqual("Sonic Prime");
            });
    
            test("", () => {
                funko.number = 2
                expect(funko.number).toStrictEqual(2);
            });
    
            test("", () => {
                funko.exclusive = true;
                expect(funko.exclusive).toStrictEqual(true);
            });
    
            test("", () => {
                funko.properties = "Brilla en la oscuridad"
                expect(funko.properties).toStrictEqual("Brilla en la oscuridad");
            });
    
            test("", () => {
                funko.price = 20;
                expect(funko.price).toStrictEqual(20);
            });
        });
    });
});