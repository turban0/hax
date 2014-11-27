var players = require('../models/players');

var params = {
    acc: 360,
    damp: 0.96
};

module.exports = {
    update: function(dt) {
        var allPlayers = players.getPlayers();

        allPlayers.forEach(function(player) {
            var prevA = player.a;
            var prevV = player.v;

            player.pos = { x: player.pos.x+prevV.x*dt, y: player.pos.y+prevV.y*dt };

            var input = normalizeVector(player.input);
            player.a = { x: input.x * params.acc, y: input.y * params.acc};
            var dampCoeff = Math.pow(params.damp, 60*dt);
            player.v = { x: player.v.x*dampCoeff, y: player.v.y*dampCoeff};
            player.v = { x: player.v.x+prevA.x*dt, y: player.v.y+prevA.y*dt};
        });
    },

    createPlayer: function() {
        var playerId = players.newPlayer("turban");
        players.setPlayerTeam(playerId,'red');
        players.updatePlayer(playerId, 50, 50, 0, 0);
        return playerId;
    },

    setInput: function(playerId, inputVector) {
        players.getPlayer(playerId).input = inputVector;
    },

    getPlayersData: function() {
        var allPlayers = players.getPlayers();

        return allPlayers.map(toDto);
    }
};

function normalizeVector(vec) {
    var len = Math.sqrt(vec.x*vec.x + vec.y*vec.y);
    var ret;
    if(len !== 0) {
        ret = { x: vec.x/len, y: vec.y/len };
    } else {
        ret = { x: 0, y: 0 };
    }
    return ret;
}

function toDto(player) {
    return {
        id: player.id,
        pos: player.pos
    };
};