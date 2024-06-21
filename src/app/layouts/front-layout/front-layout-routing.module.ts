import { Routes, RouterModule } from '@angular/router';
import { EvaluationfComponent } from 'src/app/front-pages/EvaluationF/evaluationf.component';

import { AcceuilComponent } from 'src/app/front-pages/acceuil/acceuil.component';
import { BlogPostFormComponent } from 'src/app/front-pages/blog-post-form/blog-post-form.component';
import { BlogPostComponent } from 'src/app/front-pages/blog/blog.component';
import { FormationComponent } from 'src/app/front-pages/Formation/formation.component';
import { ProjectManagementComponent } from 'src/app/front-pages/project-management/project-management.component';
import { MarketplaceComponent } from 'src/app/front-pages/marketplace/marketplace.component';

export const FrontLayoutRoutes: Routes = [
  { path: 'accueil',      component: AcceuilComponent },
  { path: 'blog',      component: BlogPostComponent },
  { path: 'create-blog-post', component: BlogPostFormComponent },
  { path: 'edit-blog-post/:id', component: BlogPostFormComponent },
  { path: 'evaluationf', component: EvaluationfComponent},
  { path: 'formation', component: FormationComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'project-management', component: ProjectManagementComponent }


];


