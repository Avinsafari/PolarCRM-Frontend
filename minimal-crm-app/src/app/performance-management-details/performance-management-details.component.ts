import { Component, Input } from '@angular/core';
import { MemberDataDetail, MemberStages } from '../interfaces';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-performance-management-details',
  templateUrl: './performance-management-details.component.html',
  styleUrls: ['./performance-management-details.component.scss']
})
export class PerformanceManagementDetailsComponent {

  public memberDetails: MemberDataDetail;
  public ready: boolean = false;
  public panelOpenState: boolean = false;
  public currentMemberStatus: string;
  public memberStages: MemberStages[] = [
    {value: 'accepted', displayValue: 'Accepted'},
    {value: 'approved', displayValue: 'Approved'},
    {value: 'realized', displayValue: 'Realized'},
    {value: 'finished', displayValue: 'Finished'},
    {value: 'completed', displayValue: 'Completed'},
    {value: 'dropped', displayValue: 'Dropped'},
    {value: 'terminated', displayValue: 'Terminated'},
    {value: 'advanced', displayValue: 'Advanced'},
    {value: 'alumni', displayValue: 'Alumni'}
  ];

  @Input() public memberId: number;

  constructor(
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
    try {
      this.memberService.getMemberDetails(this.memberId).subscribe(memberData => {
        this.memberDetails = memberData;
        this.currentMemberStatus = this.memberDetails.status;
        this.ready = true;
      });
    } catch (error) {
      console.log(error);
    }
  }

  public saveMemberChanges() {

  }
}
