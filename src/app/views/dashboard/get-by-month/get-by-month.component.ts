import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';

@Component({
  selector: 'app-get-by-month',
  templateUrl: './get-by-month.component.html',
  styleUrls: ['./get-by-month.component.scss']
})
export class GetByMonthComponent implements OnInit {
  searchForm: FormGroup;
  employees: any = [];
  constructor(private fb: FormBuilder,
    private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
    })
  }
  search(){
      this.employees = []
    this.uploadFileService.getBymonth(this.searchForm.value).subscribe((res:any) => {
      console.log(res);
      this.employees = res.data
    })
  }

}
