import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { RegisterFormComponent } from './authentication/register-form/register-form.component';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './authentication/logout-component/logout.component';
import { CreatePointComponent } from './components/create-point/create-point.component';
import { ExplorePageComponent } from './components/explore/explore-page/explore-page.component';
import { DetailsPageComponent } from './components/details/details-page/details-page.component';

// Guards
import { AuthGuard } from './guards/auth.guard.service';
import { ProfileComponent } from './components/users/profile/profile.component';
import { EditPageComponent } from './components/edit/edit-page/edit-page.component';

const routes : Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [ AuthGuard ], component: HomeComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'new', canActivate: [ AuthGuard ], component: CreatePointComponent },
  { path: 'explore/:type', canActivate: [ AuthGuard ], component: ExplorePageComponent },
  { path: 'explore', canActivate: [ AuthGuard ], component: ExplorePageComponent },
  { path: 'details/:id', canActivate: [ AuthGuard ], component: DetailsPageComponent },
  { path: 'user/:action/:username', canActivate: [ AuthGuard ], component: ProfileComponent },
  { path: 'edit/:id', canActivate: [ AuthGuard ], component: EditPageComponent }
]
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutesModule {  }
