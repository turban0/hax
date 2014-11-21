/**
 * Created by turban on 2014-11-18.
 */
var _ = require('underscore');
var idGenerator = new function(){
    var self = this;
    self.id = 0;
    this.get = function(){
        self.id++;
        return "p" + self.id;
    }
};

function deepCopy(obj) {
    var out, i;
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        out = [];
        var len = obj.length;
        for ( i = 0; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
}

var playersList = [];

module.exports = {
    newPlayer: function(nick){
        playersList.push({id: idGenerator.get(), nick: nick, role: 'spect'});
    },
    movePlayer: function(id, role){
        var player = _.findWhere(playersList, {id: id});
        if (player){
            return !!(player.role = role);
        } else {
            return false;
        }
    },
    getPlayers: function(role){
        if (role){
            return deepCopy(_.filter(playersList, function(player){return player.role === role}));
        } else {
            return deepCopy(_.clone(playersList));
        }
    },
    removePlayer: function(id){
        if(_.findWhere(playersList, {id: id})){
            return !!(playersList = _.filter(playersList, function(player){return player.id === id}));
        } else {
            return false;
        }
    }
};

