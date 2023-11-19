import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RecruiterDetailComponent } from '../recruiter-detail/recruiter-detail.component';
import { ApplicantData } from '../interfaces';
import { ApplicantService } from '../applicant.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})

export class RecruitmentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first-name', 'family-name', 'lc', 'status', 'signup-date'];
  dataSource: MatTableDataSource<ApplicantData>;
  applicants: ApplicantData[] = [];
  openCounter: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private applicantService: ApplicantService) { }

  ngOnInit(): void {
    this.applicantService.getApplicants().subscribe(applicants => {
      this.applicants = applicants;
      this.dataSource = new MatTableDataSource(this.applicants);
      this.dataSource.paginator = this.paginator;
    });
    this.applicantService.getNumberOfOpens().subscribe(counter => {
      this.openCounter = counter;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetails(id: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = this.applicants[id];

    this.dialog.open(RecruiterDetailComponent, dialogConfig);
  }

  transformStatusView(status: string): string {
    
    switch (status) {
      case 'open':
        return 'Open';
      case 'contacted':
        return 'Contacted';
      case 'toBeInterviewed':
        return 'To Be Interviewed';
      case 'interviewed':
        return 'Interviewed';
      case 'onHold':
        return 'On Hold';
      case 'toBeRejected':
        return 'To Be Rejected';
      case 'rejected':
        return 'Rejected';
      case 'candidateNotInterested':
        return 'Candidate Not Interested';
      case 'selected':
        return 'Selected';
      case 'duplicate':
        return 'Duplicate';
      default:
        return 'Unknown';
    }
  }

  transformSignupView(date: string): string {

    let transformedDate2 = DateTime.fromISO(date);
    return transformedDate2.toLocal().toLocaleString(DateTime.DATE_MED);
  }
}
