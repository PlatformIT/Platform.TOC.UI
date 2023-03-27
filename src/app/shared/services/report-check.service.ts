import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportCheckService {

  constructor(private http: HttpClient) { }

  getAllFile(data) {
    for (const key in data) {
      if (data[key] == null) {
        data[key] = ''
      }
    }
    return this.http.get(
      environment.baseUrl +
      `/api/Report/GetAll?month=${data.month}&year=${data.year}&departmentCode=${data.departmentCode}`,
      { responseType: "blob" }
    );
  }

  getAssignmentsFile(data) {
    for (const key in data) {
      if (data[key] == null) {
        data[key] = ''
      }
    }
    return this.http.get(
      environment.baseUrl +
      `/api/Report/GetAssignments?month=${data.month}&year=${data.year}&departmentCode=${data.departmentCode}`,
      { responseType: "blob" }
    );
  }
  getContractsFile(data) {
    for (const key in data) {
      if (data[key] == null) {
        data[key] = ''
      }
    }
    return this.http.get(
      environment.baseUrl +
      `/api/Report/GetContracts?month=${data.month}&year=${data.year}&departmentCode=${data.departmentCode}`,
      { responseType: "blob" }
    );
  }
  getUndefinedFile(data) {
    for (const key in data) {
      if (data[key] == null) {
        data[key] = ''
      }
    }
    return this.http.get(
      environment.baseUrl +
      `/api/Report/GetUndefined?month=${data.month}&year=${data.year}&departmentCode=${data.departmentCode}`,
      { responseType: "blob" }
    );
  }
}
