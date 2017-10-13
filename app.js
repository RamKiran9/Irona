/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    stateEndpoint: process.env.BotStateEndpoint,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('https://Irona.azurewebsites.net/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

// Create your bot with a function to receive messages from the user

var bot = new builder.UniversalBot(connector,[
   bot.on('conversationUpdate', function (message) {
   bot.send("Welcome to Virtual Onboarding Assistant");
   });
    //Ask User his/her name
    function (session) {
    builder.Prompts.text(session,"Hi, What's your name")
    },
    // First dialog with Bot
    function (session,results) {
    session.endDialog("Hi %s!, I'm still under development.", results.response )
     },
]);
// The dialog stack is cleared and this dialog is invoked when the user enters 'help'.
bot.dialog('help', function (session, args, next) {
session.endDialog("This is a bot whose objectives are not yet defined. <br/>Please say 'next' to continue");
})
.triggerAction({
matches: /^help$/i,
});
