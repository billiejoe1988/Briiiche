import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyersComponent } from './buyers.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogAddComponent } from './components/dialog-add/dialog-add.component';
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';
import { BuyersService } from './buyers.service';

@NgModule({
  declarations: [
    BuyersComponent,
    DialogAddComponent,
    DialogEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    BuyersComponent 
  ],
  providers: [BuyersService]
})
export class BuyersModule { }
