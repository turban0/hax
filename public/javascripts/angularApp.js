/**
 * Created by turban on 2014-11-20.
 */
var hax = angular.module('hax',[
    'btford.socket-io'
]);

hax.factory('socket', function (socketFactory) {
    return socketFactory();
});

hax.controller('RootCtrl', function($scope, $rootScope) {
    $rootScope.activePane = 'rooms';
    $scope.match = function(){
        $scope.activePane = 'match';
    };
});

hax.controller('RoomsCtrl', function($scope, socket, $rootScope) {
    $scope.nick = "turban";
    $scope.roomName = "XXXXXXXXXXXXXXXX";

    socket.on('roomsList', function(data){
        console.log(data);
        $scope.rooms = data;
    });
    socket.emit('listRooms');

    $scope.createRoom = function(){
        socket.emit('createRoom', {roomName: $scope.roomName, nick: $scope.nick});
        //$rootScope.activePane = 'setup';
    };
    $scope.joinRoom = function(){
        if($scope.selectedRoomId){
            socket.emit('joinRoom', {id: $scope.selectedRoomId, nick: $scope.nick});
            $rootScope.activePane = 'setup';
        }
    };
    $scope.refreshRooms = function(){
        socket.emit('listRooms');
    };
    $scope.selectRoom = function(roomId){
        $scope.selectedRoomId = roomId;
    };
});

hax.controller('SetupCtrl', function($scope, socket, $rootScope) {
    socket.emit('getRoom', {});
    $scope.players = {};
    socket.on('room', function(data){
        console.log(data);
        $scope.players.red = data.players.red;
        $scope.players.spect = data.players.spect;
        $scope.players.blue = data.players.blue;
    });
});