var heap = require('../utils/heap');

module.exports = {
    create: function(keyF, type) {
        if(type === undefined || type === null) type = 0;

        return pq(type === module.exports.types.max ? keyF : function(el) { return -keyF(el); });
    },
    types: {
        max: 0,
        min: 1
    }
};

function pq(keyF) {
    var h = heap.create(keyF);

    return {
        enqueue: function (el) {
            h.add(el);
        },
        dequeue: function () {
            var ret = h.getMax();
            h.removeMax();
            return ret;
        },
        isEmpty: function() {
            return h.isEmpty();
        }
    };
}