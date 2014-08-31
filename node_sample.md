# Node.js

# インストール
```sh
$ sudo yum install nodejs npm --enablerepo=epel
```

# HTTPサーバを作る
```javascript
var http = require("http");

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end("Hello World\n");
}).listen(12345);
```

コードをちょっとだけ変えてみる（簡易アクセスカウンタ風）
```javascript
var http = require("http");

var count = 0;
http.createServer(function(req, res) {
    count++;
    console.log(req.url + " " + count);
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end("Hello World\n" + count);
}).listen(12345);
```
 - シングルスレッド
 - グローバル変数が使える

# Express + Socket.io を使ったチャットの作成
## Expressフレームワークを使う
```sh
$ sudo npm install express -g
$ sudo npm install express-generator -g
```
expressコマンドを使うためにグローバルにインストール
-g でグローバルインストール

## expressコマンドでひな形を作る
```sh
$ express sample_chat -e
```
$ express プロジェクト名
でひな形が作れます。
-e オプションはテンプレートエンジンに ejs を指定(デフォルトはJade)

```sh
$ cd sample_chat
$ vim package.json
```
```json
{
  "name": "sample_chat",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node ./bin/www",
    "test": "PORT=12345 node ./bin/www"
  },
  "dependencies": {
    "express": "~4.2.0",
    "static-favicon": "~1.0.0",
    "morgan": "~1.0.0",
    "cookie-parser": "~1.0.1",
    "body-parser": "~1.0.0",
    "debug": "~0.7.4",
    "ejs": "~0.8.5",
    "socket.io": "~1.0"
  }
}
```
package.jsonはこのプロジェクトのバージョン情報や依存パッケージを記述する。
今回はsocket.ioというモジュールを使うので追記している

```
npm install
```
npm install すると依存モジュールがローカルにインストールされる。

一度起動してみる
```
npm install
```
http://localhost:12345/


### socket.ioを使う
#### socket.io
 - WebSocketなどリアルタイム通信を簡単に行うためのライブラリ

### 同時閲覧者数表示
#### サーバ側
./bin/www
```javascript

```
