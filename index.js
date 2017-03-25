/* eslint-disable no-console */
const Botkit = require("botkit");

/**
 * @const access_tokenやbot_log
 */
const setting = require("./setting.js");

/**
 * @const コマンド実行関数
 */
const child_process = require("child_process");
const git_pull_option = ["pull"];
const git_log_option = ["log", "-n", "5"];
const restart_option = [];
const syonet_pull_option = ["syonet_pull.sh"];
const syonet_log_option = ["syonet_log.sh"];

const controller = Botkit.slackbot({
	debug: true
});

/**
 * @const コマンド一蘭
 */
const hears = {
	help: "help",
	release: "release",
	commit_log: "commit_log",
	restart: "restart",
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
	token: setting.accsess_token
}).startRTM((err,bot,payload) => {
	// 初期処理
	if (err) {
		throw new Error("Could not connect to Slack");
	} else {
		bot.say({
			channel: "bot",
			text: "再起動したよ",
			username: "robohon",
			icon_url: setting.bot_icon
		});
	}
});

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
		const cli_exec = child_process.spawnSync("git", git_pull_option, {encoding: "utf-8"});
		convo.say("僕を最新版にするね");
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
 * @robohon release syonet.work を実行した時にロボホンbotを更新する
 */
controller.hears(hears.release + " " + release.syonet, "direct_mention",(bot, message) => {
	console.log(message);
	const ask_release = (response, convo) => {
		console.log(response);
		const cli_exec = child_process.spawnSync("sh", syonet_pull_option, {encoding: "utf-8"});
		convo.say("syonetを最新版にするね");
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
 * @robohon commit_log self を実行した時にログを教える
 */
controller.hears(hears.commit_log + " " + release.self, "direct_mention",(bot, message) => {
	console.log(message);
	const ask_commit_log = (response, convo) => {
		console.log(response);
		const cli_exec = child_process.spawnSync("sh", syonet_log_option, {encoding: "utf-8"});

		if (cli_exec.error) {
			convo.say("失敗したよ");
			convo.say("結果もおしえるね");
			convo.say(cli_exec.stderr);
		} else {
			convo.say("syonetのリリースのログを5件おしえるね");
			convo.say(cli_exec.stdout);
		}
	};
	bot.startConversation(message, ask_commit_log);
});

/**
 * @robohon commit_log syonet.work を実行した時にログを教える
 */
controller.hears(hears.commit_log + " " + release.syonet, "direct_mention",(bot, message) => {
	console.log(message);
	const ask_commit_log = (response, convo) => {
		console.log(response);
		const cli_exec = child_process.spawnSync("git", git_log_option, {encoding: "utf-8"});

		if (cli_exec.error) {
			convo.say("失敗したよ");
			convo.say("結果もおしえるね");
			convo.say(cli_exec.stderr);
		} else {
			convo.say("ぼくのリリースのログを5件おしえるね");
			convo.say(cli_exec.stdout);
		}
	};
	bot.startConversation(message, ask_commit_log);
});

/**
 * @robohon restart を実行した時にbotを再起動する
 */
controller.hears(hears.restart, "direct_mention",(bot, message) => {
	const ask = (response, convo) => {
		convo.ask("ほんとうに再起動してもいい？もし再起動するときはyesっていってね", function(response, convo) {
			console.log(response);
			if(response.text == "yes") {
				convo.say("わかった〜再起動するね");
				ask_restart(response, convo);
			} else {
				convo.say("再起動をキャンセルするね");
			}
			convo.next();
		});
	};
	const ask_restart = (response, convo) => {
		console.log(response);
		const cli_exec = child_process.spawnSync("reboot", restart_option, {encoding: "utf-8"});
		if (cli_exec.error) {
			console.log(cli_exec.stderr);
		} else {
			console.log("restart");
		}
	};
	bot.startConversation(message, ask);
});
