import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  baseUrl = "https://toc-api.theitplatform.app/api/";

  constructor(private htpp: HttpClient) { }

  uploadFile(data){
    return this.htpp.post(this.baseUrl + "Overtime", data)
  }
  getBymonth(data){
    return this.htpp.get(this.baseUrl + `Employee/GetByMonth?month=${data.month}&year=${data.year}`)
  }
  getEmployeeById(employeeId){
    return this.htpp.get(this.baseUrl + `Employee/GetByEmployeeId?employeeId=${employeeId}`)
  }
  getAllReports(){
    return this.htpp.get(this.baseUrl + `Overtime/GetAllReport`)
  }
}
