/**
 * Created by turban on 22.11.14.
 */
var eventQueue;

(function(){
    eventQueue = (function() {
        // uses a circular doubly linked list to model a FIFO queue.

        var nilNode = {};
        nilNode.next = nilNode;
        nilNode.prev = nilNode;
        nilNode.val = null;
        nilNode.isNilNode = true;

        var spliceNode = function(node) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        };

        var q = {};
        q.pop = function() {
            var headNode = nilNode.next;
            if(headNode.isNilNode) throw "queue is empty";

            spliceNode(headNode);

            return headNode.val;
        };

        q.push = function(val) {
            var node = {};
            node.val = val;
            node.prev = nilNode.prev;
            node.next = nilNode;
            nilNode.prev.next = node;
            nilNode.prev = node;
        };

        q.hasNext = function() { return !nilNode.next.isNilNode; };

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
