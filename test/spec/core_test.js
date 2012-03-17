var core = require('lib/dashboard_core');
var db = require('db').current();


core.dashboard_db_name = guessCurrent().db;
console.log('db: ' + core.dashboard_db_name );
core.dashboard_ddoc_name = 'dashboard-core-test';

this.core_test = {


    setUp : function (callback) {
        var app_doc = {"_id":"c21e4a0225f4e224381023f4190d258d","kanso":{"config":{"name":"wiki","version":"0.0.1","description":"A general-purpose wiki for CouchDB","long_description":"A wiki is a website created by its users. It allows any user to make additions or changes to the site, and can help to keep content up-to-date and relevant.\n\nUsed by the Kanso project for documentation, this Wiki uses an extended version of Markdown for editing pages and features syntax highlighting and page history. Edit's can be attributed to a user and their changes to a page highlighted.","url":"https://github.com/kanso/wiki","categories":["productivity"],"attachments":["icons","images"],"icons":{"16":"icons/wiki_icon_16.png","48":"icons/wiki_icon_48.png","96":"icons/wiki_icon_96.png","128":"icons/wiki_icon_128.png"},"promo_images":{"small":"images/promo_small.png"},"screenshots":["images/screenshot1.png","images/screenshot2.png","images/screenshot3.png"],"dependencies":{"wiki-core":null,"wiki-theme-default":null,"attachments":null},"minify":false},"build_time":"2012-02-23T19:37:28Z","kanso_version":"0.2.0","push_time":"2012-02-23T19:37:44Z","pushed_by":"ryanramage"},"open_path":"/_rewrite/","style":"design-doc","db_src":"http://garden.iriscouch.com/garden/_design/garden/_rewrite/_db","doc_id":"wiki","src":"http://garden.iriscouch.com/garden/_design/garden/_rewrite/details/wiki","installed":{"date":1330067199576,"db":"wiki_1"},"dashboard_title":"wiki_1","type":"install"};
        db.saveDoc(app_doc, function(err, resp) {
            if (err) console.log(err.error);
            callback();
        })
    },
    tearDown : function(callback) {
        db.getDoc('c21e4a0225f4e224381023f4190d258d', function(err, doc) {
            db.removeDoc(doc, function(err, resp) {
                callback();
            });
        });
    },

    'Should list all installed apps': function (test) {
        test.expect(1);
        core.getInstalledApps(function(err, apps) {
            if (err) throw err;
            test.ok(apps.length > 0, 'no apps found');
            test.done();
        })

    }
};


function guessCurrent (loc) {
    var loc = loc || window.location;
    var re = /\/([a-z][a-z0-9_\$\(\)\+-\/]*)\/_design\/([^\/]+)\//;
    var match = re.exec(loc.pathname);
    if (match) {
        return {
            db: match[1],
            design_doc: match[2],
            root: '/'
        }
    }
    return null;
};
