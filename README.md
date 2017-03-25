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
	bot_icon: "https://s3-us-west-2.amazonaws.com/slack-files2/bot_icons/2017-03-21/157374660738_48.png",
	accsess_token: "xoxb-158052459063-2Z29mAVCzi0hcBBABKR9r1B1"
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

