import { Component, OnInit, ViewChild} from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicantService } from '../applicant.service';
import { DatetimeService } from '../datetime.service';
import { DisplayService } from '../display.service';
import { ApplicantData, ApplicantStageType, ApplicantStageTypeDisplay, LcType, LcTypeDisplay } from '../interfaces';
import { RecruiterDetailComponent } from '../recruiter-detail/recruiter-detail.component';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})

export class RecruitmentComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'firstName', 'familyName', 'lc', 'stage', 'createdAt'];
  dataSource: MatTableDataSource<ApplicantData> = new MatTableDataSource<ApplicantData>();
  applicants: ApplicantData[] = [];
  openCounter = 0;
  filteredApplicants = 0;
  includeArchived = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private applicantService: ApplicantService,
    private datetimeService: DatetimeService,
    private displayService: DisplayService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchApplicants();
    this.applicantService.getNumberOfOpens().subscribe(counter => {
      this.openCounter = counter;
    })
  }

  fetchApplicants() {
    try {
      this.applicantService.getApplicants(this.includeArchived).subscribe(applicants => {
        this.applicants = applicants;
        this.dataSource.data = this.applicants;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } catch (err) {
      if(err instanceof Error) {
        this.snackbar.open(err.message, '', { duration: 5000 });
      } else {
        this.snackbar.open('Applicants could not be fetched', '', { duration: 5000 });
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredApplicants = this.dataSource.filteredData.length;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterArchived(event: MatChipSelectionChange) {
    this.includeArchived = event.source.selected;
    this.fetchApplicants();
  }


  openDetails(id: number) {
    const dialogConfig = new MatDialogConfig();
    const deviceWidth = window.innerWidth;

    dialogConfig.autoFocus = true;
    dialogConfig.data = id;
    dialogConfig.maxHeight='90vh';
    dialogConfig.maxWidth='100vw'
    dialogConfig.width = this.calculateDialogWidth(deviceWidth);
    dialogConfig.height = this.calculateDialogHeight(deviceWidth);
    
    const dialogRef= this.dialog.open(RecruiterDetailComponent, dialogConfig);

    dialogRef.afterOpened().subscribe(() => {
      window.addEventListener('resize', this.onWindowResize.bind(this, dialogRef), true);
    });

    dialogRef.afterClosed().subscribe(() => {
      window.removeEventListener('resize', this.onWindowResize.bind(this, dialogRef), true);
    });
  }

  onWindowResize(dialogRef: MatDialogRef<RecruiterDetailComponent>, event: Event) {
    const deviceWidth = window.innerWidth;
    dialogRef.updateSize(this.calculateDialogWidth(deviceWidth), this.calculateDialogHeight(deviceWidth));
  }

  calculateDialogWidth(deviceWidth: number): string {
    if (deviceWidth <= 768) {
      return '100vw';
    } else {
      return '80vw';
    }
  }
  calculateDialogHeight(deviceWidth: number): string {
    if (deviceWidth <= 768) {
      return '90vh';
    } else {
      return '80vh';
    }
  }

  transformStageView(stage: ApplicantStageType): ApplicantStageTypeDisplay | string {
    return this.displayService.getApplicantStageDisplayValue(stage);
  }

  transformDate(date: string): string {
    return this.datetimeService.transformDate(date);
  }

  transformLc(lc: LcType): LcTypeDisplay | string {
    return this.displayService.getLcDisplayValue(lc);
  }
}
