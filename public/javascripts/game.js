/**
 * Created by turban on 22.11.14.
 */
var fps = 60;
var frameLength = 1000/fps;
var io = io();

var players = {};
var localPlayerId;
var input = { x: 0, y:0 };

var processInputData = function() {
    while(eventQueue.hasNext()) {
        var e = eventQueue.dequeue();
        switch (e){
            case "l_d":
                input.x -= 1;
                break;
            case "l_u":
                input.x += 1;
                break;
            case "u_d":
                input.y -= 1;
                break;
            case "u_u":
                input.y += 1;
                break;
            case "r_d":
                input.x += 1;
                break;
            case "r_u":
                input.x -= 1;
                break;
            case "d_d":
                input.y += 1;
                break;
            case "d_u":
                input.y -= 1;
                break;
        }
    }
};

var sendInputData = function(input) {
    if(!localPlayerId) return;
    io.emit('playerMove',{
        id: localPlayerId,
        input: input
    });
};

var draw = function() {
    for(var id in players) {
        var player = players[id];
        document.getElementById(player.id).setAttribute('cx', player.pos.x);
        document.getElementById(player.id).setAttribute('cy', player.pos.y);
    }
};

var gameLoop = function() {
    var loopBeginning = new Date();

    processInputData();
    sendInputData(input);
    draw();

    var elapsed = new Date() - loopBeginning;
    window.setTimeout(gameLoop, frameLength - elapsed);
};
gameLoop();

io.on('gameUpdate', function(data) {
    data.forEach(function(serverPlayer) {
        console.log(serverPlayer.id + " - X: " + serverPlayer.pos.x + " Y: " + serverPlayer.pos.y);

        var player = players[serverPlayer.id];

        if(!player) {
            players[serverPlayer.id] = { id: serverPlayer.id, nick:'', pos: { x: 0, y: 0 }};
            addPlayerAvatar(serverPlayer.id);
            player = players[serverPlayer.id];
        }

        player.pos = { x: serverPlayer.pos.x, y: serverPlayer.pos.y };
    });
});

io.on('playerId', function(data) {
    players[data] = { id: data, nick:'', pos: { x: 0, y: 0 }};
    localPlayerId = data;
    addPlayerAvatar(data);
});

function addPlayerAvatar(id) {
    var xmlns = "http://www.w3.org/2000/svg";
    var circle = document.createElementNS(xmlns, 'circle');
    circle.setAttributeNS(null, 'r', '15');
    circle.setAttributeNS(null, 'cx', '0');
    circle.setAttributeNS(null, 'cy', '0');
    circle.setAttributeNS(null, 'fill', '#e56e56');
    circle.setAttributeNS(null, 'stroke', 'black');
    circle.setAttributeNS(null, 'stroke-width', '2');
    circle.setAttributeNS(null, 'id', id);
    document.getElementById('PathContainer').appendChild(circle);
}

