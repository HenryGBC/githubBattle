import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  userOneForm: FormGroup;
  userTwoForm: FormGroup;
  users: any;

  constructor(private formBuilder: FormBuilder) { 
    this.users = {
      'userOne': undefined,
      'userTwo': undefined
    };
  }

  ngOnInit() {
    this._buildForms();
  }

  submitUser(form: any){
    if (form.valid) {
      console.log(form.value);
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
