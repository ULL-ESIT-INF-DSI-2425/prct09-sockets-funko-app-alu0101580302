import net from 'net';

const client = net.connect({port: 60300});

let args: string[] = [];
for (let i: number = 2; i < process.argv.length; i++) {
    args.push(process.argv[i]);
}
console.log(args);

client.write(args.join(',') + '\n');

let wholeData = '';
client.on('data', (chunk) => {
    wholeData += chunk;

    if (wholeData.endsWith('\n')) {
        let message = wholeData.substring(0, wholeData.length-1);
        client.emit('received', message);
    }
});

client.on('received', () => {
    console.log(wholeData);
    client.end();
});