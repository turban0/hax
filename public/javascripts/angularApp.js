/**
 * Created by turban on 2014-11-20.
 */
var hax = angular.module('hax',[
    'btford.socket-io'
]);

hax.factory('socket', function (socketFactory) {
    return socketFactory();
});

hax.controller('RootCtrl', function($scope, socket, $interval) {
    $scope.activePane = 'setup';
    $scope.match = function(){
        $scope.activePane = 'match';
    };
    var time;
    var id = 0;
    $interval(function(){
        time = new Date();
        socket.emit('pingTest', {id: ++id, time: new Date()});
        console.log("Ping " + id + " sent");
    }, 5000)

    socket.on('pingResponse', function(data){
       console.log("Ping " + data.id + ": " + ping + "ms");
    });

});

