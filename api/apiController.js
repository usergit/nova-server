"use strict";
const express    = require('express'),
      bodyParser = require('body-parser'),
      request    = require('request');

const router = express.Router();

const sanitizer = (req, res, next) => {
    // I would sanitize input here, using express-validator
    next()
};

const validator = (req, res, next) => {
    // I would validate input here, using express-validator and I would use a schema for that
    next()
};

const jsonParser = bodyParser.json();

/*
 3. The endpoint on the Nova server  should fetch the request and fake a compilation of data.
 Upon compilation it will send a status 200 back to the iframe with a random message.
 I.e. arrows 4 and 5 in the diagram can be ignored.
 */
router.post('/handleRequest', sanitizer, validator, jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    // fake compilation of data
    const sanitizedValidatedData = req.body.name + req.body.email + req.body.country + req.body.passportNo;

    // fake nova credit passport, generated from hitting credit bureau server, for now fake data
    const novaCreditPassport = {"name": "Johan Cruijff", "passportNo": "1"};

    // make a secure server to server API transfer to lenders endpoint
    request({
        url   : 'http://localhost:3000/api/lenderEndPoint', // URL to hit
        method: 'POST',
        json  : novaCreditPassport,
        auth: {
            'user': 'nova',
            'pass': 'novaPassword',
            'sendImmediately': false
        }
    }, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);
        }
    });

    let randomData = Math.random().toString(36).substring(7);
    res.json({randomData: randomData});
});

module.exports = router;