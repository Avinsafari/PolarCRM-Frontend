import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberData, MemberDataDetail } from '../interfaces';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.scss']
})
export class MembersDetailComponent implements OnInit {

  form: FormGroup;
  id: number;
  comments: string[];
  newComment: string;
  memberDetails: MemberDataDetail | null;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<MembersDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: MemberData,
      private applicantService: MemberService
    ) { }

  ngOnInit() {
    this.id = this.data._id;
    this.form = this.fb.group({
        id: [this.id]
    });
    
    this.comments = [];
    this.newComment = "";
    this.applicantService.getMemberDetails(this.id).subscribe(memberData => {
        this.memberDetails = memberData;
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  addComment() {
    if (this.newComment != "") {
        this.comments.push(this.newComment);
        this.newComment = "";
    }
  }

  saveMemberChanges() {

  }
}
