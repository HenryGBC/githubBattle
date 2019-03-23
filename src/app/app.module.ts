import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { GithubService } from './services/github/github.service';
import { AuthComponent } from './modules/auth/auth.component';
import { LoginGuardService } from './services/guards/login-guard.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [AuthGuardService, LoginGuardService, GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
