import { EventEmitter } from 'events';

export class MessageEventEmitterClient extends EventEmitter {
  constructor(connection: EventEmitter, message: string) {
    super();
    this.emit('message', JSON.parse(message));
  }
}