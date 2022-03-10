import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeservedService {

  baseUrl = "https://toc-api.theitplatform.app/api/";
  constructor(private http: HttpClient) { }
  
  uploadFile(data) {
    return this.http.post(this.baseUrl + "DeserveOvertime/uploadFile", data);
  }
  getAll() {
    return this.http.get(this.baseUrl + "DeserveOvertime/GetAll");
  }
  
  deleteAll() {
    return this.http.delete(this.baseUrl + "DeserveOvertime/deleteAll");
  }
}
