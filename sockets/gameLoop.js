/**
 * Created by turban on 2014-11-20.
 */
var serverFps = 60;
var frameLength = 1000/serverFps;

var game = require('../models/game');

module.exports = function(io) {
    var previousUpdateTime = new Date().getTime();
    var gameLoop = function() {
        var loopBeginning = new Date().getTime();
        var dt = (loopBeginning - previousUpdateTime)/1000;
        previousUpdateTime = loopBeginning;

        game.update(dt);

        io.emit('gameUpdate', game.getPlayersData());
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
            console.log(data.input);
            game.setInput(data.id, data.input);
        });

        socket.emit('playerId', game.createPlayer());
    });
}


