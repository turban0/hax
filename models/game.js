var players = require('../models/players');

var params = {
    acc: 360,
    playerDamping: 0.96,
    ballDamping: 0.99,
    playerRestitution: 0.5,
    ballRestitution: 0.5,
    goalPostRestitution: 0.5
};

module.exports = {
    update: function(dt) {
        var allPlayers = players.getPlayers();

        allPlayers.forEach(function(player) {
            var prevA = player.a;
            var prevV = player.v;

            player.a = player.input.normalize().scale(params.acc);

            var dampCoeff = Math.pow(params.playerDamping, 60*dt);
            player.v = player.v.scale(dampCoeff).add(prevA.scale(dt));

            player.pos = player.pos.add(prevV.scale(dt));
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

function toDto(player) {
    return {
        id: player.id,
        pos: player.pos.toObj()
    };
}