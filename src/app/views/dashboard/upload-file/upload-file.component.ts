import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  hodidaysSelected: any[] = [];
  uploadFileForm: FormGroup;
  fileData: any;
  employees: any;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private uploadFileService: UploadFileService
    
    ) { }

  ngOnInit(): void {
    this.uploadFileForm = this.fb.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      file: ['', Validators.required],

    })
  }
  open(holidaysModel){
    this.modalService.open(holidaysModel, { ariaLabelledBy: 'modal-basic-title' })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }
  addHoliday(holiday){
    this.hodidaysSelected.push(holiday);
  }
  deleteDayFromHoliday(i){
    this.hodidaysSelected.splice(i,1)
  }
  uploadFileBtn(e){
    console.log(e.target.files[0]);
    this.fileData = e.target.files[0]
    
  }
  
  uploadFile(){
    const fromData = new FormData()
    this.hodidaysSelected.forEach((day) => {
      fromData.append('Holidays', day)
    })
    fromData.append('month',this.uploadFileForm.get('month').value)
    fromData.append('year',this.uploadFileForm.get('year').value)
    fromData.append('startTime',this.uploadFileForm.get('startTime').value)
    fromData.append('endTime',this.uploadFileForm.get('endTime').value)
    fromData.append('file', this.fileData)
    console.log(fromData);
    this.uploadFileService.uploadFile(fromData).subscribe((res:any) => {
      console.log(res);
      this.employees = res.data
    })
  }
  
}
