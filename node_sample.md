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
$sudo npm install
```
npm install すると依存モジュールがローカルにインストールされる。

一度起動してみる
```
$ npm test
```
http://localhost:12345/


### socket.ioを使う
#### socket.io
 - WebSocketなどリアルタイム通信を簡単に行うためのライブラリ

### 同時閲覧者数表示
#### サーバ側
./bin/www
```javascript
#!/usr/bin/env node
var debug = require('debug')('count_sample');
var app = require('../app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

var io = require("socket.io").listen(server);
var count = 0;

io.sockets.on("connection", function(socket) {
    // コネクションが来たら カウント+1
    count++;
    console.log("count:" + count);

    // 全体にcountを送る
    io.sockets.emit("count", count);


    socket.on("disconnect", function() {
        // 接続が切れたのでカウント-1
        count--;
        console.log("count:" + count);
        // 全体にcountを送る
        io.sockets.emit("count", count);
    });
});
```
#### クライアント側
./views/index.ejs
```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      var socket = new io.connect();

      socket.on("count", function(data) {
        $("#count").html(data);
      });
    </script>
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
    <p>現在の閲覧者数<span id="count"></span>人</p>
  </body>
</html>
```
### 起動
```sh
$ npm test
```
http://localhost:12345/


###チャット
#### サーバ側
./bin/www
```javasript
#!/usr/bin/env node
var debug = require('debug')('count_sample');
var app = require('../app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

var io = require("socket.io").listen(server);
var count = 0;

io.sockets.on("connection", function(socket) {
    // コネクションが来たら カウント+1
    count++;
    console.log("count:" + count);

    // 全体にcountを送る
    io.sockets.emit("count", count);

    socket.on("chat", function(data) {
        console.log(data);
        io.sockets.emit("msg", data);
    });

    socket.on("disconnect", function() {
        // 接続が切れたのでカウント-1
        count--;
        console.log("count:" + count);
        // 全体にcountを送る
        io.sockets.emit("count", count);
    });
});
```
 - io.socket.emit (全員に送信)
 - socket.emit (このソケットに送信)
 - socket.broadcast.emit (このソケット以外の全員に送信)


#### クライアント側
./views/index.ejs
```javascript
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      var socket = new io.connect();

      socket.on("count", function(data) {
        $("#count").html(data);
      });

      socket.on("msg", function(data) {
        console.log(data);
        $("#chat").append("<li>" + data.text + "</li>");
      });

      $(function() {
        $("#send").on("click", function() {
            var text = $("#text").val();
            socket.emit("chat",{"text": text});
        });
      });
    </script>
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
    <p>現在の閲覧者数<span id="count"></span>人</p>
    <p><input id="send" type="button" value="送信"></p>
    <p><input id="text" type="text"></p>
    <div id="chat">

    </div>
  </body>
</html>
```
#### 起動
```sh
$ npm test
```
http://localhost:12345/

