var dashboard_views = require('lib/dashboard_views');
var dashboard_shows = require('lib/dashboard_shows');
var dashboard_updates = require('lib/dashboard_updates');
var dashboard_rewrites = require('lib/dashboard_rewrites');

exports.views = {
    by_active_install : dashboard_views.by_active_install,
    app_version_by_market : dashboard_views.app_version_by_market,
    by_markets : dashboard_views.by_markets,
    by_roles : dashboard_views.by_roles
};

exports.shows = {
    redirectRoot : dashboard_shows.redirectRoot,
    configInfo : dashboard_shows.configInfo,
    info : dashboard_shows.info
}

exports.updates = {
    modifyAppRewrites : dashboard_updates.modifyAppRewrites
}

var base_rewrites = dashboard_rewrites.getNeededRewrties('dashboard-core-test');

base_rewrites.push({from: 'spec/*', to : 'spec/*'});
base_rewrites.push({from: '/modules.js', to: 'modules.js' });

exports.rewrites = base_rewrites;