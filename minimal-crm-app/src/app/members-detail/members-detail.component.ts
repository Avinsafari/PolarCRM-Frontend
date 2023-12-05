import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberDataDetail } from '../interfaces';
import { MemberService } from '../member.service';
import { DateTime } from 'luxon';

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
      private memberService: MemberService
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
        this.comments.push(this.newComment);
        this.newComment = "";
    }
  }

  transformDate(date: any): string{
    let transformedDate = DateTime.fromISO(date);
    return transformedDate.toLocal().toLocaleString(DateTime.DATE_MED);
  }

  transformStatusView(status: string): string {
    
    switch (status) {
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
