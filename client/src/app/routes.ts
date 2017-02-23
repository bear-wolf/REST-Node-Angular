import { Routes } from '@angular/router';

import {UserComponent} from "./components/user/user.component";
import {UserAddComponent} from "./components/user/user-add/user-add.component";
import {AppComponent} from "./components/layout/app.component";

export const appRoutes: Routes = [
    { path: 'users', component: UserComponent, children:[
            { path: 'add', component: UserAddComponent}
        ] },
    { path: '', component: AppComponent}
    // { path: '**', component: PageNotFoundComponent }
]