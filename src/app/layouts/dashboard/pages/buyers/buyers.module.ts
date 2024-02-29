import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyersComponent } from './buyers.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';
import { BuyersService } from './buyers.service';
import { DialogAddComponent } from './components/dialog-add/dialog-add.component';

@NgModule({
  declarations: [
    BuyersComponent,
    DialogEditComponent,
    DialogAddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    BuyersComponent 
  ],
  providers: [BuyersService]
})
export class BuyersModule { }
