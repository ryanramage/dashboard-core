var core = require('lib/dashboard_core');
var $ = require('jquery');
$.couch = require('jquery.couch');

describe("Rewrites", function() {

  it("/_info should return a jsonp with dashboard info and dashboard=true", function() {
      var completed = false;
      runs(function(){
          $.ajax({
              url :  '../_info',
              dataType : 'json',
              jsonp : true,
              success : function(remote_data) {
                   expect(remote_data.dashboard).toBeTruthy();
                  expect(remote_data.config).toBeDefined();
                  completed = true;
              },
              error : function() {
                  completed = true
                  expect(true).toBeFalsy();
              }
          });
      });
      waits(1500);
      runs(function(){
          expect(completed).toBeTruthy();
      });
  });

});

describe("App Details", function() {
    it("Should list all installed apps", function() {

        //insert sample app doc
        var app_doc = {"_id":"c21e4a0225f4e224381023f4190d258d","kanso":{"config":{"name":"wiki","version":"0.0.1","description":"A general-purpose wiki for CouchDB","long_description":"A wiki is a website created by its users. It allows any user to make additions or changes to the site, and can help to keep content up-to-date and relevant.\n\nUsed by the Kanso project for documentation, this Wiki uses an extended version of Markdown for editing pages and features syntax highlighting and page history. Edit's can be attributed to a user and their changes to a page highlighted.","url":"https://github.com/kanso/wiki","categories":["productivity"],"attachments":["icons","images"],"icons":{"16":"icons/wiki_icon_16.png","48":"icons/wiki_icon_48.png","96":"icons/wiki_icon_96.png","128":"icons/wiki_icon_128.png"},"promo_images":{"small":"images/promo_small.png"},"screenshots":["images/screenshot1.png","images/screenshot2.png","images/screenshot3.png"],"dependencies":{"wiki-core":null,"wiki-theme-default":null,"attachments":null},"minify":false},"build_time":"2012-02-23T19:37:28Z","kanso_version":"0.2.0","push_time":"2012-02-23T19:37:44Z","pushed_by":"ryanramage"},"open_path":"/_rewrite/","style":"design-doc","db_src":"http://garden.iriscouch.com/garden/_design/garden/_rewrite/_db","doc_id":"wiki","src":"http://garden.iriscouch.com/garden/_design/garden/_rewrite/details/wiki","installed":{"date":1330067199576,"db":"wiki_1"},"dashboard_title":"wiki_1","type":"install"};
        runs(function() {



        });
    })
})




