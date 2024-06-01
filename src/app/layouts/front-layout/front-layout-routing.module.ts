import { Routes, RouterModule } from '@angular/router';

import { AcceuilComponent } from 'src/app/front-pages/acceuil/acceuil.component';
import { BlogComponent } from 'src/app/front-pages/blog/blog.component';


export const FrontLayoutRoutes: Routes = [
  { path: 'accueil',      component: AcceuilComponent },
  { path: 'blog',      component: BlogComponent },

 


];


