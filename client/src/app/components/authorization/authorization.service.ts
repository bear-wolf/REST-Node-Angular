/**
 * Created by andrew on 3/1/17.
 */
import {Injectable, Input} from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import { Settings } from '../../settings';
import 'rxjs/Rx';
import {User} from "../../model/user";

@Injectable()
export class AuthorizationService {

    private url = Settings.server+'login';
    private server = Settings.server;

    constructor(private http: Http) {
        console.log('AuthorizationService constructor()');
    }

    logIn(email:string, password: string): Observable<User> {
        let params = new URLSearchParams();
        params.set('email', email);
        params.set('password', password);

        return this.http.get(this.url, { search: params })
            .map(data=>{ return JSON.parse(data['_body'])});
    }
    logOut(): Observable<any> {
        return this.http.post(this.server+'logout/',{})
            .map(data=>{
                return data;
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

    getCurrentUser() {
        let user:User = JSON.parse(sessionStorage.getItem('currentUser'));
        return user;
    }
}
