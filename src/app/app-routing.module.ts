import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { AuthComponent } from './modules/auth/auth.component';
import { LoginGuardService } from './services/guards/login-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate:[AuthGuardService],
    children: [
      {
        path: 'battle',
        loadChildren: './modules/battle/battle.module#BattleModule'
      },
      {
        path: 'search',
        loadChildren: './modules/search/search.module#SearchModule'
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [LoginGuardService],
    children: [
      {
        path: '',
        loadChildren: './modules/auth/auth.module#AuthModule'
      }
    ]
  },
  {  path: '**', redirectTo: 'auth/login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
