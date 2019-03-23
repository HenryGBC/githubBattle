import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
// import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  baseUrl: string;
  constructor(private http:HttpClient, public afAuth: AngularFireAuth) {
    this.baseUrl = 'https://api.github.com/';
  }

  getUser(username){
    const concatUrl = `${this.baseUrl}users/${username}`;
    return this.http.get<User>(concatUrl);
  }

  getUsers(query){
    const concatUrl = `${this.baseUrl}search/users?q=${query}`;
    return this.http.get(concatUrl);
  }

  getToken(){
		return JSON.parse(localStorage.getItem("github.token"));
  }
  isLogin(){
    return false;
  }
  getOwnUser(){
    return JSON.parse(localStorage.getItem('github.profile'));
  }

  loginGithub(){
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('repo');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }
}
