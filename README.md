#### 八百長ルーレット

typescript+Viteの構成

Viteを使う場合下記コマンドで
以下のような検証ができます。

.
└── yaocho/
    └── my-roulette-app

```
npm run dev
```
→デバッグ実行

```
npm run build
```
→リリース実行

```
serve -s dist
```
もしくは、
```
npm run preview
```

dist下のローカル検証ができる
(プロダクションビルドの問題がないかを確認できる。)

サーバーにアップロードする前に、
index.htmlのassetのパスを調整する。
