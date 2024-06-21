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
import { ProjectManagementComponent } from 'src/app/front-pages/project-management/project-management.component';
import { BrowserModule } from '@angular/platform-browser';
import { MarketplaceComponent } from 'src/app/front-pages/marketplace/marketplace.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FrontLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ClipboardModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
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
