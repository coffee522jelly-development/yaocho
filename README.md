# 八百長ルーレット(Typescript+Vite(ビルドツール))

### ローカルファイルの検証
```
.
└── yaocho/
    └── my-roulette-app
```

```
npm run dev
```
→デバッグ実行(ローカルサーバーでの確認)

```
npm run build
```
→リリース用ファイルの組み立て

### dist下のリリース用ファイルの検証
```
.
└── yaocho/
    └── my-roulette-app
        └── dist
```

```
serve -s dist
```

```
npm run preview
```

サーバーにアップロードする前に、
index.htmlのassetのパスを変更する。
