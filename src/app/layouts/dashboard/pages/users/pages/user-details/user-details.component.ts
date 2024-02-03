import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { User } from '../../models/index';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailComponent {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private loadingService: LoadingService
  ) {
    this.loadingService.setIsLoading(true);
    this.route.params.pipe(
      switchMap(params => this.usersService.getUserById(params['id']))
    ).subscribe({
      next: (foundUser: User | undefined) => {
        this.user = foundUser;
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }
}
