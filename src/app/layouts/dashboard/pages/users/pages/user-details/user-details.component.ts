import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { UserWithCoursesAndInscriptions, Course, Inscription } from '../../models/complete';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user: UserWithCoursesAndInscriptions | undefined;
  userInscriptions: Inscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.usersService.getUserByIdWithCoursesAndInscriptions(userId).subscribe(user => {
          this.user = user;
          this.userInscriptions = user.inscriptions;
        });
      }
    });
  }
  
  goBackToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  deleteInscription(inscriptionId: string): void {
    const userId = this.user?.id;
    if (userId && inscriptionId) {
      this.usersService.deleteInscription(userId, inscriptionId).subscribe(() => {
      });
    }
  }
}
