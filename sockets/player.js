/**
 * Created by turban on 2014-11-20.
 */
//  var players = require('../models/players');

module.exports = function(io){
    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('pingTest', function(data){
            console.log('got it');
            socket.emit('pingResponse', data);
        });

        socket.on('playerMove', function(data){
            io.emit('playerUpdate', {
                positionX: data.positionX + data.vX,
                positionY: data.positionY + data.vY,
                time: data.time
            });
        });
    });
};


