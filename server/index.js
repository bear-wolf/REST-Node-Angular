/**
 * Created by andrew on 2/1/17.
 */
var app,
    http = require('http'),
    express = require('express'),
    routes = require('./routes');

app = express();
app.set('port', 3001);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port '+ app.get('port'));
    var route = new routes();
    route.app = app;
    route.express = express;
    route.init();
})

process.on('exit', function (code) {
    console.log('About to exit with code:'+code);
});
