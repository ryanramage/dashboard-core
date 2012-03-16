this.suite1 = {
    'example test': function (test) {
        test.ok(true, 'everything is ok');
        test.done();
    },
    'test 2' : function(test) {
        test.ok(true, 'not ok');
        test.done();
    }
};