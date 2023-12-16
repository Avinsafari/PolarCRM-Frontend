import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberDataDetail, Comment } from '../interfaces';
import { MemberService } from '../member.service';
import { DatetimeService } from '../datetime.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.scss']
})
export class MembersDetailComponent implements OnInit {
  ready: boolean = false;
  form: FormGroup;
  comments: string[];
  newComment: string;
  memberDetails: MemberDataDetail;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<MembersDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public id: number,
      private memberService: MemberService,
      private datetimeService: DatetimeService,
      private displayService: DisplayService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
        id: [this.id]
    });
    
    this.comments = [];
    this.newComment = "";
    this.fetchMemberDetails();
  }

  fetchMemberDetails() {
    try {
      this.memberService.getMemberDetails(this.id).subscribe(memberData => {
        this.memberDetails = memberData;
        this.ready = true;
      });
    } catch (error) {
      console.log(error);
    }
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
    this.ready = false;
  }

  addComment() {
    if (this.newComment != "") {
      const newComment: Comment = {
        changedAt: new Date(),
        entry: this.newComment,
        userTyped: true
      };
      this.memberDetails?.comments.push(newComment);
      this.memberService.updateMember(this.memberDetails)
      .subscribe(updatedMember => {
        this.memberDetails.comments = updatedMember.comments;
      });
      this.newComment = "";
    }
  }

  transformDateAndTime(date: any): string {
    return this.datetimeService.transformDateAndTime(date);
  }

  transformDate(date: any): string{
    return this.datetimeService.transformDate(date);
  }

  transformStageView(stage: string): string {
    return this.displayService.getMemberStageDisplayValue(stage);
  }

  transformRoleView(role: string): string {
    return this.displayService.getMemberRoleDisplayValue(role);
  }

  transformFunctionView(functionName: string): string {
    return this.displayService.getMemberFunctionDisplayValue(functionName);
  }
}
