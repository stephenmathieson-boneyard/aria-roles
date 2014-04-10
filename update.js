
var request = require('superagent');
var jquery = require('cheerio');
var fs = require('fs');

var roles = [];
var types = {};

request
.get('http://www.w3.org/TR/wai-aria/roles')
.end(function (err, res) {
  if (err) throw err;
  var $ = jquery.load(res.text);


  var $groups = $('#roles_categorization .section[role=region]');

  $groups.each(function () {
    var $group = $(this);
    var title = $group.attr('id').split('_')[0];
    var $roles = $group.find('ul li a code');
    types[title] = [];
    $roles.each(function () {
      var $role = $(this);
      var role = $role.text();

      roles.push(role);
      types[title].push(role);
    });
  });

  var js = [
    'var roles = ' + JSON.stringify(roles, null, 2)
  ];

  for (var type in types) {
    js.push('roles["' + type + '"] = ' + JSON.stringify(types[type], null, 2));
  }

  js.push('module.exports = roles;');

  fs.writeFileSync('./index.js', js.join('\n'));
  console.log('%d roles', roles.length);

});

