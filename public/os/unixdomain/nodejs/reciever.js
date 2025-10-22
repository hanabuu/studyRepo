const net = require('net');
const fs = require('fs');

// サーバーを設定
const server = net.createServer((connection) => {
  console.log('connected.');
  connection.on('close', () => {
    console.log('disconnected.');
  });
  connection.on('data', (data) => {
    console.log(data.toString());
  });
  connection.on('error', (err) => {
    console.error(err.message);
  });
  connection.write('unix domain socket');
  connection.end();
});

// ソケットファイルを削除（存在するとlistenできない）
try {
  fs.unlinkSync('/app/src/unixdomain/unix.sock');
} catch (error) {}

// UNIXドメインソケットでlistenする
server.listen('/app/src/unixdomain/unix.sock');