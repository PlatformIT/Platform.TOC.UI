import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UploadFileService {
  baseUrl = environment.baseUrl;

  constructor(private htpp: HttpClient) { }

  uploadFile(data) {
    return this.htpp.post(this.baseUrl + "/api/Overtime", data);
  }
  getBymonth(data) {
    if (localStorage.getItem("roles") == '"admin"') {
      return this.htpp.get(
        this.baseUrl +
        `/api/Employee/GetByMonth?month=${data.month}&year=${data.year}&departmentCode=${data.departmentCode}`
      );
    } else if (
      localStorage.getItem("roles") == '"contract"'
    ) {
      return this.htpp.get(
        this.baseUrl +
        `/api/Contracts?month=${data.month}&year=${data.year}&departmentCode=${data.departmentCode}`
      );
    }
    else if (
      localStorage.getItem("roles") == '"assignment"'
    ) {
      return this.htpp.get(
        this.baseUrl +
        `/api/Assignments?month=${data.month}&year=${data.year}&departmentCode=${data.departmentCode}`
      );
    }
  }
  getEmployeeById(employeeId) {
    return this.htpp.get(
      this.baseUrl + `/api/Employee/GetByEmployeeId?employeeId=${employeeId}`
    );
  }
  getAllReports() {
    return this.htpp.get(this.baseUrl + `/api/Overtime/GetAllReport`);
  }
  deleteFile(data) {
    return this.htpp.delete(
      this.baseUrl + `/api/Overtime?month=${data.month}&year=${data.year}`
    );
  }

  getAssignmentsFile(data) {
    return this.htpp.get(
      this.baseUrl +
      `/api/Report/GetAssignments?month=${data.month}&year=${data.year}`,
      { responseType: "blob" }
    );
  }
  getContractsFile(data) {
    return this.htpp.get(
      this.baseUrl +
      `/api/Report/GetContracts?month=${data.month}&year=${data.year}`,
      { responseType: "blob" }
    );
  }

  addContractType(file) {
    return this.htpp.post(this.baseUrl + `/api/employeeType/addContract`, file)
  }
  addAssignmentType(file) {
    return this.htpp.post(this.baseUrl + `/api/employeeType/addAssignment`, file)
  }
  getEmployeeType(start = 0, take = 10) {
    return this.htpp.get(this.baseUrl + `/api/employeeType/get?start=${start}&take=${take}`)
  }
  deleteEmployeeType() {
    return this.htpp.delete(this.baseUrl + `/api/employeeType/deleteAll`)
  }
  getEmployeeTypeById(employeeId) {
    return this.htpp.get(this.baseUrl + `/api/employeeType/search?employeeId=${employeeId}`)
  }
  deleteEmployee(id) {
    return this.htpp.delete(this.baseUrl + `/api/employeeType/delete?id=${id}`)
  }
}
