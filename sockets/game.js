/**
 * Created by turban on 2014-11-20.
 */
var serverFps = 60;
var frameLength = 1000/serverFps;

var players = require('../models/players');
var playerId = players.newPlayer("turban");
players.setPlayerTeam(playerId,'red');
players.updatePlayer(playerId, 50, 50, 0, 0);

var params = {
    acc: 360,
    damp: 0.96
};

module.exports = function(io) {
    var previousUpdateTime = new Date().getTime();
    var gameLoop = function() {
        var loopBeginning = new Date().getTime();
        var dt = (loopBeginning - previousUpdateTime)/1000;
        previousUpdateTime = loopBeginning;

        update(dt);

        io.emit('gameUpdate', players.getPlayers());
        var elapsed = new Date().getTime() - loopBeginning;
        setTimeout(gameLoop, frameLength - elapsed);
    };
    setTimeout(gameLoop, frameLength);

    setUpIO(io);
};

function setUpIO(io) {
    io.on('connection', function(socket){
        console.log('a user connected');

        socket.on('pingTest', function(data){
            console.log('got it');
            socket.emit('pingResponse', data);
        });

        socket.on('playerMove', function(data){
            players.getPlayer(data.id).input = data.input;
        });

        socket.emit('playerId', playerId);
    });
}

function update(dt) {
    var allPlayers = players.getPlayersData();

    allPlayers.forEach(function(player) {
        var prevA = player.a;
        var prevV = player.v;

        player.pos = { x: player.pos.x+prevV.x*dt, y: player.pos.y+prevV.y*dt };

        var input = normalizeVector(player.input);
        player.a = { x: input.x * params.acc, y: input.y * params.acc};
        var dampCoeff = Math.pow(params.damp, 60*dt);
        player.v = { x: player.v.x*dampCoeff, y: player.v.y*dampCoeff};
        player.v = { x: player.v.x+prevA.x*dt, y: player.v.y+prevA.y*dt};
    })
}

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


