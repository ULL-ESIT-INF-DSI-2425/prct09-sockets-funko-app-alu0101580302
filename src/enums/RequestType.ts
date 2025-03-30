import { Funko } from "../classes/Funko.js"

/**
 * Tipo RequestType. Representa los distintos tipos de peticiones al servidor
 */
export type RequestType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list',
    funkos?: Funko[]
}