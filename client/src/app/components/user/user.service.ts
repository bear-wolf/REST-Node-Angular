import {Injectable, Input} from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Request, Headers, RequestMethod} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import { Settings } from '../../settings';
import 'rxjs/Rx';
import {User} from "../../model/user";
import {AuthorizationService} from "../authorization/authorization.service";

@Injectable()
export class UserService {
    private url = Settings.server+'users';
    private server = Settings.server;
    public title = "Page of users";
    private currentUser: User;
    private headers: Headers;

    constructor(private http: Http,
                private authService: AuthorizationService) {
        console.log('userService constructor()');
        this.currentUser = this.authService.getCurrentUser();

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    get (): Observable<User[]> {
        var request;

        request = new Request({
            url: this.server+'users/',
            method: RequestMethod.Get,
            headers: this.headers
        });
        return this.http.request(request).map((data)=>{ return JSON.parse(data['_body']);});
    }
    getById (id:string): Observable<User>  {
        var request;

        request = new Request({
            url: this.server+'users/'+id,
            method: RequestMethod.Get,
            headers: this.headers
        });
        return this.http.request(request).map(data=>{ return JSON.parse(data['_body'])});
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

    // Delete
    remove (id:number): Observable<User> {
        return this.http.delete(this.url+id)
            .map(data=> { return JSON.parse(data['_body'])});
    }
}
