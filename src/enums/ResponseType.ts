import { Funko } from "../classes/Funko.js";

/**
 * Tipo ResponseType. Representa los tipos de respuestas al cliente
 */
export type ResponseType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    success: boolean;
    funkos?: Funko[];
}