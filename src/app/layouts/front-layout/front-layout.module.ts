import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';
import {FrontLayoutRoutes} from '../front-layout/front-layout-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FrontLayoutComponent } from './front-layout.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FrontLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        RouterModule, // Assure-toi que RouterModule est importé ici si FrontLayoutComponent utilise le router-outlet

        ReactiveFormsModule,
    ],
  declarations: [
    FrontLayoutComponent


  ],
  exports: [
    FrontLayoutComponent
  ]
})



export class FrontLayoutModule { }
