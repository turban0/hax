var uuid = require('uuid');
var _ = require('underscore');

var rooms = [];

module.exports = function(io) {

    setUpIO(io);
};

var Room = function(name, adminUser){
    var self = this
    self.roomId = uuid.v4();
    var name = name;
    var players = require('../models/players');
    var playersNumber = 1;
    players.newPlayer(adminUser.nick, adminUser.socket);

    adminUser.socket.on('getRoom', function(){
        emitRoom(adminUser.socket)
    });

    self.newPlayer = function(nick, socket){
        players.newPlayer(nick, socket);
        playersNumber++;
        socket.join(self.roomId);
        emitRoom(socket);
    };

    // have to look at players list after each new player
    self.gameIO = {
        emit: function(eventName, data, id){
            if(id){
                players.getPlayer(id).socket.emit(eventName, data);
            } else {
                io.sockets.to(self.roomId).emit(eventName, data);
            }
        },
        on: function(eventName, callback, id){
            if(id){
                players.getPlayer(id).socket.on(eventName, callback);
            } else {
                _.each(players.getPlayers(), function(player){
                    player.socket.on(eventName, callback);
                });
            }
        }
    }

    //adminUser.socket('gameSettings')
    self.info = {
        id: self.roomId,
        name: name,
        playersNumber: playersNumber
    }

    function emitRoom(socket) {
        console.log("emit");
        socket.emit('room',{
            players: {
                red: players.getPlayers('red'),
                spect: players.getPlayers('spect'),
                blue: players.getPlayers('blue')
            }
        });
    }
}

function setUpIO(io) {
    io.on('connection', function (socket) {
        //console.log('a user connected');

        socket.on('createRoom', function (data) {
            rooms.push(new Room(data.roomName, {nick: data.nick, socket: socket}));
            var roomsInfo = [];
            _.each(rooms, function(room){
                roomsInfo.push(room.info);
            });
            io.emit('roomsList', roomsInfo);
            socket.on('disconnect', function () {
                //destroy created room
            })
        });

        socket.on('joinRoom', function(data) {
            var selectedRoom = _.findWhere(rooms, {roomId: data.id});
            selectedRoom.newPlayer(data.nick, socket);
        });
        socket.on('listRooms', function(){
            var roomsInfo = [];
            _.each(rooms, function(room){
                roomsInfo.push(room.info);
            });
            socket.emit('roomsList', roomsInfo);
        });
    });
}