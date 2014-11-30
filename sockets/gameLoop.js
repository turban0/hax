/**
 * Created by turban on 2014-11-20.
 */
var serverFps = 60;
var frameLength = 1000/serverFps;

var game = require('../models/game');
var vector = require('../models/utils/vector');
var timer = require('../models/utils/timer');

module.exports = function(io) {
    timer.start();
    var gameLoop = function() {
        var loopBeginning = timer.getRunningTime();
        var dt = timer.getElapsedTime()/1000000;

        game.update(dt);

        io.emit('gameUpdate', game.getPlayersData());
        var misInLoop = timer.getRunningTime() - loopBeginning;
        setTimeout(gameLoop, frameLength - misInLoop/1000);
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
            game.setInput(data.id, vector.fromObj(data.input));
        });

        socket.emit('playerId', game.createPlayer());
    });
}


