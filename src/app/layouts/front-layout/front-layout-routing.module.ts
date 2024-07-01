import { Routes, RouterModule } from '@angular/router';
import { EvaluationfComponent } from 'src/app/front-pages/EvaluationF/evaluationf.component';

import { AcceuilComponent } from 'src/app/front-pages/acceuil/acceuil.component';
import { BlogPostFormComponent } from 'src/app/front-pages/blog-post-form/blog-post-form.component';
import { BlogPostComponent } from 'src/app/front-pages/blog/blog.component';
import { FormationComponent } from 'src/app/front-pages/Formation/formation.component';
import { CandidatComponent } from 'src/app/front-pages/candidat/candidat.component';
import { OffreCandidatComponent } from 'src/app/front-pages/offre-candidat/offre-candidat.component';
import { OffreDetailsComponent } from 'src/app/front-pages/offre-details/offre-details.component';
import { InscritFormationComponent } from 'src/app/front-pages/InscriptionFormation/inscritformation.component';

export const FrontLayoutRoutes: Routes = [
  { path: 'accueil',      component: AcceuilComponent },
  { path: 'blog',      component: BlogPostComponent },
  { path: 'create-blog-post', component: BlogPostFormComponent },
  { path: 'edit-blog-post/:id', component: BlogPostFormComponent },
  { path: 'evaluationf', component: EvaluationfComponent},
  { path: 'formation', component: FormationComponent },
  { path: 'candidat', component: CandidatComponent },
  { path: 'OffreCandidat', component: OffreCandidatComponent },
  { path: 'offre/:id', component: OffreDetailsComponent },
  { path: 'candidat/:id', component: CandidatComponent }, // Route pour afficher les détails de l'offre avec l'ID comme paramètre
  { path: 'inscrit', component: InscritFormationComponent }



];

