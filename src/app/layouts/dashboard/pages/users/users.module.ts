import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {MatTableModule} from '@angular/material/table';
import { UsersFormComponent } from './components/users-form/users-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { FullNamePipe } from '../../../../shared/pipeFullName';
import { UppercaseTitlesDirective } from '../../../../shared/uppercasetitles.directive';
import { UsersService } from '../../../../core/services/users.service';
import { UsersMockService } from '../../../../core/services/users-mock.service';


@NgModule({
  declarations: [UsersComponent, UsersFormComponent, FullNamePipe, UppercaseTitlesDirective],
  imports: [
    CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatIconModule,
  ],
  exports: [UsersComponent],
  providers: [
    UsersService,
    {
      provide: UsersService,
      useClass: UsersMockService,
    }
  ],
})
export class UsersModule { }
