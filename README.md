#### 八百長ルーレット

typescript+Viteの構成

Viteを使う場合下記コマンドで
以下のような検証ができます。

my-roulette-appのディレクトリで
```
npm run dev
```
→デバッグ実行

my-roulette-appのディレクトリで
```
npm run build
```
→リリース実行

my-roulette-appのディレクトリで
```
serve -s dist
```
もしくは、
```
npm run preview
```

dist下のローカル検証ができる
(プロダクションビルドの問題がないかを確認できる。)
