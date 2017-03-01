/**
 * Created by andrew on 2/1/17.
 */
// var url = require('url');
var mainController = require('./controller/mainController'),
    config = require('./config');

var route = function () {}
route.prototype.addHeader = function(res) {
    res.setHeader('Access-Control-Allow-Origin', config.urlOfClient); // для кросдоменного звязку // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // Request headers you wish to allow
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
}
route.prototype.init = function () {
    var object = this;

    this.app.use(function (req, res) {
        object.addHeader(res);

        if (req.method == 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Headers', ''); // Request methods you wish to allow
            res.statusCode = 200;
            res.end('');
        }
    });

    // GET method route
    this.app.get('/', function (req, res) {
        object.addHeader(res);
        res.send('GET request to the homepage');
    });

    this.app.get('/login', function (req, res) {
        if (req.query.email && req.query.password) {
            object.addHeader(res);
            (new mainController(res)).getCredentials(req.query);
        }
    });
    this.app.post('/logout', function (req, res) {
        var index = process.token.indexOf(req.headers.token)
        if (index>=0) {
            process.token.splice(index,1) // remove;
        }
        object.addHeader(res);
    });

    this.app.get('/users', function (req, res) {
        object.addHeader(res);
        (new mainController(res)).get();
    });

    this.app.post('/users', function (req, res) {
        object.addHeader(res);
        (new mainController(res)).save(req);
    });

    this.app.use(function (req, res) {
        res.statusCode = 404;
        res.end('Page no found');
    });

    this.app.use(function(err, req, res, next) {
        if (err) {
            res.statusCode = 500;
            console.error(err.stack);
            res.send('Something broke!');
        }
    });
}


module.exports = route;