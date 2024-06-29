import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddOffreComponent } from 'src/app/pages/add-offre/add-offre.component';
import { OffreComponent } from 'src/app/pages/offre/offre.component';
import { GestionFormationComponent } from 'src/app/pages/gestion-formation/gestion-formation.component';
import { FormationModalComponent } from 'src/app/pages/formation-modal/formation-modal.component';
import { EvalformationModalComponent } from 'src/app/pages/evalformation-modal/evalformation-modal.component';
import { GestionEvalformationComponent } from 'src/app/pages/gestion-evalformation/gestion-evalformation.component';
import { ListeCondidatComponent } from 'src/app/pages/liste-condidat/liste-condidat.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    AddOffreComponent,
    OffreComponent,
    GestionFormationComponent,
    FormationModalComponent,
    EvalformationModalComponent,
    GestionEvalformationComponent,
    ListeCondidatComponent
  ]
})

export class AdminLayoutModule {}
