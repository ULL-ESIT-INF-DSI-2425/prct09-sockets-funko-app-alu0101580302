import { FunkoTypes } from "../enums/FunkoTypes.js";
import { Genre } from "../enums/Genre.js";

/**
 * Clase Funko. Representa a una figura Funko
 */
export class Funko {
    private static _idCount = 1; // Cuenta para cada Funko tenga su propio ID
    
    /**
     * Constructor de Funko
     * @param _name - Nombre del Funko
     * @param _description - Descripción del Funko
     * @param _type - Tipo del Funko
     * @param _genre - Género del medio de origen del Funko
     * @param _franchise - Franquicia del personaje del Funko
     * @param _number - Número del Funko
     * @param _exclusive - Exlusividad del Funko
     * @param _properties - Características especiales del Funko
     * @param _price - Precio del Funko
     */
    constructor(
        private readonly _id: number,
        private _name: string, 
        private _description: string, 
        private _type: FunkoTypes, 
        private _genre: Genre,
        private _franchise: string,
        private _number: number,
        private _exclusive: boolean,
        private _properties: string,
        private _price: number
    ) {
        if (_id <= 0) {
            throw new Error("El ID tiene que ser positivo.");
        } else if (_name === "") {
            throw new Error("El nombre no puede estar vacío.");
        } else if (_description === "") {
            throw new Error("La descripción no puede estar vacía.");
        } else if (_franchise === "") {
            throw new Error("El Funko debe de pertenecer a alguna franquicia.");
        } else if (_number <= 0) {
            throw new Error("El número del Funko debe de ser positivo.");
        } else if (_price <= 0) {
            throw new Error("El precio tiene que ser positivo.");
        }
    }

    /**
     * Getter de id
     */
    get id() {
        return this._id;
    }

    /**
     * Getter de name
     */
    get name() {
        return this._name;
    }

    /**
     * Setter de name
     */
    set name(name: string) {
        if (name === "") {
            throw new Error("El nombre no puede estar vacío.");
        }

        this._name = name;
    }

    /**
     * Getter de description
     */
    get description() {
        return this._description;
    }

    /**
     * Setter de description
     */
    set description(desc: string) {
        if (desc === "") {
            throw new Error("La descripción no puede estar vacía.");
        }

        this._description = desc;
    }

    /**
     * Getter de type
     */
    get type() {
        return this._type;
    }

    /**
     * Setter de type
     */
    set type(type: FunkoTypes) {
        this._type = type;
    }

    /**
     * Getter de genre
     */
    get genre() {
        return this._genre;
    }

    /**
     * Setter de genre
     */
    set genre(genre: Genre) {
        this._genre = genre;
    }

    /**
     * Getter de franchise
     */
    get franchise() {
        return this._franchise;
    }

    /**
     * Setter de franchise
     */
    set franchise(frnch: string) {
        if (frnch === "") {
            throw new Error("El Funko debe de pertenecer a alguna franquicia.");
        }

        this._franchise = frnch;
    }

    /**
     * Getter de number
     */
    get number() {
        return this._number;
    }

    /**
     * Setter de number
     */
    set number(num: number) {
        if (num <= 0) {
            throw new Error("El número del Funko debe de ser positivo.");
        }

        this._number = num;
    }

    /**
     * Getter de exclusive
     */
    get exclusive() {
        return this._exclusive;
    }

    /**
     * Setter de exclusive
     */
    set exclusive(excl: boolean) {
        this._exclusive = excl;
    }

    /**
     * Getter de properties
     */
    get properties() {
        return this._properties;
    }

    /**
     * Setter de properties
     */
    set properties(prop: string) {
        this._properties = prop;
    }

    /**
     * Getter de price
     */
    get price() {
        return this._price;
    }

    /**
     * Setter de price
     */
    set price(price: number) {
        if (price <= 0) {
            throw new Error("El precio tiene que ser positivo.");
        }

        this._price = price;
    }
}