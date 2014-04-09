
var request = require('superagent');
var jquery = require('cheerio');
var fs = require('fs');

var roles = [];

request
.get('http://www.w3.org/TR/wai-aria/roles')
.end(function (err, res) {
  if (err) throw err;
  var $ = jquery.load(res.text);
  var $index = $('#index_role');
  var $roles = $index.find('dt a');
  $roles.each(function () {
    var $this = jquery(this);
    var role = $this.text().replace('(abstract role)', '').trim()
    roles.push(role);
  });

  var str = 'module.exports = ' + JSON.stringify(roles, null, 2);
  fs.writeFile('./index.js', str, function (err) {
    if (err) throw err;
    console.log('found %d roles', roles.length);
  });
});

