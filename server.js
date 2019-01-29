const express = require('express');
const app = express();
const port = 3000;

const generateComponent = function(name) {
  return `const TestElProto = Object.create(HTMLElement.prototype); TestElProto.createdCallback = function() { this.innerHTML = "<b>I'm an ${name}!</b>"; }; const XFoo = document.registerElement('${name}', { prototype: TestElProto });`;
}

app.get('*.js', function (req, res) {
  const name = req.path.substr(req.path.indexOf('/') + 1, req.path.indexOf('.') - 1);
  res.set('Content-Type', 'text/plain');
  res.status(200).send(generateComponent(name));
});

const server = app.listen(port, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = server;