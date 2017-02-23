import {Injectable, Input} from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Headers} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import { Settings } from '../../settings';
import 'rxjs/Rx';
import {User} from "../../model/user";

@Injectable()
export class UserService {
    private url = Settings.server+'users';
    public title = "Page of users";

    constructor(private http: Http) {
        console.log('userService constructor()');
    }

    get (): Observable<User[]> {
        return this.http.get(this.url)
            .map(
                data=>{
                    return JSON.parse(data['_body']);
                });
    }
    getById (id:string): Observable<User>  {
        return this.http.get(this.url+id).map(data=>{ return JSON.parse(data['_body'])});
    }

    logIn(email:string, password: string): Observable<User> {
        let params = new URLSearchParams();
        params.set('email', email);
        params.set('password', password);

        return this.http.get(this.url, { search: params })
            .map(data=>{ return JSON.parse(data['_body'])});
    }
    logOut() {

    }

    save (model:User): Observable<User> {
        let observer;

        if (model.id) {
            observer = this.http.put(this.url+model.id, model);
        } else {
            observer = this.http.post(this.url+model.id, model);
        };

        return observer.map(data=>{JSON.parse(data['_body'])});
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

    // Delete
    remove (id:number): Observable<User> {
        return this.http.delete(this.url+id)
            .map(data=> { return JSON.parse(data['_body'])});
    }
}
