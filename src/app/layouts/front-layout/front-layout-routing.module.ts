import { Routes, RouterModule } from '@angular/router';

import { AcceuilComponent } from 'src/app/front-pages/acceuil/acceuil.component';
import { BlogPostFormComponent } from 'src/app/front-pages/blog-post-form/blog-post-form.component';
import { BlogPostComponent } from 'src/app/front-pages/blog/blog.component';


export const FrontLayoutRoutes: Routes = [
  { path: 'accueil',      component: AcceuilComponent },
  { path: 'blog',      component: BlogPostComponent },
  { path: 'create-blog-post', component: BlogPostFormComponent },
  { path: 'edit-blog-post/:id', component: BlogPostFormComponent }

 


];


