import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  files: any;
  constructor(
    private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
    this.uploadFileService.getAllReports().subscribe((res:any) => {
      this.files = res.data
    })
  }

}
