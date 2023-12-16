import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicantDataDetail, ApplicantStage, ApplicantStageType, Comment, MotivationForJoining } from '../interfaces';
import { ApplicantService } from '../applicant.service';
import { MemberService } from '../member.service';
import { DatetimeService } from '../datetime.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-recruiter-detail',
  templateUrl: './recruiter-detail.component.html',
  styleUrls: ['./recruiter-detail.component.scss']
})
export class RecruiterDetailComponent implements OnInit {
  ready: boolean = false;
  comments: string[];
  newComment: string;
  motivationForJoining: boolean[];
  applicantStages: ApplicantStage[] = [
    {value: 'open', displayValue: 'Open'},
    {value: 'contacted', displayValue: 'Contacted'},
    {value: 'toBeInterviewed', displayValue: 'To Be Interviewed'},
    {value: 'interviewed', displayValue: 'Interviewed'},
    {value: 'onHold', displayValue: 'On Hold'},
    {value: 'toBeRejected', displayValue: 'To Be Rejected'},
    {value: 'rejected', displayValue: 'Rejected'},
    {value: 'candidateNotInterested', displayValue: 'Candidate Not Interested'},
    {value: 'selected', displayValue: 'Selected'},
    {value: 'duplicate', displayValue: 'Duplicate'}
  ];
  motivationForJoiningOptions: MotivationForJoining[] = [
    {value: 'false', displayValue: 'Persönliche und berufliche Entwicklung'},
    {value: 'false', displayValue: 'Internationales Netzwerk'},
    {value: 'false', displayValue: 'Beitrag zur interkulturellen Verständigung'},
  ];

  currentApplicantStage: ApplicantStageType;
  applicantDetails: ApplicantDataDetail;

  constructor(
    private dialogRef: MatDialogRef<RecruiterDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private applicantService: ApplicantService,
    private memberService: MemberService,
    private datetimeService: DatetimeService,
    private displayService: DisplayService
  ) { }

  ngOnInit() {
    this.comments = [];
    this.newComment = "";
    this.fetchApplicantDetails();
  }

  fetchApplicantDetails() {
    try {
      this.applicantService.getApplicantDetails(this.id).subscribe(applicantData => {
        this.applicantDetails = applicantData;
        this.currentApplicantStage = applicantData.stage;
        this.applicantDetails.motivation.map((motivation, index) => {
          this.motivationForJoiningOptions[index].value = motivation;
        });
        this.ready = true;
      });
    } catch (err) {
      console.log(err);
    }
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
      this.applicantDetails?.comments.push(newComment);
      this.applicantService.updateApplicant(this.applicantDetails)
      .subscribe(updatedApplicant => {
        this.applicantDetails.comments = updatedApplicant.comments;
      });
      this.newComment = "";
    }
  }

  saveApplicantChanges() {
    const oldStage = this.transformStageView(this.applicantDetails.stage);
    this.applicantDetails.stage = this.currentApplicantStage;
    const newStage = this.transformStageView(this.applicantDetails.stage);
    const entry = `Updated: ${oldStage} to ${newStage}`;
    const newComment: Comment = {
      changedAt: new Date(),
      entry: entry,
      userTyped: false
    };
    this.applicantDetails.comments.push(newComment);
    this.applicantService.updateApplicant(this.applicantDetails).subscribe();
    
    if(this.currentApplicantStage == "selected"){
      try{
        this.memberService.createNewMember(this.applicantDetails).subscribe();
      }catch(err) {}
    }
    this.close();
  }

  transformDateAndTime(date: any): string {
    return this.datetimeService.transformDateAndTime(date);
  }

  transformStageView(stage: string): string {
    return this.displayService.getApplicantStageDisplayValue(stage);
  }
}