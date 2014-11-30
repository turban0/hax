module.exports = {
    from: function(x, y) {
        return vec(x, y);
    },
    fromObj: function(o) {
        return vec(o.x, o.y);
    }
};

function vec(x, y) {
    return {
        x: function() {
            return x;
        },
        y: function() {
            return y;
        },
        length: function() {
            return Math.sqrt(x*x + y*y);
        },
        normalize: function() {
            var l = this.length();
            if(l !== 0) {
                return vec(x/l, y/l);
            } else {
                return this;
            }
        },
        scale: function(s) {
            return vec(s*x, s*y);
        },
        add: function(v) {
            return vec(x + v.x(), y + v.y());
        },
        setX: function(x) {
            return vec(x, y);
        },
        setY: function(y) {
            return vec(x, y);
        },
        toObj: function() {
            return { x: x, y: y };
        }
    }
}