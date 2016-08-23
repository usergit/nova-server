const express = require('express'),
      api     = require('./api/apiController');

const app = express();

app.use('/api', api);
app.use(express.static('public'));

app.set('port', (process.env.PORT || 5000));
var server = app.listen(app.get('port'), () => console.log('app is running on port', app.get('port')));

module.exports = {app: app, server: server};