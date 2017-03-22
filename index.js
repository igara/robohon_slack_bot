/* eslint-disable no-console */
const Botkit = require("botkit");
const token = require("./token.js");

const controller = Botkit.slackbot({
	debug: true
});
const hears = {
	help: "help",
	weather: "weather",
};

controller.spawn({
	token: token
}).startRTM();

controller.hears(hears.help, "direct_mention", function(bot, message) {
	console.log(message);
	const ask_help = function(response, convo) {
		console.log(response);
		convo.say("いま実装されているコマンド一覧だよ");
		Object.keys(hears).forEach(function(val) {
			convo.say(val);
		});
	};
	bot.startConversation(message, ask_help);
});

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
