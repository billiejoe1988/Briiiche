import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyersComponent } from './buyers.component';
import { BuyersDetailComponent } from './pages/buyers-detail/buyers-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BuyersComponent,
  },
  { 
     path: 'details/:id',
     component: BuyersDetailComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyersRoutingModule {}
