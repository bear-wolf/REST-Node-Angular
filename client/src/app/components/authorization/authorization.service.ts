/**
 * Created by andrew on 3/1/17.
 */
import {Injectable, Input} from '@angular/core';
import {Http, Response, Request, URLSearchParams, RequestOptions, Headers, RequestMethod} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import { Settings } from '../../settings';
import 'rxjs/Rx';
import {User} from "../../model/user";

@Injectable()
export class AuthorizationService {

    private url = Settings.server+'login';
    private server = Settings.server;

    constructor(private http: Http) {
    }

    logIn(email:string, password: string): Observable<User> {
        let params = new URLSearchParams();
        params.set('email', email);
        params.set('password', password);

        return this.http.get(this.url, { search: params })
            .map(data=>{ return JSON.parse(data['_body'])});
    }
    logOut(token: string): Observable<any> {
        var request,
            headers = new Headers();

        headers.append('Content-Type', 'application/json');

        request = new Request({
            url: this.server+'logout/',
            method: RequestMethod.Post,
            headers: headers
        });
        request._body = JSON.stringify({token: token});
        return this.http.request(request).map(data=>{ return JSON.parse(data['_body']);});
    }

    isAuthByToken(token: string) : Observable<any> {
        let request,
            headers = new Headers();

        headers.append('Content-Type', 'application/json');
        request = new Request({
            url: this.server+'isAuth',
            method: RequestMethod.Post,
            headers: headers
        });

        request._body = JSON.stringify({token: token});
        return this.http.request(request).map(data=> {
            return JSON.parse(data['_body']);
        });
    }

    addSession(user){
        sessionStorage.setItem('currentUser', user);
    }
    getSession() {
        sessionStorage.getItem('currentUser');
    }
    removeSession() {
        sessionStorage.removeItem('currentUser');
    }

    getCurrentUser(): User {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    }
}
