import net from 'net';
import { spawn } from 'child_process';

net.createServer({allowHalfOpen: true}, (connection) => {
    console.log('A client has connected.');

    let wholeData = '';
    connection.on('data', (chunk) => {
        wholeData += chunk;

        if (wholeData.endsWith('end')) {
            
            const completeData = JSON.parse(wholeData.substring(0, wholeData.length-3));
            
            connection.emit('command', completeData);
        }
    });

    connection.on('command', (data) => {
        
        const command = data.command[0];
        
        let options = [];
        for (let i: number = 1; i < data.command.length; i++) {
            options.push(data.command[i]);
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
            connection.write(JSON.stringify({success: true, message: output}) + 'end');
            connection.end()
        })

        action.on('error', () => {
            connection.write(JSON.stringify({success: false, message: output}) + 'end');
            connection.end()
        });

        
    });

    connection.on('close', () => {
        console.log('A client has disconnected.');
    });
}).listen(60300, () => {
    console.log('Waiting for clients to connect.');
  });