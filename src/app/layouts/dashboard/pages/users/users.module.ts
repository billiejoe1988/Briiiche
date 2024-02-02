import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {MatTableModule} from '@angular/material/table';
import { UsersFormComponent } from './components/users-form/users-form.component';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { UsersService } from './users.service';
import { UserDetailComponent } from './pages/user-details/user-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatIconModule, RouterModule, SharedModule,
  ],
  exports: [UsersComponent],
  providers: [UsersService],
})
export class UsersModule { }
