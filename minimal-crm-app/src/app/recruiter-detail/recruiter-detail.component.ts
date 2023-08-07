import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from '../recruitment/recruitment.component';

@Component({
  selector: 'app-recruiter-detail',
  templateUrl: './recruiter-detail.component.html',
  styleUrls: ['./recruiter-detail.component.scss']
})
export class RecruiterDetailComponent implements OnInit {
  form: FormGroup;
  id: number;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<RecruiterDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public data: UserData
    ) 
    {
        this.id = data.id;
    }

    ngOnInit() {
        this.form = this.fb.group({
            id: [this.id]
        });
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}
