

describe("Rewrites", function() {

  it("/_info should return a jsonp with dashboard info and dashboard=true", function() {
      runs(function(){
          $.ajax({
              url :  '../_rewrite/_info',
              dataType : 'json',
              jsonp : true,
              success : function(remote_data) {
                   expect(remote_data.dashboard).toBeTruthy();
                  expect(remote_data.config).toBeDefined();
              },
              error : function() {
                    expect(true).toBeFalsy();
              }
          });
      });
  });

});




