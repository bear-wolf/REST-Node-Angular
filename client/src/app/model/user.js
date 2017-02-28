"use strict";
var User = (function () {
    function User(obj) {
        this.id = obj && obj.id;
        this.password = obj && obj.password;
        this.email = obj && obj.email;
    }
    ;
    return User;
}());
exports.User = User;
