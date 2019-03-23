import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GithubService } from '../../services/github/github.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  userOneForm: FormGroup;
  userTwoForm: FormGroup;
  userOne: User;
  userTwo: User;
  manageUsers: any;
  usersTied: boolean;
  showResult: boolean;
  userWinner: User;


  constructor(private formBuilder: FormBuilder, private githubService:GithubService) { 
    this.manageUsers = {
      'userOne': {loading: false, win: false, errors: {valid: false, backend: false}},
      'userTwo': {loading: false, win: false, errors: {valid: false, backend: false}}
    };
    this.usersTied =  false;
  }

  ngOnInit() {
    this._buildForms();
    console.log(this.githubService.getOwnUser());
    this.userOne = this.githubService.getOwnUser();
  }

  submitUser(form: any){
    const typeUser = form.value.type;
    this.manageUsers[typeUser] = {loading: false, errors: {valid: false, backend: false}};
    if (form.valid) {
      this.manageUsers[typeUser]['loading'] = true;
      this.githubService.getUser(form.value[typeUser])
        .subscribe((data: User) => {
          if(typeUser == 'userOne'){
            this.userOne = { ...data };
            console.log(this.userOne);
          } else {
            this.userTwo = { ...data };
            console.log(this.userTwo);
          }
          this.manageUsers[typeUser]['loading'] = false;

        }, error=>{
          console.log(error);
          this.manageUsers[typeUser]['loading'] = false;
          this.manageUsers[typeUser]['errors']['backend'] = true;

        });
    } else {
      this.manageUsers[typeUser]['errors']['valid'] = true;
    }
  }

  clear(event, type){
    console.log(event, type);
    if(type == 'userOne'){
      this.userOneForm.reset();
      this.userOne = undefined;
    }
    if(type == 'userTwo'){
      this.userTwoForm.reset();
      this.userTwo = undefined;
    }
  }

  fight() {
    const valueUserOne = this._calcPoints(this.userOne);
    const valueUserTwo = this._calcPoints(this.userTwo);
    console.log(valueUserOne, valueUserTwo);
    let winner = 'tied'
    if(valueUserOne > valueUserTwo) {
      winner = 'userOne';
      this.userWinner = this.userOne;
    }
    if(valueUserOne < valueUserTwo) {
      this.userWinner = this.userTwo;
    }
    if(valueUserOne == valueUserTwo){
      this.usersTied = true;
    }
    this.showResult = true;
  }

  closeResult(){
    this.showResult = false;
  }


  private _calcPoints(user: User){
    const valuesPoints = {
      public_repos: 3,
      public_gists: 3,
      followers: 2,
      following: 1
    };
    return Object.keys(valuesPoints)
          .map(value => user[value] * valuesPoints[value])
          .reduce((total, point) => total + point, 0);

  }

  private _buildForms() {
    this.userOneForm = this.formBuilder.group({
      userOne:  ['', [Validators.required]],
      type: 'userOne'
    });
    this.userTwoForm = this.formBuilder.group({
      userTwo:  ['', [Validators.required]],
      type: 'userTwo'
    });

  }

}
