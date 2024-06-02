import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';
import {FrontLayoutRoutes} from '../front-layout/front-layout-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ClipboardModule} from 'ngx-clipboard';


import { BlogPostComponent } from 'src/app/front-pages/blog/blog.component';
import { AcceuilComponent } from 'src/app/front-pages/acceuil/acceuil.component';
import { FrontLayoutComponent } from './front-layout.component';
import { CommentFormComponent } from 'src/app/front-pages/comment-form/comment-form.component';
import { ReactFormComponent } from 'src/app/front-pages/react-form/react-form.component';
import { BlogPostFormComponent } from 'src/app/front-pages/blog-post-form/blog-post-form.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FrontLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ClipboardModule,
        ReactiveFormsModule,
        FormsModule, // Ajoutez FormsModule ici

    ],
  declarations: [
    BlogPostComponent,
    AcceuilComponent,
    FrontLayoutComponent,
    CommentFormComponent,
    ReactFormComponent,
    BlogPostFormComponent

  ],
  exports:[FrontLayoutComponent]
})










export class FrontLayoutModule { }
