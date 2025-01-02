import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FavouritepageComponent } from './pages/favouritepage/favouritepage.component';
import { RecentpageComponent } from './pages/recentpage/recentpage.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'favourite', component: FavouritepageComponent },
    { path: 'recent', component: RecentpageComponent }  
];
