import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberDataDetail, MemberStages } from '../interfaces';
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
  currentMemberStatus: string;
  memberDetails: MemberDataDetail;
  memberStages: MemberStages[] = [
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
        this.currentMemberStatus = this.memberDetails.status;
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

  saveMemberChanges() {

  }

  transformDate(date: any): string{
    let transformedDate = DateTime.fromISO(date);
    return transformedDate.toLocal().toLocaleString(DateTime.DATE_MED);
  }
}
