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

新規でsetting.jsを作成し、適切なAccess Token、bot iconのurlを追加する

``` 新規でsetting.js
module.exports = {
	bot_icon: "XXXXXXXXXXXXXXX",
	accsess_token: "XXXXXXXXXXXXXXX"
};
```

```
node index.js
```

## コマンドについて

- restart  
サーバ側でreboot実行がされるのでlinux系は要systemdのserviceを変更すること
```
# systemd記述例
(cd [robohon_slack_botのディレクトリまでのフルパス] && [nodeコマンドのフルパス] index.js) &

```

## 使用ライブラリ

[Botkit](https://github.com/howdyai/botkit)  

