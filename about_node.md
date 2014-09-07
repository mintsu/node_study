# Node.js 勉強用

# Node.jsとは？
 - スケーラビリティに優れたWebアプリケーションを簡単に作成し、それを実行するための*サーバーサイドのプラットフォーム*
 - 作者：Ryan Dahl

# Node.jsの特徴
 - JavaScriptで記述
 - GoogleのV8エンジンを搭載
 - *シングルスレッド+イベントループモデル*
 - *ノンブロッキングI/O*

# Node.jsの背景的なところ
## Node.jsの目的
 - Node's goal is to provide an easy way to build scalable network programs. (http://nodejs.jp/nodejs.org_ja/about/)
 - Nodeの目的は、スケーラブルなネットワークプログラムを作成する簡単な方法を提供すること

## スケーリングのアプローチ
### スレッドモデル
 - マルチスレッドで並行処理
 - 1リクエストに対して1スレッドを生成して処理
 - Apache(worker MPM)

### イベントループ
 - シングルスレッドで並行処理
 - イベントの発生を監視
 - イベントが発生したら、登録されているイベントハンドラを呼び出す
 - Node.js, Nginx

## スレッドモデルの問題点
### C10K問題
 - C10K = クライアント10000
 - ハードウェアの性能にかかわらず、ユーザからの同時アクセス数が増えるにつれて、サーバーがリクエストをさばけなくなる問題

#### 原因
 - 1プロセス1コネクション、1スレッド1コネクションとというモデルでは同時接続数が増えるとその分プロセス数,スレッド数が増大
 - コンテキストスイッチのコスト
 - メモリ消費増大
![c10kprobrem](https://raw.githubusercontent.com/mintsu/node_study/master/c10kprobrem.jpg)


## イベントループモデルの問題点
 - イベントループの処理に重い処理や時間のかかる処理が入ると全体に影響する
 - 時間のかかる処理
  - 重い計算処理等
  - *I/O*

## I/Oのレイテンシ
|         | CPUサイクル        |  距離換算 | 時間換算 |
|:-------:|:-----------------:|:--------:|:-------:|
|L1       | 3 cycles          | 3メートル  | 3秒     |
|L2       | 14 cycles         | 14メートル | 14秒    |
|RAM      | 250 cycles        |250メートル | 4分10秒 |
|DISK     | 41,000,000 cycles |地球1周    | 1.3年   |
|NETWORK  | 240,000,000 cycles|地球6周    | 7.6年   |

## I/Oが遅い問題の解決策
 - *ノンブロッキングI/O*
![c10kprobrem](https://raw.githubusercontent.com/mintsu/node_study/master/non-blockingio.jpg)

## NodeがJavaScriptを採用した理由
 - Nodeはイベントループ、ノンブロッキングI/Oを利用して効率的でスケーラブルなプラットフォームを作りたかった。
 - これにマッチしていたものがJavaScript
  - もともとシングルスレッド+イベントループ
  - ECMAScriptに標準入出力の仕様がなかった
   - 既存のI/Oのライブラリが存在しないので、新たにノンブロッキングの世界を作り上げるのに適していた

# Node.jsの使われている場所
## Node.jsに適しているもの
 - リアルタイムなアプリケーション、コラボレーションツール
 - WebSocket, Cometなど同時接続数が多くなるアプリケーション
 - WebAPIなど処理は少ないがアクセスが多いもの

## Node.jsの使われているところ
 - Amebaピグ(ピグライフ)　http://www.slideshare.net/snamura/nodejs-9956558
 - Grant, Gulpなどのビルド・開発ツール




# 参考
 - http://nodejs.jp/
 - http://nodejs.jp/nodejs.org_ja/about/
 - 【書籍】Node.js入門
 - 【書籍】はじめてのNode.js
