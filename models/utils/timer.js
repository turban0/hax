var beginningOfTime;
var previousElapsedTime;

module.exports = {
    start: function() {
        beginningOfTime = process.hrtime();
        previousElapsedTime = hrTimeToNum(beginningOfTime);
        return 0;
    },
    getRunningTime: function() {
        return process.hrtime(beginningOfTime);
    },
    getElapsedTime: function () {
        var currentTime = process.hrtime(beginningOfTime);
        currentTime = hrTimeToNum(currentTime);
        var result = currentTime - previousElapsedTime;
        previousElapsedTime = currentTime;
        return result;
    }
};

function hrTimeToNum(hrTime) {
    return hrTime[0]*1e9 + hrTime[1];
}