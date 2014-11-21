var io;

module.exports = function(io){
    var io = io;
    require('./player')(io);
}