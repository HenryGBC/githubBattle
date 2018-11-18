import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { AuthGuardService } from './services/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate:[AuthGuardService],
    children: [
      {
        path: 'battle',
        loadChildren: './modules/battle/battle.module#BattleModule'
      }
    ]
  },
  {  path: '**', redirectTo: 'battle' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
