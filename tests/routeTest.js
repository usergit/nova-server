// this module will include all the route testing, just has one test for sample
const request     = require('supertest'),
      application = require('../app');

request(application.app)
    .post('/api/handleRequest')
    .send({name: 'testName', email: 'testEmail', country: "testCountry", passportNo: "testPassportNo"})
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
        if (err) throw err;
    });

// close server
application.server.close();