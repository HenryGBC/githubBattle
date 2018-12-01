import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../interfaces/user';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})

export class UserCardComponent implements OnInit {

  @Input() user: User;
  @Output() clearHandler = new EventEmitter();

  constructor() { }
  
  ngOnInit() {
    console.log(this.user);
  }

  clear(){
    this.clearHandler.emit(true);
  }

}
