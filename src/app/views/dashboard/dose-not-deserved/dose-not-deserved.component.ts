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
  employees: any[] =[];
  data: any = {};
  confirmResut: string;
  isAdmin: boolean;

  listYears: number[]=[];
  thisYear: number;
  constructor(
    private fb: FormBuilder,
    private deservedService: DeservedService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem("roles") == "\"admin\"";
    this.searchForm = this.fb.group({
      month: ["", Validators.required],
      year: ["", Validators.required],
      type:[""]
    });
    // this.getAllDoseNotDeserved()

    
    this.thisYear = new Date().getFullYear()
    for (let firstYear = 2019; firstYear <= this.thisYear; firstYear++) {
      this.listYears.push(firstYear)
    }
  }
  getAllDoseNotDeserved(){
    this.employees = []
    this.deservedService.getAllDoseNoteDesreve(this.searchForm.value).subscribe((res:any) => {
      this.employees = res.data
    })
  }

}
