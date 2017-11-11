/*!
 * Pub/Sub implementation
 * http://addyosmani.com/
 * Licensed under the GPL
 */

var pubsubz = {};

(function (q) {
    var topics = {},
        subUid = -1;

    q.publish = function (topic, args) {

        if (!topics[topic]) {
            return false;
        }

        setTimeout(function () {
            var subscribers = topics[topic],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
                subscribers[len].func(topic, args);
            }
        }, 0);

        return true;

    };

    q.subscribe = function (topic, func) {

        if (!topics[topic]) {
            topics[topic] = [];
        }

        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    q.unsubscribe = function (token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    };
}(pubsubz));



var testSubscriber = function( topics , data ){
    console.log( topics + ": " + data );
};

var testSubscription = pubsubz.subscribe( 'example1', testSubscriber );

pubsubz.publish( 'example1', 'hello world!' );
pubsubz.publish( 'example1', ['test','a','b','c'] );
pubsubz.publish( 'example1', [{'color':'blue'},{'text':'hello'}] );

setTimeout(function(){
    pubsubz.unsubscribe( testSubscription );
}, 0);

pubsubz.publish( 'example1', 'hello again!' );

