/**
 * Created by andrew on 2/2/17.
 */

var fileOfData = 'data.json',
    data = require('./../'+ fileOfData),
    crypto = require('crypto'),
    fs = require('fs');

var mainController = function (resource) {
    this.resource = resource;
    this.db = data;
    this.fs = fs;
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

mainController.prototype.removeById = function (id) {
    var data,
        label = false,
        object = this,
        users = this.db.user,
        arrLength = users.length;

    for (var key = 0; key < arrLength; key++) {
        if (users[key].id == id) {
            users.splice(key, 1);
            label = true;
            break;
        }
    }

    if (label) {
        data = {
            status: true
        }
        object.resource.writeHead(200);
        object.resource.end(JSON.stringify(data));
    }
}
mainController.prototype.get = function () {
    var data,
        object = this,
        list = [],
        arrLength = this.db.user.length,
        users = this.db.user;

    for (var key = 0; key < arrLength; key++) {
        if (!users[key].status) {
            list.push(users[key]);
        }
    }

    data = {
        body : list,
        status: true
    }
    object.resource.writeHead(200);
    object.resource.end(JSON.stringify(data));
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
    var data,
        object = this,
        list = [],
        arrLength = this.db.user.length,
        users = this.db.user;

    for (var key = 0; key < arrLength; key++) {
        if (!users[key].status && users[key].id == id) {
            list.push(users[key]);
            break;
        }
    }

    data = {
        body : list[0],
        status: true
    }
    object.resource.writeHead(200);
    object.resource.end(JSON.stringify(data));
}

mainController.prototype.save = function (data) {
    var json,
        object = this,
        listOfUsers = this.db.user;

    data.id = listOfUsers.length+1;
    listOfUsers.push(data);
    json = JSON.stringify(this.db);

    this.fs.writeFile(fileOfData, json, 'utf8', function (data) {
        var _data = {
            status: true
        }
        object.resource.writeHead(200);
        object.resource.end(JSON.stringify(_data));
    });
}

module.exports = mainController;