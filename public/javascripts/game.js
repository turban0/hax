/**
 * Created by turban on 22.11.14.
 */
var fps = 30;
var frameLength = 1000/fps;
var io = io();

var v = 1;
var vX = 0;
var vY = 0;

var gameLoop = function() {
    var loopBeginning = new Date();
    while(eventQueue.hasNext()) {

        var e = eventQueue.pop();
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
        positionX: document.getElementById('Player1').cx.baseVal.value,
        positionY: document.getElementById('Player1').cy.baseVal.value,
        vX: vX,
        vY: vY,
        time: new Date().getTime()
    });
    var loopEnding = new Date();
    var millisToNext = frameLength - (loopEnding - loopBeginning);
    window.setTimeout(gameLoop, millisToNext);
};
gameLoop();

io.on('playerUpdate', function(data){
    console.log("X:" + data.positionX + " Y:" + data.positionY + " Delay:" + (new Date().getTime() - data.time));
    document.getElementById('Player1').cx.baseVal.value = data.positionX;
    document.getElementById('Player1').cy.baseVal.value = data.positionY;
});

