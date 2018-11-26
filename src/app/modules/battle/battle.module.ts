import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattleRoutingModule } from './battle-routing.module';
import { BattleComponent } from './battle.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BattleRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [BattleComponent]
})
export class BattleModule { }
