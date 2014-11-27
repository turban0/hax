/**
 * Created by turban on 2014-11-18.
 */
var _ = require('underscore');
var uuid = require('uuid');

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
        var id = uuid.v4();
        playersList.push({
            id: id,
            nick: nick,
            role: 'spect',
            pos: { x: 0, y: 0 },
            v: { x: 0, y: 0 },
            a: { x: 0, y: 0 },
            input: { x: 0, y: 0}
        });
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
            selectedPlayer.pos.x = positionX;
            selectedPlayer.pos.y = positionY;
            selectedPlayer.v.x = vX;
            selectedPlayer.v.y = vY;
        } else {
            return false;
        }
    },
    getPlayers: function(role){
        var ret;
        if (role){
            //return deepCopy(_.filter(playersList, function(player){return player.role === role}));
            ret = _.filter(playersList, function(player){return player.role === role});
        } else {
            //return deepCopy(playersList);
            ret = playersList;
        }
        return ret;
    },
    removePlayer: function(id){
        if(_.findWhere(playersList, {id: id})){
            return !!(playersList = _.filter(playersList, function(player){return player.id === id}));
        } else {
            return false;
        }
    }
};

