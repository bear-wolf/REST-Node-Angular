"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var settings_1 = require('../../settings');
require('rxjs/Rx');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.url = settings_1.Settings.server + 'users';
        this.server = settings_1.Settings.server;
        this.title = "Page of users";
        console.log('userService constructor()');
    }
    UserService.prototype.get = function () {
        return this.http.get(this.url)
            .map(function (data) {
            return JSON.parse(data['_body']);
        });
    };
    UserService.prototype.getById = function (id) {
        return this.http.get(this.url + id).map(function (data) { return JSON.parse(data['_body']); });
    };
    UserService.prototype.logIn = function (email, password) {
        var params = new http_1.URLSearchParams();
        params.set('email', email);
        params.set('password', password);
        return this.http.get(this.url, { search: params })
            .map(function (data) { return JSON.parse(data['_body']); });
    };
    UserService.prototype.logOut = function () {
        return this.http.post(this.server + 'logout/', {})
            .map(function (data) {
            return data;
        });
    };
    UserService.prototype.save = function (model) {
        var observer;
        if (model.id) {
            observer = this.http.put(this.url + model.id, model);
        }
        else {
            observer = this.http.post(this.url + model.id, model);
        }
        ;
        return observer.map(function (data) { JSON.parse(data['_body']); });
    };
    UserService.prototype.getCurrentUser = function () {
        var user = JSON.parse(sessionStorage.getItem('currentUser'));
        return user;
    };
    UserService.prototype.addSession = function (user) {
        sessionStorage.setItem('currentUser', user);
    };
    UserService.prototype.getSession = function () {
        sessionStorage.getItem('currentUser');
    };
    UserService.prototype.removeSession = function () {
        sessionStorage.removeItem('currentUser');
    };
    // Delete
    UserService.prototype.remove = function (id) {
        return this.http.delete(this.url + id)
            .map(function (data) { return JSON.parse(data['_body']); });
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
