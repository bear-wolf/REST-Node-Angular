import { Routes } from '@angular/router';

import {UserComponent} from "./components/user/user.component";
import {UserAddComponent} from "./components/user/user-add/user-add.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthorizationComponent} from "./components/authorization/authorization.component";

export const appRoutes: Routes = [
    { path: 'users', component: UserComponent, children:[
            { path: 'add', component: UserAddComponent},
            { path: ':id/edit', component: UserAddComponent}
        ] },
    { path: 'login', component: AuthorizationComponent, data:{} },
    { path: '', component: HomeComponent}
    // { path: '**', component: PageNotFoundComponent }
]