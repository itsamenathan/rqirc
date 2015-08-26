var util = require('util');
var log  = require('logule').init(module, 'alert.js');
module.exports = function(irc, redqueen) {
  irc.rqevent.on('alert', function(msg){
    log.info('RECEIVED MSG: %s %s', msg.reply, msg.text);
    var str = msg.text;

    // look for nolight
    var relight = /--nolight\s*/;
    var light = true;
    if (str.match(relight)) {
      str = str.replace(relight, '');
      light = false;
    }

    // look for nosound
    var resound = /--nosound\s*/;
    var sound = true;
    if (str.match(resound)) {
      str = str.replace(resound, '');
      sound = false;
    }

    var data = {text: str, light: light, sender: msg.nick, sound: sound};
    redqueen.send('command', 'bigsign', data);
    /* Pick a random deadpan delivery */
    deadpan = [
      "Diplomatic cable decrypted",
      "Field agent reporting in",
      "Oh look what the C.A.T. dragged in",
      "All hands bulletin",
      "Message in a bottle retrieved",
      "New TPS report coversheet",
      "Aperature Science policy #3942",
      "Doubleplusungood thoughtcrime"
    ];
    var delivery = deadpan[Math.floor( Math.random() * deadpan.length )];
    var reply = util.format('%s: %s [via %s]', delivery, str, msg.nick);
    irc.send(msg.reply, reply, false);
    log.info('SENDING MSG: %s: %s', msg.reply, reply);
  });
};
