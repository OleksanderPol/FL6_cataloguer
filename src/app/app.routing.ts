import { Routes, RouterModule } from '@angular/router';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { GlobalSearchItemsComponent } from './global-search-items/global-search-items.component';

const appRoutes: Routes = [
    { path: '', component: StartingPageComponent },
    { path: 'home/:user', component: HomeComponent,
      children: [
          {
              path: '',
              component: CategoriesComponent
          },
          {
              path: ':category',
              component: CategoryItemsComponent
          },
          {
              path: 'items/search/:search',
              component: GlobalSearchItemsComponent
          }
      ]
    },
    { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
