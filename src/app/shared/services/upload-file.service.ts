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
}
