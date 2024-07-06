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
import { AdduserComponent } from 'src/app/pages/adduser/adduser.component';
import { GestionuserComponent } from 'src/app/pages/gestionuser/gestionuser.component';
import { GestionquestionsComponent } from 'src/app/pages/gestion-questions/gestion-questions.component';
import { GestionQuizComponent } from 'src/app/pages/gestion-quiz/gestion-quiz.component';
import { QuestionModalComponent } from 'src/app/pages/question-modal/question-modal.component';
import { QuizModalComponent } from 'src/app/pages/quiz-modal/quiz-modal.component';
import { ModalAffQuestionComponent } from 'src/app/pages/modal-aff-question/modal-aff-question.component';
import { ReponseComponent } from 'src/app/pages/reponse/reponse.component';
import { ReponseModalComponent } from 'src/app/pages/reponse-modal/ReponseModalComponent';
// import { ToastrModule } from 'ngx-toastr';

// Angular Material imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProjectManagementComponent } from 'src/app/pages/project-management/project-management.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PropositionManagementComponent } from 'src/app/pages/proposition-management/proposition-management.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule,
       // Angular Material modules
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule
        
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
    ListeCondidatComponent,
    OffreComponent,
    AdduserComponent,
    GestionuserComponent,
    GestionquestionsComponent,
    GestionQuizComponent,
    QuestionModalComponent,
    ProjectManagementComponent,
    PropositionManagementComponent,
    QuizModalComponent,
    
    ModalAffQuestionComponent,
    ReponseComponent,
    ReponseModalComponent,
    

    
  ]
})

export class AdminLayoutModule {}
