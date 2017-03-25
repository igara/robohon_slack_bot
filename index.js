/* eslint-disable no-console */
const Botkit = require("botkit");

/**
 * @const アクセストークンを取得
 */
const token = require("./token.js");

/**
 * @const コマンド実行関数
 */
const child_process = require("child_process");
const args = ["pull"];

const controller = Botkit.slackbot({
	debug: true
});

/**
 * @const コマンド一蘭
 */
const hears = {
	help: "help",
	release: "release",
	weather: "weather",
};

const path = require("path");
const dir = path.resolve("");

/**
 * @const リリースするアプリケーションの種類
 */
const release = {
	self: "self",
	syonet: "syonet.work"
};

controller.spawn({
	token: token
}).startRTM();

/**
 * @robohon help を実行した時にコマンド一覧を教えてくれる
 */
controller.hears(hears.help, "direct_mention",(bot, message) => {
	console.log(message);
	const ask_help = (response, convo) => {
		console.log(response);
		convo.say("いま実装されているコマンド一覧だよ");
		Object.keys(hears).forEach((val) => {
			convo.say(val);
		});
	};
	bot.startConversation(message, ask_help);
});

/**
 * @robohon release self を実行した時にロボホンbotを更新する
 */
controller.hears(hears.release + " " + release.self, "direct_mention",(bot, message) => {
	console.log(message);
	const ask_release = (response, convo) => {
		console.log(response);
		convo.say("僕を最新版にするね");
		const cli_exec = child_process.spawnSync("git", args, {encoding: "utf-8"});

		if (cli_exec.error) {
			convo.say("失敗したよ");
			convo.say("結果もおしえるね");
			convo.say(cli_exec.stderr);
		} else {
			convo.say("成功したよ");
			convo.say("結果もおしえるね");
			convo.say(cli_exec.stdout);
		}
	};
	bot.startConversation(message, ask_release);
});

/**
 * @robohon weather を実行した時にサンプルのお答えをする
 */
controller.hears(hears.weather, "direct_mention", function(bot,message) {
	console.log(message);
	const askWeather = function(response, convo) {
		console.log(response);
		convo.ask("明日は雨です。車で出かけられますか？", function(response, convo) {
			console.log(response);
			convo.say("承知しました。");
			if(response.text == "yes"){
				askCar(response, convo);
			}
			convo.next();
		});
	};

	const askCar = function(response, convo) {
		convo.ask("折りたたみ傘が必要ですか？", function(response, convo) {
			if(response.text == "yes") {
				convo.say("承知いたしました。ご用意いたします。");
			} else {
				convo.say("お気をつけてください。");
			}
			convo.next();
		});
	};

	bot.startConversation(message, askWeather);
});
