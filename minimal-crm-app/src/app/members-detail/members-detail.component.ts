import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberDataDetail, Comment } from '../interfaces';
import { MemberService } from '../member.service';
import { DatetimeService } from '../datetime.service';

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
      private datetimeService: DatetimeService
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
    
    switch (stage) {
      case 'accepted':
        return 'Accepted';
      case 'approved':
        return 'Approved';
      case 'realized':
        return 'Realized';
      case 'finished':
        return 'Finished';
      case 'completed':
        return 'Completed';
      case 'dropped':
        return 'Dropped';
      case 'terminated':
        return 'Terminated';
      case 'advanced':
        return 'Advanced';
      case 'alumni':
        return 'Alumni';
      default:
        return 'Unknown';
    }
  }
}
