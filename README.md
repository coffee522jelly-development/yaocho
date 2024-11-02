#### 八百長ルーレット

typescript+Viteの構成

Viteを使う場合下記コマンドで
以下のような検証ができます。

```
yaocho/my-roulette-app/

npm run dev
```
→デバッグ実行

```
yaocho/my-roulette-app/

npm run build
```
→リリース実行

```
yaocho/my-roulette-app/

serve -s dist
```
もしくは、
```
yaocho/my-roulette-app/

npm run preview
```

dist下のローカル検証ができる
(プロダクションビルドの問題がないかを確認できる。)

サーバーにアップロードする前に、
index.htmlのassetのパスを調整する。
