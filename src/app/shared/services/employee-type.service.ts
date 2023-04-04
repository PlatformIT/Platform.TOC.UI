import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {

  constructor(private http: HttpClient) { }

  addEmployeeType(data) {
    return this.http.post(environment.baseUrl + "/api/EmployeeType/Add", data)
  }
  updateEmployeeType(id, type) {
    return this.http.put(environment.baseUrl + "/api/EmployeeType/update/" + id + "?typeEnum=" + type, {})
  }
}
