import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { RoleGuard } from './_helpers/auth/RoleGuard';
import { AuthGuard } from './_helpers/auth/auth-guard.service';

import { EvaluationfComponent } from './front-pages/EvaluationF/evaluationf.component'; 

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ROLE_ADMIN','ROLE_MODERATOR'] }, // Assurez-vous que expectedRoles est défini

    children: [
      {
        path: '',
        
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
 {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: FrontLayoutComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ROLE_USER'] }, // Assurez-vous que expectedRoles est défini

    children: [
      {
        path: '',
        
        loadChildren: () => import('src/app/layouts/front-layout/front-layout.module').then(m => m.FrontLayoutModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  },

];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'dashboard',
//     pathMatch: 'full',
//   },
//   {
//     path: '',
//     component: AdminLayoutComponent,
//     canActivate: [RoleGuard],
//     data: { expectedRoles: ['admin', 'moderator'] },
//     children: [
//       {
//         path: '',
//         loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
//       }
//     ]
//   },
//   {
//     path: '',
//     component: AuthLayoutComponent,
//     canActivate: [AuthGuard],
//     children: [
//       {
//         path: '',
//         loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
//       }
//     ]
//   },
//   {
//     path: '',
//     component: FrontLayoutComponent,
//     canActivate: [RoleGuard],
//     data: { expectedRoles: ['user'] },
//     children: [
//       {
//         path: '',
//         loadChildren: () => import('src/app/layouts/front-layout/front-layout.module').then(m => m.FrontLayoutModule)
//       }
//     ]
//   },
//   {
//     path: '**',
//     redirectTo: 'login'
//   },
// ];

// @NgModule({
//   imports: [
//     CommonModule,
//     BrowserModule,
//     RouterModule.forRoot(routes,{
//       useHash: true
//     })
//   ],
//   exports: [
//   ],
// })
// export class AppRoutingModule { }
