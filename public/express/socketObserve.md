# ソケット監視

## AIによる回答

Node.jsでソケットを監視するクラスを作成するには、EventEmitterを継承し、ソケットのライフサイクルで発生するイベント（接続、切断、データ受信、エラーなど）を管理するのが一般的な方法です。これにより、ソケットの管理ロジックをカプセル化し、再利用可能なコンポーネントを作成できます。 
以下に、WebSocketとTCPソケットの監視クラスの例をそれぞれ示します。

### WebSocketを監視するクラス（wsライブラリを使用）
この例では、wsライブラリを使ってWebSocketサーバーを立て、接続された各ソケットを監視するクラスを作成します。

``` javascript
// src/WebSocketMonitor.js

const EventEmitter = require('events');

class WebSocketMonitor extends EventEmitter {
  constructor(ws) {
    super();
    this.ws = ws;
    this.id = this.generateId(); // ソケットごとに一意のIDを割り当てる
    this.bindEvents();

    console.log(`[${this.id}] 新しいWebSocket接続が監視を開始しました。`);
  }

  // ソケットのイベントを監視
  bindEvents() {
    this.ws.on('message', (message) => {
      console.log(`[${this.id}] データを受信: ${message}`);
      this.emit('data', message);
    });

    this.ws.on('close', (code, reason) => {
      console.log(`[${this.id}] WebSocketが切断されました。コード: ${code}, 理由: ${reason}`);
      this.emit('close', { code, reason });
    });

    this.ws.on('error', (error) => {
      console.error(`[${this.id}] WebSocketエラー:`, error);
      this.emit('error', error);
    });
  }

  // ソケットにデータを送信するメソッド
  send(data) {
    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.send(data);
    }
  }

  // 切断するメソッド
  close(code = 1000, reason = '正常な切断') {
    this.ws.close(code, reason);
  }
  
  // 一意のIDを生成（例）
  generateId() {
    return Math.random().toString(36).substring(2, 9);
  }
}

module.exports = WebSocketMonitor;

// サーバー側の使用例
const WebSocket = require('ws');
const WebSocketMonitor = require('./WebSocketMonitor');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  const monitor = new WebSocketMonitor(ws);

  monitor.on('data', (message) => {
    // データ受信時の処理
    monitor.send(`サーバーから: 受信したデータは ${message} です。`);
  });

  monitor.on('close', (info) => {
    // 接続が切断されたときの処理
    console.log(`監視対象のソケットが切断されました。`);
  });

  monitor.on('error', (err) => {
    // エラー発生時の処理
    console.error(`監視対象のソケットでエラーが発生しました。`, err);
  });
});

console.log('WebSocketサーバーがポート8080で起動しました。');
```

### TCPソケットを監視するクラス（netモジュールを使用）
この例では、netモジュールを使ってTCPサーバーを立て、接続された各ソケットを監視するクラスを作成します。

``` javascript
// src/TcpSocketMonitor.js

const EventEmitter = require('events');

class TcpSocketMonitor extends EventEmitter {
  constructor(socket) {
    super();
    this.socket = socket;
    this.id = `${socket.remoteAddress}:${socket.remotePort}`;
    this.bindEvents();

    console.log(`[${this.id}] 新しいTCP接続が監視を開始しました。`);
  }

  bindEvents() {
    this.socket.on('data', (data) => {
      console.log(`[${this.id}] データを受信: ${data.toString()}`);
      this.emit('data', data);
    });

    this.socket.on('end', () => {
      console.log(`[${this.id}] TCPソケットが切断されました。`);
      this.emit('close');
    });

    this.socket.on('error', (error) => {
      console.error(`[${this.id}] TCPソケットエラー:`, error);
      this.emit('error', error);
    });
  }

  // ソケットにデータを送信するメソッド
  send(data) {
    this.socket.write(data);
  }

  // 切断するメソッド
  close() {
    this.socket.end();
  }
}

module.exports = TcpSocketMonitor;

// サーバー側の使用例
const net = require('net');
const TcpSocketMonitor = require('./TcpSocketMonitor');

const server = net.createServer((socket) => {
  const monitor = new TcpSocketMonitor(socket);

  monitor.on('data', (data) => {
    // データ受信時の処理
    monitor.send(`サーバーから: 受信したデータは ${data.toString()} です。`);
  });

  monitor.on('close', () => {
    // 接続が切断されたときの処理
    console.log('監視対象のTCPソケットが切断されました。');
  });

  monitor.on('error', (err) => {
    // エラー発生時の処理
    console.error('監視対象のTCPソケットでエラーが発生しました。', err);
  });
});

server.listen(3000, () => {
  console.log('TCPサーバーがポート3000で起動しました。');
});
```

### クラス化するメリット
- 関心事の分離: ソケットのイベント処理ロジックを、サーバー本体のロジックから分離できます。
- 再利用性: 監視クラスを他のアプリケーションでも再利用できます。
- テストのしやすさ: ソケットのイベント処理を個別にテストできます。
- 拡張性: 新しいロギング機能やカスタムイベント処理を簡単に追加できます。
