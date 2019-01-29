var request = require('supertest'), expect = require('chai').expect;

describe('loading express', function () {
  let server;
  
  beforeEach(() => {
    server = require('../server.js');
  });
  
  afterEach(function () {
    server.close();
  });
  
  it('responds to /something.js with 200', (done) => {
    request(server)
      .get('/something.js')
      .expect(200, done);
  });

  it('responds to /something with 404', (done) => {
    request(server)
      .get('/something')
      .expect(404, done);
  });

  it('responds to /something.js with text/plain content-type', (done) => {
    request(server)
      .get('/something.js')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, done);
  });

  it('responds to /something.js with an example HTMLElement', (done) => {
    request(server)
      .get('/something.js')
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.contain('class exampleElement extends HTMLElement');
        done();
      });
  });

  it('responds to /something.js with correct custom elements definition', (done) => {
    request(server)
      .get('/something.js')
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.contain('customElements.define(\'something\', exampleElement);');
        done();
      });
  });

});