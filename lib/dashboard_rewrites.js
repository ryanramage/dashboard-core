/**
 * Rewrite settings to be exported from the design doc
 * {from: '/*', to: '../../../*', query : {base_url : '*'}}
 */

module.exports = [

    {from: '/_couch', to: '../../../'},
    {from: '/_couch/', to: '../../../'},
    {from: '/_couch/*', to: '../../../*'},
    {from: '/_config', to : '../../../_config'},
    {from: '/_config/*', to : '../../../_config/*'},
    {from: '/_db/*', to : '../../*'},
    {from: '/_db', to : '../../'},
    {from: '/_info', to: '_show/configInfo/_design/dashboard'},

];
