/**
 * Created by turban on 22.11.14.
 */
var fps = 30;
var frameLength = 1000/fps;
var io = io();

var v = 1;
var vX = 0;
var vY = 0;

tempPlayerId = "p1";

var gameLoop = function() {
    var loopBeginning = new Date();
    while(eventQueue.hasNext()) {

        var e = eventQueue.dequeue();
        switch (e){
            case "l_d":
                vX -= v;
                break;
            case "l_u":
                vX += v;
                break;
            case "u_d":
                vY -= v;
                break;
            case "u_u":
                vY += v;
                break;
            case "r_d":
                vX += v;
                break;
            case "r_u":
                vX -= v;
                break;
            case "d_d":
                vY += v;
                break;
            case "d_u":
                vY -= v;
                break;
        }
    }
    io.emit('playerMove',{
        positionX: parseInt(document.getElementById(tempPlayerId).getAttribute('cx')),
        positionY: parseInt(document.getElementById(tempPlayerId).getAttribute('cy')),
        vX: vX,
        vY: vY,
        id: tempPlayerId
    });
    var loopEnding = new Date();
    var millisToNext = frameLength - (loopEnding - loopBeginning);
    window.setTimeout(gameLoop, millisToNext);
};
gameLoop();

io.on('gameUpdate', function(data){
    var len = data.length;
    var selectedPlayer;
    for(var i = 0; i < len; i++) {
        selectedPlayer = data[i];
        console.log("X:" + selectedPlayer.positionX + " Y:" + selectedPlayer.positionY);
        document.getElementById(selectedPlayer.id).setAttribute('cx', selectedPlayer.positionX);
        document.getElementById(selectedPlayer.id).setAttribute('cy', selectedPlayer.positionY);
    }

});

