import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyersComponent } from './buyers.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';
import { BuyersService } from './buyers.service';
import { DialogAddComponent } from './components/dialog-add/dialog-add.component';
import { BuyersDetailComponent } from './pages/buyers-detail/buyers-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BuyersComponent,
    DialogEditComponent,
    DialogAddComponent,
    BuyersDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    BuyersComponent 
  ],
  providers: [BuyersService]
})
export class BuyersModule { }
