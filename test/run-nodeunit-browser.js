/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3001, //< Default Max Timeout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 100); //< repeat check every 100ms
};


if (phantom.args.length === 0 || phantom.args.length > 2) {
    console.log('Usage: run-jasmine.js URL');
    phantom.exit();
}

var page = require('webpage').create();

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open(phantom.args[0], function(status){
    if (status !== "success") {
        console.log("Unable to access network");
        phantom.exit();
    } else {



        waitFor(function(){
            return page.evaluate(function(){
                var el = document.getElementById('nodeunit-testresult');
                if (el && el.innerText.match('completed')) {
                    return true;
                }
                return false;
            });
        }, function(){

            var failed = page.evaluate(function(){
                var failed = false;
                var li = document.getElementsByTagName('li');
                for (var i = 0; i < li.length; i++) {
                    var status = li[i].getAttribute('class');
                    var info = li[i].getElementsByTagName('strong');
                    var pass = status == "pass"
                    var symbol = '✔';
                    if (!pass) {
                        symbol = '✘';
                        failed = true;
                    }
                    if (info && info[0]) {
                        // it is a parent test
                        console.log(symbol + ' ' + info[0].innerText);
                    } else {
                        // it is an assertion entry
                        if (!pass) {
                            var pre = li[i].getElementsByTagName('pre');
                            console.log('   '+ symbol +' ' + pre[0].innerText);
                        }
                    }
                }

                var el = document.getElementById('nodeunit-testresult');
                console.log('\n' + el.innerText);
                return failed;

            });
            var returnVal = 0;
            if (failed > 0) returnVal = 1;
            phantom.exit(returnVal);
        });
    }
});
