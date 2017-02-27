import { Routes } from '@angular/router';

import {UserComponent} from "./components/user/user.component";
import {UserAddComponent} from "./components/user/user-add/user-add.component";
import {HomeComponent} from "./components/home/home.component";

export const appRoutes: Routes = [
    { path: 'users', component: UserComponent, children:[
            { path: 'add', component: UserAddComponent}
        ] },
    { path: '', component: HomeComponent}
    // { path: '**', component: PageNotFoundComponent }
]