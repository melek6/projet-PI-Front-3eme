import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FrontLayoutModule } from './layouts/front-layout/front-layout.module';
import { AuthService } from './_services/auth.service';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AuthGuard } from './_helpers/auth/auth-guard.service';
import { OffreComponent } from './pages/offre/offre.component';
import { AddOffreComponent } from './pages/add-offre/add-offre.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
<<<<<<< HEAD
    AuthLayoutComponent

=======
    AuthLayoutComponent,
  
>>>>>>> d33404e (feat: create)
      ],
  providers: [
    AuthService,
    authInterceptorProviders,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
