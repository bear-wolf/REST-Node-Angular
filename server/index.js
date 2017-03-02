/**
 * Created by andrew on 2/1/17.
 */
var app,
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./routes');

app = express();
app.set('port', 3001);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port '+ app.get('port'));
    var route = new routes();

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json()) // parse application/json

    route.app = app;
    route.express = express;
    route.init();
})
// process.on('exit', function (code) {
//     console.log('About to exit with code:'+code);
// });
// process.on('finish', function() {
//     console.log('request end');
// });