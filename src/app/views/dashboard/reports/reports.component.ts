import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  files: any;
  constructor(
    private uploadFileService: UploadFileService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.uploadFileService.getAllReports().subscribe((res:any) => {
      this.files = res.data
    })
  }
  deleteFile(file){
    this.uploadFileService.deleteFile(file).subscribe((res:any) => {
      this.toastr.success("تم حذف الفايل")
      this.uploadFileService.getAllReports().subscribe((res:any) => {
        this.files = res.data
      })
    })
  }
}
