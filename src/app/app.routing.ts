import { Routes, RouterModule } from '@angular/router';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    { path: '', component: StartingPageComponent },
    { path: 'home/:user', component: HomeComponent }
];

export const routing = RouterModule.forRoot(appRoutes);