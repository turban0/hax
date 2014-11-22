/**
 * Created by turban on 22.11.14.
 */
var eventQueue;

(function(){
    eventQueue = (function() {
        var headNode = null;

        var q = {};
        q.pop = function() {
            if(!headNode) throw "queue is empty";
            var ret = headNode.val;
            headNode = headNode.tail;
            return ret;
        };

        q.push = function(val) {
            var node = {};
            node.val = val;
            node.tail = headNode;
            headNode = node;
        };

        q.hasNext = function() { return !!headNode; };

        return q;
    })();

    window.addEventListener('keydown', function(e) {
        var charCode = e.keyCode || e.which;
        var known = false;

        switch (charCode) {
            case 37:
                eventQueue.push('l_d');
                known = true;
                break;
            case 38:
                eventQueue.push('u_d');
                known = true;
                break;
            case 39:
                eventQueue.push('r_d');
                known = true;
                break;
            case 40:
                eventQueue.push('d_d');
                known = true;
                break;
            default:
                break;
        }

        if(known) e.preventDefault();
    });

    window.addEventListener('keyup', function(e) {
        var charCode = e.keyCode || e.which;

        var known = false;

        switch (charCode) {
            case 37:
                eventQueue.push('l_u');
                known = true;
                break;
            case 38:
                eventQueue.push('u_u');
                known = true;
                break;
            case 39:
                eventQueue.push('r_u');
                known = true;
                break;
            case 40:
                eventQueue.push('d_u');
                known = true;
                break;
            default:
                break;
        }

        if(known) e.preventDefault();
    });
})();
