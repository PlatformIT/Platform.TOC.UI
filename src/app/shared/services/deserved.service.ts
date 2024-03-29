import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DeservedService {
  baseUrl = "https://toc-api.theitplatform.app/api/";
  constructor(private http: HttpClient) { }

  uploadFile(data, startDate) {
    return this.http.post(this.baseUrl + "DeserveOvertime/uploadFile?startDate=" + startDate, data);
  }
  getAll() {
    return this.http.get(this.baseUrl + "DeserveOvertime/GetAll");
  }
  deleteAll() {
    return this.http.delete(this.baseUrl + "DeserveOvertime/deleteAll");
  }

  getAllDoseNoteDesreve(data) {
    if (localStorage.getItem("roles") == '"contract"') {
      return this.http.get(
        this.baseUrl +
        `Contracts/GetDoesNotDeserve?month=${data.month}&year=${data.year}&departmentCode=${data.departmentCode}`
      );
    } else if (localStorage.getItem("roles") == '"assignment"') {
      return this.http.get(
        this.baseUrl +
        `Assignments/GetDoesNotDeserve?month=${data.month}&year=${data.year}&departmentCode=${data.departmentCode}`
      );
    } else if (localStorage.getItem("roles") == '"admin"') {
      return this.http.get(
        this.baseUrl +
        `Employee/GetDoesNotDeserveByType?month=${data.month}&year=${data.year}&departmentCode=${data.departmentCode}&type=${data.type}`
      );
    }
  }
  addDeserveEmployee(employeeId, startDate) {
    return this.http.post(this.baseUrl + "deserveOverTime/add?employeeId=" + employeeId + "&startDate=" + startDate, {})
  }
  deleteDeserveEmployee(employeeId) {
    return this.http.delete(this.baseUrl + "deserveOverTime/delete?id=" + employeeId)
  }

  getEmployeeTypeById(employeeId) {
    return this.http.get(this.baseUrl + `deserveOverTime/search?employeeId=${employeeId}`)
  }
  getNotDeservedFile() {
    return this.http.get(
      this.baseUrl +
      `DeserveOvertime/GetExcel`,
      { responseType: "blob" }
    );
  }
}
