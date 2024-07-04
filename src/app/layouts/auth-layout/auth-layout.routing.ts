import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ForgotMDPComponent } from 'src/app/pages/forgot-mdp/forgot-mdp.component';
import { VerifyComponent } from 'src/app/pages/Verify/verify/verify.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'resetMDP',       component: ForgotMDPComponent },
    { path: 'verif',       component: VerifyComponent },


];
