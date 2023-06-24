import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  add(data: any) {
    return this.http.post(this.baseUrl + "Users", data);
  }

  get(pagination: any) {
    return this.http.get(
      this.baseUrl +
      "/api/Users?Start=" +
      pagination.start +
      "&Take=" +
      pagination.take
    );
  }

  getById() { }

  update(data: any, id: any) {
    return this.http.put(this.baseUrl + "/api/Users/" + id, data);
  }

  delete(id: any) {
    return this.http.delete(this.baseUrl + "/api/Users/" + id);
  }

  changePassword(data: any, id: any) {
    return this.http.post(this.baseUrl + "/api/Users/" + id, data);
  }
}
