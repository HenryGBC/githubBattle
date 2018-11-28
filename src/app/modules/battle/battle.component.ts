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


  constructor(private formBuilder: FormBuilder, private githubService:GithubService) { 
    this.manageUsers = {
      'userOne': {loading: false, errors: {valid: false, backend: false}},
      'userTwo': {loading: false, errors: {valid: false, backend: false}}
    };
  }

  ngOnInit() {
    this._buildForms();
  }

  submitUser(form: any){
    console.log(form.value);
    const typeUser = form.value.type;
    this.manageUsers = {
      'userOne': {loading: false, errors: {valid: false, backend: false}},
      'userTwo': {loading: false, errors: {valid: false, backend: false}}
    };
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
