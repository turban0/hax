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


//deep copy is fucked up totally, I've commented usages out
/*
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
*/

var playersList = [];

module.exports = {
    newPlayer: function(nick){
        var id = idGenerator.get();
        playersList.push({id: id, nick: nick, role: 'spect', positionX: 0, positionY: 0, aX: 0, aY: 0});
        return id;
    },
    setPlayerTeam: function(id, role){
        var player = _.findWhere(playersList, {id: id});
        if (player){
            return !!(player.role = role);
        } else {
            return false;
        }
    },
    getPlayer: function(id){
        var selectedPlayer = _.findWhere(playersList, {id: id});
        if(selectedPlayer){
            //return deepCopy(selectedPlayer);
            return selectedPlayer;
        } else {
            return false;
        }
    },
    updatePlayer: function(id, positionX, positionY, vX, vY) {
        var selectedPlayer = _.findWhere(playersList, {id: id});
        if(selectedPlayer){
            selectedPlayer.positionX = positionX;
            selectedPlayer.positionY = positionY;
            selectedPlayer.vX = vX;
            selectedPlayer.vY = vY;
        } else {
            return false;
        }
    },
    getPlayers: function(role){
        if (role){
            //return deepCopy(_.filter(playersList, function(player){return player.role === role}));
            return _.filter(playersList, function(player){return player.role === role});
        } else {
            //return deepCopy(playersList);
            return playersList;
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

