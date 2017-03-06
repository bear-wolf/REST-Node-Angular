import {Injectable, Input} from '@angular/core';
import {Http, Response, URLSearchParams, RequestOptions, Request, Headers, RequestMethod} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import { Settings } from '../../settings';
import 'rxjs/Rx';
import {User} from "../../model/user";
import {AuthorizationService} from "../authorization/authorization.service";

@Injectable()
export class UserService {
    private url = Settings.server+'users/';
    public title = "Page of users";
    public getUsersAsObserver: Observable<Response>;
    private currentUser: User;
    private headers: Headers;

    constructor(private http: Http,
                private authService: AuthorizationService) {
        this.currentUser = this.authService.getCurrentUser();

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

        this.getUsers();
    }

    get (): Observable<User[]> {
        var request;

        request = new Request({
            url: this.url,
            method: RequestMethod.Get,
            headers: this.headers
        });
        return this.http.request(request).map((data)=>{ return JSON.parse(data['_body']);});
    }

    private getUsers() {
        var request;

        request = new Request({
            url: this.url,
            method: RequestMethod.Get,
            headers: this.headers
        });
        this.getUsersAsObserver = this.http.request(request);
    }

    getById (id:string): Observable<User>  {
        var request;

        request = new Request({
            url: this.url+id,
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
            observer = this.http.post(this.url, model);
        }

        this.getUsers();

        return observer.map(data=>{return JSON.parse(data['_body']);});
    }

    // Delete
    remove (id:number): Observable<User> {
        return this.http.delete(this.url+id)
            .map(data=> { return JSON.parse(data['_body'])});
    }
}
