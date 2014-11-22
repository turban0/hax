/**
 * Created by turban on 22.11.14.
 */
var eventQueue;

(function(){
    eventQueue = (function() {
        // uses a circular doubly linked list with sentinel to model a FIFO queue.

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
        q.dequeue = function() {
            var headNode = nilNode.next;
            if(headNode.isNilNode) throw "queue is empty";

            spliceNode(headNode);

            return headNode.val;
        };

        q.enqueue = function(val) {
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

    var keyState = { up: true, down: false };

    var currentKeyStates = {
        left: keyState.up,
        right: keyState.up,
        up: keyState.up,
        down: keyState.up
    };

    window.addEventListener('keydown', function(e) {
        var charCode = e.keyCode || e.which;
        var known = false;

        switch (charCode) {
            case 37:
                if(currentKeyStates.left == keyState.up) {
                    eventQueue.enqueue('l_d');
                    currentKeyStates.left = keyState.down;
                }
                known = true;
                break;
            case 38:
                if(currentKeyStates.up == keyState.up) {
                    eventQueue.enqueue('u_d');
                    currentKeyStates.up = keyState.down;
                }
                known = true;
                break;
            case 39:
                if(currentKeyStates.right == keyState.up) {
                    eventQueue.enqueue('r_d');
                    currentKeyStates.right = keyState.down;
                }
                known = true;
                break;
            case 40:
                if(currentKeyStates.down == keyState.up) {
                    eventQueue.enqueue('d_d');
                    currentKeyStates.down = keyState.down;
                }
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
                if(currentKeyStates.left == keyState.down) {
                    eventQueue.enqueue('l_u');
                    currentKeyStates.left = keyState.up;
                }
                known = true;
                break;
            case 38:
                if(currentKeyStates.up == keyState.down) {
                    eventQueue.enqueue('u_u');
                    currentKeyStates.up = keyState.up;
                }
                known = true;
                break;
            case 39:
                if(currentKeyStates.right == keyState.down) {
                    eventQueue.enqueue('r_u');
                    currentKeyStates.right = keyState.up;
                }
                known = true;
                break;
            case 40:
                if(currentKeyStates.down == keyState.down) {
                    eventQueue.enqueue('d_u');
                    currentKeyStates.down = keyState.up;
                }
                known = true;
                break;
            default:
                break;
        }

        if(known) e.preventDefault();
    });
})();
