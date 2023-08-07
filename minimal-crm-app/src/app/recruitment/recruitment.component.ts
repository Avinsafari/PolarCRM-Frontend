import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RecruiterDetailComponent } from '../recruiter-detail/recruiter-detail.component';

export interface UserData {
  id: number;
  firstName: string;
  familyName: string;
  lc: string;
  status: string;
}

const DATA: UserData[] = [
  {id: 1, firstName: 'Hydrogen' , familyName: 'J.', lc: 'Berlin TU'   , status: 'Open'      },
  {id: 2, firstName: 'Helium'   , familyName: 'J.', lc: 'Berlin HU'   , status: 'Accepted'  },
  {id: 3, firstName: 'Lithium'  , familyName: 'J.', lc: 'Aachen'      , status: 'Rejected'  },
  {id: 4, firstName: 'Beryllium', familyName: 'J.', lc: 'Braunschweig', status: 'Open'      },
  {id: 5, firstName: 'Boron'    , familyName: 'J.', lc: 'Koeln'       , status: 'Contacted' },
  {id: 6, firstName: 'Carbon'   , familyName: 'J.', lc: 'Frankfurt'   , status: 'Open'      },
  {id: 7, firstName: 'Nitrogen' , familyName: 'J.', lc: 'Bonn'        , status: 'Contacted' },
  {id: 8, firstName: 'Oxygen'   , familyName: 'J.', lc: 'Regensburg'  , status: 'Accepted'  },
  {id: 9, firstName: 'Fluorine' , familyName: 'J.', lc: 'Muenchen'    , status: 'Accepted'  },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
  {id: 10, firstName: 'Neon'    , familyName: 'J.', lc: 'Leipzig'     , status: 'Open'      },
];

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})

export class RecruitmentComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'first-name', 'family-name', 'lc', 'status'];
  dataSource: MatTableDataSource<UserData>;
  clickedRows = new Set<UserData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetails() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = DATA[0];

    this.dialog.open(RecruiterDetailComponent, dialogConfig);
    console.log("Clicked");
  }
}
