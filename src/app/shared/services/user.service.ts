import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = "https://toc-api.theitplatform.app/api/";

  constructor(private http: HttpClient) {}

  add(data: any) {
    return this.http.post(this.baseUrl + "Users", data);
  }

  get(pagination: any) {
    console.log('====================================');
    console.log(pagination);
    console.log('====================================');
    return this.http.get(
      this.baseUrl +
        "Users?Start=" +
        pagination.start +
        "&Take=" +
        pagination.take
    );
  }

  getById() {}

  update(data: any, id: any) {
    return this.http.put(this.baseUrl + "Users/" + id, data);
  }

  delete(id: any) {
    return this.http.delete(this.baseUrl + "Users/" + id);
  }

  changePassword(data: any,id:any) {
    return this.http.post(this.baseUrl + "Users/" + id, data);
  }
}
