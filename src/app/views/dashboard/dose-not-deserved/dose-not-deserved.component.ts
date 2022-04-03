import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeservedService } from 'src/app/shared/services/deserved.service';

@Component({
  selector: 'app-dose-not-deserved',
  templateUrl: './dose-not-deserved.component.html',
  styleUrls: ['./dose-not-deserved.component.scss']
})
export class DoseNotDeservedComponent implements OnInit {
  searchForm: FormGroup;
  employees: any;
  data: any = {};
  confirmResut: string;
  constructor(
    private fb: FormBuilder,
    private deservedService: DeservedService,
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      month: ["", Validators.required],
      year: ["", Validators.required],
    });
    this.getAllDoseNotDeserved()
  }
  getAllDoseNotDeserved(){
    this.employees = []
    this.deservedService.getAllDoseNoteDesreve(this.searchForm.value).subscribe((res:any) => {
      this.employees = res.data
    })
  }
 
}
