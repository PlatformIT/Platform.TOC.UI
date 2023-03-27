import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  get(paginationQuery: any) {
    return this.http.get(
      environment.baseUrl +
      `/departments?Start=${paginationQuery.pageNo}&Take=${paginationQuery.pageSize}`
    );
  }
  add(data: any) {
    return this.http.post(environment.baseUrl + "/departments", data);
  }
  getById(id: any) {
    return this.http.get(environment.baseUrl + "/departments/" + id);
  }
  update(id: any, data: any) {
    return this.http.put(environment.baseUrl + "/departments/" + id, data);
  }
  delete(id: any) {
    return this.http.delete(environment.baseUrl + "/departments/" + id);
  }
  getList() {
    return this.http.get(environment.baseUrl + "/departments/All");
  }
}
