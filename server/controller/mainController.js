/**
 * Created by andrew on 2/2/17.
 */

var data = require('./../data.json'),
    crypto = require('crypto');

var mainController = function (resource) {
    this.resource = resource;
    this.db = data;
}

mainController.prototype.index = function () {
    this.resource.writeHead(200);
    this.resource.end('this is index page');
}
// mainController.prototype.getCredentials = function (data) {
//
//     this.db(data, function (data) {
//         if (!data.length) {
//             throw new Error('error');
//         }
//         return data;
//     })
// }

mainController.prototype.get = function (){

}

mainController.prototype.getCredentials = function (data) {
    var object = this,
        user = null,
        headerResponse = {
            'Content-Type': 'application/json'
        },
        arrLength = this.db.user.length,
        users = this.db.user;

    for (var key = 0; key < arrLength; key++) {
        if (users[key].email == data.email && users[key].password == data.password && users[key].status ==1) {
            user = users[key];
            break;
        }
    }

    if (user) {
        var token = crypto.randomBytes(256).toString('hex') // Synchronous

        if (!process.token) {
            process.token = [];
            process.token.push(token);
        }

        data = {
            token : token,
            body : user,
            status: true
        }
        object.resource.writeHead(200, headerResponse);
        object.resource.end(JSON.stringify(data));
    } else {
        object.resource.writeHead(401, headerResponse);
        object.resource.end(JSON.stringify({
            status: false,
            message: 'User is not administrator'
        }));
    }
    return user;
}

mainController.prototype.getById = function (id){
    //this.af.database.object(this.table+id);
}

mainController.prototype.save = function (id) {

}

module.exports = mainController;