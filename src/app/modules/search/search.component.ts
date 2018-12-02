import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github/github.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userQuery: string;
  users: any[];
  constructor(private githubService:GithubService) { }

  ngOnInit() {
  }


  search(){
    this.githubService.getUsers(this.userQuery)
      .subscribe((response: any) => {
        console.log(response);
        this.users = response.items;
      }, error=>{
        console.log(error);
      });
  }

}
