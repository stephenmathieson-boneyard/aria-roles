
var assert = require('assert');
var roles = require('./');

assert(roles)
assert(roles.length);
assert(roles.abstract && roles.abstract.length);
assert(roles.document && roles.document.length);
assert(roles.landmark && roles.landmark.length);
assert(roles.widget && roles.widget.length);

for (var i = 0; i < roles.length; i++) {
  assert('string' == typeof roles[i])
}
