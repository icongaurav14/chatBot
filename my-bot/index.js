/*
  CONGRATULATIONS on creating your first Botpress bot!

  This is the programmatic entry point of your bot.
  Your bot's logic resides here.
  
  Here's the next steps for you:
  1. Read this file to understand how this simple bot works
  2. Read the `content.yml` file to understand how messages are sent
  3. Install a connector module (Facebook Messenger and/or Slack)
  4. Customize your bot!

  Happy bot building!

  The Botpress Team
  ----
  Getting Started (Youtube Video): https://www.youtube.com/watch?v=HTpUmDz9kRY
  Documentation: https://botpress.io/docs
  Our Slack Community: https://slack.botpress.io
*/
//var Client = require('node-rest-client').Client;
 var request = require('request')
 

module.exports = function(bp) {
  // Listens for a first message (this is a Regex)
  // GET_STARTED is the first message you get on Facebook Messenger
  bp.hear(/GET_STARTED|hello|hi|test|hey|holla/i, (event, next) => {
    // See the file `content.yml` to see the block
    console.log("here---------------------------------------------------")
    var username = 'Administrator'
    var password = 'manage'
    var options = {
      url: 'http://localhost:5555/rest/ChatBot/Services/chatBotService/234/234?request=12',
      auth: {
        user: username,
        password: password
      },
       headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        
    }
    }

    request(options, function (err, res, body) {
      if (err) {
        console.log("Error Occured-----------------------------------------------------" +err)
        return
      }
      
      console.log('headers-------------------------------------------------------------', res.headers)
      console.log('status code', res.statusCode)
      //console.log('status code', res)
      var d = JSON.parse(body)
      console.log(body)
      console.log("Response" + d.response)
      //event.reply('#welcome') 
      event.reply('#welcome', {
      // You can pass data to the UMM bloc!
      data: d.response
    })
    })
//event.reply('#welcome')
 

    //bp.messenger.sendText(event.user.id, event.text)
  })

 
  // You can also pass a matcher object to better filter events
  bp.hear({
    type: /message|text/i,
    text: /exit|bye|goodbye|quit|done|leave|stop/i
  }, (event, next) => {
    event.reply('#goodbye', {
      // You can pass data to the UMM bloc!
      reason: 'unknown'
    })
  })
}
