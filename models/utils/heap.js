module.exports = {
    create: function(fComp) {
        return heap(fComp);
    }
};

function heap(fComp) {
    var data = [];
    var size = 0;

    return {
        add: function(x) {
            if(size >= data.length) {
                data.push(x);
            } else {
                data[size] = x;
            }

            swim(fComp, data, size++);
        },
        get: function() {
            if(!this.hasNext()) throw "heap is empty";

            swap(data, 0, --size);
            sink(fComp, size, data, 0);
            return data[size + 1];
        },
        hasNext: function() { return size > 0; }
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

function sink(fComp, size, data, idx) {
    var maxIdx = idx;
    var checkIdx = leftChildIdx(idx);
    if(checkIdx < size && fComp(data[maxIdx], data[checkIdx]) < 0) {
        maxIdx = checkIdx;
    }
    checkIdx = rightChildIdx(idx);
    if(checkIdx < size && fComp(data[maxIdx], data[checkIdx]) < 0) {
        maxIdx = checkIdx;
    }

    if(maxIdx !== idx) {
        swap(idx, maxIdx);
        sink(fComp, data, maxIdx);
    }
}

function swim(fComp, data, idx) {
    if(idx === 0) return;
    var parentIdx = parentIdx(idx);
    if(fComp(data[idx], data[parentIdx]) > 0) {
        swap(data, idx, parentIdx);
        swim(fComp, data, parentIdx);
    }
}