import { Component, Input } from '@angular/core';
import { MemberDataDetail } from '../interfaces';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-performance-management-details',
  templateUrl: './performance-management-details.component.html',
  styleUrls: ['./performance-management-details.component.scss']
})
export class PerformanceManagementDetailsComponent {

  public memberDetails: MemberDataDetail;

  @Input() public member: number;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.getMemberDetails(this.member).subscribe(memberData => {
      this.memberDetails = memberData;
    });
  }
}
