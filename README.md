# robohon_slack_bot

## 導入

```
git clone https://github.com/igara/robohon_slack_bot.git
cd robohon_slack_bot
npm install
```

下記のURLからbot名を入力しAdd bot integrationする
https://my.slack.com/services/new/bot  
するとbot_userだけでなくAccess Tokenも作成される  

閲覧中のchannelで
```
/invite @<my bot>
```
とするとchannelにbot_userがやってくる

## bot起動

新規でtoken.jsを作成し、適切なAccess Tokenを追加する
``` token.js
module.exports = "XXXXXXXX";
```


```
node index.js
```

## コマンドについて

- restart  
サーバ側でreboot実行がされるのでlinux系は要systemdのserviceを変更すること

## 使用ライブラリ

[Botkit](https://github.com/howdyai/botkit)  

