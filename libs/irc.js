var util = require('util');
var log  = require('logule').init(module, 'irc');
var irc  = require('irc');

function Irc(cfg) {
  this.client = new irc.Client(cfg.server, cfg.nick, cfg.opts);
  this.colors = irc.colors;
}

Irc.prototype.send = function(channel, msg, actionable) {
  log.info('%s - %s', channel, msg);
  if ( actionable ){
    this.client.action(channel, this.colors.wrap('light_red',msg));
  }
  else {
    this.client.say(channel, this.colors.wrap('light_red',msg));
  }
};

Irc.prototype.debugSend = function(doc) {
  var msg = util.format('[%s]->[%s] : %j', doc.sender, doc.destination, doc.data);
  log.info(msg);
  this.client.say('##rqtest', msg);
};

// return constructor
module.exports = Irc;


