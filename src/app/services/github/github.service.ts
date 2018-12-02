import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class GithubService {
  baseUrl: string;
  constructor(private http:HttpClient) {
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
}
