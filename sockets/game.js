/**
 * Created by turban on 2014-11-20.
 */

var eventQueue = function() {
    // uses a circular doubly linked list with sentinel to model a FIFO queue.

    var nilNode = {};
    nilNode.next = nilNode;
    nilNode.prev = nilNode;
    nilNode.val = null;
    nilNode.isNilNode = true;

    var spliceNode = function(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    };

    var q = {};
    q.dequeue = function() {
        var headNode = nilNode.next;
        if(headNode.isNilNode) throw "queue is empty";

        spliceNode(headNode);

        return headNode.val;
    };

    q.enqueue = function(val) {
        var node = {};
        node.val = val;
        node.prev = nilNode.prev;
        node.next = nilNode;
        nilNode.prev.next = node;
        nilNode.prev = node;
    };

    q.hasNext = function() { return !nilNode.next.isNilNode; };

    return q;
};


var serverFps = 60;
var frameLength = 1000/serverFps;

var players = require('../models/players');
var playerId = players.newPlayer("turban");
players.setPlayerTeam(playerId,'red');
players.updatePlayer(playerId, 50, 50, 0, 0);

module.exports = function(io){
    var movesQueue = eventQueue();

    var gameLoop = function() {
        while(movesQueue.hasNext()) {
            var e = movesQueue.dequeue();
            calculatePosition(e);
        }

        io.emit('gameUpdate', players.getPlayers());
        setTimeout(gameLoop, frameLength);
    };
    setTimeout(gameLoop, frameLength);

    io.on('connection', function(socket){
        console.log('a user connected');

        socket.on('pingTest', function(data){
            console.log('got it');
            socket.emit('pingResponse', data);
        });

        socket.on('playerMove', function(data){
            movesQueue.enqueue(data)
        });
    });
};

//simplified for one player
function calculatePosition(e) {
    var selectedPlayer = players.getPlayer(e.id);
    var newPositionX, newPositionY;
    //check if client position is correct
    if(selectedPlayer.positionX === e.positionX && selectedPlayer.positionY === e.positionY){
        newPositionX = selectedPlayer.positionX + e.vX;
        newPositionY = selectedPlayer.positionY + e.vY;

        //acceleration is currently 0 all the time
        players.updatePlayer(playerId, newPositionX, newPositionY, 0, 0);
    } else {
        //we've got a problem, position on client differs from position saved on server
        //for now I'm just using server position and logging the case,
        //that behaviour should be investigated further
        console.log("Position for player " + selectedPlayer.id + ":" + selectedPlayer.nick + " is messed." +
                    " (client/server) X:" + e.positionX + "/" + selectedPlayer.positionX +
                    " Y:" + e.positionY + "/" + selectedPlayer.positionY);

        newPositionX = selectedPlayer.positionX + e.vX;
        newPositionY = selectedPlayer.positionY + e.vY;

        //acceleration is currently 0 all the time
        players.updatePlayer(playerId, newPositionX, newPositionY, 0, 0);
    }

}


