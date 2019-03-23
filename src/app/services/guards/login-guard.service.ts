import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GithubService } from '../github/github.service';

@Injectable()
export class LoginGuardService implements CanActivate{


  constructor(private router: Router, private githubService:GithubService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    const token = this.githubService.getToken();
    if (token) {
      return false;
    }
    return true;
  }

}