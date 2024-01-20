import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { MembersComponent } from './members/members.component';
import { PerformanceManagementComponent } from './performance-management/performance-management.component';
import { LoginComponent } from './login/login.component';
import { PerformanceManagementDetailsComponent } from './performance-management-details/performance-management-details.component';
import { nationalGuard } from './national.guard';
import { localGuard } from './local.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [nationalGuard]
  },
  {
    path: 'recruitment',
    component: RecruitmentComponent,
    canActivate: [localGuard]
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [localGuard]
  },
  {
    path: 'performance-management',
    component: PerformanceManagementComponent,
    canActivate: [localGuard],
    children: [
      {
        path: ':id',
        component: PerformanceManagementDetailsComponent,
        outlet: 'member'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
