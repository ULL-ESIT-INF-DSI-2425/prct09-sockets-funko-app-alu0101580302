import net from 'net';
import chalk from 'chalk';

const client = net.connect({port: 60300});

let args: string[] = [];
for (let i: number = 2; i < process.argv.length; i++) {
    args.push(process.argv[i]);
}
console.log(args);

const message = args.join(',');

client.write(JSON.stringify({ type: 'command', command: args }) + 'end');

let wholeData = '';
client.on('data', (chunk) => {
    wholeData += chunk;

    if (wholeData.endsWith('end')) {
        let message = JSON.parse(wholeData.substring(0, wholeData.length-3));
        client.emit('received', message);
    }
});

client.on('received', (data) => {
    if (data.success) {
        console.log(chalk.green(data.message));
    } else {
        console.log(chalk.red(data.message));
    }
    
    client.end();
})

client.on('end', () => {
    client.end();
});