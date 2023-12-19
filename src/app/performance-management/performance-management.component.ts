import { Component } from '@angular/core';
import { MemberService } from '../member.service';
import { MemberData } from '../interfaces';

@Component({
  selector: 'app-performance-management',
  templateUrl: './performance-management.component.html',
  styleUrls: ['./performance-management.component.scss']
})
export class PerformanceManagementComponent {

  public includeArchived: boolean = false;
  public members: MemberData[];
  public selectedMemberId: number = 3;
  public ready: boolean = false;

  constructor(
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
    try{
      this.memberService.getMembers(this.includeArchived).subscribe(members => {
        this.members = members;
        this.ready = true;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
