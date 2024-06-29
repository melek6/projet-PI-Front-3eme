import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { OffreComponent } from 'src/app/pages/offre/offre.component';
import { AddOffreComponent } from 'src/app/pages/add-offre/add-offre.component';
import { GestionFormationComponent } from 'src/app/pages/gestion-formation/gestion-formation.component';
import { GestionEvalformationComponent } from 'src/app/pages/gestion-evalformation/gestion-evalformation.component';
import { ListeCondidatComponent } from 'src/app/pages/liste-condidat/liste-condidat.component';
import { GestionuserComponent } from 'src/app/pages/gestionuser/gestionuser.component';
import { AdduserComponent } from 'src/app/pages/adduser/adduser.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'offre',          component: OffreComponent },
    { path: 'gestformation',      component: GestionFormationComponent },
    { path: 'gestevalformation',      component: GestionEvalformationComponent },
    { path: 'listecondidat',      component: ListeCondidatComponent },
    { path: 'offre',           component: OffreComponent },
    { path: 'Ajouter',           component: AddOffreComponent },
    { path: 'gestionuser',           component: GestionuserComponent },
    { path: 'adduser',           component: AdduserComponent }


];
