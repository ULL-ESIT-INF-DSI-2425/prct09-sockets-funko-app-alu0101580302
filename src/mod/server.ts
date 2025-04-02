import net from 'net';
import { spawn } from 'child_process';

net.createServer({allowHalfOpen: true}, (connection) => {
    console.log('A client has connected.');

    let wholeData = '';
    connection.on('data', (chunk) => {
        wholeData += chunk;

        if (wholeData.endsWith('\n')) {
            wholeData = wholeData.substring(0, wholeData.length-1);
            connection.emit('command', wholeData);
        }
    });

    connection.on('command', (data) => {
        const message = data.split(',');
        const command = message[0];
        let options = [];
        for (let i: number = 1; i < message.length; i++) {
            options.push(message[i]);
        }

        const action = spawn(command, options);
        let output: string = '';

        action.stdout.on('data', (piece) => {
            output += piece.toString();
        });
        action.stderr.on('data', (piece) => {
            output += piece.toString();
        });

        action.on('close', () => {
            connection.write(output + '\n');
            connection.end();
        })

        action.on('error', () => {
            connection.write(output + '\n');
        });
    });

    connection.on('close', () => {
        console.log('A client has disconnected.');
    });
}).listen(60300, () => {
    console.log('Waiting for clients to connect.');
  });