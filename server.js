const express = require('express');
const app = express();
const port = 3000;

const generateComponent = function(name) {
  return `class exampleElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '
      <style>
        h1 {
          font-size: 2.5rem;
          color: hotpink;
          font-family: monospace;
          text-align: center;
          text-decoration: pink solid underline;
          text-decoration-skip: ink;
        }
      </style>
      <h1>Hello, your ${name} custom element works!</h1>
    ';
  }
}
customElements.define('${name}', exampleElement);`
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