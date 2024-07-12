import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ClipboardModule } from "ngx-clipboard";

<<<<<<< HEAD

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FrontLayoutRoutes } from '../front-layout/front-layout-routing.module';
import { FrontLayoutComponent } from './front-layout.component';
import { BlogPostComponent } from 'src/app/front-pages/blog/blog.component';
import { AcceuilComponent } from 'src/app/front-pages/acceuil/acceuil.component';
import { EvaluationfComponent } from 'src/app/front-pages/EvaluationF/evaluationf.component';
import { CommentFormComponent } from 'src/app/front-pages/comment-form/comment-form.component';
import { ReactFormComponent } from 'src/app/front-pages/react-form/react-form.component';
import { BlogPostFormComponent } from 'src/app/front-pages/blog-post-form/blog-post-form.component';
import { FormationComponent } from 'src/app/front-pages/Formation/formation.component';
import { CandidatComponent } from 'src/app/front-pages/candidat/candidat.component';
import { OffreCandidatComponent } from 'src/app/front-pages/offre-candidat/offre-candidat.component';
import { OffreDetailsComponent } from 'src/app/front-pages/offre-details/offre-details.component';
import { InscritModalComponent } from 'src/app/pages/inscrit-modal/inscrit-modal.component';
import { UserMarketplaceComponent } from 'src/app/front-pages/user-marketplace/user-marketplace.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserProjectsManagementComponent } from 'src/app/front-pages/user-projects-management/user-projects-management.component';
import { ProjectNotificationsComponent } from 'src/app/front-pages/project-notifications/project-notifications.component';
import { ChatComponent } from 'src/app/front-pages/chat/chat.component';
import { QuizComponent } from 'src/app/front-pages/quiz/quiz.component';
import { QuizDetailsComponent } from 'src/app/front-pages/quiz-details/quiz-details.component';
import { AddevalComponent } from 'src/app/pages/addeval/addeval.component';
import { PaymentComponent } from 'src/app/pages/payment/payment.component';

=======
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FrontLayoutRoutes } from "../front-layout/front-layout-routing.module";
import { FrontLayoutComponent } from "./front-layout.component";
import { BlogPostComponent } from "src/app/front-pages/blog/blog.component";
import { AcceuilComponent } from "src/app/front-pages/acceuil/acceuil.component";
import { EvaluationfComponent } from "src/app/front-pages/EvaluationF/evaluationf.component";
import { CommentFormComponent } from "src/app/front-pages/comment-form/comment-form.component";
import { ReactFormComponent } from "src/app/front-pages/react-form/react-form.component";
import { BlogPostFormComponent } from "src/app/front-pages/blog-post-form/blog-post-form.component";
import { FormationComponent } from "src/app/front-pages/Formation/formation.component";
import { CandidatComponent } from "src/app/front-pages/candidat/candidat.component";
import { OffreCandidatComponent } from "src/app/front-pages/offre-candidat/offre-candidat.component";
import { OffreDetailsComponent } from "src/app/front-pages/offre-details/offre-details.component";
import { InscritModalComponent } from "src/app/pages/inscrit-modal/inscrit-modal.component";
import { UserMarketplaceComponent } from "src/app/front-pages/user-marketplace/user-marketplace.component";
import { MatDialogModule } from "@angular/material/dialog";
import { UserProjectsManagementComponent } from "src/app/front-pages/user-projects-management/user-projects-management.component";
import { ProjectNotificationsComponent } from "src/app/front-pages/project-notifications/project-notifications.component";
import { ChatComponent } from "src/app/front-pages/chat/chat.component";
import { QuizComponent } from "src/app/front-pages/quiz/quiz.component";
import { QuizDetailsComponent } from "src/app/front-pages/quiz-details/quiz-details.component";
>>>>>>> 6de693e (Notif update)
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FrontLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    ClipboardModule,
  ],

  declarations: [
    BlogPostComponent,
    AcceuilComponent,
    FrontLayoutComponent,
    EvaluationfComponent,
    CommentFormComponent,
    ReactFormComponent,
    BlogPostFormComponent,
    FormationComponent,
    AddevalComponent,
    CandidatComponent,
    OffreCandidatComponent,
    OffreDetailsComponent,
    InscritModalComponent,
    UserMarketplaceComponent,
    UserProjectsManagementComponent,
    ProjectNotificationsComponent,
    ChatComponent,
    QuizComponent,
<<<<<<< HEAD
    QuizDetailsComponent,
    PaymentComponent
=======

    QuizDetailsComponent,
>>>>>>> 6de693e (Notif update)
  ],
  exports: [FrontLayoutComponent],
})
export class FrontLayoutModule {}
