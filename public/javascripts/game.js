/**
 * Created by turban on 22.11.14.
 */
var fps = 30;
var frameLength = 1000/fps;
var io = io();

var vX = 0;
var vY = 0;


var gameLoop = function() {
    while(eventQueue.hasNext()) {
        var e = eventQueue.pop();
        switch (e){
            case "l_d":
                vX = -1;
                break;
            case "l_u":
                vX = 0;
                break;
            case "u_d":
                vY = -1;
                break;
            case "u_u":
                vY = 0;
                break;
            case "r_d":
                vX = 1;
                break;
            case "r_u":
                vX = 0;
                break;
            case "d_d":
                vY = 1;
                break;
            case "d_u":
                vY = 0;
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
    window.setTimeout(gameLoop, frameLength);
};
window.setTimeout(gameLoop, frameLength);

io.on('playerUpdate', function(data){
    console.log("X:" + data.positionX + " Y:" + data.positionY + " Delay:" + (new Date().getTime() - data.time));
    document.getElementById('Player1').cx.baseVal.value = data.positionX;
    document.getElementById('Player1').cy.baseVal.value = data.positionY;
});

