module.exports = {
    create: function(keyF) {
        return heap(keyF);
    }
};

function heap(keyF) {
    var data = [];
    var size = 0;

    return {
        add: function(x) {
            if(size >= data.length) {
                data.push(x);
            } else {
                data[size] = x;
            }

            swim(keyF, data, size++);
        },
        getMax: function() {
            if(this.isEmpty()) throw "heap is empty";

            return data[0];
        },
        removeMax: function() {
            if(this.isEmpty()) throw "heap is empty";

            swap(data, 0, --size);
            sink(keyF, size, data, 0);
        },
        isEmpty: function() { return size <= 0; }
    };
}

function parentIdx(idx) {
    return Math.floor((idx-1)/2);
}

function leftChildIdx(idx) {
    return 2*idx + 1;
}

function rightChildIdx(idx) {
    return 2*idx + 2;
}

function swap(data, idx1, idx2) {
    var t = data[idx1];
    data[idx1] = data[idx2];
    data[idx2] = t;
}

function sink(keyF, size, data, idx) {
    var indices = [idx, leftChildIdx(idx), rightChildIdx(idx)];

    var getMaxIndex = function(acc, idx) {
        return idx < size && keyF(data[acc]) < keyF(data[idx]) ? idx: acc;
    };

    var maxIdx = indices.reduce(getMaxIndex);

    if(maxIdx !== idx) {
        swap(data, idx, maxIdx);
        sink(keyF, data, maxIdx);
    }
}

function swim(keyF, data, idx) {
    if(idx === 0) return;
    var parentIdx = parentIdx(idx);
    if(keyF(data[idx]) > keyF(data[parentIdx])) {
        swap(data, idx, parentIdx);
        swim(keyF, data, parentIdx);
    }
}