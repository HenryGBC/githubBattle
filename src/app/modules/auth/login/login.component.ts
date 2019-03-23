import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github/github.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private githubService: GithubService,
    private router: Router) { }

  ngOnInit() {
    console.log('sss');
  }


  login(){
     this.githubService.loginGithub()
     .then(res => {
        console.log(res);
        localStorage.setItem('github.profile', JSON.stringify(res.additionalUserInfo.profile));
        localStorage.setItem('github.token', JSON.stringify(res.credential.accessToken));

        this.router.navigate(['/battle']);
      })
  }

}
