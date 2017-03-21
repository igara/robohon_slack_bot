var Botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: true
});

controller.spawn({
    token: "xoxb-XXXXXXXXXXXXXXXXXXXXXXXX"
}).startRTM();

controller.hears("weather", "direct_mention", function(bot,message) {
    console.log(message);
    askWeather = function(response, convo) {
        console.log(response);
        convo.ask("明日は雨です。車で出かけられますか？", function(response, convo) {
            console.log(response);
            convo.say("承知しました。");
            if(response.text == 'yes'){
                askCar(response, convo);
            }
            convo.next();
        });
    };

    askCar = function(response, convo) {
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
