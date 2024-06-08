import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

import { FrontLayoutRoutes } from '../front-layout/front-layout-routing.module';
import { FrontLayoutComponent } from './front-layout.component';
import { BlogPostComponent } from 'src/app/front-pages/blog/blog.component';
import { AcceuilComponent } from 'src/app/front-pages/acceuil/acceuil.component';
import { EvaluationfComponent } from 'src/app/front-pages/EvaluationF/evaluationf.component';
import { CommentFormComponent } from 'src/app/front-pages/comment-form/comment-form.component';
import { ReactFormComponent } from 'src/app/front-pages/react-form/react-form.component';
import { BlogPostFormComponent } from 'src/app/front-pages/blog-post-form/blog-post-form.component';
import { FormationComponent } from 'src/app/front-pages/Formation/formation.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FrontLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    FrontLayoutComponent,
    BlogPostComponent,
    AcceuilComponent,
    EvaluationfComponent,
    CommentFormComponent,
    ReactFormComponent,
    BlogPostFormComponent,
    FormationComponent
  ],
  exports: [FrontLayoutComponent]
})






export class FrontLayoutModule { }
