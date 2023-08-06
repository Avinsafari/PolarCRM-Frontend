import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { MyLcComponent } from './my-lc/my-lc.component';
import { GoalSettingComponent } from './goal-setting/goal-setting.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'recruitment', component: RecruitmentComponent},
  {path: 'my-lc', component: MyLcComponent},
  {path: 'goal-setting', component: GoalSettingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
