/**
 * Created by turban on 2014-11-18.
 */
var _ = require('underscore');
var uuid = require('uuid');
var vector = require('../models/utils/vector');

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
            pos: vector.from(0, 0),
            v: vector.from(0, 0),
            a: vector.from(0, 0),
            input: vector.from(0, 0)
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
            selectedPlayer.pos = vector.from(positionX, positionY);
            selectedPlayer.v = vector.from(vX, vY);
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

